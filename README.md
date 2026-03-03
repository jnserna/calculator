# Paloan

Android loan amortization calculator app. Built with Next.js (static export), Capacitor, and Tailwind CSS.

## Prerequisites

- Node.js 18+
- Android Studio (with Android SDK)
- Java 17 (required by Gradle)
- An Android device or emulator

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Development (browser)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in a browser.

### 3. Build static export

```bash
npm run build
```

This runs `next build` and produces a fully static `out/` directory ready for Capacitor.

### 4. Sync to Android

After building, sync the web assets into the Android project:

```bash
npx cap sync android
```

If the Android platform hasn't been added yet, run this once first:

```bash
npx cap add android
```

### 5. Open in Android Studio

```bash
npx cap open android
```

This opens the `android/` project in Android Studio where you can run it on a device or emulator.

### 6. Run directly on device/emulator

```bash
npx cap run android
```

## Project Structure

```
├── app/                         # Next.js App Router pages
│   ├── page.tsx                 # Screen 1: Main (Pantalla Principal)
│   ├── results/page.tsx         # Screen 2: Results Summary
│   ├── schedule/page.tsx        # Screen 3: Amortization Table
│   └── visualization/page.tsx  # Screen 4: Payment Chart
├── components/                  # Reusable UI components
├── context/                     # React Context state management
├── lib/                         # Calculation logic and utilities
├── types/                       # TypeScript type definitions
├── capacitor.config.ts          # Capacitor configuration
└── next.config.ts               # Next.js static export config
```

## Configuration

- **App ID**: `com.paloan.app` — update in `capacitor.config.ts` before publishing
- **Privacy Policy URL**: update `PRIVACY_POLICY_URL` in `lib/constants.ts`
- **Play Store URL**: update `PLAY_STORE_URL` in `lib/constants.ts` once published

## Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Pantalla Principal | `/` | Loan input form |
| Resumen de Resultados | `/results` | Payment summary + breakdown |
| Tabla de Amortización | `/schedule` | Full amortization table |
| Visualización de Pagos | `/visualization` | Area chart of loan progression |
