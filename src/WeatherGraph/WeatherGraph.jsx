import { useWeatherInfoContext } from "../WeatherProvider/WeatherProvider"
import {LabelList, Line, LineChart, XAxis} from 'recharts'
import CurrentWeatherIcon from "../CurrentWeatherIcon/CurrentWeatherIcon"
import uuid from 'react-uuid'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

const formatXAxis = (data)=> `${new Date(data*1000).getHours()}:00`//x축 시간, 시간데이터 가공, 초단위로 나와서 천을 곱해 시간으로 변경 그리고 틱포매터에 넣어줌
const CustomizedDot = ({payload, cx, cy}) => (<CurrentWeatherIcon key={uuid()} weatherState={payload.weather} x={cx-13} y={cy-5} fontSize={30}></CurrentWeatherIcon>)
//웨더아이콘
const CustomizedLabel = ({x,y,value}) => (<text x={x} y={y} dy={-4} fontSize={15} textAnchor="middle">{value}°</text>)
//온도표시
function Linegraph({num}){
    const {list} = useWeatherInfoContext()
    return(
        <LineChart 
        width={960} 
        height={200} //5일동안 3시간 데이터, 수업에선 12시간씩 끊어 데이터 넣어주기위해, 넘버를 기준으로 4를 곱함/ slice(0,4) 첫번재부터 3번째까지 자름
        data={list?.slice(num*8, (num+1)*8).map(({dt,main,weather})=>({ //list? usecontext 초기값이 빈오브젝트라서 에러방지
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