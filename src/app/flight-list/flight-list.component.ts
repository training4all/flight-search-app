import { Component, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { IResponsePayload } from 'src/services/web-api/responsePayload';
import { FlightService } from 'src/services/flight/flight.service';
import * as _ from 'lodash';
import { Constants } from 'src/constants';

@Component({
    selector: 'app-flight-list',
    templateUrl: './flight-list.component.html',
    styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnDestroy, OnChanges {
    // tslint:disable-next-line:no-input-rename
    @Input('searchStarted') displayLoader: boolean;

    subscription: Subscription;

    public dataSource = new MatTableDataSource();
    public displayedColumns = Constants.displayedColumns;

    constructor(private flightService: FlightService, private translateService: TranslateService) {
        this.translateService.setDefaultLang(Constants.DefaultLocale);
        this.subscription = this.flightService.get().subscribe((data: IResponsePayload[]) => {
            this.dataSource.data = _.cloneDeep(data);
            this.displayLoader = false;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.displayLoader && !changes.displayLoader.isFirstChange()) {
            this.displayLoader = changes.displayLoader.currentValue;
        }

        if (changes.locale && !changes.locale.isFirstChange()) {
            this.translateService.setDefaultLang(changes.locale.currentValue);
        }
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
