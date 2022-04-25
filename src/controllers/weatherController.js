const axios=require("axios");
const flatted=require('flatted');
//  const stringify=require('json-stringify-safe');


let getWeather = async function (req, res) {
    try {
        let London = req.query.london
        let appid = req.query.appid
        console.log(`query params are: ${London} ${appid}`)
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${London}&appid=${appid}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })          // just add or remove (.main.temp) to show the all summary oflondon weather.
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//http://api.openweathermap.org/data/2.5/weather?q=${London}&appid=${appid}

let getSortcitiestemp=async function(req, res){
    try{ 
        let cities = ['bengaluru','Mumbai','kolkata','chennai','London','Moscow']
        let Objarray = []

        for(i=0 ; i<cities.length; i++)
        {
            let obj = {city: cities[i]}
            let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=1002beaac8eac33af1c729304af41ee1`)
            console.log(res.data.main.temp)

            obj.temp = res.data.main.temp
            Objarray.push(obj)
        }
        let sorted=Objarray.sort( function(a,b){ return a.temp - b.temp})  //d
        res.status(200).send({ status :true,data: sorted})

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getWeather=getWeather
module.exports.getSortcitiestemp=getSortcitiestemp