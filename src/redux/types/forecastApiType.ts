export interface CountryForForecastWithCities{
    stations:CityForForecast[]
    cities:CityForForecast[]
}
export interface CityForForecast {
    country: string;
    city:    string;
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
