import { start, Server } from '../src/server'
import axios from 'axios'

let server: Server

beforeAll(async () => {
  server = await start()
})

describe('/', () => {
  it('should hit home', async () => {
    const response = await axios.get<string>(`http://localhost:${server.port}/`)
    expect(response.status).toBe(200)
    expect(response.data).toBe('you hit home\n')
  })
})


afterAll(() => server.stop())