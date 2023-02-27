import { useState } from "react"
import { useWeatherInfoContext } from "../WeatherProvider/WeatherProvider"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function CountrySelection(){

    const {setCountryName}= useWeatherInfoContext()

    const options = ['Los Angeles','Seoul', 'London']
    const [sorted, setSorted] = useState('Los Angeles')

    const handleSorted = (option)=>{
        setSorted(option)
        setCountryName(option)
    }

    return(
        <div className="header">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="sort" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {sorted}
                </button>

                <div className="dropdown-menu" aria-labelledby="sort">
                    {options.map((option, index)=>{return <button className="dropdown-item" key={index} onClick={()=>handleSorted(option)}>{option}</button>})}
                </div>
            </div>
        </div>
    )
}