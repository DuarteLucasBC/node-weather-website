const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZHVhcnRlcHJpc3RhIiwiYSI6ImNrMXJ1cjA4YTA1a3gzY296cnNsOGVkbjQifQ.V0RSLnD-5xKF6px_R8oEyg';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;