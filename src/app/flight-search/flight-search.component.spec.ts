import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightSearchComponent } from './flight-search.component';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IResponsePayload } from 'src/services/web-api/responsePayload';
import { IconService } from 'src/services/icon/icon.service';
import { FlightService } from 'src/services/flight/flight.service';
import { WebApi } from 'src/services/web-api/webApi';
import { of, Observable } from 'rxjs';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldDefaultOptions
} from '@angular/material';
import {
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';

describe('FlightSearchComponent', () => {
    let iconService: IconService;
    let flightService: FlightService;
    let webApi: WebApi;
    let formBuilder: FormBuilder;
    let translateService: TranslateService;
    let toastrService: ToastrService;
    let component: FlightSearchComponent;
    let fixture: ComponentFixture<FlightSearchComponent>;
    const appearance: MatFormFieldDefaultOptions = {
        appearance: 'outline'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatInputModule,
                BrowserAnimationsModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatIconModule,
                MatNativeDateModule,
                MatDatepickerModule,
                ToastrModule.forRoot(),
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ],
            declarations: [FlightSearchComponent],
            providers: [
                IconService,
                FlightService,
                WebApi,
                FormBuilder,
                TranslateService,
                ToastrService,
                {
                    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
                    useValue: appearance
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        mockInjections();
        fixture = TestBed.createComponent(FlightSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should instantiate', () => {
        expect(component).toBeDefined();
    });

    it('should show error toast if form data is invalid on search', () => {
        // arrange
        component.FlightForm.setErrors({invalid: true});

        // act
        component.search();

        // assert
        expect(toastrService.error).toHaveBeenCalled();
    });

    it('should show success toast on receiving flight data', () => {
        // act
        component.search();

        // assert
        expect(toastrService.success).toHaveBeenCalled();
        expect(flightService.send).toHaveBeenCalledWith(Flights);
    });

    const mockInjections = () => {
        iconService = TestBed.get(IconService);
        spyOn(iconService, 'register').and.returnValue(null);

        flightService = TestBed.get(FlightService);
        spyOn(flightService, 'send').and.returnValue(null);

        webApi = TestBed.get(WebApi);
        spyOn(webApi, 'getFlights').and.returnValue(of(Flights));

        formBuilder = TestBed.get(FormBuilder);
        spyOn(formBuilder, 'group').and.returnValue(MockFormgroup);

        translateService = TestBed.get(TranslateService);
        spyOn(translateService, 'setDefaultLang').and.returnValue(null);

        toastrService = TestBed.get(ToastrService);
        spyOn(toastrService, 'success');
        spyOn(toastrService, 'error');
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

const MockFormgroup: FormGroup = new FormGroup({
    DepartureCode: new FormControl('MEl'),
    ArrivalCode: new FormControl('LHR'),
    DepartureDate: new FormControl('2020-01-29T00:00:00+11:00'),
    ReturnDate: new FormControl('2020-02-20T00:00:00+11:00')
});
