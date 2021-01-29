module.exports = {
  moduleFileExtensions: ['js', 'ts', 'json'],

  testMatch: ['<rootDir>/tests/**/?(*.)spec.[j,t]s'],
  testEnvironment: 'node',

  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
    '^.+\\.(js)$': 'babel-jest',
  },
};
