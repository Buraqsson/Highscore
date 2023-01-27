var express = require("express");
var router = express.Router();

// GET http://localhost:3000//admin/score
router.get("/", async (req, res) => {
  const db = req.app.locals.db;

  const highscores = await getHighscore(db);
  //const everyHighscore = await getHighscore(db);
  res.render("admin/score", {
    title: "Highscore",
    highscores: highscores,
  });
});
// GEt /admin/score/new
router.get("/new_score", async (req, res) => {
  res.render("admin/score/new", {
    title: "Nytt Highscore",
  });
});

router.post("/new", async (req, res) => {
  const { gameid, player, score_date, score } = req.body;

  const highscores = {
    gameid,
    player,
    score_date,
    score,
  };
  const db = req.app.locals.db;

  await saveHighscore(highscores, db);

  res.redirect("/admin/score");
});

async function saveHighscore(highscores, db) {
  const sql = `
        INSERT INTO highscores (
          gameid,
          player,
          score_date,
          score
        ) VALUES ($1,$2,$3,$4)
    `;

  await db.query(sql, [
    highscores.gameid,
    highscores.player,
    highscores.score_date,
    highscores.score,
  ]);
}

async function getHighscore(db) {
  const sql = `
        SELECT id, 
               gameid,
               player,
               score_date,
               score
          FROM highscores
    `;

  const result = await db.query(sql);

  return result.rows;
}

module.exports = router;
