import {WiDayCloudy, WiDayRain, WiDaySnow, WiDaySprinkle, WiDaySunny, WiDayThunderstorm, WiDust, WiNa} from "react-icons/wi"

export default function CurrentWeatherIcon({weatherState, ...props}){
    switch(weatherState){
        case "ThunderStorm" :
            return <WiDayThunderstorm {...props}></WiDayThunderstorm>
        
        case "Snow" :
            return <WiDaySnow {...props}></WiDaySnow>     
        
        case "Clouds" :
            return <WiDayCloudy {...props}></WiDayCloudy>     

        case "Clear" :
            return <WiDaySunny {...props}></WiDaySunny>
        
        case "Haze" :
            return <WiDust {...props}></WiDust> 

        case "Mist" :
            return <WiDust {...props}></WiDust> 
                
        case "Smoke" :
            return <WiDust {...props}></WiDust> 

         case "Dust" :
            return <WiDust {...props}></WiDust> 

        case "fog" :
            return <WiDust {...props}></WiDust> 
       
        case "Sand" :
            return <WiDust {...props}></WiDust> 
                    
        case "Ash" :
            return <WiDust {...props}></WiDust> 
                        
        case "Squall" :
            return <WiDust {...props}></WiDust> 
                            
        case "Tornado" :
            return <WiDust {...props}></WiDust> 

        case "Rain" : 
        return <WiDayRain {...props}></WiDayRain>

        case  "Drizzle" : 
        return <WiDaySprinkle {...props}></WiDaySprinkle>

        default:
            return <WiNa {...props} ></WiNa>;
    }
}