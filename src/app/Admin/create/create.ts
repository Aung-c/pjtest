import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../Service/Admin.service';
import { CreateAdminUser, Option } from '../Model/admin.model';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class CreateComponent implements OnInit {

  form: CreateAdminUser = new CreateAdminUser();

  branches: Option[] = [];
  regions: Option[] = [];
  terminals: Option[] = [];
  roles: Option[] = [];

  constructor(
    private service: AdminService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    const token = this.service.accessToken;

     if (!token) {
       alert('Please login first');
       this.router.navigate(['/admin']);
       return;
     }
    this.dropdown();
  }

  dropdown(): void {

    this.service.branchList().subscribe({
      next: (res: any) => {
        this.branches = res?.Results ;
        
      }
    });

    this.service.regionOptions().subscribe({
      next: (res: any) => {
        this.regions = res?.Results;
      }
    });

    this.service.userRoleList().subscribe({
      next: (res: any) => {
        this.roles = res?.Results;
          console.log('FIRST ROLE =>', this.roles[0]);     
    console.log('ALL ROLES =>', this.roles);
    

      }
    });
  }

onBranchChange(): void {

    // if (!this.form.BranchId) {
      // this.terminals = [];
      // this.form.TerminalId = '';
      // return;
    // }

    this.service.terminalList(this.form.BranchId).subscribe({
      next: (res: any) => {
        this.terminals = res?.Results;
      },     
    });
  }
save(): void {
  if (
    !this.form.UserName ||
    !this.form.PhoneNumber ||
    !this.form.Email ||
    !this.form.RoleId ||
    !this.form.BranchId
  ) {
    alert('Please fill all required fields');
    return;                         
  }                                

  const payload = {
    UserName: this.form.UserName,
    PhoneNumber: this.form.PhoneNumber,
    Email: this.form.Email,
    DateOfBirth: this.form.DateOfBirth,
    BranchId: this.form.BranchId,
    RegionIds: this.form.RegionIds,
    RoleId: this.form.RoleId,
    Status: this.form.Status,
    TerminalId: this.form.TerminalId,
    Regions: [],
    InsID: '',
    CreatedDate: '',
  };

  console.log('Payload =>', payload);

  this.service.createUser(payload).subscribe({
    next: (res: any) => {
      console.log('CREATE RESPONSE:', res);

      if (res?.StatusCode === '000') {
        alert('Created Successfully');
        this.router.navigate(['/admin']);
      } else {
        alert('Failed: ' + (res?.Message ));
      }
    },
    error: (err) => {
      console.error('Create Error =>', err);
      alert(err?.error?.Message );
    }
  });
}                                  
  back(): void {
    this.router.navigate(['/admin']);
  }

  cancel(): void {
    this.form = new CreateAdminUser();
  }


 
}