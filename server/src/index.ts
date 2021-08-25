import "./load-env";
import { app } from "./server";
import { connectDb } from "./db/connect-db";

const port = Number(process.env.PORT || 3000);

connectDb()
  .then(() =>
    app.listen(port, () => {
      console.log(`Started Url Shortener at http://localhost:${port}`);
    })
  )
  .catch((err) => {
    console.error("AN UNKNOWN ERROR OCCURRED, SHUTTING DOWN");
    console.error("ERROR:", err);
    process.exit(1);
  });
