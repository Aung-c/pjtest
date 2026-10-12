import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CashService } from '../core/services/cash.service';
import { detail } from '../models/filter.model'; 

@Component({
  selector: 'app-cashdetail',
  standalone: false,
  templateUrl: './cashdetail.html',
  styleUrls: ['./cashdetail.css']
})
export class Cashdetail implements OnInit {

  detailData= new detail();
  // ddetailData = new detail();

  constructor(private service: CashService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = history.state.id;
    const token = history.state.token;   
    this.loadDetail(id, token);
  }

  loadDetail(id: string, token: string): void {

    this.service.cashDetail(id, token).subscribe({
      next: (res: any) => {
        console.log('Detail response =>', res);
        this.detailData = res?.Result;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Detail error =>', err);
      }
    });
  }
}