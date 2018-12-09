const yargs = require("yargs");
const request = require("request");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
    .option({
        a: {
            alias: 'address',
            demand: true,
            describe: "Address you want to fetch weather for",
            string: true,
        }
    })
    .help()
    .alias("help", "h")
    .argv;

const address = argv.a;

geocode.getGeocode(address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        const { street,area5, lat, lng } = result;
        if (street)
            console.log(`${street} in ${area5}`);
        else
            console.log(`${area5}`);
        console.log(`Lat: ${lat}`);
        console.log(`Lng: ${lng}`);
        weather.getTemperature(lat,lng, (errorMessage, result) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                const {temperature} = result;
                console.log(`The temperature is: ${temperature}`);
            }
        });
    }
});

