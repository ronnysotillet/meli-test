import Link from "next/link";


export default function NotFound() {
    return <>
        <h1> 404</h1>
        <text>La pagina no fue encontrada</text>
        <Link href='/'>Ir a inicio</Link>

    </>
}