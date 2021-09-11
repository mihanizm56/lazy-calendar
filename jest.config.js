module.exports = {
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '(/tests/.*|(\\.|/)(test))\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/tests/$1',
  },
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: '<rootDir>/coverage',
};
