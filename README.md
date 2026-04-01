
# Boilerplate NestJS

Production-ready NestJS starter focused on modular architecture, PostgreSQL + TypeORM persistence, and security-minded defaults. Use it as a foundation for REST APIs that need authentication, role-based access, encrypted PII, file storage, and rich domain modules out of the box.

## Highlights
- **Domain-driven modules**: Users, Roles, Permissions, Categories, Menus, Notifications, Profiles, and Public flows (register/login) are already wired with controllers, services, and use-cases.
- **Battle-tested security**: JWT authentication, fingerprint binding, bcrypt password hashing, Helmet hardening, CORS, API versioning, and Rapidoc docs behind basic auth.
- **Data protection**: PII fields (email, phone, address) are encrypted via `pii-cyclops`, with audit-friendly base entities providing `created_by`, `updated_by`, and soft-delete metadata.
- **TypeORM + PostgreSQL**: Auto-discovered entities, sensible defaults, and `BaseEntity` inheritance for consistent persistence layers.
- **Observability & tooling**: Jest unit tests, ESLint, Prettier, rimraf cleanup, and deploy helpers for Dockerized environments.
- **CLI scaffolding**: Pair with [crud-generator-nestjs](https://github.com/kikiginanjar16/crud-generator-nestjs) to bootstrap new CRUD modules that follow the same conventions.

## Prerequisites
- Node.js ≥ 18 and npm ≥ 9 (or Yarn if preferred).
- PostgreSQL database (defaults to port `5432`).
- Optional: MinIO server for object storage integration.
- Optional: Docker engine if you intend to use `deploy.sh`.

## Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/kikiginanjar16/boilerplate-nestjs.git
   cd boilerplate-nestjs
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create an environment file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` only if your local database or integration endpoints differ from the defaults in `.env.example`.
5. Start the development server:
   ```bash
   npm run start:dev
   ```
6. Visit `http://localhost:<PORT>/docs` for interactive API docs (credentials required—see `SWAGGER_USER`/`SWAGGER_PASSWORD`).

## Environment Variables
| Variable | Description | Local default | Production |
| --- | --- | --- | --- |
| `NODE_ENV` | Runtime environment flag | `development` | optional |
| `PORT` | HTTP port for NestJS application | `3000` | optional |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | PostgreSQL connection settings | `localhost`, `5432`, `postgres`, `postgres`, `boilerplate_nestjs` | required |
| `DB_SYNCHRONIZE` | TypeORM schema auto-sync flag | `true` in `development`, `test`, and `local` | forced `false` |
| `JWT_SECRET` | Secret for signing access tokens | `development-jwt-secret` | required |
| `PII_ENCRYPTION_KEY` | Key for PII encryption/decryption | defaults to `JWT_SECRET` | optional, explicit value recommended |
| `MINIO_ENDPOINT`, `MINIO_PORT`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`, `MINIO_BUCKET_PUBLIC`, `MINIO_BUCKET_PRIVATE` | MinIO object storage configuration | `localhost`, `9000`, `minio`, `minio123`, `tetangga`, `legal-tetangga` | optional, no production secret fallback |
| `REDIS_URL`, `RABBITMQ_URL`, `KAFKA_BROKERS`, `KAFKA_CLIENT_ID` | Optional local integration endpoints | localhost defaults | optional |
| `SAUNGWA_APPKEY`, `SAUNGWA_AUTHKEY`, `SAUNGWA_API_KEY`, `SAUNGWA_BASE_URL` | Optional SaungWA integration config | empty keys, default base URL | optional |
| `SWAGGER_USER`, `SWAGGER_PASSWORD` | Basic auth credentials to access `/docs` | `admin` / `admin` | strongly recommended explicit |

Production bootstrap is fail-fast. If `NODE_ENV=production`, the app will refuse to start when `JWT_SECRET` or any required database variable is missing.

## Project Layout
```
src/
├── app.module.ts            # Connects modules and configures TypeORM
├── main.ts                  # Bootstrap with security middlewares and Rapidoc
├── common/                  # Constants, messages, utilities
├── entities/                # TypeORM entities extending BaseEntity
├── libraries/common/        # Reusable DTOs and helpers
├── guards/                  # Global JWT auth and role-based guards
└── modules/
    ├── public/              # Registration & login flows
    ├── users/               # User CRUD & profile management
    ├── roles/, permissions/ # RBAC management endpoints
    ├── categories/, menus/  # Domain catalog examples
    ├── notifications/       # Notification persistence + pagination
    └── profiles/            # User profile operations
```

Each module follows a layered approach:
* **Controller**: Request/response mapping and routing.
* **Use case**: Encapsulated domain logic.
* **Repository/Entity**: Persistence via TypeORM repositories.

Controller conventions in the current codebase:
- Keep controllers thin and delegate business logic to use cases.
- Declare `@HttpCode(HttpStatus...)` explicitly on non-export endpoints to make response status obvious and consistent.
- The codebase still commonly uses `@Res()` plus `respond(...)` and reads auth context from `res.locals.logged`.
- `@CurrentUser()` is already used in some controllers and is a good fit for JSON-style handlers, but the repository has not been fully migrated away from `@Res()`.
- Reserve manual response handling for cases that genuinely need it, such as CSV/file export.

## SOLID Principles
The project strictly adheres to SOLID principles to ensure maintainability and scalability:
- **Single Responsibility Principle (SRP)**: Each class has a distinct responsibility. Controllers handle HTTP requests, Use Cases execute business logic, and Repositories manage data access.
- **Open/Closed Principle (OCP)**: The modular architecture allows functionality to be extended by adding new modules without modifying the core system.
- **Liskov Substitution Principle (LSP)**: Shared contracts and base entities (like `BaseEntity`) ensure derived classes can be used interchangeably.
- **Interface Segregation Principle (ISP)**: Focused DTOs and interfaces ensure classes only depend on what they use.
- **Dependency Inversion Principle (DIP)**: High-level modules (Controllers/Use Cases) depend on abstractions (Services/Repositories) injected via Dependency Injection, not concrete implementations.

## Design Patterns Used
- **Dependency Injection**: Fundamental to NestJS, used to manage dependencies between Controllers, Services, and Repositories.
- **Singleton**: Services and Repositories are singletons by default, ensuring efficient memory usage.
- **Decorator**: Heavily used (`@Controller`, `@Injectable`, `@Get`) to attach metadata and behavior to classes and methods.
- **Repository**: TypeORM repositories provide an abstraction layer for database operations.
- **Use Case (Interactor)**: Domain logic is encapsulated in dedicated Use Case classes (e.g., inside `modules/users/usecases/`), promoting cleaner architecture.
- **DTO (Data Transfer Object)**: Strictly typed objects define the shape of data sent between the client and server.
- **Guard**: Global JWT auth is applied via `APP_GUARD`, with role checks layered through `RolesGuard`.
- **Builder**: Used (e.g., `DocumentBuilder`) to construct complex configuration objects fluently.

## Development Workflow
- Start development server: `npm run start:dev`
- Build for production: `npm run build` (output to `dist`)
- Start compiled build: `npm run start:prod`
- Run linting: `npm run lint`
- Check linting without auto-fix: `npm run lint:check`
- Auto-format: `npm run format`
- Run unit tests once / watch / coverage:
  ```bash
  npm run test
  npm run test:watch
  npm run test:cov
  ```
- Debug tests with inspector: `npm run test:debug`
- (Placeholder) e2e command: `npm run test:e2e`

Recommended verification before merging non-trivial changes:
- `npm run lint:check`
- `npm run test`
- `npm run build`

## CRUD Generator Scaffolding
- **Install**: Add the CLI globally (`npm install -g crud-generator-nestjs`) or as a dev dependency (`npm install -D crud-generator-nestjs`). Using `npx crud-generator-nestjs` works too.
- **Describe your model**: Create a JSON file (e.g., `tools/generators/todo.json`) that lists the entity name, pluralized route, primary key type, and fields with metadata.
- **Generate resources**:
  ```bash
  crud-generator-nestjs tools/generators/todo.json --output src/modules
  ```
  Replace the output path or additional flags as needed—the generator creates NestJS entities, DTOs, modules, controllers, and use cases aligned with this project's layering.
- **Refine**: Wire generated files into `AppModule`, adjust relationships, add business logic, and update tests/documentation. Sensitive fields should continue to use the encryption utilities provided in `src/common`.
- Refer to the tool's repository for advanced options and examples: [github.com/kikiginanjar16/crud-generator-nestjs](https://github.com/kikiginanjar16/crud-generator-nestjs).

## Adding a New Module
Follow the existing `controller -> usecase -> entity/repository` pattern instead of introducing a new generic service layer.

1. Create a new folder under `src/modules/<domain>/`.
2. Add DTOs for request input and keep validation in `class-validator`.
3. Add one or more use case classes under `src/modules/<domain>/usecases/`.
4. Keep controllers thin: map HTTP input/output and delegate domain logic to use cases.
5. Register the module in [src/app.module.ts](/Users/kiki/Documents/GITHUB/boilerplate-nestjs/src/app.module.ts).
6. If the module is protected, use `JwtAuthGuard` globally and add `@UseGuards(RolesGuard)` plus `@Roles(...)` only where role restriction is needed.
7. Follow the existing controller style in the target module. In this repository, many JSON endpoints still use `@Res()` with `respond(...)`, while some newer handlers use `@CurrentUser()` and return plain objects.
8. Add explicit `@HttpCode(HttpStatus...)` on non-export endpoints so controller status handling stays uniform.
9. If you add new environment variables, update both [.env.example](/Users/kiki/Documents/GITHUB/boilerplate-nestjs/.env.example) and the env loader in [src/common/config/env.ts](/Users/kiki/Documents/GITHUB/boilerplate-nestjs/src/common/config/env.ts).

Minimal module shape:
```text
src/modules/example/
├── dto/
├── usecases/
├── example.controller.ts
└── example.module.ts
```

## API Documentation
- Rapidoc served at `/docs` with credentials from `SWAGGER_USER` and `SWAGGER_PASSWORD`.
- JWT bearer scheme (`x-access-token`) preconfigured in the doc to test protected endpoints.
- Adjust metadata (`title`, `description`, version) inside `src/main.ts` if needed.

## Database & Data Integrity
- PostgreSQL connection is configured in `AppModule` with auto entity loading.
- `synchronize` follows `DB_SYNCHRONIZE` only in safe environments (`development`, `test`, `local`).
- In `NODE_ENV=production`, `synchronize` is always disabled even when `DB_SYNCHRONIZE=true` is supplied.
- Shared `BaseEntity` adds UUID primary keys, timestamps, and auditing columns.
- Passwords hashed with `bcrypt` and PII (email, phone, address) encrypted using `pii-cyclops` before persistence.

## Security Defaults
- Helmet middleware for HTTP header hardening.
- CORS enabled for cross-origin clients—customize as required.
- Global JWT guard (`JwtAuthGuard`) protects downstream handlers through `APP_GUARD`.
- Production startup fails fast on missing secrets instead of silently using weak defaults.

## Docker Deployment
- `deploy.sh` builds and runs the application as a Docker container:
  ```bash
  ./deploy.sh
  ```
  Update `IMAGE_NAME`, `CONTAINER_NAME`, and `PORT_MAPPING` to suit your environment.
- Ensure your `.env` values are supplied to the container (e.g., via Docker secrets or environment file).

## Production Readiness Checklist
- Set `NODE_ENV=production`.
- Provide explicit values for `JWT_SECRET`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`.
- Keep `DB_SYNCHRONIZE` unset or `false`; production startup will disable it regardless.
- Set explicit `SWAGGER_USER` and `SWAGGER_PASSWORD` if `/docs` is exposed outside local development.
- Review optional integrations (`MINIO_*`, `REDIS_URL`, `RABBITMQ_URL`, `KAFKA_*`, `SAUNGWA_*`) and disable or configure them deliberately.
- Run `npm run lint:check`, `npm run test`, and `npm run build` on the exact release candidate.
- Do not rely on TypeORM auto-sync as a migration strategy; manage schema changes explicitly.
- Verify docs auth and bearer auth work as expected after deployment.

## Troubleshooting
- **Cannot access `/docs`**: Confirm `SWAGGER_USER`/`SWAGGER_PASSWORD` are set and restart the server.
- **Database connection errors**: Verify PostgreSQL credentials and that the database is reachable from the running container/service.
- **App exits during startup in production**: Check for missing `JWT_SECRET` or incomplete database env values.
- **Encrypted fields look unreadable**: Use application services to decrypt—plaintext is intentionally not stored.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes with context.
4. Push to your fork and open a pull request describing the update.
5. Include tests or updates to documentation where applicable.

## License
MIT © Kiki Ginanjar
=======
# plm-be



## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

* [Create](https://docs.gitlab.com/user/project/repository/web_editor/#create-a-file) or [upload](https://docs.gitlab.com/user/project/repository/web_editor/#upload-a-file) files
* [Add files using the command line](https://docs.gitlab.com/topics/git/add_files/#add-files-to-a-git-repository) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/plm9745414/plm-be.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

* [Set up project integrations](https://gitlab.com/plm9745414/plm-be/-/settings/integrations)

## Collaborate with your team

* [Invite team members and collaborators](https://docs.gitlab.com/user/project/members/)
* [Create a new merge request](https://docs.gitlab.com/user/project/merge_requests/creating_merge_requests/)
* [Automatically close issues from merge requests](https://docs.gitlab.com/user/project/issues/managing_issues/#closing-issues-automatically)
* [Enable merge request approvals](https://docs.gitlab.com/user/project/merge_requests/approvals/)
* [Set auto-merge](https://docs.gitlab.com/user/project/merge_requests/auto_merge/)

## Test and Deploy

Use the built-in continuous integration in GitLab.

* [Get started with GitLab CI/CD](https://docs.gitlab.com/ci/quick_start/)
* [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/user/application_security/sast/)
* [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/topics/autodevops/requirements/)
* [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/user/clusters/agent/)
* [Set up protected environments](https://docs.gitlab.com/ci/environments/protected_environments/)

***

# Editing this README

When you're ready to make this README your own, just edit this file and use the handy template below (or feel free to structure it however you want - this is just a starting point!). Thanks to [makeareadme.com](https://www.makeareadme.com/) for this template.

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

