import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { cashlist1 } from '../models/filter.model';
import { CashService } from '../core/services/cash.service';

@Component({
  selector: 'app-cashlist',
  standalone: false,
  templateUrl: './cashlist.html',
  styleUrls: ['./cashlist.css']
})
export class Cashlist implements OnInit {

  dataList: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  lastpagenumber = '';
  accessToken = '';                       

  //  dataList = new cashlist1();

  headers = [
    'NO.',
    'User Name',
    'Branch Name',
    'Terminal Name',
    'Opening Balance',
    'Remaining Balance',
    'Request Date Time',
    'Status',
    'Action'
  ];

  constructor(
    private service: CashService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.login('mung.ha@payme.com.mm', '5p@8XOf42')
      .subscribe({
        next: (res: any) => {
          this.accessToken = res?.Result?.AccessToken || '';
          console.log('Token =>', this.accessToken);
         
          this.loadData();
        },
        error: (err) => console.error('Login error =>', err)
      });
  }

  loadData(): void {
    this.service.cashList(
      this.currentPage,
      this.pageSize.toString(),     
      this.accessToken               
    )
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataList = res?.Result?.CashRequests;
        this.lastpagenumber = String (res?.Result?.LastPageNumber) ;
        this.totalPages =Number( res?.Result?.TotalPages || this.lastpagenumber ) ;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

detail(item: any): void {
  this.router.navigate(['/cashdetail'], {
    state: {
     id: item.Id,
      token: this.accessToken
    }
  });
}

  changePage(page: number): void {
  if (page < 1 || page > this.totalPages || page === this.currentPage) {
    return;
  }
  this.currentPage = page;
  this.loadData();
}

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadData();
  }

  arrive(): (number | string)[] {

    const pages: (number | string)[] = [];

    pages.push(1);

    const start =
      Math.max(2, this.currentPage - 1);

    const end =
      Math.min(
        this.totalPages - 1,
        this.currentPage + 1
      );

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

  

    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }

    return pages;
  }
}