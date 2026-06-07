import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 30000,
  fullyParallel: true, 
  retries: process.env.CI ? 2 : 0, 
  reporter: [['html', { open: 'never' }]], 
  
  use: {
    baseURL: 'http://localhost:8080', 
    trace: 'retain-on-failure', 
    video: 'retain-on-failure',

    // ضيف السطور دي:
    launchOptions: {
      slowMo: 2500, // كده هيستنى ثانية ونص بين كل كليك والتانية عشان تلحق تشوفه
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});