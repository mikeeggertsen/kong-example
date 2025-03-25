import { Hono } from "hono";
import { IBaseController } from "../common/interfaces/base-controller-interface";
import { HttpStatus } from "../common/constants/http-status";

export class HealthController implements IBaseController {
  constructor(private readonly app: Hono) {}

  registerController() {
    this.app.get("/health", async () => {
      return new Response("OK", {
        status: HttpStatus.OK,
      });
    });
  }
}
