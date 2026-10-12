import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

     @Input() childData: any;
     @Output() buttonClickEvent = new EventEmitter();


  ngOnInit(): void {
    // Initialization logic runs when the component loads
  }

  button(){
     console.log('aaa')
     this.buttonClickEvent.emit();
  }
}