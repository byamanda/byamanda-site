import app from "./server"
import db from "./db"

const PORT = process.env.API_PORT || 3000

db.migrate.latest()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  })