# Task Hive

## Demo

https://taskhive.clevercat.dev

## TechStack

### Frontend

- React + Vite + Typescript
- Tailwind

### Backend

- NestJS
- Supabase (I don't want to deploy my own database)

## Feature Design

- [x] Todo Features
  - [x] Use React Context to Manage State
  - [x] Checkbox Toggle
  - [x] Priority Badge
  - [x] CRUD Tasks API Call
- [x] Todo List Filter
  - [x] Priority
- [x] Loading Skeleton
- [x] Toast Notification
- [x] After typing, Expand for option selector for Priority, Date, Estimate Time.

## Reasoning Explain

1. I choose Vite instead of Next.JS because it no need about SSR or Page Router. Vite is more lightweight.
2. Of course, Tailwind is my first choice and only one.
3. I plan to use react context to manage state with useReducer. This app is not complex, I think it is enough instead of using Redux. (I haven't use Recoil or MobX before, so i think it may take time to explore. Not suitable for this test)
4. Starting with UI Development, First i implement PoC of TodoList UI + Add Todo Box + Navbar with hard code mock data.
   1. Thank to custom css checkbox https://getcssscan.com/css-checkboxes-examples so i can use checkbox to toggle status.
5. Then, starting implement local state with react context, return hooks for CRUD todo action. And change UI to call from react hooks
6. Implement simple backend API to call CRUD to Supabase Cloud
7. Modify react context to call API instead of Mock Data.
8. Deploy on vercel, Backend on DigitalOcean.

## Running Development

### Frontend

Install Dependencies

```
cd packages/web
cp .env.example .env
npm i
npm run dev
```
it will start at http://localhost:5173, open it in your browser
(.env.example contain api url from deployed api url, if you want to connect your localhost api. change it instead)

### Backend

Install Dependencies

```
cd packages/backend
cp .env.example .env
```
Config your env with Supabase Cloud Credentials

```
npm i
npm run dev
```

it will start at http://localhost:4200

## Author

Charuwit N.
(Full-Stack Developer)


## License

MIT