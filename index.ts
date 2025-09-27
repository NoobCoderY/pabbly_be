import app from "./app";
import { dbConnection } from "./config/dbConnection";

//**********************************DataBase Connect*********************************/
dbConnection()

app.listen(process.env.PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}}`);
  });
