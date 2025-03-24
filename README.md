# Dal-Assessment

## Setup Instructions:
### Backend: 

- Go to the backend folder and install node modules with npm install
- Rename .env.example and update variables. (bottom of the doc)
- npx nodemon to run the project

### Frontend:

- Go to the frontend folder and install node modules npm install
- In a separate terminal, run npm start to start the frontend.

## Project Structure:
### Backend: 
For backend, I used the express-generator. That gave me some boilerplate code and a base to work with. I modified the folder and routes name for my APIs.
All the main logic is inside route/api.js. All the 3 controllers are present there with their logic

### Database: 
I used Prisma as my ORM and Supabase for my Postgres. I was going to use local postgres but using Supabase was just adding different urls and nothing else. 
The schema for the transaction table is present inside prisma/schema.prisma. There’s also a migration file in there.

### Frontend: 
I used React, MUI for stying and MRT (Material React Table) for rendering my table. Again, I used create-react-app tool to setup a basic structure of my react. You’ll see there will be some extra stuff in it. 
But all the functionality is written in src/components/TransactionTable.jsx file.

## Tech Stack Used:
Supabase, React, Express, MUI, MRT, Axios, Cors, Prisma, DaysJS

## Challenges & Decisions: 
The main decision was how to setup my database. I was unsure about supabase. But after reading the documentation, I realized it was quite easy to setup and it’s free and hosted on the cloud. 
In terms of complexity and accessibility, choosing Supabase was the right choice.

