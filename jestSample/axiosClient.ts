import Axios from "axios";

export class AxiosClient {
  public async get($uri: string) {
    return await Axios.get($uri);
  }
}
