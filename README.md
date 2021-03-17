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
