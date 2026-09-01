<div align="center">
  <h1>Kathryn’s F1 Study Time</h1>

  <p align="center">
    An F1-themed focus timer with a switchable <b>Study</b> (Pomodoro) and <b>Exam</b> (countdown) mode
  </p>
</div>

> **Fork notice.** This project is a fork of [**Pitmydoro**](https://github.com/srteerra/pitmydoro)
> by [Angel Lopez (@srteerra)](https://github.com/srteerra), used under the **GPL-3.0** license.
> All original design, artwork, and team liveries belong to the upstream project. This fork adds an
> **Exam mode** (fixed countdown with section splits and milestone alerts). Because the upstream is
> GPL-3.0, this fork is also GPL-3.0 — see [LICENSE](./LICENSE). Not affiliated with Formula 1 or any
> of its teams or drivers.

---

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-blue">
  <img src="https://img.shields.io/badge/package_manager-bun-brightgreen.svg" alt="Bun">
  <img alt="GitHub License" src="https://img.shields.io/github/license/srteerra/pitmydoro">
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/srteerra/pitmydoro">
  <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/srteerra/pitmydoro">
  <img src="https://img.shields.io/badge/PRs-welcome-blue.svg" alt="PRs Welcome">
  <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
  <img src="https://img.shields.io/badge/tested_with-playwright-99424f.svg" alt="Tested with Playwright">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/srteerra/pitmydoro">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/srteerra/pitmydoro">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/srteerra/pitmydoro">
</p>

Pitmydoro is an open-source application that combines the Pomodoro Technique with Formula 1 visual concepts. You don't need to be an F1 fan or understand racing terms to use it—it simply gives your work sessions a unique, engaging twist.

<img width="1200" height="630" alt="wpsladmpfj3f1" src="https://github.com/user-attachments/assets/394dbbc8-b8be-4ace-901f-c7a9eee96832" />

The app features smooth animations, full customization options, and a fresh take on the traditional Pomodoro timer. It's productivity made visually appealing, designed for anyone looking to focus better while enjoying a modern, dynamic interface.

### 🔘 Tire compounds as custom durations for your sessions

Choose between Soft, Medium, or Hard compounds to set different work session lengths that fit your workflow

<img width="550" height="314" alt="image" src="https://github.com/user-attachments/assets/68a844c6-9624-4736-8a38-d4870bb7a8ed" />

### 📋Manage your tasks between sessions

Create, organize, and track your to-do list

<img width="550" height="377" alt="image" src="https://github.com/user-attachments/assets/3c18376f-b777-4212-b105-73273b2fb885" />

---

## ✨ Features

- 🎓 **Exam mode** (added in this fork): a single fixed-length countdown with editable sections, milestone alerts (halfway + configurable "minutes left" warnings), a progress bar, and a "time's up" radio call. Toggle it from the graduation-cap icon in the header.
- 📚 **Study mode**: the original Pomodoro experience, unchanged.
- 🏁 F1-Inspired Design: An interface where a Formula 1 car will be racing while you're in an active session. Each tire compound represents different session durations
- ⏱️ Classic Pomodoro: 25-minute work sessions with 5-minute pit stops (configurable)
- 🎯 Customizable Intervals: Adjust work and break durations to your pace
- 🔊 Sound Effects: Team radio notifications when your time is about to end
- 🎨 Team Themes: Choose your favorite F1 team livery (Ferrari, Mercedes, Red Bull, McLaren, etc.). This changes the entire app's color palette
- 🌙 Dark/Light Mode: Race day and night mode for comfortable viewing
- 📱 Fully Responsive: Works flawlessly on desktop, tablet, and mobile
- 💾 Session Persistence: Never lose your progress with auto-save

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20
- pnpm (`npm install -g pnpm`)

### Installation

```bash
# Step 1 - Install all the dependencies
pnpm install

# Step 2 - Run the application
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

> This fork pins `pnpm` and includes an `.npmrc` with `node-linker=hoisted` so that
> transitive imports (e.g. `use-intl`) resolve the same way they do under npm/bun.

---

## 🛠️ Tech Stack

Some of the tech we're using it's [Next.js 15](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [Vercel](https://vercel.com/)

---

## 🎨 Environment Variables

You can check the [.env.example](https://github.com/srteerra/pitmydoro/blob/master/.env.example):

```env
NEXT_PLAYWRIGHT_TEST_BASE_URL= // This is used for testing with playwright
```

## Supported Languages

- Spanish
- English
  (feel free to add your translation)

## ! Disclaimer

This project is not affiliated with Formula 1, or any of its teams or drivers.
