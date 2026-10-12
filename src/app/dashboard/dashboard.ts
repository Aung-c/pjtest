import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  submittedData: any = null;

  constructor(private router: Router) {}

  receiveData(data: any): void {
    this.submittedData = data;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}