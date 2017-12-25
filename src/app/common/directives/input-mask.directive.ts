import {Directive, ElementRef, Host, HostBinding, Renderer} from '@angular/core';

@Directive({
  selector: '[appInputMask]',
  host: {
    '(input)': 'onKeyDown($event.target, false)',
   // '(focus)': 'onFocus($event.target)',
    // '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onKeyDown($event.target, true)'
  }

})
export class InputMaskDirective {
  private myModel = '';
  //private isBackspace:boolean = false;
  constructor(private el: ElementRef, private renderer: Renderer) {
    this.el = el;

  }
  onFocus() {
    console.log()
    //this.el.nativeElement.style.boxShadow = '10px 20px 30px blue';
  }
  onKeyDown(target, isBackspace) {
//console.log('isBackspace ',isBackspace)
let getLenght1 = this.el.nativeElement.value.length;
 if (isBackspace) {
      this.el.nativeElement.value = this.el.nativeElement.value.substring(0, getLenght1 - 1);
    return false;
    } 
    const getLenght = this.el.nativeElement.value.length;

    if (getLenght === 3 ) {
     // console.log('len3',this.el.nativeElement.value.length);
       if(!isBackspace){
      this.el.nativeElement.value = this.el.nativeElement.value + '-';
       }else{
    
       }
    } else if (getLenght === 7) {
      if(!isBackspace){
         this.el.nativeElement.value = this.el.nativeElement.value + '-';
      }else{

      }
     
    }
  }


 

}
