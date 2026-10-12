import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../core/services/agent.service';
import { AgentRole } from '../models/filter.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agentlist',
  standalone: false,
  templateUrl: './agentlist.html',
  styleUrls: ['./agentlist.css']
})
export class AgentListComponent implements OnInit {


roles: AgentRole[] = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  headers = ['No.', 'Role Name', 'Permissions', 'Action'];

  constructor(
    private service: AgentService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // if (!this.service.accessToken) {
    //   this.router.navigate(['/login']);
    //   return;
    // }
    this.loadData();
  }

  loadData(): void {
    this.service.agentList( '',
      this.currentPage.toString(),
      this.pageSize.toString()
    ).subscribe({
      next: (res: any) => {
        this.roles = res?.Result?.AgentRoles;
        this.totalItems = res?.Result?.TotalItemCount;
        this.totalPages = res?.Result?.LastPageNumber;
        this.cdr.detectChanges();
      }
    });
  }

  create(): void {
    this.router.navigate(['/agentcreate']);
  }

  onEdit(role: AgentRole): void {
    this.router.navigate(['/agentdetail'], {
      state: { dta: role }
    });
  }

  onDelete(role: AgentRole): void {
    Swal.fire({ 
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning' ,
      showCancelButton: true,
      showConfirmButton:true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      console.log('result' ,result)
      if (result.isConfirmed) {

        this.service.deleteAgentRole(role.Id).subscribe({
          next: (res: any) => {
            console.log('Delete response:', res);
            Swal.fire('Deleted!', 'Role has been deleted.');
           this.loadData();
            this.cdr.detectChanges();

          },
          error: (err: any) => {
            console.error('Delete error:', err);
            Swal.fire('Error!', 'Delete failed.', 'error');
          }
          
        });

      }
    });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.loadData();
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