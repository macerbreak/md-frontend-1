export interface CountriesRatingType {
    cities:  City[];
    time:    Date;
    version: number;
}

export interface City {
    country:   string;
    aqis:      number[];
    aqi:       number;
    evolution: Array<number[]>;
}