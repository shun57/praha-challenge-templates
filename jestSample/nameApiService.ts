import { AxiosClient } from "./axiosClient";

export class NameApiService {
  private MAX_LENGTH = 4;
  private apiClient: AxiosClient;
  private nameApiServieUri = "https://random-data-api.com/api/name/random_name";
  public constructor(apiClient: AxiosClient) {
    this.apiClient = apiClient;
  }

  public async getFirstName(): Promise<string> {
    const { data } = await this.apiClient.get(this.nameApiServieUri);
    const firstName = data.first_name as string;

    if (firstName.length > this.MAX_LENGTH) {
      throw new Error("firstName is too long!");
    }

    return firstName;
  }
}
