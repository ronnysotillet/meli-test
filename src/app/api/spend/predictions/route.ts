import { NextResponse } from "next/server";

function agruparPorCampo(data: any[], campo: string) {
  const resultado: Record<
    string,
    { proyected_spend: number; max_spend: number; min_spend: number }
  > = {};

  data.forEach((item) => {
    const clave = item[campo];
    if (!resultado[clave]) {
      resultado[clave] = { proyected_spend: 0, max_spend: 0, min_spend: 0 };
    }

    const proyected_spend = Number(item.proyected_spend) || 0;
    const maxSpend = Number(item.max_spend) || 0;
    const minSpend = Number(item.min_spend) || 0;

    resultado[clave].proyected_spend += proyected_spend;
    resultado[clave].max_spend += maxSpend;
    resultado[clave].min_spend += minSpend;
  });

  return Object.entries(resultado).map(([nombre, totales]) => ({
    [campo]: nombre,
    spendp: totales.proyected_spend,
    range: [totales.min_spend,totales.max_spend],

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

