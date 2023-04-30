export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupJest.js"],
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).(ts|tsx)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "@swc/jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
