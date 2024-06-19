import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weathe.css';
const WeatherComponent = () => {
    const [cityInfos, setCityInfos] = useState(null);
    const [listOfTemps, setListOfTemps] = useState(null);
    const [city, setCity] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 18 || currentHour < 6) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
        handleSearch();    },[]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=da3c6c5e5939b15a444ff738985092e6&units=metric`);
            console.log(response.data);
            setCityInfos(response.data.city);
            setListOfTemps(response.data.list);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };
    const backgroundColor = isDarkMode ? '#333' : '#f0f0f0';
    const textColor = isDarkMode ? '#fff' : '#000';
    return (
        <div style={{backgroundColor:backgroundColor,color:textColor,width:'100%'}} id='main-div'>
            <h2>Weather Search</h2>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <div style={{backgroundColor:backgroundColor,color:textColor,width:'100%'}}>
                <h3>{cityInfos?.name}</h3>
                <p>Temperature: {cityInfos?.id} °C</p>
                <p>Condition: {cityInfos?.country}</p>
            </div>

            <div  className="weather-grid">
                {listOfTemps?.map((forecast, index) => (
                    <div key={index} style={{backgroundColor:backgroundColor,color:textColor}}className="weather-card">
                        <h3>{new Date(forecast.dt * 1000).toLocaleString()}</h3>
                        <p>Temperature: {forecast.main.temp}°C</p>
                        <p>Feels like: {forecast.main.feels_like}°C</p>
                        <p>Min: {forecast.main.temp_min}°C, Max: {forecast.main.temp_max}°C</p>
                        <p>Weather: {forecast.weather[0].description}</p>
                        <p>Wind Speed: {forecast.wind.speed} m/s</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherComponent;
