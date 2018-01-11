import {Directive, HostBinding} from '@angular/core';

@Directive({ selector: '[show-hide-cnf]'
})
export class ShowHideCnf {
    @HostBinding() type: string;

    constructor() {
        this.type = 'password';
    }
    changeType(type: string): void {
        this.type = type;
    }
}
