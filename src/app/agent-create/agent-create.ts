import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AgentService } from '../core/services/agent.service';

@Component({
  selector: 'app-agent-create',
  standalone: false,
  templateUrl: './agent-create.html',
  styleUrls: ['./agent-create.css']
})
export class AgentCreateComponent implements OnInit {

  roleName = '';
  permissions: any[] = [];
  selectedIds: string[] = [];

  constructor(
    private router: Router,
    private service: AgentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.service.agentPermissionList().subscribe({
      next: (res: any) => {
        this.permissions = res.Results ;
        this.cdr.detectChanges();
      },
     
    });
  }


  save(): void {
    const payload = {
      RoleName: this.roleName,
      ClaimType: 'Permission',
      PermissionIds: this.selectedIds,
       HashValue: this.service.hashValue 
    };

    this.service.setUpAgentRole(payload).subscribe({
      next: () => {
        alert('Created!');
        this.router.navigate(['/agentlist']);
      },
      error: (err: any) => console.error('Create error:', err)
    });
  }

  back(): void {
    this.router.navigate(['/agentlist']);
  }
}