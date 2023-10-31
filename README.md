<p align="center">
 <img width="300px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1698711966/YsnIrix/vybtd9w5hz2nrzcl3lhs.svg" align="center" alt="screens" />
</p>

<br>

<p align="center">
  <b> A full stack issue tracker built with
  </b>
</p>

<p align="center">
<a href="https://nextjs.org">
<img width="200px" src="https://cdn.svgporn.com/logos/nextjs.svg" align="center" alt="nexjs" />
</a>
</a>
&nbsp; &nbsp;
<a href="https://tailwindcss.com">
<img width="300px" src="https://res.cloudinary.com/ydevcloud/image/upload/v1660842725/yassi/dglubft3rg2iuh6fxsaf.svg" align="center" alt="tailwind" />
</a>
&nbsp; &nbsp;
<a href="https://prisma.io">
<img width="300px" src="https://prismalens.vercel.app/header/logo-dark.svg" align="center" alt="pr" />
</a>
&nbsp; &nbsp;
<a href="#">
<img width="200px" src="https://cdn.svgporn.com/logos/mysql.svg" align="center" alt="pb" />
&nbsp; &nbsp;
<a href="https://clerk.com">
<img width="250px" src="https://clerk.com/_next/image?url=%2Fimages%2Fclerk-logo.svg&w=96&q=75" align="center" alt="pb" />
</a>

</p>

<br>

<p align="center">
  <img src="https://res.cloudinary.com/ydevcloud/image/upload/v1698713521/YsnIrix/hkct3sfsksunvnugk8ka.png" alt="ontrack" width="1000px" style="border-radius: 5px;">

</p>

<br>

## ❯ Features

- Login/register with Google
- Login/register with Github
- View total issues
- View Total closed issues
- View Total open issues
- View recent issues by users
- Create an issue (Title, Description) using Markdown editor
- View/Edit/Delete issues
- Edit user profile (Profile Photo & Fullname & deleting user account) using [Clerk](https://clerk.com/)
- All User entries are server/client side validated using [Zod](https://zod.dev/)

![📟](https://res.cloudinary.com/ydevcloud/image/upload/v1656874185/asm9cp84cbuuqmarw9wq.png)

## ❯ Getting Started

Live demonstration of the application available [Here](https://ontrack.ysnirix.xyz/)

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MySQL](https://www.mysql.com/downloads/)
- [Prisma](https://www.prisma.io/)
- A clerk account [Clerk](https://clerk.com/)

### Env

Rename the `.env.example` file in the root directory of the repo to `.env` and populate it with your own values:

```bash
DATABASE_URL=your-database-url
WEBHOOK_SECRET=your-clerk-webhook-secret
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
```

### Developing

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev
```

### Building

```bash
npm run build
npm start
```

### Docker

```bash
docker-compose up -d
```

### TODO

- [ ] Adding ability to add answers to issues
- [ ] assigning issues to users (admin only)

<br>

![🙌](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/connect.png)

## ❯ About

<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and features requests, [please create an issue](../../issues/new).

![📃](https://raw.githubusercontent.com/ahmadawais/stuff/master/images/git/license.png)

## ❯ License

Copyright © 2023-present, [Ysn4Irix](https://github.com/Ysn4Irix).
Released under the [MIT License](LICENSE).
