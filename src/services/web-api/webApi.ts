import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Constants } from 'src/constants';
import { IRequestPayload } from './requestPayload';
import { IResponsePayload } from './responsePayload';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class WebApi {

    constructor(private httpClient: HttpClient) { }

    public getFlights(request: IRequestPayload): Observable<IResponsePayload[]> {
        return this.httpClient.get<IResponsePayload[]>(Constants.Url)
            .pipe(
                map(response => this.mapRequest(response, request))
            );
    }

    private mapRequest = (response: any, request: IRequestPayload): IResponsePayload[] => {
        const filteredRequest = _.filter(response, (res) => {
            return res.DepartureAirportCode === request.DepartureAirportCode
                && res.ArrivalAirportCode === request.ArrivalAirportCode
                && res.DepartureDate === request.DepartureDate
                && res.ReturnDate === request.ReturnDate;

        });
        return filteredRequest.map((item) => {
            return {
                AirlineLogoAddress: item.AirlineLogoAddress,
                AirlineName: item.AirlineName,
                OutboundFlightsDuration: item.OutboundFlightsDuration,
                InboundFlightsDuration: item.InboundFlightsDuration,
                TotalAmount: item.TotalAmount
            };
        });
    }
}
