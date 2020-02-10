import { DateValidator } from './date-validator';
import { FormControl } from '@angular/forms';

describe('DateValidator', () => {
    it('should create an instance', () => {
        // act
        const validator = new DateValidator();

        // assert
        expect(validator).toBeTruthy();
    });

    it('should be invalid if has invalid date', () => {
        // arrange
        const control = new FormControl(null);

        // act
        const result = DateValidator.Validate(control);

        // assert
        expect(result).toEqual({ invalid: true });
    });
});
