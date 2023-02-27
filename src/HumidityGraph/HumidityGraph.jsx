import { Bar, BarChart, XAxis } from "recharts"
import { useWeatherInfoContext } from "../WeatherProvider/WeatherProvider"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";


const formatXAxis = (data)=> `${new Date(data*1000).getHours()}:00`
const CustomizedLabel = function({x,y,value}){
    return(
        <text x={x+30} y={y-2} fontSize="15" textAnchor="middle">
            {value}%
        </text>
    )
}
function BarGraph({num}){
    const {list} = useWeatherInfoContext()

    return(
        <BarChart
        width={960}
        height={200}
        data={list?.slice(num*8, (num+1)*8).map(({dt,main})=>({
            dt, main:main.humidity
        }))}
        margin={{top:30, right:30, left:30, bottom:10}}
        >
          <XAxis dataKey="dt" fontSize={15} tickFormatter={formatXAxis}></XAxis>
          <Bar dataKey="main" fill="#2C6CFF" isAnimationActive={false} label={<CustomizedLabel/>}></Bar>
        </BarChart>
    )
}

export default function HumidityGraph(){
    const slides = [];
    for(let i=0; i<1; i++){
        slides.push(
            <SwiperSlide key={i}>
                <BarGraph num={i}></BarGraph>
            </SwiperSlide>
        )
    }
    return(
        <Swiper navigation={true} modules={[Navigation]}>
            {slides}
        </Swiper>
    )
}