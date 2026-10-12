import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalService } from '../service';
import { CreateAdminUser } from '../modalfilter';

@Component({
  selector: 'app-list-data',
  standalone: false,
  templateUrl: './modallist.html',
  styleUrls: ['./modallist.css']
})
export class ListData implements OnInit {

  data: any[] = [];
  form: CreateAdminUser = new CreateAdminUser();

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  terminalLoading = false;

  headers = [
    'No.',
    'User Name',
    'Date of Birth',
    'Phone',
    'Email',
    'Role',
    'Registered',
    'Details',
  ];

  showCreateModal = false;

  showDetailsModal = false;
  selectedUser: any = null;

  roles: any[] = [];
  branches: any[] = [];
  terminals: any[] = [];
  regions: any[] = [];

  constructor(
    private modalService: ModalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listData();
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

    this.modalService.adminList(datapayload).subscribe({
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

  openCreateModal(): void {
    this.showCreateModal = true;
    this.loadDropdowns();
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.form = new CreateAdminUser();
    this.terminals = [];
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeCreateModal();
    }
  }

  openDetailsModal(user: any): void {
    this.selectedUser = user;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedUser = '';
  }

  onDetailsBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeDetailsModal();
    }
  }

  loadDropdowns(): void {
    this.modalService.branchList().subscribe({
      next: (res: any) => this.branches = res?.Results ?? [],
      error: (err) => console.error('Branches error', err)
    });

    this.modalService.regionOptions().subscribe({
      next: (res: any) => this.regions = res?.Results ?? [],
      error: (err) => console.error('Regions error', err)
    });

    this.modalService.userRoleList().subscribe({
      next: (res: any) => this.roles = res?.Results ?? [],
      error: (err) => console.error('Roles error', err)
    });
  }

  onBranchChange(): void {
    this.terminalLoading = true;
    this.modalService.terminalList(this.form.BranchId).subscribe({
      next: (res: any) => {
        this.terminals = res?.Results ?? [];
        this.terminalLoading = false;
      },
      error: (err) => {
        console.error('Terminals error', err);
        this.terminals = [];
      }
    });
  }

  usercreate(): void {
    if (
      !this.form.UserName ||
      !this.form.PhoneNumber ||
      !this.form.Email ||
      !this.form.RoleId ||
      !this.form.BranchId
    ) {
      alert('Please fill all required fields');
      return;
    }

    const createpayload = {
      UserName: this.form.UserName,
      PhoneNumber: this.form.PhoneNumber,
      Email: this.form.Email,
      DateOfBirth: this.form.DateOfBirth || null,
      BranchId: this.form.BranchId,
      RegionIds: this.form.RegionIds,
      RoleId: this.form.RoleId,
      Status: this.form.Status,
      TerminalId: this.form.TerminalId,
      Regions: [],
      InsID: '',
      CreatedDate: '',
    };

    console.log('user c payload =>', createpayload);

    this.modalService.createUser(createpayload).subscribe({
      next: (res: any) => {
        console.log('Create user response:', res);

        if (res?.StatusCode === '000') {
          alert('Created Successfully');
          this.closeCreateModal();
          this.listData();
        } else {
          alert('Failed: ' + (res?.Message));
        }
      },
      error: (err) => {
        console.error('Create user error:', err);
        alert(err?.error?.Message || 'Create failed');
      }
    });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.listData();
    this.cdr.detectChanges();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.listData();
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