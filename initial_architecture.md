1. Project Overview

This document defines the full requirements for Paloan, an Android mobile application that functions as a loan amortization calculator. The application is targeted at a young adult audience and will feature a modern, vibrant UI styled accordingly. The entire user interface must be rendered in Spanish.


2. Project Summary

App Name: Paloan
Platform: Android
Build Tool: Capacitor (Ionic Capacitor)
Frontend Framework: Next.js (static export via next export) or React + Vite if Next.js SSR features are incompatible with Capacitor (see Section 2)
UI Language: Spanish
Code / Docs Language: English
Target Audience: Young adults (18–40)
Primary Function: Loan amortization calculation, schedule generation, and payment visualization


3. Framework Recommendation

Next.js can be used with Capacitor as long as the project is configured for static export (output: 'export' in next.config.js). This eliminates any server-side rendering dependency and produces a fully static SPA that Capacitor can wrap as an Android app. If at any point during development SSR or server-dependent features become a requirement, switch to React + Vite as the framework, which is natively compatible with Capacitor.

4. Stack Details

•	Framework: Next.js (static export mode) with TypeScript
•	Mobile Wrapper: Capacitor (latest stable version)
•	Styling: Tailwind CSS with a custom color palette targeting young adults (vibrant purples, teals, gradients)
•	Charting Library: Recharts or Chart.js (for the Payment Visualization screen)
•	State Management: React useState / useContext (no Redux needed for this scope)
•	Navigation: Next.js file-based routing or React Router if using Vite fallback


5. Build and Deployment

The project must be compilable and runnable through Capacitor's Android platform. The developer should be able to run:
•	npx next build && npx next export (or equivalent Vite build)
•	npx cap sync android
•	npx cap open android (to open in Android Studio)
•	npx cap run android (to run on device/emulator)


6. Screen Definitions

The application consists of four screens. Navigation between them is linear and deterministic as described below.

## Screen 1 — Main Screen (Pantalla Principal)
This is the landing screen shown when the user opens the app. It contains all input fields required to define a loan and trigger the calculation.

### Section 1: Loan Information (Información del Préstamo)
Three text input fields, stacked vertically:
1.	Monto del Préstamo (Loan Amount) — numeric input, accepts decimals.
2.	Tasa de Interés (%) (Interest Rate) — numeric input, percentage value.
3.	Plazo del Préstamo (Años) (Loan Period in Years) — numeric input, integer.
All inputs must include proper validation: no negative numbers, no empty fields, reasonable upper bounds (e.g., interest rate capped at 100%, term capped at 50 years). Display inline validation errors in Spanish.

### Section 2: Payment Options (Opciones de Pago)
This section contains two subsections, each offering mutually exclusive options (radio-button or toggle-pill style selection).
Subsection A — Repayment Frequency (Frecuencia de Pago):
•	Mensual (Monthly) — DEFAULT selected
•	Anual (Annually)
Subsection B — Repayment Type (Tipo de Pago):
•	Capital e Interés (Principal and Interest) — DEFAULT selected
•	Solo Interés (Interest Only)
Only one option can be active per subsection at any time. Use a visually distinct toggle or pill-button pattern consistent with the young-adult aesthetic.
### Section 3: Action Buttons (Botones)
A single prominent button:
•	Calcular (Calculate) — On click, validates all inputs. If valid, navigates to Screen 2 passing all input values and selected options. If invalid, displays corresponding error messages.

### Overflow Menu (Menú de Opciones)
A three-dot icon (vertical ellipsis) placed in the top-right corner of the screen header/toolbar. On tap, it reveals a dropdown or bottom sheet with two options:
•	Calificar App (Rate App) — Opens the Google Play Store listing for the app (or a placeholder deep link during development).
•	Política de Privacidad (Privacy Policy) — Opens a webview or external browser link pointing to the app's privacy policy URL (URL to be configured as a constant).



## Screen 2 — Results Summary (Resumen de Resultados)
Displayed after the user taps 'Calcular' on Screen 1. Shows computed results in two card components and provides navigation to detailed views.
### Card 1: Loan Summary (Resumen del Préstamo)
Displays the following data:
•	Cuota Mensual / Cuota Anual (Monthly or Annual Payment) — the calculated repayment amount, labeled dynamically based on the selected frequency.
•	Monto del Préstamo (Loan Amount) — echoes the user's input.
•	Tasa de Interés (Interest Rate) — echoes the user's input with '%' suffix.
•	Plazo (Term) — echoes the user's input with 'años' suffix.
### Card 2: Payment Breakdown (Desglose del Pago)
Displays:
•	Capital (Principal) — total principal amount.
•	Interés Total (Total Interest) — sum of all interest payments over the loan term.
•	Costo Total del Préstamo (Total Loan Cost) — Principal + Total Interest.
### Navigation Buttons
1.	Tabla de Amortización (Amortization Schedule) — navigates to Screen 3.
2.	Visualización de Pagos (Payment Visualization) — navigates to Screen 4.
### Back Navigation
A clearly visible back button (arrow icon or labeled 'Volver') in the header that returns the user to Screen 1. Input values should be preserved so the user can adjust and recalculate.


## Screen 3 — Amortization Schedule (Tabla de Amortización)
Displays the full amortization schedule in a scrollable table format.

The table adapts its period label based on the user's selected repayment frequency:

Columna - Descripción - Formato
- Período	- Month number (1, 2, 3…) or Year number depending on frequency	- Integer
- Capital	- Principal portion of each payment	- Currency
- Interés -	Interest portion of each payment - Currency
- Pago - Total payment for the period (Capital + Interés) - Currency

The table must be scrollable for loans with many periods. Consider sticky headers for usability.

### Back Navigation
Back button returns the user to Screen 2 (Results Summary).


## Screen 4 — Payment Visualization (Visualización de Pagos)
A graphical representation of the loan's payment progression over time.
### Chart Specification
Chart Type: Line chart or area chart.
X-Axis: Time (months or years, matching the selected repayment frequency). Label: 'Período'.
Y-Axis: Amount in currency. Label: 'Monto'.

Two data series:
1.	Capital Restante (Remaining Principal) — shows how the outstanding principal decreases over time. Use a distinct color (e.g., vibrant purple or teal).
2.	Costo Acumulado (Cumulative Total Cost) — shows the running total of all payments made (Principal + Interest). Use a contrasting color (e.g., coral or amber).

Include a legend identifying each series. The chart should be responsive and touch-friendly on mobile.

### Back Navigation
Back button returns the user to Screen 2 (Results Summary).




## Calculation Logic

### Principal and Interest (Capital e Interés)
Use the standard amortization formula for fixed-rate loans:
M = P × [ r(1+r)^n ] / [ (1+r)^n – 1 ]
Where: M = periodic payment, P = loan principal, r = periodic interest rate (annual rate divided by number of periods per year), n = total number of payments.
### Interest Only (Solo Interés)
For Interest Only loans, the periodic payment is simply: M = P × r
The principal remains unchanged across all periods. The total cost of the loan is: Total Cost = (M × n) + P.
### Frequency Adjustment
If Monthly is selected: r = annual rate / 12, n = years × 12.
If Annually is selected: r = annual rate, n = years.



## UI/UX Design Guidelines

1. Visual Style
The app targets young adults (18–30). The design should feel modern, clean, and energetic without being overwhelming. Specific guidelines:
•	Color Palette: Use a vibrant primary color (recommended: electric purple #6C5CE7 or similar) with complementary accents (teal #00CEC9, coral #FF7675, amber #FDCB6E). Dark text on light backgrounds for readability.
•	Typography: Use a clean sans-serif font (system default or Inter/Poppins via Google Fonts). Clear hierarchy with size and weight.
•	Cards: Rounded corners (12–16px radius), subtle shadows or elevation, generous padding.
•	Buttons: Rounded, filled primary buttons with clear hover/press states. Use gradients sparingly for the main CTA.
•	Inputs: Clean bordered inputs with floating labels or placeholder text in Spanish. Clear focus states with the primary color.
•	Toggle/Pill Selectors: Rounded pill-style selectors for the Payment Options. Active state uses the primary color fill; inactive uses outlined style.
•	Spacing: Generous whitespace. Avoid cramped layouts. Use vertical rhythm consistently.
•	Icons: Use a modern icon set (Lucide, Heroicons, or Material Symbols Outlined).

2. Responsiveness
Although the app is Android-only, it must render correctly across different Android screen sizes and densities (phones and tablets). Test at minimum on 360px and 412px width viewports.


3. Accessibility
Ensure sufficient color contrast ratios (WCAG AA minimum). All interactive elements must have accessible labels. The app should be navigable with TalkBack screen reader.


## Navigation Flow
The navigation is linear and straightforward:
1.	Screen 1 (Main) → [Calcular] → Screen 2 (Results)
2.	Screen 2 → [Tabla de Amortización] → Screen 3 (Schedule)
3.	Screen 2 → [Visualización de Pagos] → Screen 4 (Chart)
4.	Screen 3 → [Back] → Screen 2
5.	Screen 4 → [Back] → Screen 2
6.	Screen 2 → [Back] → Screen 1 (preserving input values)

The Android hardware back button should mirror the in-app back button behavior on each screen.

## Data and state Management

There is no backend, database, or user authentication. All data is computed client-side and held in application state during the session. When the user navigates back from Screen 2 to Screen 1, the previously entered values must persist so the user can modify and recalculate without re-entering everything.


## Future Considerations (Out of Scope for V1)

The following features are explicitly not part of this version but may be added later:
•	Export amortization schedule to PDF or CSV.
•	Multiple loan comparison side by side.
•	Dark mode toggle.
•	Loan type presets (mortgage, auto, personal).
•	Localization for languages other than Spanish.



## Delivarables checklist

When coding this app with Claude Code, the output should include:
1.	Complete source code in a Next.js (or Vite + React) project with TypeScript.
2.	Capacitor configuration files (capacitor.config.ts) ready for Android build.
3.	All four screens implemented and navigable.
4.	Correct amortization calculations for both repayment types and frequencies.
5.	Responsive chart on Screen 4 with both data series.
6.	Full amortization table on Screen 3 with sticky headers.
7.	Overflow menu with Rate App and Privacy Policy links.
8.	All UI text in Spanish as specified.
9.	Input validation with Spanish error messages.
10.	Tailwind CSS styling matching the young-adult design guidelines.
11.	README.md with setup, build, and deployment instructions.