# sat-timings

Javascript library for predicting the visibility timings and path of satellites (e.g., Starlink) for a given location and time.

This library powers [findstarlink.com](https://findstarlink.com) and has served millions of satellite visibility predictions over the past 6 years.

## Installation

```sh
npm install sat-timings
```

## Usage

Require the library in your Node.js project:

```js
const predict = require('sat-timings');
```

### Example: Get Visible Times

```js
const predict = require('sat-timings');

// Example satellite object (from OMM JSON data)
const sat = {
	name: "starlink-1000",
	title: "Starlink-1000",
	omm: {
		OBJECT_NAME: "STARLINK-1000",
		OBJECT_ID: "2019-074A",
		EPOCH: "2026-05-11T01:54:42.000019",
		MEAN_MOTION: 15.46630629,
		ECCENTRICITY: 0.0001583,
		INCLINATION: 53.1537,
		RA_OF_ASC_NODE: 245.8068,
		ARG_OF_PERICENTER: 17.3194,
		MEAN_ANOMALY: 111.7477,
		EPHEMERIS_TYPE: 0,
		CLASSIFICATION_TYPE: "C",
		NORAD_CAT_ID: 44713,
		ELEMENT_SET_NO: 131,
		REV_AT_EPOCH: 1,
		BSTAR: 0.00022517,
		MEAN_MOTION_DOT: 0.00011433,
		MEAN_MOTION_DDOT: 0
	},
	stdMag: 5,
	launchDate: "2020-04-22"
};

const latitude = 51.5072; // London
const longitude = -0.1276;

const result = predict.getVisibleTimes(sat, latitude, longitude, { daysCount: 5, startDaysOffset: -1 });
console.log(result);
```

#### Output
The result is an object with fields like:

```json
{
	"currentLocalTime": { "time": "6:21 pm", "date": "23 Jan 2020", "epoch": 1579861567 },
	"elementEpoch": 1579861567,
	"timezone": "Europe/London",
	"sunrise": "5:45 am",
	"sunset": "6:32 pm",
	"timings": [
		{
			"name": "starlink-1000",
			"title": "Starlink-1000",
			"visibility": "good",
			"start": { "time": "7:43 pm", "date": "24 Jan 2020", "epoch": 1579861567 },
			"end": { "time": "7:48 pm", "date": "24 Jan 2020", "epoch": 1579861883 },
			"mins": 5,
			"brightness": 2.4,
			"brightnessText": "bright",
			"startDir": 243.55,
			"startDirText": "southwest",
			"endDir": 35.5,
			"endDirText": "northeast",
			"startElev": 12.45,
			"maxElev": 76.33,
			"endElev": 40
		}
	]
}
```

### Example: Get Satellite Path

```js
const path = predict.getSatellitePath(sat, 90); // 90 minutes window
console.log(path);
```

#### Output
```json
{
	"startEpoch": 1579861567,
	"path": [
		[51.5, -0.1],
		[51.6, -0.2],
		...
	]
}
```

## API

### `getVisibleTimes(sat, latitude, longitude, options)`

- `sat`: Satellite object with fields `{ name, title, omm, stdMag, launchDate }`
- `latitude`, `longitude`: Observer's location
- `options` (optional):
	- `daysCount`: Number of days to predict (default: 5)
	- `timeOfDay`: 'morning', 'evening', or 'all' (default: 'all')
	- `startDaysOffset`: Offset from today (default: 0)

Returns: Object with current time, `elementEpoch`, timezone, sunrise/sunset, and an array of visible timings.

### `getSatellitePath(sat, mins)`

- `sat`: Satellite object
- `mins`: Minutes window (default: 90)

Returns: Object with `startEpoch` and array of `[lat, lng]` pairs for the satellite path.
