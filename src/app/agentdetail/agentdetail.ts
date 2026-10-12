import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../core/services/agent.service';

@Component({
  selector: 'app-agent-detail',
  standalone: false,
  templateUrl: './agentdetail.html',
  styleUrls: ['./agentdetail.css']
})
export class AgentDetailComponent implements OnInit {

  detailData: any = {};
  permissions: any[] = [];
  selectedIds: string[] = [];

  constructor(
    private router: Router,
    private service: AgentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const id = history.state.dta?.Id;
    
    this.service.agentDetail(id).subscribe((res: any) => {
      this.detailData = res.Result;
      this.selectedIds = (this.detailData.Permission).map(( a: any) => a.Id);
      console.log('SelID', this.selectedIds )
      this.cdr.detectChanges();
    });
  
    this.service.agentPermissionList().subscribe((res: any) => {
      this.permissions = res.Results;
      // this.cdr.detectChanges();
    });
  }

  toggle(id: string): void {
    if (this.selectedIds.includes(id)) {
      this.selectedIds = this.selectedIds.filter( a => a !== id);
    } else {
      this.selectedIds.push(id);
    }
    // this.cdr.detectChanges();
  }

  save(): void {
    const payload: any = {
      Id: this.detailData.Id,
      RoleName: this.detailData.RoleName,
      ClaimType: 'Permission',
      PermissionIds: this.selectedIds,
      HashValue: this.service.hashValue
    };

    console.log('payload:', payload);

    this.service.setUpAgentRole(payload).subscribe({
      next: (res: any) => {
        console.log('Save response:', res);
        alert('Saved!');
        this.router.navigate(['/agentlist']);
      },
      error: (err: any) => console.error('Save error:', err)
    });
  }

  back(): void {
    this.router.navigate(['/agentlist']);
  }
}