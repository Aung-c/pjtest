// ===== Admin User (List Item) =====
export class AdminUser {
  Id: string = '';
  UserName: string = '';
  PhoneNumber: string = '';
  Email: string = '';
  DateOfBirth: string = '';
  BranchId: string = '';
  TerminalId: string = '';
  CreatedDate: string = '';
  RoleId: string | null = null;
  RoleName: string = '';
  Status: string = '';
  Regions: string[] = [];
  RegionIds: string[] = [];
}

export class CreateAdminUser {
  UserName: string = '';
  PhoneNumber: string = '';
  Email: string = '';
  DateOfBirth: string = '';
  BranchId: string = '';
  RegionIds: string[] = [];
  RoleId: string = '';
  Status: string = 'Active';
  TerminalId: string = '';
  InsID: string = '';
  CreatedDate: string = '';
  Regions: any[] = [];
  HashValue: string = '';
  MsgID: string = '';
  MsgType: string = 'CREATE_ADMINUSER';
  TimeStamp: string = '';
  VersionNo: string = '1.0.0';
}

export class Option {
  Value: string = '';
  Label: string = '';
  Parent: string = '';
}

export class AdminListFilter {
  userName: string = '';
  email: string = '';
  phoneNumber: string = '';
  roleId: string = '';
  status: string = '';
  registerDateFrom: string = '';
  registerDateTo: string = '';
  page: string = '1';
  pageSize: string = '10';
}