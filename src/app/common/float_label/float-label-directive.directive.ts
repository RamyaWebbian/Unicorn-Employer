import {Directive, ElementRef, Host, HostBinding, Renderer, OnInit} from '@angular/core';

@Directive({
  selector: '[appFloatLabelDirective]',
  host: {
    '(focus)': 'onFocus($event.target)',
    '(blur)': 'onBlur($event.target)',
    '(focusout)': 'onFocusout($event.target)',
    '(keyup)': 'onKeyup($event.target)',
    '(ngModelChange)': 'onChang($event.target)'
  }
})
export class FloatLabelDirectiveDirective  implements OnInit {
  private defaultClass = 'blue';

  constructor(private el: ElementRef, private renderer: Renderer) {
    this.el = el;

    const currValue = this.el.nativeElement.value;
    if (currValue !== '') {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', true);
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', false);
    }
  }
  ngOnInit() {
    const currValue = this.el.nativeElement.value;
    if (currValue !== '') {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', true);
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', false);
    }

  }
  onFocusout() {
    const currValue = this.el.nativeElement.value;
    if (currValue !== '') {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', true);
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', false);
    }
  }
  onFocus() {
    const currValue = this.el.nativeElement.value;

    if (currValue === '') {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', true);
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', true);
    }
  }
  onBlur() {
    const currValue = this.el.nativeElement.value;
    if (currValue !== '') {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', true);
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', false);
    }
  }

  onKeyup() {
    const currValue = this.el.nativeElement.value;
    if (currValue !== '') {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', true);
    }
  }
  onChang() {
    const currValue = this.el.nativeElement.value;
    if (currValue !== '') {
      this.renderer.setElementClass(this.el.nativeElement, 'goUp', true);
    }
  }
}
