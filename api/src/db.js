import knex from "knex"
import * as config from "./config/config"

const env = process.env.NODE_ENV || "development"

export default knex(config[env])
