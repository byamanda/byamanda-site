import path from "path"

export const development = {
  client: "postgresql",
  connection: {
    host: "localhost",
    database: "gradebook-db",
    user: "docker",
    password: "password",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
    tableName: "knex_migrations",
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds")
  },
  debug: true,
}

export const production = {
  client: "postgresql",
  connection: {
    host: "db",
    database: "gradebook-db",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
    tableName: "knex_migrations",
  },
}
