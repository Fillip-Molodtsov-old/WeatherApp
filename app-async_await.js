const yargs = require("yargs");
const axios = require("axios");

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

const address= encodeURIComponent(argv.address) ||"Rio de Janeiro";


getWeatherByCoord(address);

async function getWeatherByCoord (address){
    try {
        const geoCodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=oM6540FgxGzrZKpQ2sC3sZUdB0mPiPSk&location=${encodeURIComponent(address)}`;
        const data = await axios(geoCodeURL);
        const location = data.data.results[0].locations[0];
        const stats = {
            street:location.street,
            area5:location.adminArea5,
            area1:location.adminArea1,
            lat:location.latLng.lat,
            lng:location.latLng.lng,
        };
        console.log(`The weather in ${stats.area5}, ${stats.area1}`);
        const weatherURL = `https://api.darksky.net/forecast/6076027b87c29bd136c2fd1e9da1a720/${stats.lat},${stats.lng}?lang=uk&units=si`;
        const data2 = await axios(weatherURL);
        console.log(`The temperature is ${data2.data.currently.temperature}°, but feels like ${data2.data.currently.apparentTemperature}°.`);
    } catch (error) {
        console.log("Can not connect to the mapquest servers.");
    }
}