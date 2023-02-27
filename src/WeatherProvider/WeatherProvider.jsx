import { createContext, useCallback, useContext, useEffect, useState } from "react"

export const WeatherContext = createContext({})

export default function WeatherProvider({children}){
    const [weatherInfo, setWeatherInfo] = useState()
    const [countryName, setCountryName] = useState('Los Angeles')

    const getWeatherInfo = useCallback(async ()=>{
        try{

            const currentWeatherInfoAPI = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_WEATHER_API_KEY}&q=${countryName}&units=imperial`
            const currentWeatherInfo = await fetch(currentWeatherInfoAPI)
            const {
                name, 
                coord: {lat, lon}, 
                main: {temp, humidity, feels_like, temp_min, temp_max},
                sys:{sunset, sunrise},
                weather : [{main:weatherState}],
                wind: {speed, deg}
            } = await currentWeatherInfo.json()

            const hourlyWeatherInfoAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
            const hourlyWeatherInfo = await fetch(hourlyWeatherInfoAPI)
            const {
                list
            } = await hourlyWeatherInfo.json()
            
            setWeatherInfo({
                name, lat, lon, temp, humidity, feels_like, temp_min, temp_max, sunset, sunrise, weatherState, speed, deg, list
            })
        }catch(error){
            console.error(error)
        }
    },[countryName])

    useEffect(()=>{
        getWeatherInfo()
    },[getWeatherInfo])

    return(
        <WeatherContext.Provider value={{...weatherInfo, setCountryName}}>{children}</WeatherContext.Provider>
    )
}

export function useWeatherInfoContext(){
    return useContext(WeatherContext)
}