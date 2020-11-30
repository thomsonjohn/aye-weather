import React from 'react'
import moment from 'moment'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

import {
  weatherConditions,
  weatherConditionsNight,
} from '../../utils/WeatherConditions'

const Weather = ({ status }) => {
  const { weather, main, name, sys, wind } = status
  const windSpeed = Math.round(wind.speed * 2.24)
  const isDaylight = moment() > sys.sunrise && moment() < sys.sunset
  const forecast = isDaylight
    ? weatherConditions[weather[0].main]
    : weatherConditionsNight[weather[0].main]

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDaylight
            ? weatherConditions[weather[0].main].color
            : '#1F1C2C',
        },
      ]}
    >
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '50%',
        }}
      />
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <MaterialCommunityIcons
            size={112}
            name={forecast.icon}
            color={'#fff'}
          />
          <View style={styles.tempWrapper}>
            <Text style={styles.tempText}>{Math.round(main.temp)}˚</Text>
          </View>
        </View>
        <View style={styles.headerRow}>
          <View style={styles.rowItem}>
            <MaterialCommunityIcons
              size={24}
              name="weather-sunset-up"
              color={'#fff'}
            />
            <Text style={styles.smallText}>
              {' '}
              {moment.unix(sys.sunrise).format('LT')}
            </Text>
          </View>
          <View style={styles.rowItem}>
            <MaterialCommunityIcons
              size={24}
              name="weather-sunset-down"
              color={'#fff'}
            />
            <Text style={styles.smallText}>
              {' '}
              {moment.unix(sys.sunset).format('LT')}
            </Text>
          </View>
        </View>
        <View style={styles.headerRow}>
          <View style={styles.rowItem}>
            <MaterialCommunityIcons
              size={24}
              name="weather-windy"
              color={'#fff'}
            />
            <Text style={styles.smallText}> {windSpeed} mph</Text>
          </View>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.locationWrapper}>
          <MaterialCommunityIcons size={16} name="map-marker" color={'#fff'} />
          <Text style={styles.location}> {name}</Text>
        </View>
        <Text style={styles.title}>{forecast.title}</Text>
        <Text style={styles.subtitle}>{forecast.subtitle}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 25,
    paddingRight: 25,
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  location: {
    fontSize: 16,
    color: '#fff',
  },
  tempText: {
    fontSize: 80,
    color: '#fff',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 20,
    color: '#fff',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempSmall: {
    fontSize: 16,
    color: '#fff',
  },
  tempWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export default Weather
