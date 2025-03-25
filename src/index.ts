import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { CommonInjectables } from "./common/constants/injectables";
import { env } from "./common/env/env";
import { DIContainer } from "./di/container";
import { HealthInjectables } from "./health/constants/injectables";
import { HealthController } from "./health/health.controller";
import { HelloWorldInjectables } from "./hello-world/constants/injectables";
import { HelloWorldController } from "./hello-world/hello-world.controller";

const diContainer = new DIContainer();
diContainer.registerModules();
const container = diContainer.getContainer();

const helloWorldController: HelloWorldController =
  container.resolve<HelloWorldController>(
    HelloWorldInjectables.HelloWorldController,
  );

const healthController: HealthController = container.resolve<HealthController>(
  HealthInjectables.HealthController,
);

helloWorldController.registerController();
healthController.registerController();

const app: Hono = container.resolve<Hono>(CommonInjectables.App);

serve(
  {
    fetch: app.fetch,
    port: Number(env.PORT),
  },
  () => {
    console.log(`Server is running on port ${env.PORT} 🚀`);
  },
);
