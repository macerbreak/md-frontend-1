export interface CountriesRatingType {
  cities: City[];
  time: Date;
  version: number;
}

export interface City {
  country: string;
  aqis: number[];
  aqi: number;
  evolution: Array<number[]>;
}

export interface CityForecastResponseData {
  aqi: number;
  idx: number;
  attributions: Attribution[];
  city: CityForecastInfo;
  dominentpol: string;
  iaqi: Iaqi;
  time: Time;
  forecast: Forecast;
  debug: Debug;
}

export interface Attribution {
  url: string;
  name: string;
  logo?: string;
}

export interface CityForecastInfo {
  geo: number[];
  name: string;
  url: string;
  location: string;
}

export interface Debug {
  sync: Date;
}

export interface Forecast {
  daily: Daily;
}

export interface Daily {
  o3: O3[];
  pm10: O3[];
  pm25: O3[];
  uvi: O3[];
}

export interface O3 {
  avg: number;
  day: Date;
  max: number;
  min: number;
}

export interface Iaqi {
  co: Co;
  h: Co;
  no2: Co;
  o3: Co;
  p: Co;
  pm10: Co;
  pm25: Co;
  so2: Co;
  t: Co;
  w: Co;
  wg: Co;
}

export interface Co {
  v: number;
}

export interface Time {
  s: Date;
  tz: string;
  v: number;
  iso: Date;
}
