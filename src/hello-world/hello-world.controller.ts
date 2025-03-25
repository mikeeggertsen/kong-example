import { Hono } from "hono";
import { IBaseController } from "../common/interfaces/base-controller-interface";
import { HelloWorldProvider } from "./hello-world.provider";

export class HelloWorldController implements IBaseController {
  constructor(
    private readonly app: Hono,
    private readonly helloWorldProvider: HelloWorldProvider
  ) {}

  registerController() {
    this.app.get("/hello-world", async () => {
      const data = await this.helloWorldProvider.helloWorld();
      return new Response(data);
    });
  }
}
