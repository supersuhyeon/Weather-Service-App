import CurrentWeather from "./CurrentWeather/CurrentWeather";
import '../src/style.css'
import TempInfo from "./Tempinfo/TempInfo";
import ExtraInfo from "./ExtraInfo/ExtraInfo";
import WeatherTab from "./WeatherTab/WeatherTab";
import CountrySelection from "./CountrySelect/CountrySelection";

export default function WeatherApp(){
    return(
        <>
        <CountrySelection></CountrySelection>
        <div className="containerBox">
            <CurrentWeather></CurrentWeather>
            <TempInfo></TempInfo>
            <ExtraInfo></ExtraInfo>
            <WeatherTab></WeatherTab>
        </div>
        </>

    )
}