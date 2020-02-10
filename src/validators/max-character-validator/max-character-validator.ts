import { FormControl, Validators } from '@angular/forms';

export class MaxCharacterValidator extends Validators {

    static Validate(control: FormControl) {
        const value = control.value;
        const isLetter: boolean = /^[0-9a-zA-Z]+$/.test(value);
        if (value && value.length !== 3 || !isLetter) {
            return { invalid: true };
        }
    }
}
