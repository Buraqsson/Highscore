var express = require("express");
var router = express.Router();

// GET http://localhost:3000/
router.get("/:urlSlug", async function (req, res) {
  const db = req.app.locals.db;
  const urlSlug = req.params.urlSlug;

  const sql = `
      SELECT gameid,
      game.url_slug,
      highscores.gameID  as gameID,
      highscores.score as score,
      highscores.score_date as score_date,
      highscores.player as player
      FROM game
      INNER JOIN highscores
      ON highscores.gameID = game.id
      ORDER BY game_title, highscores.score DESC LIMIT 10;
    `;
  const result = await db.query(sql, [urlSlug]);

  const sql2 = `
  SELECT 
  game_title as game_title,
  game.description as description,
  game.image_url as image_url,
  game.genre as genre,
  game.release_year as release_year,
  game.url_slug as url_slug
  FROM game
  where url_slug = $1
`;

  const result2 = await db.query(sql2, [urlSlug]);
  const games = result2.rows[0];

  res.render("gameInfo", {
    title: games.game_title,
    Highscores: result2.rows,
    releaseYear: games.release_year,
    games,
  });
});

module.exports = router;
