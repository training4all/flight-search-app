import { TestBed } from '@angular/core/testing';
import { FlightService as FlightService } from './flight.service';
import { IResponsePayload } from 'src/services/web-api/responsePayload';

describe('FlightService', () => {
    let service: FlightService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(FlightService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get list of Flights if subject has data', () => {
        // arrange
        let flights: IResponsePayload[];

        // act
        service.get().subscribe((response) => {
            flights = response;
        });
        service.send(MockFlights);

        // assert
        expect(flights).toEqual(MockFlights);

    });

    it('should get have Flights as undefind when subject next is never invoked', () => {
        // arrange
        let flights: IResponsePayload[];

        // act
        service.get().subscribe((response) => {
            flights = response;
        });

        // assert
        expect(flights).toBeUndefined();

    });

    const MockFlights: IResponsePayload[] = [{
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

});
