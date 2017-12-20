import {Directive, ElementRef, Host, HostBinding, Renderer} from '@angular/core';

@Directive({
  selector: '[appInputMask]',
  host: {
    '(keydown)': 'onKeyDown($event.target)',
    '(focus)': 'onFocus($event.target)'
  }
})
export class InputMaskDirective {
  private myModel = '';
  constructor(private el: ElementRef, private renderer: Renderer) {
    this.el = el;

  }
  onFocus() {
    this.el.nativeElement.getElementById('inner-editor').style.boxShadow = '10px 20px 30px blue';
  }
  onKeyDown() {
    const getLenght = this.el.nativeElement.value.length;

    if (getLenght === 3 ) {
      console.log(this.el.nativeElement.value.length);
      this.el.nativeElement.value = this.el.nativeElement.value + '-';
    } else if (getLenght === 7) {
      console.log(this.el.nativeElement.value.length);
      this.el.nativeElement.value = this.el.nativeElement.value + '-';
    }
  }

}
