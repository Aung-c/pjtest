import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../Service/Admin.service';
import { AdminUser } from '../Model/admin.model';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminListComponent implements OnInit {

  adminUsers: AdminUser[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  headers = [
    'No.',
    'User Name',
    'Date of Birth',
    'Phone',
    'Email',
    'Role',
    'Registered'
  ];
  constructor(
    private service: AdminService,
    private router: Router,
    private cdr: ChangeDetectorRef ){}

  ngOnInit(): void {
    this.loadData();        
  }


loadData(): void {
  this.service.adminList({
    userName: '',
    email: '',
    phoneNumber: '',
    roleId: '',
    status: '',
    registerDateFrom: '',
    registerDateTo: '',
    page: this.currentPage.toString(),
    pageSize: this.pageSize.toString(),
  }).subscribe({
    next: (res: any) => {
      this.adminUsers = res?.Result?.AdminUserList ?? [];
      this.totalItems = Number(res?.Result?.TotalItemCount ?? 0);
      this.totalPages = Number(res?.Result?.LastPageNumber ?? 0);

      this.cdr.detectChanges();
    },
    error: (err) => console.error('List error', err)
  });
}

  create(): void {
    this.router.navigate(['/create']);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.loadData();
    this.cdr.detectChanges();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadData();
    
  }

  arrive(): (number | string)[] {
    const pages: (number | string)[] = [];
    if (this.totalPages <= 1) return [1];

    pages.push(1);
    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (this.currentPage < this.totalPages - 1) pages.push('...');
    pages.push(this.totalPages);

    return pages;
  }
}