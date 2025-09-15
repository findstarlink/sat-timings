const predict = require('./sat-timings');

starlink2 = {
    "name": "starlink43",
    "title": "Starlink-G4-17",
    "tle": [
        "1 65457C 25194Z   25258.07409722 -.00932880  00000+0 -57146-2 0  2585",
        "2 65457  97.5989 109.4211 0001102  59.9789 268.1673 15.78257347    18"
    ],
    "stdMag": 5,
    "noradId": "65457",
    "tleUrl": "http://celestrak.com/NORAD/elements/supplemental/starlink.txt",
    "launchDate": "2025-09-03T03:51:26.000Z",
    "active": true
}

var lat = 51.5072;
var lng = -0.1276;

if (process.argv.length > 2) {
    lat = parseFloat(process.argv[2]);
    lng = parseFloat(process.argv[3]);
}

var coord = {
	latitude: lat,
	longitude: lng
};

const DAYS_COUNT = 5;

var res = predict.getVisibleTimes(starlink2, coord.latitude, coord.longitude, {daysCount: DAYS_COUNT, startDaysOffset: -1});

console.log(JSON.stringify(res, null, 2));
