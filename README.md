# Shortly-api

This is an API created to URL shortening system called Shortly

## Tecnologies
Typescript, Node.js, Prisma

## How to Run

1. Clone this repository
2. Install all dependencies
```bash
npm i
```
3. Create a PostgreSQL database with whatever name you want
4. Configure the `env.development` file using the `env.example` file
5. Run all migrations

``` bash
npm run migration:run
```

6. Seed db
```bash
npm run prisma:seed
```

7. Run the back-end in a development environment:

```bash
npm run dev
```

## How to run tests
1. Follow the steps in the last section
1. Configure the `.env.test` file using the `.env.example` file (see "Running application locally or inside docker" section for details)
1. Run all migrations for tests

```bash
npm run test:migration:run
```

3. Run test:
   (locally)

```bash
npm run test
```