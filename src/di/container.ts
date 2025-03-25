import {
  asClass,
  AwilixContainer,
  createContainer,
  InjectionMode,
  Lifetime,
} from "awilix";
import { CommonInjectables } from "../common/constants/injectables";
import { Hono } from "hono";
import { HealthInjectables } from "../health/constants/injectables";
import { HealthController } from "../health/health.controller";
import { HelloWorldInjectables } from "../hello-world/constants/injectables";
import { HelloWorldController } from "../hello-world/hello-world.controller";
import { HelloWorldProvider } from "../hello-world/hello-world.provider";
import { HelloWorldRepository } from "../hello-world/hello-world.repository";

export class DIContainer {
  private container: AwilixContainer;

  constructor() {
    this.container = createContainer({
      injectionMode: InjectionMode.CLASSIC,
    });
  }

  getContainer(): AwilixContainer {
    return this.container;
  }

  registerModules() {
    this.container.register({
      [CommonInjectables.App]: asClass(Hono).setLifetime(Lifetime.SINGLETON),
      [HelloWorldInjectables.HelloWorldRepository]: asClass(
        HelloWorldRepository,
      ).setLifetime(Lifetime.SINGLETON),
      [HelloWorldInjectables.HelloWorldProvider]: asClass(
        HelloWorldProvider,
      ).setLifetime(Lifetime.SINGLETON),
      [HelloWorldInjectables.HelloWorldController]: asClass(
        HelloWorldController,
      ).setLifetime(Lifetime.SINGLETON),
      [HealthInjectables.HealthController]: asClass(
        HealthController,
      ).setLifetime(Lifetime.SINGLETON),
    });
  }
}
