export const environment = {
    production: true,
    weatherApiKey: import.meta.env.NG_APP_WEATHER_API_KEY || null
};
//process?.env?.['ANGULAR_APP_API_KEY'] || null