import { FormControl, Validators } from '@angular/forms';

export class DateValidator extends Validators {

    static Validate(fdValue: FormControl) {
        const date = fdValue.value;
        if (date === null || date === '') {
            return { invalid: true };
        }
    }
}
