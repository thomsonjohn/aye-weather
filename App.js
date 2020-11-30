import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, RefreshControl } from 'react-native'
import Constants from 'expo-constants'

import Weather from './components/Weather'
import { API_KEY } from './utils/WeatherAPIKey'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [weather, setWeather] = useState({
    weather: [
      {
        main: '',
        description: '',
      },
    ],
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
    },
    wind: {
      speed: 0,
    },
    sys: {
      sunrise: 1606724311,
      sunset: 1606751100,
    },
    name: '',
  })
  const [location, setLocation] = useState({
    lat: 59,
    lon: -3,
    isReady: false,
  })

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await handleFetchWeather()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  })

  const handleFetchWeather = useCallback(async () => {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`,
    )
    if (res.ok) {
      const weather = await res.json()
      await setWeather(weather)
      setIsLoading(false)
    }
  })

  const getLocation = useCallback(async () => {
    await navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        isReady: true,
      })
    })
  })

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    if (location.isReady) {
      handleFetchWeather()
    }
  }, [location.isReady])

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
      refreshControl={
        <RefreshControl
          tintColor="#fff"
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      }
    >
      {isLoading ? (
        <Text>Hold tight, I'm checking the weather</Text>
      ) : (
        <Weather status={weather} />
      )}
      <StatusBar style="light" />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1C2C',
  },
})
