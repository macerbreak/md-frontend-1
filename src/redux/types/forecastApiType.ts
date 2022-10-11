export interface CountryForForecastWithCities {
  stations: CityForForecast[];
  cities: CityForForecast[];
  country: { country: string ,evolution:[number, number][]};
}
export interface CityForForecast {
  country: string;
  city: string;
  station: Station;
}

export interface Station {
  g: number[];
  n: string;
  u: Date;
  a: string;
  t: string;
  x: string;
}
