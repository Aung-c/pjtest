import { Component, OnInit } from '@angular/core';
import { CombineService } from '../core/services/combine.service';
import { Search } from '../models/filter.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-combine',
  standalone:false,
  templateUrl: './combine.html',
  styleUrls: ['./combine.css']
})
export class CombineComponent implements OnInit {

  accses = '';

  dataList: any[] = [];

  headers = [
    'No.',
    'Name',
    'NRC',
    'Pensioner NRC',
    'Date of Birth',
    'Mobile Number',
    'Relation',
    'Address',
    'Created Date'
  ];

  find = new Search();

  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalItems = 0;

  constructor(
    private combineService: CombineService,
    private brave: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
  this.combineService.login('mung.ha@payme.com.mm', '5p@8XOf42')
    .subscribe({
      next: (res: any) => {
        this.accses = res?.Result?.AccessToken || '';
        console.log('Token =>', this.accses);
        this.loadNomineeList(); 
      },
      error: (err) => {
        console.error('Login error =>', err);
      }
    });
}

 loadNomineeList(): void {
  this.combineService.getNomineeList(
      this.currentPage,
      this.pageSize,
      this.find.beginDate,
      this.find.endDate,
      this.accses,
    )
    .subscribe({
      next: (res: any) => {
        this.dataList = res?.Result?.Nominees;

        this.totalItems =(res.Result?.TotalItemCount);

        this.totalPages =(res.Result?.LastPageNumber);
          console.log(this.dataList)

        this.brave.detectChanges();
      },
      error:(err) => {
        console.error('Nom Erroe=>',err )
      }
    });

}

  search(): void {
    this.currentPage = 1;
    this.loadNomineeList();
  }

  reset(): void {

    this.find = new Search();

    this.currentPage = 1;

    this.loadNomineeList();
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

    this.loadNomineeList();
  }

  onPageSizeChange(): void {

    this.currentPage = 1;

    this.loadNomineeList();
  }

  arrive(): (number | string)[] {

    const result: (number | string)[] = [];

    if (this.totalPages <= 1) {
      return [1];
    }

    result.push(1);

    for (
      let i = Math.max(2, this.currentPage - 1);
      i <= Math.min(this.totalPages - 1, this.currentPage + 1);
      i++
    ) {
      result.push(i);
    }

    if (this.currentPage < this.totalPages - 1) {
      result.push('...');
    }

    result.push(this.totalPages);

    return result;
  }
}