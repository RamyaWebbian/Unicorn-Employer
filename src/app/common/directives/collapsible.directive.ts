import {Directive, ElementRef, Renderer} from '@angular/core';
declare var $: any;
@Directive({
  selector: '[Collapsible]'
})
export class CollapsibleDirective {

  constructor(private el: ElementRef, private renderer: Renderer) {
    this.el = el;

    $(this.el.nativeElement).each(function () {
      const a = $(this);
      a.removeClass('active');
      a.click(function () {
        $('.collapsible').each(function(){$(this).find('.collapsible-wrapper').slideUp(); $(this).removeClass('active');
        });
        $(this).nextAll('li').removeClass('active');
        $(this).prevAll('li').removeClass('active');
        const b = a.index() + 1, c = $('.collapsible:nth-child(' + b + ') '), d = c.find('.collapsible-wrapper');
        a.addClass('active');
        c.addClass('active');
        d.slideDown();
      });
    });
    $(this.el.nativeElement).each(function(){
      const ina =  $(this), a = ina.find('.collapsible-wrapper'), b = $(this).find('.collapasile-title');
      b.click(function(){
        $('.collapsibleb').each(function(){$(this).find('.collapsible-wrapper').slideUp();
        $(this).removeClass('active');
        });
        $('.left-sidebar .mdl-cell--3-col  li').each(function(){$(this).removeClass('active');
        });
        const c = ina.index() + 1, d = $('.left-sidebar .mdl-cell--3-col  li:nth-child(' + c + ')');
        d.addClass('active');
        ina.addClass('active');
        a.slideDown();
      });
    });

  }

}
