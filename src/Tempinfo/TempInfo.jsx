import { useWeatherInfoContext } from "../WeatherProvider/WeatherProvider"

export default function TempInfo(){
    const {feels_like, temp_min, temp_max} = useWeatherInfoContext()

    return(
        <div className="temperature-info">
            <div>
            Feels like temperature <span>{feels_like}&deg;</span>
            </div>
            <div>
            Lowest temperature <span>{temp_min}&deg;</span>
            </div>
            <div>
            Highest temperature <span>{temp_max}&deg;</span>
            </div>
        </div>
    )
}