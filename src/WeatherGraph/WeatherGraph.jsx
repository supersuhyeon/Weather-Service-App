import { useWeatherInfoContext } from "../WeatherProvider/WeatherProvider"
import {LabelList, Line, LineChart, XAxis} from 'recharts'
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon"
import uuid from 'react-uuid'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const formatXAxis = (data)=> `${new Date(data*1000).getHours()}:00`
const CustomizedDot = ({payload, cx, cy}) => (<CurrentWeatherIcon key={uuid()} weatherState={payload.weather} x={cx-13} y={cy-5} fontSize={30}></CurrentWeatherIcon>)
const CustomizedLabel = ({x,y,value}) => (<text x={x} y={y} dy={-4} fontSize={15} textAnchor="middle">{value}°</text>)

function Linegraph({num}){
    const {list} = useWeatherInfoContext()
    return(
        <LineChart 
        width={960} 
        height={200}
        data={list?.slice(num*8, (num+1)*8).map(({dt,main,weather})=>({ 
            dt, main:main.temp, weather:weather[0].main
        }))}
        margin={{
            top:30,
            right:30,
            left:30,
            bottom:10
        }}
        >
        <XAxis dataKey="dt" fontSize={15} tickFormatter={formatXAxis}></XAxis>
        <Line dataKey="main" stroke="#3cb371" strokeWidth={2} dot={<CustomizedDot/>} isAnimationActive={false}>
            <LabelList content={<CustomizedLabel/>}></LabelList>
        </Line>
        </LineChart>
    )
}

export default function WeatherGraph(){
    const slides = [];
    for(let i=0; i<1; i++){
        slides.push(
            <SwiperSlide key={i}>
                <Linegraph num={i}></Linegraph>
            </SwiperSlide>
        )
    }
    return(
        <Swiper navigation={true} modules={[Navigation]}>
            {slides}
        </Swiper>
    )
}