const predict = require('./sat-timings');

async function test() {
    console.log("Fetching satellite data...");
    let sats = await fetch('https://data.findstarlink.com/tle.json')
    sats = await sats.json();
    sats = sats.satellites;

    // Use a specific satellite for testing
    const sat = sats[0]
    console.log("Using satellite:", sat.name);

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

    var res = predict.getVisibleTimes(sat, coord.latitude, coord.longitude, {daysCount: DAYS_COUNT, startDaysOffset: -1});

    console.log(JSON.stringify(res, null, 2));

    if (res.timings === undefined) {
        throw new Error("No timings generated!");
    }
}

test()
