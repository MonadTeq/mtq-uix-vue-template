## Principles

### 1. Think Before Coding

**Don't assume, don't hide confusion, present trade-offs**

Before implementing:

- State your assumptions clearly; if unsure, ask
- If there are multiple interpretations, list them all; don't silently pick one
- If there's a simpler approach, point it out; push back when necessary
- If something is unclear, stop, say what confuses you, then ask

### 2. Simplicity First

**Solve the problem with the least code; don't over-speculate**

- Don't add features beyond what's requested
- Don't create abstractions for one-off code
- Don't add unrequested "flexibility" or "configurability"
- Don't add error handling for scenarios that can't happen
- If 200 lines can be written as 50, rewrite it

**Check:** Would a senior engineer find this overly complex? If so, simplify it

### 3. Precise Changes

**Only touch what must be touched; only clean up the mess you made**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting
- Don't refactor what isn't broken
- Match the existing style, even if you'd prefer a different approach
- If you notice unrelated dead code, mention it; don't delete it

When your change produces orphaned code:

- Delete imports, variables, or functions that became useless due to your change
- Don't delete pre-existing dead code unless asked

**Check:** Every modified line should trace directly back to the user's request

### 4. Goal-Driven Execution

**Define success criteria and verify in a loop until achieved**

Turn imperative tasks into verifiable goals:

"Add validation" → "Write tests for invalid input, then make them pass"
"Fix a bug" → "Write a test that reproduces the bug, then make it pass"
"Refactor X" → "Ensure tests pass before and after the refactor"

For multi-step tasks, state a brief plan:

```
1. [Step] → Verify: [Check]
2. [Step] → Verify: [Check]
3. [Step] → Verify: [Check]
```

Clear, strong success criteria let you loop forward independently; vague criteria ("make it work") only lead to endless clarification

## Commands

```bash
pnpm i # Install dependencies
pnpm dev # Start the dev server
pnpm build:staging # Build for the staging environment
pnpm build # Build for the production environment
pnpm preview # Run the build command first to generate the dist directory, then run the preview command
pnpm lint # Code linting and formatting
pnpm test # Unit tests
```

## Architecture

### Tech Stack

- Framework: Vue 3.5
- Build tool: Vite 7
- Routing: Vue Router 5
- State management: Pinia 3
- UI component library: Element Plus
- CSS preprocessor: Scss
- Linting & formatting: ESLint
- Language: TypeScript
- Package manager: pnpm
- HTTP requests: Axios

### Directory Structure

```sh
mtq-uix-vue
├─ .husky                # lint and format on commit
├─ .vscode               # vscode config and plugins
├─ public
│  ├─ favicon.ico        # site favicon
│  ├─ app-loading.css    # first-screen loading animation
│  └─ detect-ie.js       # detect ie
├─ src
│  ├─ common             # common directory
│  │  ├─ apis            # common directory - APIs
│  │  ├─ assets          # common directory - static assets
│  │  ├─ components      # common directory - components
│  │  ├─ composables     # common directory - composables
│  │  ├─ constants       # common directory - constants
│  │  └─ utils           # common directory - utility functions
│  ├─ http               # HTTP requests
│  ├─ layouts            # layouts
│  ├─ pages              # pages
│  │  └─ login           # login module
│  │     ├─ apis         # login module - private APIs
│  │     ├─ components   # login module - private components
│  │     ├─ composables  # login module - private composables
│  │     ├─ images       # login module - private images
│  │     └─ index.vue    # login module - page
│  ├─ pinia              # state management
│  ├─ plugins            # plugins (global components, custom directives, etc.)
│  ├─ router             # routing
│  ├─ App.vue            # entry page
│  └─ main.ts            # entry file
├─ tests                 # unit tests
├─ types                 # type declarations
│  └─ auto               # auto-generated types (do not edit manually)
├─ .editorconfig         # editor config
├─ .env                  # all environments
├─ .env.development      # development environment
├─ .env.production       # production environment
├─ .env.staging          # staging environment
├─ eslint.config.js      # eslint config
├─ tsconfig.json         # ts config
├─ uno.config.ts         # unocss config
└─ vite.config.ts        # vite config
```

- Keep the directory structure clear and follow the existing conventions
- Code and resources for the same business logic should be grouped together, avoiding jumping between directories (for example, the login module's APIs should live in `src/pages/login/apis` rather than `src/common/apis`)

## Conventions

- Refer to the rules under the `.cursor/rules` directory as needed
- Never proactively delete files; always obtain consent first
