const request = require("request");

const geoCode = (address)=>{
    return new Promise((resolve,reject)=>{
        request({
            url:`http://www.mapquestapi.com/geocoding/v1/address?key=oM6540FgxGzrZKpQ2sC3sZUdB0mPiPSk&location=${encodeURIComponent(address)}`,
            json: true,
        },(error,response,body)=>{
            if(error)
                reject("Can not connect to the mapquest servers.");
            else if(error === null){
                const location = body.results[0].locations[0];
                resolve({
                    street:location.street,
                    area5:location.adminArea5,
                    lat:location.latLng.lat,
                    lng:location.latLng.lng,
                })
            } 
            
        })
    })
}
geoCode("Miami")
.then((location)=>{
    const { street,area5, lat, lng } = location;
        if (street)
            console.log(`${street} in ${area5}`);
        else
            console.log(`${area5}`);
        console.log(`Lat: ${lat}`);
        console.log(`Lng: ${lng}`);
}).catch((errorMessage)=>{
    console.log(errorMessage);
})