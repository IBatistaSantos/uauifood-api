
module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/infra/db/prisma/**/*.prisma',
    '!<rootDir>/src/infra/db/prisma/client.ts',
    '!<rootDir>/src/**/index.ts'
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  transform: {
    '\\.ts': 'ts-jest'
  },
  clearMocks: true
}
