import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[show-hide-input]'
})
export class ShowHideInput {
    @HostBinding() type: any;

    constructor() {
        this.type = 'password';
    }
    changeType(type: any): void {
        this.type = type;
    }
}