import express from 'express'
import dotenv from 'dotenv'
import url from 'url'
import path from 'path'

dotenv.config()

const port = process.env.PORT || 3000
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.static(__dirname))
app.use('/', (_, res) => res.sendFile(path.join(__dirname, 'index.html')))
app.listen(port)
