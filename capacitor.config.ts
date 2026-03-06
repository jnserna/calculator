import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.paloan.app',
  appName: 'Paloan',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
  android: {
    versionCode: 2,
    versionName: '1.0.1',
  },
}

export default config