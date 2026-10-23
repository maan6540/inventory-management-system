export interface CurrentUser {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  roleId: number;
  role: string;
  rolePriority: number;
  department: string;
  status: string;
  permissions: string[];
  isRoleSwitched: boolean;
  originalRoleId: number | null;
  originalRole: string | null;
}
