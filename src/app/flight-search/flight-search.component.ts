import { Component, OnDestroy, EventEmitter, Output, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IResponsePayload } from 'src/services/web-api/responsePayload';
import { IRequestPayload } from 'src/services/web-api/requestPayload';
import { IconService } from 'src/services/icon/icon.service';
import { FlightService } from 'src/services/flight/flight.service';
import { WebApi } from 'src/services/web-api/webApi';
import { MaxCharacterValidator } from 'src/validators/max-character-validator/max-character-validator';
import { DateValidator } from 'src/validators/date-validator/date-validator';
import { Constants } from 'src/constants';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldDefaultOptions
} from '@angular/material';

// set default form field appearance as fill for this component
const appearance: MatFormFieldDefaultOptions = {
    appearance: 'outline'
};

@Component({
    selector: 'app-flight-search',
    templateUrl: './flight-search.component.html',
    styleUrls: [
        './flight-search.component.css'
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: appearance
        }
    ]
})
export class FlightSearchComponent implements OnInit, OnDestroy, OnChanges {
    @Output() searchClicked = new EventEmitter<boolean>();
    FlightForm: FormGroup;
    subscription: Subscription;

    minDate = new Date();
    // dateValidationError = true;
    icons = ['flight_takeoff', 'flight_land', 'search'];

    constructor(
        private iconService: IconService,
        private flightService: FlightService,
        private webApi: WebApi,
        private formBuilder: FormBuilder,
        private translateService: TranslateService,
        private toastrService: ToastrService
    ) {
        this.translateService.setDefaultLang(Constants.DefaultLocale);
        this.iconService.register(this.icons);
    }

    ngOnInit() {
        this.createForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.locale && !changes.locale.isFirstChange()) {
            this.translateService.setDefaultLang(changes.locale.currentValue);
        }
    }

    public search() {
        if (this.FlightForm.invalid) {
            this.toastrService.error('please correct all errors', 'Error', {
                timeOut: 3000
            });
            return;
        }

        this.searchClicked.emit(true);

        const requestPayload = this.createRequestPayload();
        this.subscription = this.webApi.getFlights(requestPayload).subscribe(
            (flights: IResponsePayload[]) => this.onNext(flights),
            (errorMessage: string) => this.onError(errorMessage)
        );
    }

    onNext = (flights: IResponsePayload[]): void => {
        this.flightService.send(flights);
        this.searchClicked.emit(false);

        if (flights.length > 0) {
            this.toastrService.success('Records retrieved successfully', 'Success', {
                timeOut: 3000
            });
        } else {
            this.toastrService.success('No Records Found', 'Success', {
                timeOut: 3000
            });
        }
    }

    onError = (errorMessage: string): void => {
        this.searchClicked.emit(false);
        this.toastrService.error(errorMessage, 'Error', {
            timeOut: 3000
        });
    }

    createForm = () => {
        this.FlightForm = this.formBuilder.group({
            DepartureCode: ['MEl', [MaxCharacterValidator.Validate]],
            ArrivalCode: ['LHR', [MaxCharacterValidator.Validate]],
            DepartureDate: ['2020-01-29T00:00:00+11:00', [DateValidator.Validate]],
            ReturnDate: ['2020-02-20T00:00:00+11:00', [DateValidator.Validate]]
        }, { validator: [] });
    }

    transformDate = (dateValue: string): string => {
        return new DatePipe('en-us').transform(dateValue, 'yyyy-MM-ddT00:00:00ZZZZZ');
    }

    createRequestPayload = (): IRequestPayload => {
        const controls = this.FlightForm.controls;
        return {
            DepartureAirportCode: controls.DepartureCode.value,
            ArrivalAirportCode: controls.ArrivalCode.value,
            DepartureDate: this.transformDate(controls.DepartureDate.value),
            ReturnDate: this.transformDate(controls.ReturnDate.value)
        };
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
