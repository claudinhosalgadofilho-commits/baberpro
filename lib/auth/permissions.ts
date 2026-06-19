import type { UserRole } from "@prisma/client";

const roleOrder: Record<UserRole, number> = {
  OWNER: 5,
  ADMIN: 4,
  MANAGER: 3,
  BARBER: 2,
  RECEPTIONIST: 1,
};

export function canManage(role: UserRole, required: UserRole) {
  return roleOrder[role] >= roleOrder[required];
}
