import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

const db= new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Mine",
  password: "2206",
  port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result= await db.query("SELECT code FROM visited_countries");
  let countries=[];
  result.rows.forEach(country => {
    countries.push(country.code);
  });
  console.log(result.rows);
  res.render("index.ejs",{countries: countries, total: countries.length})
  db.end();
  //Write your code here.
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



