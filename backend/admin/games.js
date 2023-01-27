var express = require("express");
var router = express.Router();

// GET /admin/games
router.get("/", async (req, res) => {
  const db = req.app.locals.db;

  const games = await getGames(db);

  res.render("admin/games/index", {
    title: "Spel",
    games,
  });
});

// GET /admin/games/new
router.get("/new", async (req, res) => {
  res.render("admin/games/new", {
    title: "Nytt Spel",
  });
});

router.post("/new", async (req, res) => {
  const { game_title, description, image_url, genre, release_year } = req.body;

  const game = {
    game_title,
    description,
    image_url,
    genre,
    release_year,
    url_slug: generateURLSlug(game_title),
  };
  const db = req.app.locals.db;

  await saveGame(game, db);

  res.redirect("/admin/games");
});

const generateURLSlug = (game_title) =>
  game_title.replace(" ", "-").toLowerCase();

async function saveGame(game, db) {
  const sql = `
        INSERT INTO game (
          game_title,
          description,
          image_url,
          genre,
          release_year,
          url_slug
        ) VALUES ($1,$2,$3,$4,$5,$6)
    `;

  await db.query(sql, [
    game.game_title,
    game.description,
    game.image_url,
    game.genre,
    game.release_year,
    game.url_slug,
  ]);
}

async function getGames(db) {
  const sql = `
        SELECT id,
               game_title,
               description,
               image_url,
               genre,
               release_year,
               url_slug
          FROM game
    `;

  const result = await db.query(sql);

  return result.rows;
}

module.exports = router;
