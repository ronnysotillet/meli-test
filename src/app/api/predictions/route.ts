import { NextResponse, NextRequest } from "next/server";
import { connectDB } from '@/utils/mongoose'
import Prediction from '@/models/prediction'

export async function GET() {
    await connectDB();
    const prediction = await Prediction.find();
    return NextResponse.json(prediction)
}

export async function POST(request: NextRequest) {
    await connectDB();
    const data = await request.json()
    if (Array.isArray(data)) {
        return saveMassive(data)
    } else {
        return saveOne(data)
    }
}


async function saveOne(data: any) {
    try {
        console.log(data)
        const newPrediction = new Prediction(data);
        const savedPrediction = await newPrediction.save();
        return NextResponse.json(savedPrediction)
    } catch (err: any) {
        return NextResponse.json(err.message, { status: 400 })
    }
}

async function saveMassive(data: any[]) {
    console.log(data)
    var errorRegister: String[] = new Array();
    var successRegister: String[] = new Array();

    await Promise.all(
        data.map(async (element, index) => {
        try {
            const newPrediction = new Prediction(element);
            const savedPrediction = await newPrediction.save();
            successRegister.push(`${index}: ${savedPrediction}`);
        } catch (e: any) {
            errorRegister.push(`Error en la fila ${index}: ${e.message}`);
        }
    }));
    return NextResponse.json({
        success: successRegister,
        errorRegister: errorRegister,
        status: errorRegister.length > 0 ? 400 : 200
    })
}