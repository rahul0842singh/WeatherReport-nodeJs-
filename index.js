const http = require("http")
const fs = require("fs");
const requests = require("requests")

const indexfile = fs.readFileSync("index.html","utf-8");
const server = http.createServer((req,res)=>{
const replaceVal = (tempval,orgval) =>
{
    let temprature = tempval.replace("{%tempval%}",orgval.main.temp);
     temprature =temprature.replace("{%tempmin%}",orgval.main.temp_min);
     temprature =temprature.replace("{%tempmax%}",orgval.main.temp_max);
     temprature =temprature.replace("{%location%}",orgval.name);
     temprature =temprature.replace("{%country%}",orgval.sys.country);
     temprature =temprature.replace("{%country%}",orgval.weather[0].main);
     return temprature;

}
    if(req.url=="/")
    {
        requests('http://api.openweathermap.org/data/2.5/weather?q=bokaro&units=metric&appid=1838c26cf5212a963a76d0c5aa1ffcf2')
            .on('data', function (chunk) {
                const objdata = JSON.parse(chunk);
                const arrdata = [objdata];
            // console.log(arrdata[0].main.temp)

            const realTimeData = arrdata
            .map((val) => replaceVal(indexfile, val))
            .join("");
          res.write(realTimeData);
        })
            .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            res.end();
            });
    }

})

 server.listen(15000,"127.0.0.1")