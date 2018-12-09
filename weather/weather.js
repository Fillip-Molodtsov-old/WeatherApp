const request = require("request");

const getTemperature = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/6076027b87c29bd136c2fd1e9da1a720/${lat},${lng}?lang=uk&units=si`,
        json: true,
    }, (error, response, body) => {
        if (error) {
            callback("Damn boyyz! We have some problems");
        } else if (response.statusCode == 404) {
            callback("404: damn bad request");
        } else if (!error && response.statusCode == 200)
            callback(undefined,{
                temperature:body.currently.temperature,
            })
    })
}

module.exports = {
    getTemperature,
}