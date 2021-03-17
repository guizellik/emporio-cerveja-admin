This is the final project for Campinas Tech Talents classes focused on React.js. The project is related to an internal application that consists in monitoring users and products for Empório da Cerveja website.
Technologies used: Javascript, Typescript, React, Next, Styled Components and Jest (for testing)

## Getting Started

First Step - Downloading and using fake API
  1. This project is using a fake API. To download it please follow this link: https://github.com/jenicarvalho/fake-api-emporio
  2. Download through the repository as ZIP or clone direct from Github (depending on your preference)
  3. To install the API use npm install or yarn install (depending on your preference)
  4. Once you are at the correct folder, start the fake API by issuing the following command: json-server db.json -m ./node_modules/json-server-auth -r routes.json --port 4000
  5. Keep it running while using Emporio da Cerveja Admin project.

Second Step - Downloading and installing 'Empório da Cerveja Admin'
  1. Download through the repository as ZIP or clone direct from Github (depending on your preference)
  2. Once you are at the correct folder, issue the following command to start the application npm run dev or yarn dev (depending on your preference)
  3. Open [http://localhost:3000] with your browser to see the result.

Third Step - Using 'Empório da Cerveja Admin' the application itself
  1. A login will be required to enter the application. It has two roles: admin and editor. Depending on the credentials used, some features will not be available.

  Login administrator
  email: helen@facebook.com | senha: 123123
  Login editor
  email: mauricio@google.com | senha: 123123

  2. Once you are logged (keep in mind that the fake API must be running on the background) - and if the chosen credential is administrator - will be possible to see all the pages.
  3. The application will start at home page. On this page, it is possible to see only the amount of users and products available.
  4. Only if you logged as admin: If you click on 'Lista', you will be redirected to the full user list. To delete any of the users, click on x button.
  5. Only if you logged as admin: by clicking on 'Cadastro' on 'Usuários' section, a form will be available to add new users. **Important: all the fields are mandatory**
  6. To return to the 'Home' page, simply click on the Empório da cerveja logo.
  7. Only if you logged as admin: On the 'Cadastro' page, it is possible to create new users and define their roles. Once all the fields are filled properly, click on 'Cadastrar' button.
  8. All of the users can access 'Produtos' section and add new products but only the admin user will be able to delete it.
  9. By clicking on 'Lista' on 'Produtos' section, a list of products will be shown. To delete any of them (only admin will see) click on x button.
  10. By clicking on 'Cadastro' on 'Produtos' section, a form will be available to add new products. **Important: all the fields are mandatory**

Forth Step - Downloading and installing 'Empório da Cerveja Website'
  1. To download it please follow this link: https://github.com/guizellik/emporio-da-cerveja-projeto5
  2. Download through the repository as ZIP or clone direct from Github (depending on your preference)
  3. To install it use npm install or yarn install (depending on your preference). Since 'Emporio da Cerveja Admin' is running using the port 3000, it is required to change the port for the project to run. Do the following:
    - Access the package.json file:
    **Important: replace the **XX** by the port from your preference. Only keep in mind 3000 and 4000 are already in use**
      - In case your pc is running Windows, do the following: go on script session and replace the command '"start": "react-scripts start"' by "start": "set PORT=**XXX** && react-scripts start"
      - In case your pc is running MacOs or Linux, do the following: go on script session and replace the command '"start": "react-scripts start"' by "start": "PORT=**XXX** react-scripts start"
  4. Once the script is corrected, issue the following command inside the folder to start the application npm start or yarn start (depending on your preference)

Fifth Step - Using 'Empório da Cerveja Website' the application itself
  1. Create your own login by filling all the related fields - notice that you need to be older than 18 to access it. Once every field is filled, click on 'Cadastro' button.
  2. You will be entering at the 'Home' page.
  3. To add a product to the cart, simply click on 'Comprar' button.









First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
