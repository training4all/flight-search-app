import { MaxCharacterValidator } from './max-character-validator';
import { FormControl } from '@angular/forms';

describe('MaxCharacterValidator', () => {

    it('should create an instance', () => {
        // act
        const validator = new MaxCharacterValidator();

        // assert
        expect(validator).toBeTruthy();
    });

    it('should be invalid if has more than 3 alphanumeric characters', () => {
        // arrange
        const control = new FormControl('A@#$HDHDKS(*');

        // act
        const result = MaxCharacterValidator.Validate(control);

        // assert
        expect(result).toEqual({ invalid: true });
    });

    it('should return nothing if control has 3 valid alphanumeric characters', () => {
        // arrange
        const control = new FormControl('MEL');

        // act
        const result = MaxCharacterValidator.Validate(control);

        // assert
        expect(result).toBeUndefined();
    });
});
