import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    const data = [
        { "icon": "House", "name": "Inicio" },
        { "icon": "DollarSign", "name": "Precios" },
        { "icon": "Settings", "name": "Configuración" },
        { "icon": "ShoppingCart", "name": "Carro de compras" },
        { "icon": "Mail", "name": "Email" },
        { "icon": "Users", "name": "Usuarios" },
        { "icon": "Bell", "name": "Notificaiones" },
        { "icon": "Info", "name": "Información" }
    ];
    return NextResponse.json(data)
}





