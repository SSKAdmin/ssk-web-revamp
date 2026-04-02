#!/usr/bin/env bash
set -Eeuo pipefail

# ============================================================
# SSK Platform - Current State Release Verification
# ============================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

APP_PORT="${APP_PORT:-3007}"
APP_URL="${APP_URL:-http://127.0.0.1:${APP_PORT}}"
PID_FILE=".verify-current.pid"
LOG_FILE=".verify-current.log"

PASS_COUNT=0
WARN_COUNT=0
FAIL_COUNT=0

pass() {
  echo "✅ PASS: $1"
  PASS_COUNT=$((PASS_COUNT + 1))
}

warn() {
  echo "⚠️ WARN: $1"
  WARN_COUNT=$((WARN_COUNT + 1))
}

fail() {
  echo "❌ FAIL: $1"
  FAIL_COUNT=$((FAIL_COUNT + 1))
}

cleanup() {
  if [[ -f "$PID_FILE" ]]; then
    PID="$(cat "$PID_FILE" || true)"
    if [[ -n "${PID:-}" ]] && kill -0 "$PID" 2>/dev/null; then
      kill "$PID" 2>/dev/null || true
      wait "$PID" 2>/dev/null || true
    fi
    rm -f "$PID_FILE"
  fi
}
trap cleanup EXIT

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo "Missing command: $1"; exit 1; }
}

require_file() {
  [[ -f "$1" ]] || { echo "Missing required file: $1"; exit 1; }
}

http_code() {
  curl -s -o /dev/null -w "%{http_code}" "$1"
}

wait_for_app() {
  local retries=90
  local delay=2
  for ((i=1; i<=retries; i++)); do
    if curl -fsS "$APP_URL" >/dev/null 2>&1; then
      return 0
    fi
    sleep "$delay"
  done
  return 1
}

check_url_ok() {
  local url="$1"
  local code
  code="$(http_code "$url")"
  if [[ "$code" == "200" ]]; then
    pass "$url returned 200"
  else
    fail "$url returned $code (expected 200)"
  fi
}

check_url_redirect() {
  local url="$1"
  local code
  code="$(http_code "$url")"
  if [[ "$code" == "301" || "$code" == "302" || "$code" == "307" || "$code" == "308" ]]; then
    pass "$url returned redirect $code"
  else
    fail "$url returned $code (expected redirect)"
  fi
}

check_post_json() {
  local url="$1"
  local payload="$2"
  local expected="${3:-200}"
  local code
  code="$(curl -s -o /dev/null -w "%{http_code}" -X POST "$url" \
    -H "Content-Type: application/json" \
    -d "$payload")"
  if [[ "$code" == "$expected" || "$code" == "200" || "$code" == "201" || "$code" == "503" ]]; then
    pass "POST $url returned $code"
  else
    fail "POST $url returned $code (expected $expected or 503 fallback)"
  fi
}

grep_required() {
  local pattern="$1"
  local path="$2"
  if grep -RIn --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git "$pattern" "$path" >/dev/null 2>&1; then
    pass "Required pattern exists: $pattern"
  else
    fail "Required pattern missing: $pattern"
  fi
}

grep_forbidden() {
  local pattern="$1"
  local path="$2"
  if grep -RIn --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git "$pattern" "$path" >/dev/null 2>&1; then
    fail "Forbidden pattern found: $pattern"
  else
    pass "Forbidden pattern absent: $pattern"
  fi
}

echo "============================================================"
echo "SSK CURRENT STATE VERIFICATION STARTED"
echo "============================================================"

echo ""
echo "[1] PRECHECK"
require_cmd node
require_cmd npm
require_cmd curl
require_cmd find
require_cmd grep
require_file package.json
require_file tsconfig.json
require_file next.config.ts

pass "Required commands and files present"

echo ""
echo "[2] PROJECT INVENTORY"

PUBLIC_ROUTE_FILES=()
ADMIN_ROUTE_FILES=()
API_ROUTE_FILES=()

if [[ -d "src/app/[lang]/(public)" ]]; then
  while IFS= read -r f; do PUBLIC_ROUTE_FILES+=("$f"); done < <(find "src/app/[lang]/(public)" -name "page.tsx" | sort)
fi

if [[ -d "src/app/[lang]/(admin)" ]]; then
  while IFS= read -r f; do ADMIN_ROUTE_FILES+=("$f"); done < <(find "src/app/[lang]/(admin)" -name "page.tsx" | sort)
fi

if [[ -d "src/app/api" ]]; then
  while IFS= read -r f; do API_ROUTE_FILES+=("$f"); done < <(find "src/app/api" -name "route.ts" | sort)
fi

echo "Public Pages: ${#PUBLIC_ROUTE_FILES[@]}"
echo "Admin Pages:  ${#ADMIN_ROUTE_FILES[@]}"
echo "API Routes:   ${#API_ROUTE_FILES[@]}"

if [[ ${#PUBLIC_ROUTE_FILES[@]} -gt 0 ]]; then pass "Public routes detected"; else fail "No public routes detected"; fi
if [[ ${#ADMIN_ROUTE_FILES[@]} -gt 0 ]]; then pass "Admin routes detected"; else warn "No admin routes detected"; fi
if [[ ${#API_ROUTE_FILES[@]} -gt 0 ]]; then pass "API routes detected"; else warn "No API routes detected"; fi

echo ""
echo "[3] STATIC QUALITY GATES"

npm run build >/dev/null 2>&1 && pass "Build passed" || fail "Build failed"

if npx tsc --noEmit >/dev/null 2>&1; then
  pass "Typecheck passed"
else
  fail "Typecheck failed"
fi

if npm run lint >/dev/null 2>&1; then
  pass "Lint passed"
else
  fail "Lint failed"
fi

echo ""
echo "[4] LOCALIZATION & CONTENT SANITY"

if [[ -f "src/dictionaries/en.json" && -f "src/dictionaries/ar.json" ]]; then
  pass "EN/AR dictionaries exist"
else
  warn "Dictionaries not found at expected path"
fi

grep_required "\"title\"" "./src"
grep_required "\"description\"" "./src"
grep_required "Build" "./src"
grep_required "Operate" "./src"
grep_required "Transfer" "./src"

grep_forbidden "SSK Consulting" "./src"
grep_forbidden "للاستشارات" "./src"

echo ""
echo "[5] LEGAL & STRUCTURE"

LEGAL_EXPECTED=("privacy" "terms" "data-protection")
for item in "${LEGAL_EXPECTED[@]}"; do
  if printf '%s\n' "${PUBLIC_ROUTE_FILES[@]}" | grep -q "/${item}/page.tsx"; then
    pass "Legal page exists: $item"
  else
    fail "Missing legal page: $item"
  fi
done

if [[ -f "src/middleware.ts" ]]; then
  pass "middleware.ts exists"
  if grep -q "PROTECTED_ROUTES\|matcher\|NextResponse\|auth" "src/middleware.ts"; then
    pass "Middleware contains protection logic"
  else
    warn "Middleware exists but protection logic not clearly detected"
  fi
else
  warn "middleware.ts not found"
fi

echo ""
echo "[6] METADATA PRESENCE"

MISSING_META=0
for f in "${PUBLIC_ROUTE_FILES[@]}"; do
  if grep -q "generateMetadata\|export const metadata" "$f"; then
    pass "Metadata found in $f"
  else
    warn "Metadata missing in $f"
    MISSING_META=$((MISSING_META + 1))
  fi
done

echo ""
echo "[7] ENV READINESS"

if [[ -f ".env" || -f ".env.local" || -f ".env.production" ]]; then
  pass "At least one env file exists"
else
  warn "No env file found"
fi

if grep -R "DATABASE_URL" .env* >/dev/null 2>&1; then
  pass "DATABASE_URL present in env files"
else
  warn "DATABASE_URL not found in env files"
fi

if grep -R "NEXTAUTH_SECRET" .env* >/dev/null 2>&1; then
  pass "NEXTAUTH_SECRET present in env files"
else
  warn "NEXTAUTH_SECRET not found in env files"
fi

echo ""
echo "[8] START APPLICATION"
rm -f "$LOG_FILE"
npm run dev -- --port "$APP_PORT" > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

if wait_for_app; then
  pass "Application started on $APP_URL"
else
  fail "Application failed to start on $APP_URL"
  echo ""
  echo "------ LAST LOG LINES ------"
  tail -n 40 "$LOG_FILE" || true
  echo "----------------------------"
  exit 1
fi

echo ""
echo "[9] ROUTE HEALTH - PUBLIC"

# canonical expected routes
PUBLIC_EXPECTED=(
  "/en"
  "/ar"
  "/en/about"
  "/ar/about"
  "/en/services"
  "/ar/services"
  "/en/contact"
  "/ar/contact"
  "/en/careers"
  "/ar/careers"
  "/en/privacy"
  "/ar/privacy"
  "/en/terms"
  "/ar/terms"
  "/en/data-protection"
  "/ar/data-protection"
)

for route in "${PUBLIC_EXPECTED[@]}"; do
  check_url_ok "${APP_URL}${route}"
done

echo ""
echo "[10] AUTH / ADMIN HEALTH"

if printf '%s\n' "${ADMIN_ROUTE_FILES[@]}" | grep -q "dashboard/page.tsx"; then
  check_url_redirect "${APP_URL}/en/dashboard"
  check_url_redirect "${APP_URL}/ar/dashboard"
fi

if printf '%s\n' "${ADMIN_ROUTE_FILES[@]}" | grep -q "dashboard/documents/page.tsx"; then
  check_url_redirect "${APP_URL}/en/dashboard/documents"
  check_url_redirect "${APP_URL}/ar/dashboard/documents"
fi

if printf '%s\n' "${ADMIN_ROUTE_FILES[@]}" | grep -q "cms/page.tsx"; then
  check_url_redirect "${APP_URL}/en/cms"
  check_url_redirect "${APP_URL}/ar/cms"
fi

if [[ -f "src/app/login/page.tsx" || -f "src/app/[lang]/login/page.tsx" ]]; then
  local_login_code="$(http_code "${APP_URL}/login")"
  if [[ "$local_login_code" == "200" || "$local_login_code" == "307" || "$local_login_code" == "308" ]]; then
    pass "/login reachable"
  else
    fail "/login returned $local_login_code"
  fi
fi

echo ""
echo "[11] API HEALTH"

# discover and test likely APIs
API_EXPECTED=(
  "/api/jobs"
  "/api/contact"
  "/api/applications"
  "/api/cms"
  "/api/documents"
)

for route in "${API_EXPECTED[@]}"; do
  if [[ -d "src/app${route}" || -f "src/app${route}/route.ts" ]]; then
    code="$(http_code "${APP_URL}${route}")"
    if [[ "$code" == "200" || "$code" == "401" || "$code" == "405" || "$code" == "400" ]]; then
      pass "${route} responded with acceptable code ${code}"
    else
      fail "${route} returned unexpected code ${code}"
    fi
  fi
done

echo ""
echo "[12] FORM ENDPOINT CHECKS"

if [[ -f "src/app/api/contact/route.ts" ]]; then
  check_post_json "${APP_URL}/api/contact" '{"name":"Test User","email":"test@example.com","message":"This is a release verification message."}' "200"
fi

if [[ -f "src/app/api/applications/route.ts" ]]; then
  # acceptable response can vary based on required fields
  code="$(curl -s -o /dev/null -w "%{http_code}" -X POST "${APP_URL}/api/applications" \
    -H "Content-Type: application/json" \
    -d '{"name":"Candidate Test","email":"candidate@example.com","message":"Verification"}')"
  if [[ "$code" == "200" || "$code" == "400" || "$code" == "422" ]]; then
    pass "/api/applications validation path working (${code})"
  else
    fail "/api/applications returned unexpected code ${code}"
  fi
fi

echo ""
echo "[13] HOMEPAGE CONTENT PRESENCE"

EN_TMP="$(mktemp)"
AR_TMP="$(mktemp)"
curl -fsS "${APP_URL}/en" > "$EN_TMP"
curl -fsS "${APP_URL}/ar" > "$AR_TMP"

if grep -Eq "Execution|Capabilities|Build|Operate|Transfer" "$EN_TMP"; then
  pass "EN homepage contains core content signals"
else
  fail "EN homepage missing expected core content signals"
fi

if grep -Eq "بناء|تشغيل|نقل|الخدمات|القدرات|التنفيذ" "$AR_TMP"; then
  pass "AR homepage contains core content signals"
else
  fail "AR homepage missing expected core content signals"
fi

rm -f "$EN_TMP" "$AR_TMP"

echo ""
echo "[14] BROKEN LINK SAMPLING - NAV/FOOTER"

SAMPLE_HTML="$(mktemp)"
curl -fsS "${APP_URL}/en" > "$SAMPLE_HTML"

while IFS= read -r link; do
  [[ -z "$link" ]] && continue
  code="$(http_code "${APP_URL}${link}")"
  if [[ "$code" == "200" || "$code" == "301" || "$code" == "302" || "$code" == "307" || "$code" == "308" ]]; then
    pass "Internal link valid: $link (${code})"
  else
    fail "Broken internal link: $link (${code})"
  fi
done < <(grep -oE 'href="\/[^"]+"' "$SAMPLE_HTML" | sed 's/href="//; s/"$//' | sort -u)

rm -f "$SAMPLE_HTML"

echo ""
echo "[15] FINAL SUMMARY"

echo "------------------------------------------------------------"
echo "PASS: $PASS_COUNT"
echo "WARN: $WARN_COUNT"
echo "FAIL: $FAIL_COUNT"
echo "------------------------------------------------------------"

if [[ "$FAIL_COUNT" -gt 0 ]]; then
  echo "❌ CURRENT STATE VERIFICATION FAILED"
  exit 1
fi

if [[ "$WARN_COUNT" -gt 0 ]]; then
  echo "⚠️ CURRENT STATE VERIFICATION PASSED WITH WARNINGS"
  exit 0
fi

echo "✅ CURRENT STATE VERIFICATION PASSED CLEANLY"
exit 0
