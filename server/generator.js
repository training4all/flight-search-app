var faker = require('faker');
// import { mockAirportRequestData, mockAirlines } from 'server/mockData';

var database = { flights: [] };


var mockAirportRequestData = [
    {
        DepartureAirportCode: 'MEl',
        ArrivalAirportCode: 'LHR',
        DepartureDate: '2020-01-29T00:00:00+11:00',
        ReturnDate: '2020-02-20T00:00:00+11:00'
    },
    {
        DepartureAirportCode: 'SYD',
        ArrivalAirportCode: 'DEL',
        DepartureDate: '2020-11-25T00:00:00+11:00',
        ReturnDate: '2020-11-26T00:00:00+11:00'
    },
    {
        DepartureAirportCode: 'SYD',
        ArrivalAirportCode: 'MEL',
        DepartureDate: '2020-11-28T00:00:00+11:00',
        ReturnDate: '2020-11-29T00:00:00+11:00'
    }
];

var mockAirlines = [
    {
        AirlineName: 'China Southern Airlines',
        logo: 'http://nmflightapi.azurewebsites.net/Images/AirlineLogo/CZ.gif'
    },
    {
        AirlineName: 'Emirates Airline',
        logo: 'http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif'
    },
    {
        AirlineName: 'Multi',
        logo: 'http://nmflightapi.azurewebsites.net/Images/AirlineLogo/MultiAirline.gif'
    }
];

var getRandomAirline = function() {
    return mockAirlines[Math.floor(Math.random() * mockAirlines.length)];
};

var getRandomAirport = function() {
    return mockAirportRequestData[Math.floor(Math.random() * mockAirportRequestData.length)];
};

var generateData = function() {
    for (var i = 1; i <= 300; i++) {
        var dt = new Date();
        var mockAirline = getRandomAirline();
        var mockAirport = getRandomAirport();

        database.flights.push({
            ItineraryId: faker.random.uuid(),
            Stops: faker.random.number().toString().charAt(0),
            TotalAmount: faker.finance.amount(),
            InboundFlightsDuration: dt.getHours() + ':' + dt.getMinutes(),
            OutboundFlightsDuration: dt.getHours() + ':' + dt.getMinutes(),
            AirlineName: mockAirline.AirlineName,
            AirlineLogoAddress: mockAirline.logo,
            DepartureAirportCode: mockAirport.DepartureAirportCode,
            ArrivalAirportCode: mockAirport.ArrivalAirportCode,
            DepartureDate: mockAirport.DepartureDate,
            ReturnDate: mockAirport.ReturnDate,
        });
    }

    console.log(JSON.stringify(database));
};

generateData();
