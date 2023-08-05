const http=require("http");
const requests=require("requests");
const fs=require("fs");

const readData= fs.readFileSync("index.html","utf-8");
const replacedata=(prevval,realdata)=>{
    let temprature=prevval.replace("{%temp%}",Math.round(realdata.main.temp-273));
    temprature=temprature.replace("{%mintemp%}",Math.round(realdata.main.temp_min-273));
    temprature=temprature.replace("{%maxtemp%}",Math.round(realdata.main.temp_max-273));
    temprature=temprature.replace("{%city%}",realdata.name);
    temprature=temprature.replace("{%country%}",realdata.sys.country);
    temprature=temprature.replace("{%icon%}",realdata.weather[0].main);
    return temprature;
}

const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Kanpur&appid=7aed74ccc7a1f990a750bf91adbfa338')
        .on('data',(chunk)=>{
           const objData=JSON.parse(chunk);
           const arrData=[objData];
           console.log(arrData[0].main.temp);
        // //    res.write(arrData[0].main.temp);
        // //    res.end(arrData[0].main.temp);
           const realTimeData =arrData.map((val)=>replacedata(readData,val)).join("");
            //  console.log(val.main.pressure);
           
           console.log(realTimeData);
           res.write(realTimeData);
        // //    console.log(realTimeData);
        // 	hello this is from my git change
		// res.write(realTimeData);
	         })
        .on('end', (err)=>{
          if (err) return console.log('connection closed due to errors', err);   
          res.end();  
        //   console.log('end');
        });
    }
});server.listen(7000,()=>{
     console.log(`connected successfully with port 7000`)
});
