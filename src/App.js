import Car from './domain/Car.js';
import GameManager from './domain/GameManager.js';
import Validator from './domain/Validator.js';
import Console from './util/Console.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';

class App {
  #gameManager = new GameManager();
  #cars = [];

  async play() {
    await this.readCarName();
    await this.readTryCount();

    this.#gameManager.moveCar();

    const carsStatus = this.#cars.map((car) => car.getStatus());
    this.printProcessResult();
    this.printWinner(carsStatus);

    this.quit();
  }

  async readCarName() {
    const carNames = await InputView.readCarName();
    try {
      Validator.carName(carNames);
      this.#gameManager.addCars(carNames);
    } catch (error) {
      OutputView.printErrorMessage(error);
      await this.readCarName();
    }
  }

  async readTryCount() {
    const tryCount = await InputView.readTryCount();
    try {
      Validator.tryCount(tryCount);
      this.#gameManager.saveTryCount(Number(tryCount));
    } catch (error) {
      OutputView.printErrorMessage(error);
      await this.readTryCount();
    }
  }

  printProcessResult(carsStatus) {
    const carsStatus = this.#gameManager.getCarsStatus();
    OutputView.printProcessResult(carsStatus);
  }

  printWinner(carsStatus) {
    const winner = Car.getWinner(carsStatus);

    OutputView.printWinner(winner);
  }

  quit() {
    Console.close();
  }
}

const app = new App();
app.play();

export default App;
