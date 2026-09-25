# Fit Log — Modern Gym Companion

FitLog is a dark, no-nonsense fitness web application built with Next.js App Router. It allows users to browse an extensive library of workouts, lock lifts into today’s schedule, manage saved bookmarks, and track workout metrics live.

## 🚀 Technologies Used

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling & Components:** Tailwind CSS & DaisyUI
* **Icons:** Lucide React
* **Persistence:** Browser `localStorage`

---

## ✨ Key Features

1. **Dynamic Workout Library:** Fetches and displays workouts from a remote API in a fully responsive 3x4 grid complete with category tags, equipment lines, and live stat indicators.
2. **Interactive Detail & Action Flow:** Detailed workout pages featuring high-res imagery, instruction steps, key specs, and dual action states that dynamically transform when added or saved.
3. **Global Toast Notification System:** Centrally managed feedback via a React Context provider that displays precise toast alerts featuring the workout's name.
4. **Smart Plan & Saved Management (`/my-plan`):** Supports tabbed navigation (`?tab=plan` & `?tab=saved`), live metrics tracking (exercises, duration, and calories), a 5-workout daily plan cap, and sorting utilities.
5. **Robust Error & Loading States:** Includes smooth async loading indicators, persistent client-side data synchronization via `localStorage`, and a custom 404 fallback page for invalid routes.

---