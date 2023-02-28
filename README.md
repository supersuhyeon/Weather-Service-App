## Weather Service App

![ezgif com-crop (8)](https://user-images.githubusercontent.com/94214512/221492043-8c28547e-99a6-4b39-9efe-a074018a1315.gif)<br>
This is a simple weather service app that I created with React<br>
[weather service app](https://cozy-pastelito-ba7fd3.netlify.app/)

### Goals of the project

1. Use openweather's APIs and make a mini weather service app that has current weather data and 5day/3hour forecast data as a free subscription
2. Make line and bar graphs of weather conditions using recharts library

### Languages

React

### Features

1. Fetch free open weather APIs get data
   ![weather](https://user-images.githubusercontent.com/94214512/221672539-1bde9c56-adbc-43ee-89f9-68dc01736b5b.jpg)

The API documentation is very detailed. As long as you get the right url with parameters they offer it will be pretty easy to fetch the data. Since I used [postman](https://www.postman.com/) to test APIs for the youtube clone project before, I used it for this project too! Postman is really helpful to test params and check the data.

- Current Weather Data <br>

```html
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API
key}
```

Instead of sending lat or lon, you can also send {city name} as a query.

- 3 Hour Forecast

```html
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API
key}
```

I had a free subscription so 3 hour forcast API was available. Once you get the current weather data with particular city name then you need to send that city's lat and lon to the 3 hour forcast URL.

```js
export default function WeatherProvider({ children }) {
  //...codes
  const getWeatherInfo = useCallback(async () => {
    try {
      const currentWeatherInfoAPI = `https://api.openweathermap.org/data/2.5/weather?appid=${your_api_key}&q=${countryName}&units=imperial`;
      const currentWeatherInfo = await fetch(currentWeatherInfoAPI);
      const {
        name,
        coord: { lat, lon },
        main: { temp, humidity, feels_like, temp_min, temp_max },
        //...code
      } = await currentWeatherInfo.json();

      const hourlyWeatherInfoAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${your_api_key}&units=imperial`;
      const hourlyWeatherInfo = await fetch(hourlyWeatherInfoAPI);
      const { list } = await hourlyWeatherInfo.json();

      setWeatherInfo({
        //above variables...
      });
    } catch (error) {
      console.error(error);
    }
  }, [countryName]);

  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]);

  return (
    <WeatherContext.Provider value={{ ...weatherInfo, setCountryName }}>
      {children}
    </WeatherContext.Provider>
  );
}
```

- Enhancing performance using useCallback & useEffect <br>
  I use useCallback to memorize the function and pass it as a dependency to useEffect. This ensures that the effect is only triggered when getWeatherInfo changes, which can help optimize performance.

2. Make graphs using recharts library

- how to install

```html
$ npm install recharts
```

- LineChart
  <img width="1027" alt="Screenshot 2023-02-27 at 1 00 49 PM" src="https://user-images.githubusercontent.com/94214512/221684607-f137fd70-3ebe-4992-8c8d-061e2e7a2841.png">

```js
const formatXAxis = (data) => `${new Date(data * 1000).getHours()}:00`;

const CustomizedDot = ({ payload, cx, cy }) => (
  <CurrentWeatherIcon
    key={uuid()}
    weatherState={payload.weather}
    x={cx - 13}
    y={cy - 5}
    fontSize={30}
  ></CurrentWeatherIcon>
);

const CustomizedLabel = ({ x, y, value }) => (
  <text x={x} y={y} dy={-4} fontSize={15} textAnchor="middle">
    {value}°
  </text>
);

function Linegraph({ num }) {
  const { list } = useWeatherInfoContext();
  return (
    <LineChart
      width={960}
      height={200}
      data={list
        ?.slice(num * 8, (num + 1) * 8) // 3 hour/24, display 1 page for 8 data
        .map(({ dt, main, weather }) => ({
          dt,
          main: main.temp,
          weather: weather[0].main,
        }))}
      margin={{
        top: 30,
        right: 30,
        left: 30,
        bottom: 10,
      }}
    >
      <XAxis dataKey="dt" fontSize={15} tickFormatter={formatXAxis}></XAxis>
      <Line
        dataKey="main"
        stroke="#3cb371"
        strokeWidth={2}
        dot={<CustomizedDot />}
        isAnimationActive={false}
      >
        <LabelList content={<CustomizedLabel />}></LabelList>
      </Line>
    </LineChart>
  );
}
// for 3 hour interval of the 5-days using swiper slide library (💡but make sure that it displays data at 3-hour intervals based on the current time)
export default function WeatherGraph() {
  const slides = [];
  for (let i = 0; i < 5; i++) {
    slides.push(
      <SwiperSlide key={i}>
        <Linegraph num={i}></Linegraph>
      </SwiperSlide>
    );
  }
  return (
    <Swiper navigation={true} modules={[Navigation]}>
      {slides}
    </Swiper>
  );
}
```

```js
//or just show a user 3 hour intervals of a day (💡but make sure that it displays data at 3-hour intervals based on the current time)
export default function WeatherGraph() {
  return <Linegraph num={0}></Linegraph>;
}
```

**_LineChart Properties_**

- LineChart : the LineChart component is used to display a line chart on the page.

  - data : The data prop is used to pass an array of data objects to the chart. Each data object represents a point on the chart and should have properties corresponding to the dataKeys used in the Line and XAxis components.

- XAxis : XAxis component is used to display the X-axis on the chart.

  - dataKey : The dataKey prop is used to specify which property of the data objects passed to the chart should be used as the value for the X-axis labels. In this case, the dt property of each data object is used.
  - tickFormatter : The tickFormatter prop is used to specify a function to format the X-axis labels.
  - formatXAxis : The formatXAxis function is passed as the value of this prop, and is used to format the Unix timestamps representing the time of each data point into a readable format displaying the time in hours and minutes.

- Line : the Line component is used to render the line that represents the temperature data on the chart.

  - dataKey : The dataKey prop specifies which data property from the chart data should be used as the Y value for each data point on the line. In this case, the dataKey prop is set to "main," which corresponds to the temperature values in the chart data.
  - dot : The dot prop specifies the custom dot that should be rendered at each data point on the line.
  - CustomizedDot : the CustomizedDot component is used as a custom dot for each data point on the line. This component receives three props. The payload prop contains the data for the current data point on the line, which includes the weather property that represents the weather state at that particular time. The cx and cy props represent the X and Y coordinates of the current data point on the chart.
    <img width="376" alt="Screenshot 2023-02-27 at 4 39 26 PM" src="https://user-images.githubusercontent.com/94214512/221722211-a47259cf-76b8-47dc-bba4-ad21023d4e65.png"> (this is what one of the payload props looks like)

- LabelList: LabelList component is used to display labels for each data point on the graph.
  - content : The content prop is used to specify the custom label to be rendered for each data point.
  - CustomizedLabel : CustomizedLabel component is used as a custom label for the temperature data points on the LineChart. This component receives three props. x and y represent the coordinates of the data point on the chart, value represents the value of the temperature data point.

### Reference Links

[Open weather APIs](https://openweathermap.org/api) <br>
[Rechart library](https://recharts.org/en-US/api) <br>
[My Korean blog post about useCallback memorization](https://blog.naver.com/thvldk0025/222925054527)
[My Korean blog post about axios vs fetch](https://blog.naver.com/thvldk0025/222937990606)

### Self-reflection

I always wondered how to make a graph with a dataset so I'm glad that I could make visualizations using the recharts library. It turned out to be easier than I thought.
