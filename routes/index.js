const router = require("express").Router();

const { Pool } = require('pg');

const pool = new Pool(
    {
      user: 'postgres',
      password: '1118',
      host: 'localhost',
      database: 'company_db'
    },)

    router.get("/department")
    module.exports = router