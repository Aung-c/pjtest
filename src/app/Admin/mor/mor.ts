import { Component, OnInit, ChangeDetectorRef,  } from '@angular/core';
import { AdminService } from '../Service/Admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mor',
  standalone: false,
  templateUrl: './mor.html',
  styleUrls: ['./mor.css']
})
export class ModalComponent implements OnInit {

  form: any[] = [];
  showModal = false;

  constructor(
    private service: AdminService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
   
  modal(): void {
    this.showModal = true;
    this.listMod();
  }


  listMod(): void {

    const morPayload = {
      userName: '',
      email: '',
      phoneNumber: '',
      roleId: '',
      status: '',
      registerDateFrom: '',
      registerDateTo: '',
      page: '1',
      pageSize: '10'
    };

    this.service.adminList(morPayload).subscribe({
      next: (res: any) => {
        console.log('List respose:', res);

        if (res?.StatusCode === '000') {
          this.form = res?.Result?.AdminUserList  ;
        } 
         this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('List error', err);
      }
    });
  }

    
  goBack(): void {
    this.router.navigate(['/loginbelta']);
  } 

}