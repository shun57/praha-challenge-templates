import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from "../functions";
import { DatabaseMock } from "../util";
import { NameApiService } from "../nameApiService";

describe("配列の数字を足す関数", (): void => {
  test("5と5を与えると10を返す", (): void => {
    expect(sumOfArray([5, 5])).toBe(10);
  });

  test("配列が空の場合は0を返す", (): void => {
    expect(sumOfArray([])).toBe(0);
  });
});

describe("配列の数字を足す非同期関数", (): void => {
  test("1と5を与えると6を返す", (): Promise<void> => {
    return expect(asyncSumOfArray([1, 5])).resolves.toBe(6);
  });

  test("配列が空の場合は0を返す", (): Promise<void> => {
    return expect(asyncSumOfArray([])).resolves.toBe(0);
  });
});

describe("配列の数字を足して時々0を返す非同期関数", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });
  const databaseMock = new DatabaseMock();
  test("100と200を渡すと300を返す", async (): Promise<void> => {
    const databaseSpy = jest.spyOn(databaseMock, "save").mockReturnValue();
    const result = await asyncSumOfArraySometimesZero([100, 200], databaseMock);

    expect(result).toBe(300);
    expect(databaseSpy).toHaveBeenCalledTimes(1);
  });

  test("依存関数がエラーの場合は0を返す", async (): Promise<void> => {
    const databaseSpy = jest
      .spyOn(databaseMock, "save")
      .mockImplementationOnce((): void => {
        throw new Error("fail!");
      });
    const result = await asyncSumOfArraySometimesZero([-5, 10], databaseMock);

    expect(result).toBe(0);
    expect(databaseSpy).toHaveBeenCalledTimes(1);
  });

  test("配列が空の場合はエラー", async (): Promise<void> => {
    const databaseSpy = jest.spyOn(databaseMock, "save").mockReturnValue();
    const result = await asyncSumOfArraySometimesZero([], databaseMock);

    expect(result).toBe(0);
    expect(databaseSpy).toHaveBeenCalledTimes(1);
  });
});

describe("氏名を返し、指定した数値より氏名が長すぎる場合はエラーを返す関数", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  const getFirstNameMock = jest
    .spyOn(NameApiService.prototype, "getFirstName")
    .mockResolvedValue("mockName");

  test("氏名を返す", async (): Promise<void> => {
    const result = await getFirstNameThrowIfLong(9, NameApiService.prototype);
    expect(result).toBe("mockName");
    expect(getFirstNameMock).toHaveBeenCalledTimes(1);
  });

  test("氏名が長すぎる場合はエラー", async (): Promise<void> => {
    await expect(
      getFirstNameThrowIfLong(1, NameApiService.prototype)
    ).rejects.toThrow("first_name too long");
    expect(getFirstNameMock).toHaveBeenCalledTimes(1);
  });
});
