export class Filter {
  NRC: string = '';
  PPANo: string = '';
  pensionGroupId:string = '';
  PensionType: string = '';
  CurrentPage:string ='';
  PageSize:string='';
}

export class Search{
  beginDate: string ='';
  endDate: string = '';
  Status: string = 'true';
  CurrentPageNumber: string = '1';
  PageSize: string = '10';
}


 export class getaccounttrans {
  NRC:string='';
  PensionerName:string='';
  PPANo:string='';
  PensionType:string='';
  EPensionCardNo:string='';
  Division:string='';
  Township:string='';
  TransactionId:string='';
  TotalAmount:string= '';
  SalaryPensionAmount:string='';
  SalaryGratuityAmount:string= '';
  TransactionStatus: string='';
  TransactionDateTime: string='';
  PaymentMonth:string='';
  PensionGroup: string= '';
 }
 
 export class cashlist1{
  Id :string  = '';
  BranchName:string='';
  UserName:string='';
  CashRequestAmount:string='';
  RequestedDateTime:string= '';
  StatusColorCode:string= '';
 }

  export class detail {
    Id:string ='';
    BranchName:string= '';
    CashierName:string ='';
    OpeningBalance:string='';
    CashoutAmount:string='';
    RemainingBalance:string='';
    RequestedDateTime:string='';
    Status:string='';
    TerminalName:string='';

  }
 //#region Agent permission
export class Permission {
  Id: string = '';
  PermissionValue: string = '';
  ClaimValue: string = '';
}

export class AgentRole {
  Id: string = '';
  RoleName: string = '';
  ShowAllPermissions: boolean = false;
  Permission: Permission[] = [];
}
//#endregion


