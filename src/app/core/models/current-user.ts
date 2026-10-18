export interface CurrentUser {
  userId: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  rolePriority: number;
  department: string;
  status: string;
  permissions: string[];
}
