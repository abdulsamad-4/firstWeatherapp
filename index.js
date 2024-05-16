import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 4000;
const API_url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=c7cdc42f0d56bf785d8215fa6a1a959d";
const apicall = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "&appid=c7cdc42f0d56bf785d8215fa6a1a959d";



app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

/* app.get("/", async (req, res)=>{
    try{
        const result = await axios.get(API_url);
        res.render("index.ejs", {content: JSON.stringify(result.data)})
    }  catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
   
}) */

app.get("/", async (req, res) =>{
    try{
        const result = await axios.get(API_url);
        res.render("index.ejs", {
            city: result.data.name,
            weather: result.data.weather[0].main,
            weatherDescription: result.data.weather[0].main,
            longitude: result.data.coord.lon,
            latitude: result.data.coord.lat
        })
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
})

app.post("/get-info", async (req, res)=>{
      const choice = req.body.choice
      try{
          const result = await axios.get(apicall + choice + apiKey);
          res.render("index.ejs", {
            city: result.data.name,
            weather: result.data.weather[0].main,
            weatherDescription: result.data.weather[0].main,
            longitude: result.data.coord.lon,
            latitude: result.data.coord.lat
          })
      }  catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
})
app.post("/get-in", async (req, res)=>{
      const choice = req.body.sel
      try{
          const result = await axios.get(apicall + choice + apiKey);
          res.render("index.ejs", {
            city: result.data.name,
            weather: result.data.weather[0].main,
            weatherDescription: result.data.weather[0].main,
            longitude: result.data.coord.lon,
            latitude: result.data.coord.lat
          })
      }  catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
})



app.listen(port, ()=>{
    console.log(`Live at port ${port}`)
})