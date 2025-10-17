import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/es";

dayjs.extend(customParseFormat);
dayjs.locale("es");

export default function parseDate(input:string):Date|null{
    const formats = 
    [
        "DD/MM/YYYY", 
        "DD [de] MMMM [de] YYYY",
        "D [de] MMMM [de] YYYY",
        "D [de] MMMM YYYY",
        "MMMM [de] YYYY"
    ]
    for(const format of formats){
        const parsed = dayjs(input, format, true);
        if(parsed.isValid()){
            return parsed.toDate();
        }
    }

    const fallback = dayjs(input);
    return fallback.isValid()? fallback.toDate():null;
}