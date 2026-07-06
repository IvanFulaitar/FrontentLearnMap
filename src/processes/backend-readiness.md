# Backend Readiness

The frontend is structured so mock repositories can be replaced with ASP.NET Core clients later.

- `services/api` contains HTTP abstractions and DTO contracts.
- `services/repositories` contains repository interfaces and mock implementations.
- `features/auth` contains local auth, roles, permissions and protected route architecture.
- Future integrations: JWT, refresh token, PostgreSQL-backed progress, Redis leaderboard, SignalR notifications, certificates, file storage and email.
