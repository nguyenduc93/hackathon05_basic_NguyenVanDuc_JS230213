const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM hackathonmd3.basic");
    let [contents] = data;
    res.json({
      status: "success",
      contents,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/", async (req, res) => {
  const { Content } = req.body;
  try {
    let data = await database.execute(
      `INSERT INTO hackathonmd3.basic (Content) VALUES ('${Content}')`
    );
    let [content] = data;
    res.json({
      status: "success",
      content,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let data = await database.execute(
      `delete from hackathonmd3.basic where ContentId=${id}`
    );
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
