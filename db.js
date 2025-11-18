import pg from "pg";
import { serverConfig } from "./serverConfig.js";

const { Pool } = pg;

const pool = new Pool({
  connectionString: serverConfig.pgConnectionString,
});

export default pool;
