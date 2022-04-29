import axios from "axios";

export class FizzBuzz {
  public execute(i: number): string {
    return i % 5 == 0 ? "Buzz" : "Fizz";
  }
}

export const dateNow = (): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(Date.now());
  });
};

export const fetchAlbums = async (argument: string) => {
  const url = "https://jsonplaceholder.typicode.com/albums";
  const response = await axios.get(url);
  return response.data;
};
