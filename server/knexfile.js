require("dotenv").config({ path: "../.env" });

const { DATABASE_URI } = process.env;

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString: DATABASE_URI,
      ssl: false,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
