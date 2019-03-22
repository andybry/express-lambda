import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.get('/', (req, res) => res.send('you hit home\n'))
app.get('/path1', (req, res) => res.send('you hit path1\n'))
app.get('/path2', (req, res) => res.send('you hit path2\n'))

export default app