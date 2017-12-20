import {Directive, HostBinding, HostListener, Renderer, ElementRef} from '@angular/core';
declare var $: any;
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private el: ElementRef, private renderer: Renderer) {
    this.el = el;

    $(this.el.nativeElement).click(function (e) {
      e.stopPropagation();
     $(this).next().toggleClass('is-visible');
    });
    $(document).click(function () {
     $('.mdl-menu__container').removeClass('is-visible');
    });
  }

}
