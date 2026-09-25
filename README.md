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

## 🚀 Advanced Features & AI-Assisted Enhancements

Beyond fulfilling the core assignment requirements, I wanted to push this application further to create a polished, production-ready user experience. Inspired by my instructor to explore how AI can assist in modern software development, I used AI as a brainstorming partner to suggest creative features and UX improvements that weren't part of the initial rubric. 

Once I had those suggestions, I dove into the official documentation, structured the TypeScript types, handled the state management, and implemented everything by hand. Here are the key extra features added to the app:

* **Custom Workout Creator & Local Persistence:** Built a fully interactive modal allowing users to create custom lifts (with custom names, durations, equipment, and image URLs) saved securely to browser `localStorage`.
* **Custom Workout Deletion & Cascading State:** Implemented complete deletion logic with cascade cleanup, ensuring deleted custom lifts are automatically scrubbed from active plans and saved favorites to prevent broken states or orphaned references.
* **Home Page Library Constraints & Dedicated Catalog:** Optimized the home page UX by capping the main library display to **9 API items and 3 custom items**, paired with a dedicated **All Workouts Catalog (`/workouts`)** page for unconstrained browsing.
* **Robust Dynamic Routing & ID Handling:** Engineered safe string-versus-number ID comparisons (`custom-[timestamp]` formatting) and a direct `localStorage` fallback inside dynamic route parameters (`/workouts/[id]`) to completely eliminate false "Not Found" errors.
* **Workout History & Streak Tracking:** Added an integrated history log with streak counters, completion timestamps, and a reset confirmation mechanism.