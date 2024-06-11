const express = require("express");

const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;

const app = express();

const routes = require("./routes")

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const pool = new Pool(
    {

      user: '',
      password: '',
      host: 'localhost',
      database: 'compay_db'
    },
    console.log(`Connected to the company_db database.`)
  )
  
  pool.connect();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  