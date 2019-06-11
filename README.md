# checkmovies

1. instal git, nodejs v10.15.1 (or higher), npm 6.4.1 (or higher)
2. Clone this repository: git clone https://github.com/2bigniew/checkmovies.git
3. Enter checkmovies directory
4. Install all depedencies via "npm install"
5. Create postgresql databases: movies_prod, movies_dev (development), movies_test (tests), and run SQL script from ./Database/init.sql
6. Copy content from configuration.txt to ./Config/.env. Change DB_USER and DB_PASSWORD values (also for dev and test cases) to your database values. Change api_key value to your omdb api_key value or to api_key value from my mail. 
7. Run app via "node server.js"
8. App is listening on http://localhost:8080/
