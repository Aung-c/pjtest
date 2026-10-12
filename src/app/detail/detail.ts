import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getaccounttrans } from '../models/filter.model';

@Component({
  selector: 'app-detail',
  standalone:false,
  templateUrl: './detail.html',
  styleUrls: ['./detail.css']
})
export class DetailComponent implements OnInit {

  acctrans = new getaccounttrans();

  constructor(private router: Router) {}

  ngOnInit(): void { 
      this.acctrans = history.state.aata   
    console.log('Detail Data =>', this.acctrans);
  }

  goBack(): void {
    this.router.navigate(['/list']);

  }

}