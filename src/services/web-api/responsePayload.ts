export interface IResponsePayload {
    AirlineLogoAddress: string;
    AirlineName: string;
    OutboundFlightsDuration: string;
    InboundFlightsDuration: string;
    TotalAmount: number;
    DepartureAirportCode?: string;
    ArrivalAirportCode?: string;
    DepartureDate?: string;
    ReturnDate?: string;
}
