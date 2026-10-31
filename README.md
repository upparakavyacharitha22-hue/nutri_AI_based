# NutriAI — Smarter Nutrition. Healthier You.

> **Production-Grade AI-Powered Nutrition & Wellness SaaS Web Application**  
> Full-Stack Node.js/Express + Vanilla JavaScript Architecture • Health-Tech Design System

---

## 🌿 Overview

**NutriAI** is an advanced AI nutrition and lifestyle platform created to provide personalized dietary guidance, clinical metabolic calculations, intelligent meal planning, food plate computer vision, and real-time conversational nutrition coaching.

Built with a high-growth startup design standard, NutriAI eliminates the frustration of generic fad diets through science-backed clinical physiology equations (Mifflin-St Jeor, WHO standards) combined with intuitive modern web experiences.

---

## 🚀 Key Highlights & Architecture

- **Full-Stack Architecture**: Node.js + Express backend (`server.js`) serving static assets and secure backend endpoints for AI vision, AI meal generation, Google OAuth verification, and 2FA.
- **Offline Vector SVG Engine (`icons.js`)**: 70+ custom pixel-perfect SVG icons rendered offline without relying on external CDNs.
- **Single Page Application (SPA) Router**: Instant zero-reload navigation across all **20 Public and Authenticated Pages** via client-side hash routing (`#home`, `#dashboard`, `#meal-plan`, `#recipes`, `#scanner`, etc.).
- **⚡ Instant 1-Click Demo Mode**: Switch seamlessly between the public marketing landing pages and the full authenticated member portal with pre-populated, realistic nutrition telemetry.
- **Full State Persistence**: Preserves user biometrics, custom food entries, meal logs, hydration progress, theme, and chat history using browser `localStorage`.
- **Minor / Adolescent Safety Engine**: When user age is < 18, the system automatically disallows aggressive caloric deficits, issues pediatric nutrition guidance, and defaults to balanced growth nutrition.

---

## 🛠️ Feature Status & Configuration Matrix

| Feature | Working Out-of-the-Box? | Requires External API Key? | Fallback Behavior When Unconfigured |
| :--- | :---: | :---: | :--- |
| **User Onboarding (3-Step)** | ✅ **Yes** | ❌ No | Fully interactive with Mifflin-St Jeor TDEE target calculation. |
| **Minor / Youth Nutrition Guard** | ✅ **Yes** | ❌ No | Age < 18 locks calorie deficit, displays clinical notice banner. |
| **Personalized Meal Planner** | ✅ **Yes** | Optional (`GEMINI_API_KEY`) | Generates full-day plans using Gemini; gracefully falls back to 40+ curated clinical recipes filtered by diet & allergy. |
| **Meal Refresh & Swap** | ✅ **Yes** | ❌ No | Preserves preferences/allergies; swaps individual slot with duplicate prevention. |
| **Interactive Recipe Modal** | ✅ **Yes** | ❌ No | Exact ingredients, step-by-step instructions, chef tips, substitutions, favorites toggle, and direct logging. |
| **AI Food Scanner (Upload & Live Cam)** | ✅ **Yes** | Optional (`GEMINI_API_KEY`) | Real camera stream + file upload; 5 curated sample test plates with instant macronutrient breakdown when offline. |
| **Google Sign-In** | ✅ **Yes** | Optional (`GOOGLE_CLIENT_ID`) | Google Identity Services (GIS) flow with backend verification; includes 1-click verified sandbox test profile. |
| **Two-Factor Authentication (2FA)** | ✅ **Yes** | ❌ No | 6-box OTP entry, auto-focus, countdown timer, simulated OTP preview banner, and emergency recovery key unlock. |
| **Clinical Calculators (BMI & TDEE)** | ✅ **Yes** | ❌ No | Mifflin-St Jeor energy expenditure, interactive BMI needle gauge, Metric/Imperial toggle. |
| **Food Tracker & Hydration** | ✅ **Yes** | ❌ No | Daily calorie budget ring, macro bars, 120+ food database, custom food logger, water cups logger. |
| **AI Nutrition Chatbot** | ✅ **Yes** | Optional (`GEMINI_API_KEY`) | Real Gemini response when configured; evidence-based conversational fallback with quick query chips. |
| **Smart Grocery List** | ✅ **Yes** | ❌ No | Aggregates ingredients dynamically from current meal plan with 1-click clipboard copy and print. |

---

## 💻 Running the Application Locally

### Prerequisites
- Node.js (version 16 or higher)
- npm (installed with Node.js)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and insert your credentials:
```ini
PORT=8080
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GEMINI_API_KEY=your_gemini_api_key_here
```
> **Note**: If you don't have API keys right away, NutriAI runs out-of-the-box with clinical fallbacks, verified test sandbox logins, and 5 curated test plates.

### Step 3: Start the NutriAI Server
```bash
npm start
```
*(Or directly with Node: `node server.js`)*

### Step 4: Open in Your Browser
Visit:
```
http://localhost:8080
```

---

## 🔑 Google Cloud Console Configuration Instructions

To enable live Google Sign-In with real Google accounts:
1. Visit the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Navigate to **APIs & Services** > **Credentials**.
4. Click **Create Credentials** > **OAuth Client ID**.
5. Select **Web application** as the application type.
6. Add **Authorized JavaScript Origins**:
   - `http://localhost:8080`
   - `http://127.0.0.1:8080`
7. Add **Authorized Redirect URIs**:
   - `http://localhost:8080`
8. Copy the **Client ID** and paste it into `.env` as `GOOGLE_CLIENT_ID` (or enter it into the NutriAI Google Sign-In setup modal).
