var express = require("express");
var router = express.Router();

// GET http://localhost:3000/
router.get("/:urlSlug", async function (req, res) {
  const db = req.app.locals.db;
  const urlSlug = req.params.urlSlug;

  const sql_highscores = `
   SELECT * FROM highscores 
    INNER JOIN game ON highscores.gameid = gameid 
    where url_slug = $1
   `;
  const scores = await db.query(sql_highscores, [urlSlug]);
  const result_scores = scores.rows.map((score) => ({
    player: score.player,
    highscore: score.score,
    date: score.score_date,
  }));

  const sql_game = `
  SELECT 
  game_title,
  game.description,
  game.image_url,
  game.genre ,
  game.release_year,
  game.url_slug
  FROM game
  where url_slug = $1
`;

  const result2 = await db.query(sql_game, [urlSlug]);
  const games = result2.rows[0];

  res.render("gameInfo", {
    title: games.game_title,
    Highscores: result2.rows,
    releaseYear: games.release_year,
    games,
    result_scores,
  });
});

module.exports = router;
