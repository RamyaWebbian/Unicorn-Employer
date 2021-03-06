import { Component, OnInit, Input, Output, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.css'],
  
})
export class HelpModalComponent implements OnInit {

  // @Output() closeSection =  new EventEmitter();
  @Output() closeSection: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()
  visible: boolean = true;
  @Input() content:string;

public isBusiness:boolean;
  public vis:boolean;
  public hideHelp : boolean;

  constructor() { }

  ngOnInit() {
    //alert('help modal')
   // this.hideHelp = true;
   // console.log(this.visible)
   // this.vis = this.visible;
   if(this.content == 'busi') {
//alert('busiiiiiiiiiiiii');
  this.isBusiness = true;
   }else{
 this.isBusiness = false;
   }
  }
  
  closeHelp() {
  this.visible = false;
  this.closeSection.emit(this.visible);
   
  }

}
