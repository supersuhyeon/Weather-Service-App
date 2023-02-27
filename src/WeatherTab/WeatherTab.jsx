import {Box, Tab, Tabs} from '@mui/material'
import { useState } from 'react'
import HumidityGraph from '../HumidityGraph/HumidityGraph'
import WeatherGraph from '../WeatherGraph/WeatherGraph'
import "swiper/css";
import "swiper/css/navigation";
import WindGraph from '../WindGraph/WindGraph';

function TabPanel({children, value, index}){
    return(
        <div hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    )
}

export default function WeatherTab(){

    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return(
        <Box sx={{width: "100%"}}>
            <Box sx={{borderBottom:1, borderColor:'divider'}}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab label="weather"></Tab>
                    <Tab label="humidity"></Tab>
                    <Tab label="wind"></Tab>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <WeatherGraph></WeatherGraph>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <HumidityGraph></HumidityGraph>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <WindGraph></WindGraph>
            </TabPanel>
        </Box>
    )
}