# Tasklemon Task Management Tool

Innovative task management for teams of all sizes. Streamline your workflow, boost productivity, and achieve your goals.

## Technologies

- React (TypeScript)
- Tailwind CSS
- Ant design
- Axios

## Run Project Locally

- Clone repository

```sh
git clone https://github.com/Evavic44/tasky.git
cd tasky
```

- Rename `.env.example` to `.env`

- Start dev server

```sh
npm install
npm run dev
```

Visit [localhost:5173](http://localhost:5173) to see the app live

## Endpoint (Mockapi.io)

Tasky uses a free mock backend API to illustrate a more real-world implementation. Although it is grossly a shadow of what the actual implementation would be as this API is quite limited.

```ts
API_ENDPOINT = https://API_KEY.mockapi.io/api/v1/:
METHODS: GET, GET /tasks/:id, POST, PUT: /tasks/:id, DELETE: /tasks/:id
```

- [Homepage](https://mockapi.io/projects)
- [Documentation](https://github.com/mockapi-io/docs/wiki)
- [Code Example](https://github.com/mockapi-io/docs/wiki/Code-examples#crud)
