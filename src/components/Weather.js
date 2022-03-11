import './weather.css';
import { useEffect, useState } from "react";
import axios from 'axios';

const Weather = () => {

    const [weather, setWeather] = useState({});


    const succes = pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2b729c11516fc548db4c10b4303da60b`)
            .then(res => setWeather(res.data));
            
    }
    
    // console.log(weather);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(succes);
    }, []);

    // temperatura
    const cel = celsius => {
        const cels = celsius * (9 / 5) + 32;
        return Math.round(Number(cels));
     };
     const fahr = fahrenheit => {
        const fah = (fahrenheit - 32) * (5 / 9);
        return Math.round(Number(fah));
     };
     const convert = Math.round(weather.main?.temp - 273.16);

    const redondeo = convert.toFixed(1);

    const [temp, setTemp] = useState();

    const [isCelsius, setIsCelsius] = useState(true);
    useEffect(() => {
        setTemp(redondeo);
      }, [weather, redondeo]);

    return(
        <div className="Weather">
            <h3> App Weather | by axl </h3>
            <p>
                <b>Ciudad :</b> 
                <br /> {weather.sys?.country} - {weather.name} 
            </p>
            <p>
                <b>El cielo se encuentra :</b>
                <br /> {weather.weather?.[0].main}
            </p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="icon" />
            <p>
                <b>La temperatura es de :</b>
                <br /> {temp}°
            </p>
            <button
            className="button-convert"
            onClick={() => {
            if (isCelsius) {
                setTemp(cel(temp));
                setIsCelsius(!isCelsius);
            }
            else if (!isCelsius) {
                setTemp(fahr(temp));
                setIsCelsius(!isCelsius);
            }
            }}
        >
            {isCelsius ? "Cambiar a °F" : "Cambiar a °C"}
        </button>
        </div>
    );
}

export default Weather;