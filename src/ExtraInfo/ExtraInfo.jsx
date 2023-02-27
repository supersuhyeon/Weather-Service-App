import { useWeatherInfoContext } from "../WeatherProvider/WeatherProvider"
import {WiHumidity, WiStrongWind, WiSunrise, WiSunset} from "react-icons/wi"


function WindDirectionText({degree = 0}){
    switch(true){
        case(337.5 <= degree && degree <= 360) || (0 <= degree && degree < 22.5) :
        return "Northern wind"

        case 22.5 <= degree && degree < 67.5 :
        return "Northeast wind"

        case 67.5 <= degree && degree < 112.5:
        return "Easterly wind"

        case 112.5 <= degree && degree < 157.5:
            return "Southeast wind"

        case 157.5 <= degree && degree < 202.5:
        return "South wind"

        case 202.5 <= degree && degree < 247.5:
            return "Southwest wind"

        case 247.5 <= degree && degree < 292.5:
            return "Westerly wind"
        
        case 292.5 <= degree && degree < 337.5:
            return "Northwest wind"

        default:
            return ""
    }
}

export default function ExtraInfo(){
    const {humidity, speed, deg, sunset, sunrise} = useWeatherInfoContext()

    return(
        <div className="extra-info">
            <div className="extra-info-item">
                <WiSunrise style={{fontSize: "50px", color:"ff7500"}}></WiSunrise>
                <p className="extra-info-text">
                 sunrise <br></br> {
                        new Date(sunrise * 1000).toLocaleString("en-US", {
                            hour:"numeric",
                            minute:"numeric",
                            hour12:true
                        })
                    }
                </p>
            </div>
            <div className="extra-info-item">
                <WiSunset style={{fontSize: "50px", color:"ff7500"}}></WiSunset>
                <p className="extra-info-text">
                sunset <br></br> {
                        new Date(sunset * 1000).toLocaleString("en-US", {
                            hour:"numeric",
                            minute:"numeric",
                            hour12:true
                        })
                    }<br/>
                </p>
            </div>
            <div className="extra-info-item">
                <WiHumidity style={{fontSize: "50px", color:"#0095ff"}}></WiHumidity>
                <p className="extra-info-text">
                   humidity <br></br> {
                        `${humidity}%` 
                    }
                </p>
            </div>
            <div className="extra-info-item">
                <WiStrongWind style={{fontSize: "50px", color:"#2bc7ad"}}></WiStrongWind>
                <p className="extra-info-text">
                   wind <br></br> {
                        `${speed}m/s`
                    } 
                    (<WindDirectionText degree={deg}></WindDirectionText>)
                </p>
            </div>
        </div>
    )
}