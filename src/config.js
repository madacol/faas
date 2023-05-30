import { DATABASE_URL } from "$env/static/private";

export const database = {
  common: {
    connectionString: DATABASE_URL,
    query_timeout: 30000,
    connectionTimeoutMillis: 5000,
  },
  get pool(){return {
    ...this.common,
    max: 3,
    idleTimeoutMillis: 30000,
  }},
  get client(){return this.common},
}
