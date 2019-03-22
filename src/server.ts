import app from './app'
import { Server as NodeServer } from 'net';

export interface Server {
  port: number;
  stop: () => Promise<void>
}

const stop = (nodeServer: NodeServer): Promise<void> => new Promise(
  (res, rej) => nodeServer.close(err => err ? rej(err) : res())
)

export const start = (port?: number): Promise<Server> => new Promise((res, rej) => {
  const onStart = () => {
    const address = nodeServer.address()
    address && typeof address !== 'string' ?
      res({ port: address.port, stop: () => stop(nodeServer) }) :
      rej(new Error('Could not start server'))
  }
  const nodeServer = port ? app.listen(port, onStart) : app.listen(onStart)
})


if (process.argv[1] === __filename) {
  start(3000).then(server => console.log(`server started: http://localhost:${server.port}`))
}