import {Directive, Input, EventEmitter, ElementRef, Renderer, Inject} from '@angular/core';

@Directive({
  selector: '[appFocusElement]'
})
export class FocusElementDirective {

  @Input('focus') focusEvent: EventEmitter<boolean>;

  constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer) {
  }

  ngOnInit() {
    this.focusEvent.subscribe(event => {
      this.renderer.invokeElementMethod(this.element.nativeElement, 'focus', []);
    });
  }



}
