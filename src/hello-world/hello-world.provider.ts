import { HelloWorldRepository } from "./hello-world.repository";

export class HelloWorldProvider {
  constructor(private readonly helloWorldRepository: HelloWorldRepository) {}

  async helloWorld(): Promise<string> {
    return await this.helloWorldRepository.findHelloWorld();
  }
}
