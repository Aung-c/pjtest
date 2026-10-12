
import { NomineeService } from '../core/services/nominee.serevice';
import { Component, OnInit } from '@angular/core';
import { Search } from '../models/filter.model';
import { ChangeDetectorRef } from '@angular/core';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-nominee',
  standalone: false,
  templateUrl: './nominee.html',
  styleUrls: ['./nominee.css']
})
export class NomineeComponent implements OnInit {

  find = new Search();
  
  headers = [
      'No.',
      'User Name',
      'NRC',
      'Pensioner Nrc',
      'DOB',
      'Mobile Number',
      'Relation',
      'Address',
      'CreatedDate'
        ];
  
  dataList: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(    private cobra: NomineeService,  private belta:ChangeDetectorRef){}
  

  ngOnInit() {
    this.loadData();} 

  loadData(): void { this.cobra.nomilist(
      this.currentPage,
        this.pageSize,
        this.find.beginDate,
        this.find.endDate,
      ).subscribe({
        next: (res: any) => {
          if (res.StatusCode === '000') {
            this.dataList =  res?.Result?.Nominees ;

            this.totalItems = Number(
                res?.Result?.TotalItemCount );
            this.totalPages = Number(res?.Result?.LastPageNumber );
            this.belta.detectChanges();

          }

        },

        error: (err) => {
          console.log(err);
        }

      });

  }

  search(): void {
    this.currentPage = 1;

    this.loadData();

  }

  reset(): void {

    this.find = new Search();  
    this.currentPage = 1;
    this.loadData();

  }

  onPageSizeChange(): void {

    this.currentPage = 1;

    this.loadData();
  }

  changePage(page: number): void {
    if ( page < 1 ||  page > this.totalPages
    ) {
      return;
    }

    this.currentPage = page;

    this.loadData();

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

