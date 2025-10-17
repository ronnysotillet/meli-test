import parseDate from "@/utils/parseDate";
import { Schema, model, models } from "mongoose";

const predictionSchema = new Schema(
    {
        vertical: {
            type: String,
            required: [true, 'El campo vertical es requerido'],
            trim: true
        },
        area: {
            type: String,
            required: [true, 'El campo area es requerido'],
            trim: true
        },
        initiative: {
            type: String,
            required: [true, 'El campo initiative es requerido'],
            trim: true
        },
        service: {
            type: String,
            required: [true, 'El campo service es requerido'],
            trim: true
        },
        date: {
            type: Date,
            required: [true, 'El campo date es requerido'],
            trim: true,
            set: (value: any) => {
                if (value instanceof Date) return value;
                const parsed = parseDate(String(value));
                if (!parsed) {
                    throw new Error(`Fecha invalida ${value}`)
                }
                return parsed;
            }
        },
        proyected_spend: {
            type: Number,
            required: [true, 'El campo proyected_spend es requerido'],
            trim: true
        }
        ,
        max_spend: {
            type: Number,
            required: [true, 'El campo max_spend es requerido'],
            trim: true
        },
        min_spend: {
            type: Number,
            required: [true, 'El campo min_spend es requerido'],
            trim: true
        }
    }, {
    timestamps: true
}
)

export default models.Prediction || model('Prediction', predictionSchema)