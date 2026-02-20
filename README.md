# Yuvoi Monorepo

A modern full-stack monorepo powered by Turborepo, featuring SvelteKit frontend and NestJS backend.

## Tech Stack

### Frontend

- **SvelteKit** - Modern web framework with SSR and SSG capabilities
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server

### Backend

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Express** - Web server (via NestJS platform)

### Shared Packages

- **@repo/shared-types** - Shared TypeScript types for API contracts
- **@repo/eslint-config** - Shared ESLint configurations
- **@repo/prettier-config** - Shared Prettier configuration
- **@repo/typescript-config** - Shared TypeScript configurations

### Development Tools

- **Turborepo** - High-performance build system for monorepos
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files
- **Docker** - Containerization

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Clean cache

```
turbo clean
```

### Installation

```bash
npm install
```

### Environment variables

Create `.env` files according to the `.emv.example` in `apps/frontend` and `apps/backend` folders.

Also, if you want to run application fully locally, run this commands:

```
cd apps/backend
docker-compose up -d
```

### Development

Run all apps in development mode from root:

```bash
npm run dev
```

This will start:

- Frontend (SvelteKit) at http://localhost:3000
- Backend (NestJS) at http://localhost:3001

### Build

Build all apps:

```bash
npm run build
```

### Linting

Lint all workspaces:

```bash
npm run lint
```

### Formatting

Format all code:

```bash
npm run format
```

Check formatting without making changes:

```bash
npm run format:check
```

### Testing

Run tests across all workspaces:

```bash
npm run test
```

## Docker

### Build and run with Docker Compose

```bash
# Create the network first
docker network create app_network

# Build and run all services
docker-compose up --build
```

This will start:

- Frontend at http://localhost:3000
- Backend at http://localhost:3001

## Git Hooks

This project uses Husky to run git hooks:

- **pre-commit**: Automatically runs Prettier and ESLint on staged files using lint-staged

The pre-commit hook will:

1. Format staged TypeScript, JavaScript, Svelte, JSON, and Markdown files
2. Run ESLint with auto-fix on staged code files
3. Fail the commit if there are any unfixable linting errors

## GitHub Actions

Two GitHub Actions workflows run on every pull request:

### Lint Workflow (`.github/workflows/lint.yml`)

- Runs ESLint across all workspaces
- Fails if there are any linting errors or warnings

### Format Check Workflow (`.github/workflows/format.yml`)

- Checks code formatting using Prettier
- Fails if any files are not properly formatted

Both workflows must pass before a PR can be merged.

## Workspace Scripts

### Root Level

- `npm run dev` - Start all apps in development mode
- `npm run build` - Build all apps
- `npm run lint` - Lint all workspaces
- `npm run format` - Format all code
- `npm run format:check` - Check formatting without changes
- `npm run test` - Run tests across all workspaces
- `npm run clean` - Clean build artifacts

### Frontend (apps/frontend)

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint frontend code
- `npm run check` - Type-check Svelte files

### Backend (apps/backend)

- `npm run dev` - Start dev server with watch mode
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run lint` - Lint backend code
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:cov` - Run tests with coverage

## Contributing

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Make your changes
5. Commit (pre-commit hooks will run automatically)
6. Push and create a pull request

Your PR will be automatically checked for linting and formatting errors via GitHub Actions.

## License

Private - All rights reserved

## Strapi Setup

- Add content
- Add permissions in /admin/settings/users-permissions/roles -> Public
