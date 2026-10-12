import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DetailService } from '../core/services/detail.service';
import { Filter } from '../models/filter.model';
import { getaccounttrans } from '../models/filter.model';


//#component
@Component({
  selector: 'app-list',
  standalone:false,
  templateUrl: './list.html',
  styleUrls: ['./list.css']
})
export class listComponent implements OnInit {
  access= '';
  
  datalist : getaccounttrans[]= [];

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
 find = new Filter();

  headers =[
  'No.',
  'NRC',
  'Pensioner Name',
  'E-Pension Card No',
  'PPA No.',
  'Pension Group',
  'Pension Type',
  'Division',
  'Township',
  'Salary Pension',
  'Salary Gratuity Allowance',
  'Total Amount',
  'Payment Month',
  'Transaction Date Time',
  'Transaction Status',
  'Action',
  ]
 
  constructor(
    private service: DetailService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.login('mung.ha@payme.com.mm','5p@8XOf42').
    subscribe({
      next:(res:any)=>{
        this.access = res?.Result?.AccessToken || '';
        console.log('Token =>',this.access);
        this.loadData();
      },
      error:(err) =>{
        console.error ('Login ERROR=>', err);
      }
    });
  }

  loadData(): void {

    this.service.list(
      this.currentPage,
      this.pageSize,
      this.access,
    ).subscribe({
      next: (res: any) => {
         this.datalist = res?.Result?.AccountTransactions;
          this.totalItems = res?.Result?.TotalItemCount;
          this.totalPages = res?.Result?.LastPageNumber ;
          this.cdr.detectChanges();
        
      } 
    });
  }

  viewDetail(item:any): void {

    this.router.navigate
      (['/detail'], {
        state: {
          aata: item
        }
      });  

  }


  changePage(page: number): void {

    if (
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
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

    if (this.currentPage < this.totalPages - 1) {
      pages.push('...');
    }

    if (this.totalPages > 1) {
      pages.push(this.totalPages);
    }

    return pages;
  }
}