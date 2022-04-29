import { NameApiService } from "../nameApiService";
import { AxiosClient } from "../axiosClient";

describe("氏名を取得する関数", (): void => {
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  const apiClient = new AxiosClient();
  const nameApiService = new NameApiService(apiClient);

  test("氏名を返す", async (): Promise<void> => {
    /*eslint @typescript-eslint/camelcase: ["error", {allow: ["first_name"]}]*/
    const data = { data: { first_name: "fn" } };
    apiClient.get = jest.fn().mockReturnValue(data);
    const firstName = await nameApiService.getFirstName();
    expect(firstName).toBe("fn");
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });

  test("氏名が4文字以上の場合はエラー", async (): Promise<void> => {
    /*eslint @typescript-eslint/camelcase: ["error", {allow: ["first_name"]}]*/
    const data = { data: { first_name: "abcde" } };
    apiClient.get = jest.fn().mockReturnValue(data);
    await expect(nameApiService.getFirstName()).rejects.toThrow(
      "firstName is too long!"
    );
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });

  test("add null firstName to throw error", async (): Promise<void> => {
    /*eslint @typescript-eslint/camelcase: ["error", {allow: ["first_name"]}]*/
    const data = null;
    apiClient.get = jest.fn().mockReturnValue(data);
    await expect(nameApiService.getFirstName()).rejects.toThrow();
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });

  test("apiClient error to throw error", async (): Promise<void> => {
    /*eslint @typescript-eslint/camelcase: ["error", {allow: ["first_name"]}]*/
    const data = new Error();
    apiClient.get = jest.fn().mockReturnValue(data);
    await expect(nameApiService.getFirstName()).rejects.toThrow();
    expect(apiClient.get).toHaveBeenCalledTimes(1);
  });
});
