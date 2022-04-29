module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/functions.ts",
    "**/nameApiService.ts",
    "**/error-middleware.ts",
  ],
};
