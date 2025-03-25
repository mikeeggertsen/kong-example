export class HelloWorldRepository {
  constructor() {}

  async findHelloWorld(): Promise<string> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve("Hello World");
      }, 1000);
    });
  }
}
