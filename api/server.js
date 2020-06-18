const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

// Routes
// Read from CRUD
server.get("/", async (req, res, next) => {
  try {
    // Translates to `Select * from "accounts";`
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

// Create for CRUD
server.post("/:id", async (req, res, next) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    // translates to `insert into "accounts" ("name", "budget") values (?, ?);`
    const account = await db("accounts").insert(payload);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

// Update from CRUD
server.put("/:id", async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      budget: req.body.budget,
    };
    // translates to `update "accounts" set "name" = ? and "budget" = ? where "id" = ?;`
    await db("accounts").where("id", req.params.id).update(payload);
    const updated = await db("accounts").where("id", req.params.id).first();
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// Delete from CRUD
server.delete("/:id", async (req, res) => {
  try {
    //   translates to `delete from "accounts" where "id" = ?;
    await db("accounts").where("id", req.params.id).del();
    res.status(202).end();
  } catch (err) {
    next(err);
  }
});

module.exports = server;
