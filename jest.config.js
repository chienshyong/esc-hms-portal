module.exports = {
    moduleNameMapper: {
        '^@/utils/login$': '<rootDir>/frontend/utils/login.js',
        '^@/(.*)$': '<rootDir>/frontend/$1',
        '\\.css$': 'identity-obj-proxy',
        
      },
      testEnvironment: 'jest-environment-jsdom',
      
      transformIgnorePatterns: [
        '/node_modules/', 
        '\\.css$', 
        'next-auth/react',
      ],
      transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
      },
  };