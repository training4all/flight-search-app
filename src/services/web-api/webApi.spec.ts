import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { WebApi } from './webApi';
import { IRequestPayload } from 'src/services/web-api/requestPayload';
import { IResponsePayload } from 'src/services/web-api/responsePayload';

describe('WebApi', () => {
    let httpMock: HttpTestingController;
    let service: WebApi;
    const URL = 'http://localhost:3000/flights';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WebApi]
        });

        service = TestBed.get(WebApi);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get flights if matching flights found', () => {
        // arrange
        let flights;
        service.getFlights(MockRequestWithMatchingFlight).subscribe(response => {
            flights = response;
        });

        // act
        const request = httpMock.expectOne(URL);
        request.flush(MockFlights);

        // assert
        expect(flights.length).toBe(1);
        expect(request.request.method).toBe('GET');
    });

    it('should get empty list if no matching flights found', () => {
        // arrange
        let flights;
        service.getFlights(MockRequestWithOutMatchingFlight).subscribe(response => {
            flights = response;
        });

        // act
        const request = httpMock.expectOne(URL);
        request.flush(MockFlights);

        // assert
        expect(flights.length).toBe(0);
        expect(request.request.method).toBe('GET');
    });

    const MockRequestWithMatchingFlight: IRequestPayload =  {
        DepartureAirportCode: 'SYD',
        ArrivalAirportCode: 'MEL',
        DepartureDate: '2020-11-28T00:00:00+11:00',
        ReturnDate: '2020-11-29T00:00:00+11:00'
    };

    const MockRequestWithOutMatchingFlight: IRequestPayload =  {
        DepartureAirportCode: 'IND',
        ArrivalAirportCode: 'MEL',
        DepartureDate: '2020-11-28T00:00:00+11:00',
        ReturnDate: '2020-11-29T00:00:00+11:00'
    };

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
