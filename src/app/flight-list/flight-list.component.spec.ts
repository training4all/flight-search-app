import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { IResponsePayload } from 'src/services/web-api/responsePayload';
import { FlightService } from 'src/services/flight/flight.service';
import * as _ from 'lodash';
import { FlightListComponent } from './flight-list.component';
import {
    MatTableModule
} from '@angular/material';

describe('FlightListComponent', () => {
    let flightService: FlightService;
    let translateService: TranslateService;
    let component: FlightListComponent;
    let fixture: ComponentFixture<FlightListComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatTableModule,
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ],
            declarations: [FlightListComponent],
            providers: [
                FlightService,
                TranslateService
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        mockInjections();
        fixture = TestBed.createComponent(FlightListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        // assert
        expect(component).toBeTruthy();
    });

    it('should get flights on load', () => {
        // assert
        expect(component.dataSource.data.length).toBe(2);
    });

    it('should update displayLoader and locale/culture on changes', () => {
        // arrange
        component.displayLoader = false;

        // act
        component.ngOnChanges({
            displayLoader: new SimpleChange(false, true, false),
            locale: new SimpleChange('en', 'de', false)
        });

        // assert
        expect(component.displayLoader).toBeTruthy();
        expect(translateService.setDefaultLang).toHaveBeenCalledWith('de');
    });

    it('should convert to lowercase', () => {
        // act
        component.applyFilter('ABC');

        // assert
        expect(component.dataSource.filter).toEqual('abc');
    });

    const mockInjections = () => {
        flightService = TestBed.get(FlightService);
        spyOn(flightService, 'get').and.returnValue(of(Flights));

        translateService = TestBed.get(TranslateService);
        spyOn(translateService, 'setDefaultLang');
    };
});


const translations: any = { logo: 'logo' };
class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return of(translations);
    }
}

const Flights: IResponsePayload[] = [{
    TotalAmount: 632.66,
    InboundFlightsDuration: '9:33',
    OutboundFlightsDuration: '9:33',
    AirlineName: 'China Southern Airlines',
    AirlineLogoAddress: 'http://nmflightapi.azurewebsites.net/Images/AirlineLogo/CZ.gif',
    DepartureAirportCode: 'SYD',
    ArrivalAirportCode: 'MEL',
    DepartureDate: '2020-11-28T00:00:00+11:00',
    ReturnDate: '2020-11-29T00:00:00+11:00'
},
{
    TotalAmount: 500,
    InboundFlightsDuration: '10.5',
    OutboundFlightsDuration: '10.5',
    AirlineName: 'Multi',
    AirlineLogoAddress: 'http://nmflightapi.azurewebsites.net/Images/AirlineLogo/MultiAirline.gif',
    DepartureAirportCode: 'SYD',
    ArrivalAirportCode: 'DEL',
    DepartureDate: '2020-01-28T00:00:00+11:00',
    ReturnDate: '2020-03-29T00:00:00+11:00'
}];
