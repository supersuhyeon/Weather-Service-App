import {WiDirectionDownLeft, WiDirectionDownRight, WiDirectionLeft, WiDirectionRight, WiDirectionUp, WiDirectionUpLeft, WiDirectionUpRight, WiDirectionDown} from "react-icons/wi"
import { Bar, BarChart, LabelList, XAxis } from "recharts"
import { useWeatherInfoContext } from "../WeatherProvider/WeatherProvider"

const formatXAxis = (data)=> `${new Date(data*1000).getHours()}:00`

function WindDirection({degree, ...props}){

    switch(true){
        case(337.5 <= degree && degree <= 360) || (0 <= degree && degree < 22.5) :
        return <WiDirectionDown {...props}/>

        case 22.5 <= degree && degree < 67.5 :
        return <WiDirectionDownLeft {...props}/>

        case 67.5 <= degree && degree < 112.5:
        return <WiDirectionLeft {...props} />

        case 112.5 <= degree && degree < 157.5:
            return <WiDirectionUpLeft {...props}/>

        case 157.5 <= degree && degree < 202.5:
        return <WiDirectionUp {...props}/>

        case 202.5 <= degree && degree < 247.5:
            return <WiDirectionUpRight {...props}/>

        case 247.5 <= degree && degree < 292.5:
            return <WiDirectionRight {...props} />
        
        case 292.5 <= degree && degree < 337.5:
            return <WiDirectionDownRight {...props} />

        default:
            return ""
    }
}

const CustomizedContent = function ({x,y,value}){
    return <WindDirection degree={value} x={x+15} y={y-40} fontSize={30}></WindDirection>
}

const CustomizedLabel = function({x,y,value}){
    return(
        <text x={x+30} y={y-2} dy={0} fontSize="15" textAnchor="middle">
            {value}m/s
        </text>
    )
}

function BarGraph({num}){
    const {list} = useWeatherInfoContext()

    return(
        <BarChart
        width={960}
        height={200}
        data={list?.slice(num*8, (num+1)*8).map(({dt,wind})=>({
            dt, speed:wind.speed, deg:wind.deg
        }))}
        margin={{top:50, right:30, left:30, bottom:5}}
        >
          <XAxis dataKey="dt" fontSize={15} tickFormatter={formatXAxis}></XAxis>
          <Bar dataKey="speed" fill="#00DD93" isAnimationActive={false} label={<CustomizedLabel/>}>
            <LabelList dataKey="deg" content={<CustomizedContent></CustomizedContent>}></LabelList>
          </Bar>
        </BarChart>
    )
}

export default function WindGraph(){
    return(
        <BarGraph num={0}></BarGraph>
    )
}