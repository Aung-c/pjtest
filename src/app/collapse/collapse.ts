import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { collaService } from './service';
import { AdminUser } from '../Admin/Model/admin.model';

@Component({
  selector: 'app-collapse-data',
  standalone: false,
  templateUrl: './collapse.html',
  styleUrls: ['./collapse.css']
})
export class CollapseComponent implements OnInit {

  data: AdminUser[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  expandedId: string | null = null;

  constructor(private service: collaService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.login('mung.ha@payme.com.mm', '5p@8XOf42')
      .subscribe({
        next: (res: any) => {
          this.service.token = res?.Result?.AccessToken || '';
          console.log('Token =>', this.service.token)
          this.listData();
        },
        error: (err) => console.error('Login error =>', err)
      });
  }

  listData(): void {
    const datapayload = {
      userName: '',
      email: '',
      phoneNumber: '',
      status: '',
      registerDateFrom: '',
      registerDateTo: '',
      page: this.currentPage.toString(),
      pageSize: this.pageSize.toString(),
    };

    this.service.adminList(datapayload).subscribe({
      next: (res: any) => {
        console.log('List response:', res);
        this.data = res?.Result?.AdminUserList ?? [];
        this.totalItems = Number(res?.Result?.TotalItemCount);
        this.totalPages = Number(res?.Result?.LastPageNumber);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('List error', err);
      }
    });
  }

toggleUser(id: string): void {
  if (this.expandedId === id) {
    this.expandedId = null;     
  } else {
    this.expandedId = id;     
  }
}
changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.listData();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.listData();
    this.cdr.detectChanges();
  }

  arrive(): (number | string)[] {
    const pages: (number | string)[] = [];
    if (this.totalPages <= 1) return [1];

    pages.push(1);
    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    pages.push(this.totalPages);

    return pages;
  }


}
