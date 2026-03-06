import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.paloan.app',
  appName: 'Paloan',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
}

export default config