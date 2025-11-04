import jsonServer from "json-server";
import fs from "fs";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/reset", (req, res) => {
  const backup = {
    users: [
      { id: "1", username: "alex", password: "123456", role: "admin" },
      { id: "2", username: "dedy", password: "123456", role: "customer" },
    ],
    packages: [
      { id: "1", name: "Paket 5GB", price: 25000 },
      { id: "2", name: "Paket 10GB", price: 45000 },
    ],
    transactions: [],
  };
  fs.writeFileSync("db.json", JSON.stringify(backup, null, 2));
  res.status(200).json({ message: "Database di-reset ✅" });
});

server.use(router);
server.listen(5000, () => console.log("Mock API running on port 5000"));
