
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon"
import { useWeatherInfoContext } from "../WeatherProvider/WeatherProvider"

export default function CurrentWeather(){
    const {name, temp, weatherState} = useWeatherInfoContext()

    return(
        <div className="weather">
            {name} &nbsp;/
            {<CurrentWeatherIcon weatherState={weatherState}></CurrentWeatherIcon>}
            <span>{temp}&deg;</span>
        </div>
    )
}