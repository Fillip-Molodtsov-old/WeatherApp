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

const address= encodeURIComponent(argv.address);
const geoCodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=oM6540FgxGzrZKpQ2sC3sZUdB0mPiPSk&location=${encodeURIComponent(address)}`;
axios.get(geoCodeURL)
    .then((body)=>{
        const location = body.data.results[0].locations[0];
        if (location.street)
            console.log(`${location.street} in ${location.adminArea5}`);
        else
            console.log(`${location.adminArea5}`);
        console.log(`Lat: ${location.latLng.lat}`);
        console.log(`Lng: ${location.latLng.lng}`);
        const weatherURL = `https://api.darksky.net/forecast/6076027b87c29bd136c2fd1e9da1a720/${location.latLng.lat},${location.latLng.lng}?lang=uk&units=si`;
        return axios.get(weatherURL)
    })
    .then((body)=>{
            console.log(body.data.currently.temperature);
    })
    .catch((e)=>{
        if(e.response.status ==404){
            console.log("Damn boyz");
        }else {
            console.log("Can not connect to the servers");
        }
    });
