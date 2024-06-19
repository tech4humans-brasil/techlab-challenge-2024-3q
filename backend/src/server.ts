import { app } from "./app.js";
import { APP_PORT } from "./constants/env.js";
import { database } from "./services/database.js";

await database.initialize()

app.listen(APP_PORT, () => {
  console.log(`server is running on port ${APP_PORT}`)
})
