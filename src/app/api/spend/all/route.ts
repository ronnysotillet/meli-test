import { NextResponse } from "next/server";

function agruparHistPorCampo(data: any[], campo: string) {
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

function agruparPredPorCampo(data: any[], campo: string) {
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

const unirPorCampo = (pred: any[], hist: any[], campo: string) => {
  const mapa = new Map<string, any>();

  pred.forEach((item) => {
    const clave = item[campo];
    mapa.set(clave, { ...item });
  });

  hist.forEach((item) => {
    const clave = item[campo];
    if (mapa.has(clave)) {
      mapa.set(clave, { ...mapa.get(clave), ...item });
    } else {
      mapa.set(clave, { ...item });
    }
  });

  return Array.from(mapa.values());
};

export async function POST(req: Request) {
  const { pred, hist, filtro } = await req.json(); 

  if (!pred || !Array.isArray(pred)) {
    return NextResponse.json(
      { error: "Debes enviar un arreglo válido de 'datos'."},
      { status: 400 }
    );
  }

    if (!hist || !Array.isArray(hist)) {
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
  
  const histAgrupado = agruparHistPorCampo(hist, filtro);
  const predAgrupado = agruparPredPorCampo(pred, filtro);

  const all = unirPorCampo(predAgrupado,histAgrupado, filtro)


  console.log(histAgrupado);
  console.log(predAgrupado);
  console.log(all);
  
  return NextResponse.json({
    filtroUsado: filtro,
    agrupado:all,
  });
}

