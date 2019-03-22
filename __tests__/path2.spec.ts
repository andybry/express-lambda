import { start, Server } from '../src/server'
import axios from 'axios'

let server: Server

beforeAll(async () => {
  server = await start()
})

describe('/path2', () => {
  it('should hit path2', async () => {
    const response = await axios.get<string>(`http://localhost:${server.port}/path2`)
    expect(response.status).toBe(200)
    expect(response.data).toBe('you hit path2\n')
  })
})


afterAll(() => server.stop())