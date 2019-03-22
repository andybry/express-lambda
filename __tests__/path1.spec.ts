import { start, Server } from '../src/server'
import axios from 'axios'

let server: Server

beforeAll(async () => {
  server = await start()
})

describe('/path1', () => {
  it('should hit path1', async () => {
    const response = await axios.get<string>(`http://localhost:${server.port}/path1`)
    expect(response.status).toBe(200)
    expect(response.data).toBe('you hit path1\n')
  })
})


afterAll(() => server.stop())