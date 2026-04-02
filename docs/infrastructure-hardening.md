# SSK Infrastructure Security & Action Checklist

This document contains final production hardening procedures that must be executed directly on infrastructure provider dashboards (Cloudflare, Database Provider).

## 1. Cloudflare Protection

**Log into the Cloudflare Dashboard and navigate to Security > WAF:**

### Automatic Protections
- [ ] Turn ON **Bot Fight Mode** (`Security > Bots > Bot Fight Mode`).
- [ ] Ensure **Browser Integrity Check** is ON.

### Customs WAF Rules
Create the following custom rules (`Security > WAF > Custom Rules`):
1. **Block Admin from Public IPs**  
   - Expression: `(http.request.uri.path contains "/dash") and (not ip.src in {your_office_ip})`
   - Action: `Block`

2. **Block Malicious User Agents**  
   - Expression: `(http.user_agent contains "curl") or (http.user_agent contains "wget")`
   - Action: `Managed Challenge`

### Edge Rate Limiting
Navigate to `Security > WAF > Rate Limiting rules`:
- **Auth Endpoint:**  
  - If URI contains `/api/auth`
  - Limit: 5 requests per 1 minute
  - Action: `Block` for 15 minutes.

- **Form Endpoints:**  
  - If URI contains `/api/contact` OR `/api/applications`
  - Limit: 10 requests per 1 minute
  - Action: `Block` for 10 minutes.

---

## 2. Database Protection Policies

Whether using Vercel Postgres, Neon, or Supabase, execute these in your database console:

- [ ] **Point-in-Time Recovery (PITR):** Enable 7-to-30 day automated backups.
- [ ] **Network Restrictions:** Restrict incoming connections purely to your Host Provider's Subnet (e.g., Vercel IPs) and your core VPN IPs.
- [ ] **SSL Enforcement:** Your production environment `.env` MUST append `?sslmode=require` to `POSTGRES_URL`. Ensure client-connection SSL Verification is enabled centrally.

---

## 3. Environment Variable Rotation

For final production security, do a cold-rotation of the following credentials before going live.
- `NEXTAUTH_SECRET`
- `OPENAI_API_KEY`
- `POSTGRES_URL` (Regenerate password)
- `SMTP_PASSWORD`

Store these only in your Secure Host environment variables. **Never store them locally**.
