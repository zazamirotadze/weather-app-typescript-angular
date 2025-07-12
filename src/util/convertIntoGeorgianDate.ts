import { translations } from "../data/translations";
import { SupportedLanguages } from "../types/weather.types";

const convertIntoGeorgianDate = (date: string, supportedLanguage: SupportedLanguages | null): string => {
    const isoDate = date.replace(" ", "T")
    
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(isoDate)){
        return date
    }

    const
        formattedDate = new Date(isoDate).toLocaleString("en-US", {
            weekday: "long", 
            month: "long",  
            day: "numeric"
        }),

        engWeekday = formattedDate.split(',')[0],
        engMonth = formattedDate.split(' ')[1],
        translatedWeekday = translations.dates.weekdays[engWeekday as keyof typeof translations.dates.weekdays][supportedLanguage ?? 'ka'],
        translatedMonth = translations.dates.months[engMonth as keyof typeof translations.dates.months][supportedLanguage ?? 'ka']

    return formattedDate.replace(engWeekday, translatedWeekday).replace(engMonth, translatedMonth);
}

export {convertIntoGeorgianDate}