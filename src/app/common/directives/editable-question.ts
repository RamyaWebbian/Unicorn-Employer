import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[editable-question]'
})
export class EditableQuestions {
    @HostBinding() type: string;

    constructor() {
        this.type = 'checkbox';
    }

    changeType(type: string): void {
        this.type = type;
    }
}
