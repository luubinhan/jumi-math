# Copilot Instructions for Jumi Math

## Project Overview
Vietnamese educational game ("Toán Học Nhí") for children 5-9 years old, featuring math challenges and clock reading practice. Built with React 19 + TypeScript + Vite, deployed to GitHub Pages at `/jumi-math/` base path.

## Architecture

### Component Structure
- **App.tsx**: Main state manager using `GameType` enum to control game flow (NONE → MATH/CLOCK → back to NONE on finish)
- **Layout.tsx**: Shared wrapper with decorative background, header with dog avatar, and back button
- **MathGame.tsx**: Progressive difficulty math game (10 questions, 4 options each)
- **ClockGame.tsx**: Analog clock reading practice with custom `ClockFace` component

### State Management Pattern
All games use local useState hooks. No global state library. Game flow:
1. Parent (App) manages `currentGame` state
2. Game components generate questions on mount
3. `onFinish(score)` callback returns to home screen
4. Success screen shows with animated stars

### Question Generation
Both games use in-component question generators:
- **MathGame**: Progressive difficulty (0-10, up to 15, up to 20) with random addition/subtraction
- **ClockGame**: Generates random times, dynamically calculates wrong options with ±1 hour/±15 min variations

## Asset Handling (CRITICAL)

**Always import static assets** - never use relative paths like `./assets/image.png`:

```tsx
// ✅ CORRECT
import workoutDog from '../assets/workout-dog.png';
<img src={workoutDog} alt="..." />

// ❌ WRONG - breaks in production
<img src="./assets/workout-dog.png" alt="..." />
```

Vite requires imports for proper bundling. Three dog images used: `workout-dog.png` (header), `sad-dog.png` (incorrect), `fun-dog.png` (correct).

## Styling Conventions

### Tailwind Usage
- Inline Tailwind classes exclusively (no separate CSS files)
- Playful rounded borders: `rounded-[2rem]`, `rounded-[3rem]`
- 3D button effect: `border-b-8` for depth, `hover:-translate-y-1`, `active:scale-95`
- Nunito font with `.font-kids` utility class (weight 900 for headings)

### Color Scheme
- Math game: Orange theme (`orange-400`, `orange-600`)
- Clock game: Blue theme (`blue-400`, `blue-600`)
- Success states: Green (`green-500`)
- Error states: Red (`red-500`)

### Animations
Custom bounce animation and Tailwind transitions. Visual feedback always includes emoji + color change.

## Vietnamese Localization
All user-facing text in Vietnamese. Key terms:
- "Siêu Nhân Toán Học" (Math Superhero)
- "Bậc Thầy Thời Gian" (Time Master)
- "Làm Tốt Lắm!" (Well done!)
- Random encouragement messages: "GIỎI QUÁ!", "ĐÚNG RỒI!", "CỐ LÊN NÀO!", etc.

## Build & Deploy

### Key Commands
```bash
npm run dev      # Starts Vite dev server on port 3000
npm run build    # Production build
npm run preview  # Test production build locally
```

### Deployment Configuration
- **Base path**: `/jumi-math/` set in `vite.config.ts` for GitHub Pages
- **Auto-deploy**: GitHub Actions on push to `dev` branch

### Path Alias
`@` resolves to project root (`vite.config.ts` alias). Use absolute imports for clarity.

## Type Safety
All types in `types.ts`:
- `GameType` enum for game state machine
- `Question` interface with `problem`, `answer`, `options[]`
- `GameState` tracks score, currentQuestionIndex, questions[], isFinished

## Development Patterns

### Adding New Games
1. Create component in `/components/` following MathGame/ClockGame structure
2. Add enum value to `GameType` in `types.ts`
3. Add button in App.tsx home screen
4. Add conditional render in App.tsx with Layout wrapper

### Question Validation
Options arrays must have exactly 4 unique values. Use `Set` to ensure uniqueness:
```tsx
const optionsSet = new Set<number>([correctAnswer]);
while (optionsSet.size < 4) {
  optionsSet.add(generateWrongAnswer());
}
```

### Feedback System
Random Vietnamese encouragement messages (see `services/geminiService.ts`). Always show visual feedback (emoji + animated dog image) alongside text.

## Common Gotchas
- Don't forget `base: '/jumi-math/'` when testing production builds
- Clock hand rotation uses CSS transform origin-bottom and translateX(-50%)
- Question IDs must be unique within a game session for React keys
- Mobile-first: Always test responsive breakpoints (md:, etc.)
