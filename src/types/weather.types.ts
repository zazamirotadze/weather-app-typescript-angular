interface Location {
    lat: number;
    lon: number;
    name: SupportedLocations;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

interface Wind{
    speed: number;
    deg: number;
}

interface WeatherData {
    weather: Weather[];
    main: Main;
    wind: Wind;
    dt_txt: string;
 }

 interface Language {
    name: SupportedLanguages;
    label: string;
    iconUrl: string;
}

type SupportedLanguages = 'ka' | 'en';

type SupportedLocations = 'Tsrikvali' | 'Tbilisi' | 'Kutaisi';

type Info = 'temp' | 'feels_like' | 'humidity' | 'pressure' | 'windSpeed';

export type {Location, Weather, Main, Wind, WeatherData, Language, SupportedLanguages, SupportedLocations, Info}