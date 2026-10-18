export interface CreateUserRequest {
  Username: string;
  FullName: string;
  Email: string;
  Password: string;
  RoleId: number;
  DepartmentId: number;
  StatusId: number;
}