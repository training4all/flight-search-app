import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { IResponsePayload } from 'src/services/web-api/responsePayload';

@Injectable({
    providedIn: 'root'
})
export class FlightService {

    private subject = new Subject<IResponsePayload[]>();

    send(flights: IResponsePayload[]) {
        this.subject.next(flights);
    }

    get(): Observable<IResponsePayload[]> {
        return this.subject.asObservable();
    }
}
