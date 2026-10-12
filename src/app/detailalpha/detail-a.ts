import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Aservice } from '../core/services/A.service';


@Component({
  selector: 'app-detaila',
  standalone: false,
  templateUrl: './detaila.html',
  styleUrls: ['./detail-a.css']
})
export class DetailA implements OnInit {

  detail: any = {};
  permissions: any[] = [];
  selectedIds: string[] = [];

  constructor(
    private router: Router,
    private service: Aservice,
    private cdr: ChangeDetectorRef
       ) {}

  ngOnInit(): void {
    this.detail = history.state.data;

    if (!this.detail) {
      this.router.navigate(['/Lista']);
      return;
    }

    this.service.agentDetail(this.detail.Id).subscribe((res: any) => {
      this.detail = res.Result;
      this.cdr.detectChanges();
    });

    this.service.agentPermissionList().subscribe((res: any) => {
      this.permissions = res.Results || [];
      this.cdr.detectChanges();
    });
  }

  back(): void {
    this.router.navigate(['/Lista']);
  }
}