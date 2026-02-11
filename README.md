# 🤖 Discord Bot Monorepo

Welcome to your new enterprise-grade Discord bot template! This monorepo is built for speed, scalability, and developer happiness using **Turborepo**, **TypeScript**, and **Dependency Injection**.

## 🚀 Quick Start

1.  **Environment Setup**:
    Copy the `.env.example` to `.env` and fill in your details:
    ```bash
    cp .env.example .env
    ```

2.  **Install & Build**:
    ```bash
    pnpm install
    pnpm build
    ```

3.  **Run with Watch Mode**:
    ```bash
    pnpm dev
    ```

## 🛠️ Tech Stack

- **Monorepo**: [Turborepo](https://turbo.build/) + [pnpm](https://pnpm.io/)
- **Runtime**: [Node.js](https://nodejs.org/) (ESM)
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) + [PostgreSQL](https://www.postgresql.org/)
- **DI Container**: [tsyringe](https://github.com/microsoft/tsyringe)
- **Build Tool**: [esbuild](https://esbuild.github.io/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) + [Commitlint](https://commitlint.js.org/)

## 📂 Structure

- `apps/bot`: The main Discord bot application.
- `packages/core`: Shared utilities, DI logic, and base decorators for commands/events.
- `packages/db`: Drizzle schema and database client.
- `packages/env`: Type-safe environment variable validation using Zod.

## 🧱 Development

### Adding a Command
Simply create a class in `apps/bot/src/commands/` and use the `@Command` decorator:
```typescript
@Command({ name: "ping", description: "Pong!" })
export class PingCommand implements ICommand {
  async execute(message: Message) {
    await message.reply("Pong!");
  }
}
```

### Adding an Event
Use the `@Event` decorator in `apps/bot/src/events/`:
```typescript
@Event({ name: Events.ClientReady, once: true })
export class ReadyEvent implements IEvent {
  execute(client: Client) {
    console.log(`Ready as ${client.user.tag}`);
  }
}
```

## 📜 Commands

### Core Tasks
- `pnpm build`: Build everything in the right order.
- `pnpm dev`: Start all apps in development mode.
- `pnpm clean`: Deep-clean the repo (removes `node_modules` and `dist` everywhere). Cross-platform safe!
- `pnpm lint`: Keep the code clean with Biome.
- `pnpm format`: Auto-fix formatting issues.

### Fast Mode
If you only want to work on specific parts, use these shortcuts:
- `pnpm -F <package> <command>`: Our "Fast Filter" shorthand.
  - *Example*: `pnpm -F db push` (Pushes database schema changes).
  - *Example*: `pnpm -F core build` (Builds only the core utility package).

## 💬 Conventional Commits
This repo enforces [Conventional Commits](https://www.conventionalcommits.org/). Use prefixes like `feat:`, `fix:`, or `chore:` when committing.
