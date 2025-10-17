import { connect, connection } from 'mongoose'

const conn = {
    isConnected: false
}

export async function connectDB() {
    console.log('Connecting...')
    if (conn.isConnected) return;
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error('MONGODB_URI no está definido')
    const db = await connect(MONGODB_URI!)
    console.log(db.connection.db?.databaseName)

    conn.isConnected = !!db.connections[0].readyState
}

connection.on('connected', () => {
    console.log('Mongoose is connected')
})

connection.on('error', (err) => {
    console.log('Mongoose connection error', err)
})