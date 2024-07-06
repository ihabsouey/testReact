module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
  },
  setupFilesAfterEnv: [require.resolve("./setupTests.ts")],
  testEnvironment: "jsdom",
};
