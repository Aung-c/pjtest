import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AgentRole } from '../models/filter.model';
import { Aservice } from '../core/services/A.service';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './listalpha.html',
  styleUrls: ['./list-a.css']
})
export class ListA implements OnInit {

  roles: AgentRole[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  headers = ['No.', 'Role Name', 'Permissions', 'Action'];

  constructor(
    private service: Aservice,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
       this.loadData();
  }

  loadData(): void {
    this.service.agentList('', this.currentPage.toString(), 
    this.pageSize.toString())
      .subscribe({
        next: (res: any) => {
          this.roles = res?.Result?.AgentRoles || [];
          this.totalItems = res?.Result?.TotalItemCount;
          this.totalPages = res?.Result?.LastPageNumber;
          this.cdr.detectChanges();
        }
      });
  }
  
   

  onDetail(role: AgentRole): void {
    this.router.navigate(['/detaila'], 
      { state: { data: role } });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages 
      || page === this.currentPage) return;
    this.currentPage = page;
    this.loadData();
    this.cdr.detectChanges()
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadData();

  }

  arrive(): (number | string)[] {
    const pages: (number | string)[] = [1];
    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (this.currentPage < this.totalPages - 1) pages.push('...');
    if (this.totalPages > 1) pages.push(this.totalPages);
    return pages;
  }
}