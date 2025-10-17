import { NextResponse, NextRequest } from "next/server";
import { connectDB } from '@/utils/mongoose'
import Historical from '@/models/historical'

export async function GET() {
    await connectDB()
    const historical = await Historical.find();
    return NextResponse.json(historical)
}

export async function POST(request: NextRequest) {
    await connectDB()
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
        const newHistorical = new Historical(data);
        const savedHistorical = await newHistorical.save();
        
        return NextResponse.json(savedHistorical)
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
            const newHistorical = new Historical(element);
            const savedHistorical = await newHistorical.save();
            successRegister.push(`${index}: ${savedHistorical}`);
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

