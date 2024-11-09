import express from 'express'

interface Options {
  port?: number;
}

export class Server {

  public readonly app = express();
  private readonly port: number;
  constructor(options: Options) {
    //this.port = options.port ?? 3100;

    const { port = 3100 } = options;
    this.port = port;
  }

  async start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`)
    })
  }
}