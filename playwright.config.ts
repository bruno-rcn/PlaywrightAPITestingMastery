import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 1,
  reporter: [['html'], ['list']],
  
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'api-testing',
      testMatch: 'example*'
    },
    {
      name: 'smokeTest',
      testMatch: 'smoke*'
    }
  ],

});
