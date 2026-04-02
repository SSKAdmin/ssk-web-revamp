export const ROLES = {
  ADMIN: "admin",
  DIRECTOR: "director",
  MANAGER: "manager",
  VIEWER: "viewer",
} as const;

export type AppRole = (typeof ROLES)[keyof typeof ROLES];

export function hasMinimumRole(userRole: AppRole, allowed: AppRole[]) {
  return allowed.includes(userRole);
}
