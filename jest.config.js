module.exports = {
    moduleNameMapper: {
        '^@/utils/login$': '<rootDir>/frontend/utils/login.js',
        '^@/(.*)$': '<rootDir>/frontend/$1',
        
      },
      testEnvironment: 'jest-environment-jsdom',
      
      
  };