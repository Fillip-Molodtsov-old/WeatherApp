const request = require("request");

 const getGeocode = (address,callback)=>{
    request({
        url:`http://www.mapquestapi.com/geocoding/v1/address?key=oM6540FgxGzrZKpQ2sC3sZUdB0mPiPSk&location=${encodeURIComponent(address)}`,
        json: true,
    },(error,response,body)=>{
        if(error)
            callback("Can not connect to the mapquest servers.");
        else if(error === null){
            const location = body.results[0].locations[0];
            callback(undefined,{
                street:location.street,
                area5:location.adminArea5,
                lat:location.latLng.lat,
                lng:location.latLng.lng,
            })
        } 
        
    })
 }

module.exports = {
    getGeocode,
}