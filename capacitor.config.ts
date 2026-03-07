import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.paloan.calculadora',
  appName: 'Paloan',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
}

export default config
