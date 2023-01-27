var express = require("express");
var router = express.Router();

// GET http://localhost:3000/
router.get("/", async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
  SELECT DISTINCT ON (game.game_title)
  game.game_title as game_title,
  game.url_slug, 
  highscores.gameID  as gameID,
  highscores.score as score,
  highscores.score_date as score_date,
  highscores.player as player
  FROM game
  INNER JOIN highscores
  ON highscores.gameID = game.id
  ORDER BY game_title, highscores.score DESC;
`;

  const result = await db.query(sql);

  res.render("index", {
    title: "highscore",
    allHighscores: result.rows,
  });
});

module.exports = router;
