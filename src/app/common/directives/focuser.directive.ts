import {Directive, Renderer, AfterViewInit, ElementRef} from '@angular/core';


@Directive({
    selector: '[setFocus]' // Attribute selector
})
export class FocuserDirective implements AfterViewInit {
    constructor(private renderer: Renderer, private elementRef: ElementRef) {
    }
    ngAfterViewInit() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement, 'focus', []
      );
  }
}
