CREATE TABLE game (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    game_title VARCHAR(250) NOT NULL,
    description VARCHAR(500) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    release_year NUMERIC(4) NOT NULL,
    url_slug VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (url_slug)
);

CREATE TABLE highscores (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    gameid INTEGER NOT NULL,
    player VARCHAR(250) NOT NULL,
    score_date DATE NOT NULL,
    score INTEGER NOT NULL,
    PRIMARY KEY (id),
	FOREIGN KEY (gameid) REFERENCES game(id)
);

INSERT INTO
    games (
        game_title,
        description,
        genre,
        image_url,
        release_year,
        url_slug
    )
VALUES
    (
        'Tetris',
        'A tetris is a tile-matching puzzle game, developed in the Soviet Union in 1984. The game has a simple goal of destroying lines of block before it reaches the top. The line is made up of a square block. The Tetrimino is the shape of the 4 connected blocks that falls vertically down.',
        'Puzzle',
        'https://i1.sndcdn.com/artworks-000349484028-xq0jzn-t500x500.jpg',
        '1984',
        'tetris'
    ),
    (
        'Super Tetris',
        'Super Tetris is a game in which two players can play with each other in competitive, cooperative or head-to-head modes. Developed by Sphere, Inc. Added bombs, new special block types, and two-player co-operative and competitive modes. Bombs appear in some blocks, which explode when the row is filled and removed.',
        'Puzzle',
        'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Super_Tetris_cover.jpg/220px-Super_Tetris_cover.jpg',
        '1991',
        'super-tetris'
    ),
    (
        'Pac-Man',
        'Pac-Man is an action maze chase video game; the player controls the eponymous character through an enclosed maze. The objective of the game is to eat all of the dots placed in the maze while avoiding four colored ghosts — Blinky (red), Pinky (pink), Inky (cyan), and Clyde (orange) — that pursue him.',
        'Maze',
        'http://www.todayifoundout.com/wp-content/uploads/2013/08/pacman.jpg',
        '1980',
        'pacman'
    ),
    (
        'Asteroids',
        'Asteroids is a space-themed multidirectional shooter arcade game designed by Lyle Rains and Ed Logg released in November 1979 by Atari, Inc. The player controls a single spaceship in an asteroid field which is periodically traversed by flying saucers.',
        'multidirectional shooter arcade game',
        'https://i.ytimg.com/vi/3GWEjw3py_U/maxresdefault.jpg',
        '1979',
        'asteroids'
    ),
    (
        'Donkey Kong',
        'Donkey Kong is a video game series created by Shigeru Miyamoto. It follows the adventures of an ape named Donkey Kong and his clan of other apes and monkeys. The franchise primarily consists of platform games, originally single-screen action puzzle games and later side-scrolling platformers.',
        'Platform',
        'https://media.wired.com/photos/5926ae95cefba457b079acf4/master/w_2560%2Cc_limit/DonkeyKong_TA.jpg',
        '1981',
        'donkey-kong'
    );

INSERT INTO
    highscores (gameid, player, score_date, score)
VALUES
    (	
        1,
        ' John Doe',
        '2022-01-01',
        '2564532'
    ),
    (
        3,
        ' Jane Doe',
        '2022-01-24',
        '1873234'
    ),
    (
        5,
        ' Jim Doe',
        '2022-02-05',
        '897873'
    ),
    (
        2,
        ' John Doe',
        '2022-02-18',
        '3948454'
    ),
    (
        4,
        ' Jane Doe',
        '2022-01-01',
        '987873'
    );
