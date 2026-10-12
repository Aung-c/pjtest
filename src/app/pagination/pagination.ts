import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../core/services/pagination.service';
import { ChangeDetectorRef } from '@angular/core';
import { Filter } from '../models/filter.model';
import { Router } from '@angular/router';
  
@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
    })
  
   
export class PaginationComponent implements OnInit {

  dataList: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  tempFilter  = new Filter();

  constructor(private paginationService: PaginationService, private router: Router,
     private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData();
   }

  loadData(): void {
    this.paginationService.paginate(this.currentPage, this.pageSize,
      this.tempFilter).subscribe({
      next: (res: any) => {
        if(res.StatusCode === '000' ){        this.dataList = res?.Result?.AccountTransactions || [];
        // this.dataList = [...this.originalList];
        this.totalItems = Number(res?.Result?.TotalItemCount );
        this.totalPages = Number(res?.Result?.LastPageNumber );
        this.cdr.detectChanges();
      }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

   changePage(page: number): void {
    this.currentPage = page;
    this.loadData();

    
  } 

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadData();
  }

search(): void {
  this.tempFilter.NRC = this.tempFilter.NRC?.trim() ;
  this.tempFilter.PPANo = this.tempFilter.PPANo?.trim() ;
  this.tempFilter.PensionType = this.tempFilter.PensionType?.trim();
  this.currentPage = 1;

  this.loadData();
}

 delete(): void {
  // this.filter = {   NRC: '',   PensionGroup: '', PensionType: '',};
  this.tempFilter = new Filter();
  this.currentPage = 1;
  this.pageSize = 25;
  this.loadData();
}

   nomi(): void {
  console.log('Nominee button clicked');

  this.router.navigate(['/nominee']);
    }

 

  arrive(): (any)[] {
    const pages: (any)[] = [];

    pages.push  (1);  

    let start = Math.max(2, this.currentPage - 1);
    let end = Math.min(this.totalPages - 1, this.currentPage + 1);

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

