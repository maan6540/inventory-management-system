# Inventory Management System

An Angular-based inventory management portal for authenticated, role-aware
operations teams. The application provides a responsive administrative shell,
permission-controlled navigation, dashboard visibility, and a user-management
workflow backed by an HTTP API.

> **Project status:** Active development. Authentication, authorization,
> dashboard presentation, and user administration are implemented. Product,
> order, supplier, category, inventory, and reporting screens currently contain
> routed placeholders and should be completed before production rollout.

## Contents

- [Capabilities](#capabilities)
- [Technology stack](#technology-stack)
- [Application architecture](#application-architecture)
- [Routes and permissions](#routes-and-permissions)
- [Backend contract](#backend-contract)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Development workflow](#development-workflow)
- [Testing](#testing)
- [Production build and deployment](#production-build-and-deployment)
- [Security and operational considerations](#security-and-operational-considerations)
- [Project conventions](#project-conventions)
- [Roadmap](#roadmap)

## Capabilities

### Implemented

- Username/password login with session restoration through `GET /auth/me`.
- Bearer-token authentication for API requests.
- Route guards for authenticated users, guests, and permission checks.
- Cross-tab logout/session-expiration handling through the browser storage event.
- Responsive Bootstrap layout with navbar, collapsible sidebar, and routed
  content area.
- Permission-filtered sidebar navigation.
- Dashboard cards, inventory status, recent orders, low-stock product panels,
  and a Chart.js sales visualization.
- User administration with:
  - Server-side pagination.
  - Debounced search.
  - Department, role, and status filters.
  - Create, edit, and delete actions through modal workflows.
  - Toast notifications for success and error feedback.
- Centralized HTTP error handling for common API, authentication, and
  connectivity failures.

### Current limitations

- The dashboard statistics and sales chart use in-memory sample data.
- Orders, products, suppliers, categories, inventory, and reports are routed to
  an under-development screen or a minimal placeholder component.
- Profile and profile-settings routes are present but are not implemented as
  complete workflows.
- There is no end-to-end test runner configured in `package.json`; `ng e2e`
  should not be used until an e2e framework and script are added.
- The repository currently contains component/service creation tests and should
  gain behavior-focused tests as business features mature.

## Technology stack

| Area | Technology |
| --- | --- |
| UI framework | Angular 22 |
| Language | TypeScript 6 |
| Runtime | Node.js with npm |
| Routing and HTTP | Angular Router and `HttpClient` |
| Reactive programming | RxJS 7 |
| Styling | SCSS and Bootstrap 5 |
| Icons | Bootstrap Icons |
| Charts | Chart.js with `ng2-charts` |
| Notifications | `ngx-sonner` |
| Unit tests | Vitest through Angular CLI |
| Formatting | Prettier |

## Application architecture

The application uses standalone Angular components and functional providers.
The source tree is organized by responsibility:

```text
src/
├── app/
│   ├── core/
│   │   ├── api/             HTTP API clients and API contracts
│   │   ├── guards/          Authentication and permission guards
│   │   ├── interceptors/    Authentication and error interceptors
│   │   ├── models/          Shared TypeScript interfaces
│   │   └── services/        Authentication, modal, and notification services
│   ├── features/            Route-level business areas
│   ├── layout/              Main layout, navbar, and sidebar
│   ├── shared/components/   Reusable tables, dropdowns, charts, and modals
│   ├── app.config.ts        Router, HTTP, and interceptor providers
│   └── app.routes.ts        Application route map
├── environments/            Environment-specific client configuration
├── index.html               Browser document shell
├── main.ts                  Application bootstrap
└── styles.scss              Global styles
```

The root component restores an existing session during application startup.
`provideHttpClient` registers the authentication and error interceptors. The
main layout hosts the authenticated navbar/sidebar shell and a scrollable
router outlet.

## Routes and permissions

| Route | Permission | Status |
| --- | --- | --- |
| `/login` | Guest only | Implemented |
| `/dashboard` | `Dashboard.View` | Implemented with presentation/demo data |
| `/users` | `Users.View` | Implemented |
| `/products` | `Products.View` | Placeholder |
| `/categories` | `Categories.View` | Placeholder |
| `/suppliers` | `Suppliers.View` | Placeholder |
| `/inventory` | `Inventory.View` | Placeholder |
| `/orders` | `Orders.View` | Placeholder |
| `/reports` | `Reports.View` | Placeholder |
| `/profile` | Authenticated user | Scaffolded |
| `/profilesetting` | Authenticated user | Scaffolded |

The authenticated route group is protected by `authGuard`. Feature routes with
permission metadata are protected by `permissionGuard`. The default route
selects the first accessible destination in this order:
Dashboard, Orders, Products, Users, Categories, Suppliers, Inventory, Reports.
Users without an accessible destination are sent to `/unauthorized`.

## Backend contract

The client expects a backend API rooted at the configured `apiUrl`
(`http://localhost:5000/api` by default). The current API clients use these
resources:

| Resource | Operations |
| --- | --- |
| `/auth` | `POST /login`, `GET /me`, `POST /logout` |
| `/Users` | `GET`, `POST`, `PUT /:id`, `DELETE /:id` |
| `/Roles` | `GET` |
| `/Departments` | `GET` |
| `/statuses` | `GET` |

### Authentication

After login, the client reads `response.data.token`, stores it under the
`auth_token` browser storage key, and uses the token for subsequent requests.
`GET /auth/me` is expected to return a response shaped like:

```json
{
  "status": "success",
  "message": "Authenticated",
  "data": {
    "userId": 1,
    "username": "jane.doe",
    "fullName": "Jane Doe",
    "email": "jane.doe@example.com",
    "role": "Manager",
    "rolePriority": 10,
    "department": "Operations",
    "status": "Active",
    "permissions": ["Dashboard.View", "Users.View"]
  }
}
```

### User listing

`GET /Users` accepts the following query parameters:

```text
pageNumber, pageSize, search, departmentId, roleId, statusId
```

The user-management screen expects the paginated result at
`response.data.items`, with `response.data.totalPages` and
`response.data.totalItems`.

The backend is a separate system and is not included in this repository.
Configure its CORS policy to allow the development origin
(`http://localhost:4200`) and provide the API resources above before running
the client.

## Prerequisites

- Node.js compatible with Angular 22 and the repository's TypeScript toolchain.
- npm 11.19.0 or a compatible npm version.
- A running backend implementing the contract above.
- A modern browser with support for the APIs used by Angular 22.

Verify the local toolchain:

```bash
node --version
npm --version
```

## Getting started

1. Clone the repository and change into the project directory.
2. Install the locked dependencies:

   ```bash
   npm ci
   ```

3. Confirm the backend is available at `http://localhost:5000/api`, or update
   `src/app/environments/environment.ts`.
4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:4200](http://localhost:4200).

The Angular development server rebuilds the application and reloads the browser
when source files change.

## Configuration

The active development configuration is in
`src/app/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
};
```

For another backend, change `apiUrl` before starting or building the client.
Do not commit credentials, private keys, or environment-specific secrets.
Production deployments should use a secure environment configuration and HTTPS.

## Development workflow

### Useful commands

| Command | Purpose |
| --- | --- |
| `npm start` | Run the development server |
| `npm run build` | Create the default production build |
| `npm run watch` | Build continuously using the development configuration |
| `npm test` | Run the Vitest unit-test target |
| `npx ng generate component <name>` | Scaffold an Angular component |
| `npx prettier --write .` | Format supported project files |

Angular CLI can also be invoked through the npm wrapper:

```bash
npm run ng -- generate component features/example
```

### Adding a feature

1. Add a route-level component under `src/app/features/<feature>`.
2. Add the corresponding route in `src/app/app.routes.ts`.
3. Add a permission to route metadata and to the sidebar configuration when the
   feature is permission-controlled.
4. Add an API client under `src/app/core/api` rather than calling
   `HttpClient` directly from a feature component.
5. Reuse shared components for tables, filters, modals, and notifications.
6. Add behavior-focused tests for guards, API clients, and user interactions.

## Testing

Unit tests are colocated with their implementation as `*.spec.ts` files and
are executed by Angular's unit-test builder with Vitest:

```bash
npm test
```

The current suite primarily verifies that application services and standalone
components can be created. When adding business functionality, extend the
tests to cover:

- Successful and failed authentication/session restoration.
- Permission allow/deny behavior for every protected route.
- Interceptor headers and HTTP error handling.
- API request parameters and response mapping.
- User filtering, pagination, validation, create/edit/delete flows.
- Loading, empty, and failure states in feature screens.

## Production build and deployment

Build the optimized application with:

```bash
npm run build
```

The compiled output is written to `dist/`. The production configuration
enables optimization, license extraction, output hashing, and bundle/component
style budgets. Deploy the generated static assets behind a web server or CDN
configured to:

1. Serve `index.html` for Angular client-side routes.
2. Serve static assets with the generated hashed filenames.
3. Forward browser requests to the API origin according to the deployment
   environment.
4. Enable HTTPS and an explicit Content Security Policy appropriate for the
   application.

Before production release, replace the development API URL, verify backend
CORS and authentication settings, and complete the routes currently marked as
placeholders.

## Security and operational considerations

- Client-side guards improve user experience but are not an authorization
  boundary. The backend must independently enforce every permission.
- The current client stores the access token in `localStorage`; protect the
  application against cross-site scripting and evaluate secure, HttpOnly cookie
  sessions if the backend supports them.
- Use HTTPS in every non-local environment.
- Do not log tokens, passwords, or sensitive user data.
- Keep API error messages safe for display and avoid exposing stack traces.
- Configure CORS with approved origins rather than a wildcard in production.
- Add centralized observability, audit logging, and health checks at the
  backend/deployment layer before enterprise operation.

## Project conventions

- Use standalone components and Angular dependency injection.
- Keep reusable UI in `shared/components`, cross-cutting behavior in `core`,
  and route-specific behavior in `features`.
- Keep API access in typed API services.
- Prefer strict, explicit interfaces over `any` as new code is added.
- Use SCSS for component styles and Prettier for formatting.
- Keep route permissions, sidebar permissions, and backend permission names in
  sync.

## Roadmap

The next delivery priorities are:

1. Replace dashboard sample statistics and sales data with API-backed data.
2. Implement product, category, supplier, inventory, order, and report
   workflows.
3. Complete profile and profile-settings functionality.
4. Add typed API response models and remove remaining broad `any` usage.
5. Expand tests from creation smoke tests to behavior and integration coverage.
6. Add an end-to-end test framework and CI checks for formatting, build, and
   unit tests.
7. Add production environment configuration and documented release
   procedures.

## License

No license file is currently included. Add a `LICENSE` file before distributing
or reusing this project outside its owning organization.
