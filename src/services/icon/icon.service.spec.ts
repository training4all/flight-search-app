import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { IconService } from './icon.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

describe('IconService', () => {
    let service;
    let iconRegistry: MatIconRegistry;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule
            ],
            providers: [
                MatIconRegistry,
                {
                    provide: DomSanitizer,
                    useValue: {
                        sanitize: () => 'safeString',
                        bypassSecurityTrustResourceUrl: () => 'safeString'
                    }
                }
            ]
        });

        iconRegistry = TestBed.get(MatIconRegistry);
        spyOn(iconRegistry, 'addSvgIcon');

        service = TestBed.get(IconService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should register icon if there is a defined iconMapper', () => {
        // act
        service.register(['flight']);

        // assert
        expect(iconRegistry.addSvgIcon).toHaveBeenCalled();
    });

    it('should not register icon if there is no defined iconMapper', () => {
        // act
        service.register(['flight_invalid']);

        // assert
        expect(iconRegistry.addSvgIcon).not.toHaveBeenCalled();
    });
});
