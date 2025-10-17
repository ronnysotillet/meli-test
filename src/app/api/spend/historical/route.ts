import { NextResponse } from "next/server";

function agruparPorCampo(data: any[], campo: string) {
  const resultado: Record<string, number> = {};

  data.forEach((item) => {
    const clave = item[campo];
    const spend = Number(item.spend) || 0;

    if (!resultado[clave]) resultado[clave] = 0;
    resultado[clave] += spend;
  });

  return Object.entries(resultado).map(([nombre, total]) => ({
    [campo]: nombre,
    totalSpend: total,
  }));
}

export async function POST(req: Request) {
  const { datos, filtro } = await req.json(); 

  if (!datos || !Array.isArray(datos)) {
    return NextResponse.json(
      { error: "Debes enviar un arreglo válido de 'datos'."},
      { status: 400 }
    );
  }

  if (!filtro) {
    return NextResponse.json(
      { error: "Debes enviar el nombre del campo por el cual filtrar (filtro)." },
      { status: 400 }
    );
  }
  
  const agrupado = agruparPorCampo(datos, filtro);
  
  return NextResponse.json({
    filtroUsado: filtro,
    agrupado:agrupado,
  });
}

