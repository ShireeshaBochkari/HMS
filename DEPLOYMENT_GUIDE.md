# Deploy HostelHub to Railway

HostelHub runs as one Java service plus one Railway MySQL service. The Java service serves both the API and the frontend, so the browser and API share the same domain.

## 1. Put the app folder in GitHub

The deployable folder is `hostel-management/` (it contains `Dockerfile`, `railway.json`, `backend/`, and `frontend/`). You can deploy that folder as the repository root, or use the full Replit repository and set the Railway service's **Root Directory** to `/hostel-management`.

## 2. Create the Railway services

1. In Railway, create a project and add a service from the GitHub repository.
2. If using the full Replit repository, open the app service's build settings and set **Root Directory** to `/hostel-management`. If the app folder is the whole repository, leave the root directory as `/`.
3. If using Railway's config-as-code file setting, set its path to `/hostel-management/railway.json` for the full Replit repository. Otherwise select the Dockerfile builder and set the health check path to `/health` in Railway settings.
4. Add a **MySQL** database to the same Railway project. This app uses MySQL; a PostgreSQL service is not compatible with its current JDBC driver and schema.
5. Set the app service's health check path to `/health`. It should return HTTP 200 and `{"status":"UP"}`.

The included Dockerfile builds with Java 21 and runs the Spring Boot JAR. Railway supplies `PORT`; the app listens on it. The Docker build runs the test suite before packaging.

## 3. Set app-service variables

Add these under the Java app service's **Variables** page. The example assumes the database service is named `MySQL`; replace that service name in every reference if you named it differently.

| Variable | Value |
|---|---|
| `MYSQLHOST` | `${{MySQL.MYSQLHOST}}` |
| `MYSQLPORT` | `${{MySQL.MYSQLPORT}}` |
| `MYSQLDATABASE` | `${{MySQL.MYSQLDATABASE}}` |
| `MYSQLUSER` | `${{MySQL.MYSQLUSER}}` |
| `MYSQLPASSWORD` | `${{MySQL.MYSQLPASSWORD}}` |
| `JWT_SECRET` | Generate a unique value with `openssl rand -base64 48` |
| `SEED_DEMO_DATA` | `false` for real hostel records |
| `INITIAL_WARDEN_EMAIL` | The email for the first owner/warden account |
| `INITIAL_WARDEN_PASSWORD` | A strong one-time password for that account |

Optionally set `INITIAL_WARDEN_NAME`. Keep the warden password and JWT secret in Railway Variables; do not commit them to GitHub. The first warden is created when the database is empty for that email. Changing these variables later does not change an existing account's password.

Do not manually set `PORT`. The app uses Railway's assigned value. `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` can be used instead of the five `MYSQL*` values if you prefer a JDBC URL.

## 4. Deploy and open the app

Deploy the app service, then open **Settings → Networking → Generate Domain**. Visit the generated domain; the welcome page and login are served by the same service as the API.

## Demo-only seed data

Set `SEED_DEMO_DATA=true` only for a disposable demo. It creates sample rooms, records, and public demo accounts:

- Warden: `warden@hostel.com` / `admin123`
- Hosteller: `student@hostel.com` / `student123`

Do not use those demo accounts for real hostel data. Public registration creates hosteller accounts only; owner/warden accounts must be created from the initial deployment variables.

## Local development

In Replit, start the **HostelHub** web preview and **API Server** workflows. The frontend and Spring API share the same origin. Local development uses an in-memory H2 database and demo accounts; Railway uses MySQL.

## Troubleshooting

- **Database connection refused / communications link failure:** confirm that the MySQL service is deployed in the same Railway project and that all five `MYSQL*` references are on the app service.
- **Access denied:** remove and re-add the variable references, checking the database service name and variable spelling.
- **PostgreSQL driver or dialect errors:** this app requires Railway MySQL; do not connect it to the Postgres template.
- **Health check fails:** confirm the app is listening on Railway's `PORT` and `/health` is set as the service health check path.
- **Docker build fails:** open the build logs and check the Maven test output; the build deliberately stops if tests fail.
