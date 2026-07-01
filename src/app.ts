import  express, { type Request, type Response, Router } from 'express'
import { routes } from './routes'
import { Prisma, PrismaClient } from '@prisma/client/extension'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const app = express()

app.use(express.json())
app.listen(3000, () => console.log("servidor rodando"))

app.get("/ping", (req: Request, res: Response) => {
    return res.status(200).send("pong")
})

app.use(routes)

const adapter = new PrismaBetterSqlite3({url: process.env.DATABASE_URL || "DATABASE_URL not found"})
const prisma = new PrismaClient({adapter})

export { prisma }
