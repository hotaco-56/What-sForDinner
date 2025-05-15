export default {
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["models/**/*.js"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  transform: { "^.+\\.js$": "babel-jest"},
  moduleFileExtensions: ["js", "json", "node"],
  testMatch: ["**/tests/**/*.test.js"],
  extensionsToTreatAsEsm: ['.js'],
};
