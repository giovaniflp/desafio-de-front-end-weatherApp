/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function weather() {

  useEffect(() => {
    getWeather("Recife")
  }, [])

  const [location, setLocation] = useState("")
  const [condition, setCondition] = useState("")
  const [actualTemp, setActualTemp] = useState("")
  const [maxTemp, setMaxTemp] = useState("")
  const [minTemp, setMinTemp] = useState("")
  const [windSpeedy, setWindSpeedy] = useState("")
  const [sunrise, setSunrise] = useState("")
  const [sunset, setSunset] = useState("")
  const [humidity, setHumidity] = useState("")

  const [dawn, setDawn] = useState("")
  const [morning, setMorning] = useState("")
  const [afternoon, setAfternoon] = useState("")
  const [night, setNight] = useState("")

  const [dawnImage, setDawnImage] = useState("")
  const [morningImage, setMorningImage] = useState("")
  const [afternoonImage, setAfternoonImage] = useState("")
  const [nightImage, setNightImage] = useState("")

  const [icon, setIcon] = useState("")

  const getWeather = async (city) => {
    const response = await axios.get("https://api.weatherapi.com/v1/forecast.json?key=4ad9e791692a4741a9d42827242205&q=" + city + "&days=1&aqi=yes&alerts=yes")
    setLocation(response.data.location.name)
    setCondition(response.data.current.condition.text)
    setIcon("https:" + response.data.current.condition.icon)
    setActualTemp(response.data.current.temp_c)
    setMaxTemp(response.data.forecast.forecastday[0].day.maxtemp_c)
    setMinTemp(response.data.forecast.forecastday[0].day.mintemp_c)
    setWindSpeedy(response.data.current.wind_kph)
    setSunrise(response.data.forecast.forecastday[0].astro.sunrise)
    setSunset(response.data.forecast.forecastday[0].astro.sunset)
    setHumidity(response.data.current.humidity)

    setDawn(response.data.forecast.forecastday[0].hour[0].temp_c)
    setMorning(response.data.forecast.forecastday[0].hour[5].temp_c)
    setAfternoon(response.data.forecast.forecastday[0].hour[10].temp_c)
    setNight(response.data.forecast.forecastday[0].hour[15].temp_c)

    setDawnImage("https:" + response.data.forecast.forecastday[0].hour[3].condition.icon)
    setMorningImage("https:" + response.data.forecast.forecastday[0].hour[9].condition.icon)
    setAfternoonImage("https:" + response.data.forecast.forecastday[0].hour[15].condition.icon)
    setNightImage("https:" + response.data.forecast.forecastday[0].hour[21].condition.icon)
  }
  
  return (
    <div className="bg-black text-white flex flex-col mt-20">
      <Link className="absolute top-10 left-5" href={"/"}><Image alt="" src={"/whiteArrowBack.png"} width={20} height={20}></Image></Link>
      <header className="flex flex-col justify-center items-center mb-5">
        <h2 className="text-5xl font-light">{location}</h2>
        <h3 className="text-xl font-thin">{condition}</h3>
      </header>
        <div className="flex justify-center items-center">
          <h1 className="text-8xl">{actualTemp}</h1>
          <div>
            <h1 className="text-2xl">°C</h1>
              <div className="flex">
                <Image alt="" src={"/arrow-up.png"} width={20} height={20}></Image>
                <h4>{maxTemp}°</h4>
              </div>
              <div className="flex">
                <Image alt="" src={"/arrow-down.png"} width={20} height={20}></Image>
                <h4>{minTemp}°</h4>
              </div>
            </div>
        </div>
        <div className="flex justify-center items-center mb-5">
          <Image alt="" src={icon} width={150} height={150}></Image>
        </div>
        <section className="flex gap-10 justify-center items-center">
          <div className="flex flex-col items-center">
            <h5 className="font-thin">Dawn</h5>
            <Image alt="" src={dawnImage} width={50} height={50}></Image>
            <h6>{dawn}°C</h6>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="font-thin">Morning</h5>
            <Image alt="" src={morningImage} width={50} height={50}></Image>
            <h6>{morning}°C</h6>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="font-thin">Afternoon</h5>
            <Image alt="" src={afternoonImage} width={50} height={50}></Image>
            <h6>{afternoon}°C</h6>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="font-thin">Night</h5>
            <Image alt="" src={nightImage} width={50} height={50}></Image>
            <h6>{night}°C</h6>
          </div>
        </section>
        <section className="flex gap-5 justify-center items-center mt-10">
          <div className="flex flex-col items-center">
            <h5 className="font-thin">Wind Speed</h5>
            <h6>{windSpeedy} kph</h6>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="font-thin">Sunrise</h5>
            <h6>{sunrise}</h6>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="font-thin">Sunset</h5>
            <h6>{sunset}</h6>
          </div>
          <div className="flex flex-col items-center">
            <h5 className="font-thin">Humidity</h5>
            <h6>{humidity}%</h6>
          </div>
        </section>
    </div>
  );
}
