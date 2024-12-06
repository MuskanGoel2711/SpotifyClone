const { songs } = require('./assets/index');
const express = require('express');
const app = express();
const port = 3000;

const networkHandling = (req, res) => {
  switch (req.query.success) {
    case 'found':
      return res.status(200).json({
        message: 'Get api data',
        data: {
          id: 1,
          name: 'Rishabh',
        },
      });
    case 'notfound':
      return res.status(404).json({
        message: 'Error found',
      });
    default:
      return res.status(200).json({
        message: 'Get api data',
        data: data,
      });
  }
};

app.get('/mockapi', (req, res) => {
  networkHandling(req, res);
});

app.listen(port, () => {
  console.log(`http://10.0.2.2:${port}/mockapi`);
});

const data = {
  albums: [
    {
      id: 1,
      title: 'Thriller',
      artist: 'Michael Jackson',
      releaseYear: 1982,
      genre: 'Pop',
      coverImage: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg',
      tracks: [
        {
          id: 1,
          title: "Wanna Be Startin' Somethin'",
          artist: 'Michael Jackson',
          duration: '6:03',
          trackNumber: 1,
          image: "https://sulkurl.com/cNe",
          url: songs.WannaBeStartinSomethin,
        },
        {
          id: 2,
          title: 'Baby Be Mine',
          artist: 'Michael Jackson',
          duration: '4:18',
          trackNumber: 2,
          image: "https://groovefunkel.com/wp-content/uploads/2023/11/Michael-Jackson-Baby-Be-Mine-Groovefunkel-Remix-mp3-image.jpg",
          url: songs.BabyBeMine,
        },
        {
          id: 3,
          title: 'The Girl Is Mine (ft. Paul McCartney)',
          artist: 'Michael Jackson',
          duration: '3:42',
          trackNumber: 3,
          image: "https://i.ytimg.com/vi/w6agYSvbGLk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBEvpv8j6znAz19FYjgSztdmv8Iqw",
          url: songs.TheGirlIsMine
        },
        {
          id: 4,
          title: 'Thriller',
          artist: 'Michael Jackson',
          duration: '5:57',
          trackNumber: 4,
          image: "https://m.media-amazon.com/images/M/MV5BMDM1YzIyNTYtOGFiMS00YjJiLThiMTktMjllYzI4NjExOGNjXkEyXkFqcGc@._V1_.jpg",
          url: songs.Thriller

        },
        {
          id: 5,
          title: 'Beat It (ft. Eddie Van Halen)',
          artist: 'Michael Jackson',
          duration: '4:57',
          trackNumber: 5,
          image: "https://img.cdn-pictorem.com/uploads/pictureframe/1/670799.jpg",
          url: songs.BeatIt
        },
      ],
    },
    {
      id: 2,
      title: 'Abbey Road',
      artist: 'The Beatles',
      releaseYear: 1969,
      genre: 'Rock',
      coverImage: 'https://m.media-amazon.com/images/I/81GqdQzQz8L._SL1500_.jpg',
      tracks: [
        {
          id: 1,
          title: 'Come Together',
          artist: 'The Beatles',
          duration: '4:20',
          trackNumber: 1,
          image: 'https://i1.sndcdn.com/artworks-FuyWkAYYuP33H2RO-xSjc6w-t500x500.jpg',
          url: songs.ComeTogether
        },
        {
          id: 2,
          title: 'Something',
          artist: 'The Beatles',
          duration: '3:03',
          trackNumber: 2,
          image: 'https://cdns-images.dzcdn.net/images/cover/fad35df01308b206bced0bc942a46dff/0x1900-000000-80-0-0.jpg',
          url: songs.Something
        },
        {
          id: 3,
          title: "Maxwell's Silver Hammer",
          artist: 'The Beatles',
          duration: '3:27',
          trackNumber: 3,
          image: 'https://lh3.googleusercontent.com/proxy/p10h-U4FK21YRTZ5saJ0ppBMnBWk3wFNnXo-X8luYfTgRuKlQN5z9NP88tD2JSekCmI2CdXJp8UL5sRwZWU9aF2nq1RH8f6NjoPJBektOAHgZHYYBGhg7ZuMWK6X58jPAA3kpVZy6TJSLiQI748N5SgRVXJczv5HYHdHdw',
          url: songs.MaxwellSilverHammer
        },
        {
          id: 4,
          title: 'Oh! Darling',
          artist: 'The Beatles',
          duration: '3:26',
          trackNumber: 4,
          image: 'https://lh4.googleusercontent.com/proxy/TLL4QTDnbcO05BOKM89uG-OgVvGe56JfkVoLdJcPdgEHiUZ4h6LhaLcLtwRhJ8B8ciiapM9sDRsymJQmiPq2ZNFSJtZ4f22Yq_90dd33BBdIDdwJMr4p2I4rBd5DgXWGiwEb_ne06POu99AYmw',
          url: songs.OhDarling
        },
        {
          id: 5,
          title: 'Here Comes the Sun',
          artist: 'The Beatles',
          duration: '3:05',
          trackNumber: 5,
          image: 'https://preview.redd.it/here-comes-the-sun-appreciation-post-v0-gwd167wb937c1.jpeg?auto=webp&s=79f8f640c6c889c4676e71e5809ff274a10292a3',
          url: songs.HereComesTheSun
        },
      ],
    },
    {
      id: 3,
      title: 'Lover',
      artist: 'Taylor Swift',
      releaseYear: 2019,
      genre: 'Pop',
      coverImage: 'https://m.media-amazon.com/images/I/81zum6YIkAL._UF1000,1000_QL80_.jpg',
      tracks: [
        {
          id: 1,
          title: 'I Forgot That You Existed',
          artist: 'Taylor Swift',
          duration: '2:51',
          trackNumber: 1,
          image: 'https://i1.sndcdn.com/artworks-Kl5re147GIX2pYIt-CDU3wA-t500x500.jpg',
          url: songs.IForgotThatYouExisted
        },
        {
          id: 2,
          title: 'Cruel Summer',
          artist: 'Taylor Swift',
          duration: '2:59',
          trackNumber: 2,
          image: 'https://i1.sndcdn.com/artworks-OzyZ8DWQZWY4W2sb-NGBlHQ-t1080x1080.jpg',
          url: songs.CruelSummer
        },
        {
          id: 3,
          title: 'Lover',
          artist: 'Taylor Swift',
          duration: '3:58',
          trackNumber: 3,
          image: 'https://m.media-amazon.com/images/I/81zum6YIkAL._UF1000,1000_QL80_.jpg',
          url: songs.Lover
        },
        {
          id: 4,
          title: 'The Man',
          artist: 'Taylor Swift',
          duration: '4:14',
          trackNumber: 4,
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhyzhb-HrVNpYlo2FWH5qFLbhCDJ1hIr6QxA&s',
          url: songs.TheMan
        },
        {
          id: 5,
          title: 'You Need To Calm Down',
          artist: 'Taylor Swift',
          duration: '3:30',
          trackNumber: 5,
          image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/158648e4-fb58-4b77-8053-e91ff4e194e4/de01rpp-07e1d49a-7497-4406-ad21-d9640eaeb1fd.png/v1/fit/w_828,h_1036,q_70,strp/you_need_to_calm_down___taylor_swift_by_georgiig_de01rpp-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTM1MCIsInBhdGgiOiJcL2ZcLzE1ODY0OGU0LWZiNTgtNGI3Ny04MDUzLWU5MWZmNGUxOTRlNFwvZGUwMXJwcC0wN2UxZDQ5YS03NDk3LTQ0MDYtYWQyMS1kOTY0MGVhZWIxZmQucG5nIiwid2lkdGgiOiI8PTEwODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.0v44qO3hddQtqBWnAuKhiD66vVBwLuSAyzIvDkqnqNc',
          url: songs.YouNeedToCalmDown
        },
      ],
    },
  ],
  artists: [
    {
      id: 1,
      name: 'Michael Jackson',
      genres: ['Pop', 'R&B', 'Soul'],
      debutYear: 1964,
      coverImage: "https://upload.wikimedia.org/wikipedia/commons/3/31/Michael_Jackson_in_1988.jpg",
      albums: [
        {
          id: 1,
          title: 'Thriller',
          releaseYear: 1982,
        },
        {
          id: 2,
          title: 'Bad',
          releaseYear: 1987,
        },
      ],
    },
    {
      id: 2,
      name: 'The Beatles',
      genres: ['Rock', 'Pop', 'Psychedelic Rock'],
      debutYear: 1960,
      coverImage: "https://m.media-amazon.com/images/I/81GqdQzQz8L._SL1500_.jpg",
      albums: [
        {
          id: 2,
          title: 'Abbey Road',
          releaseYear: 1969,
        },
        {
          id: 3,
          title: 'Let It Be',
          releaseYear: 1970,
        },
      ],
    },
    {
      id: 3,
      name: 'Taylor Swift',
      genres: ['Pop', 'Country', 'Indie'],
      debutYear: 2006,
      coverImage: "https://m.media-amazon.com/images/I/81zum6YIkAL._UF1000,1000_QL80_.jpg",
      albums: [
        {
          id: 3,
          title: 'Lover',
          releaseYear: 2019,
        },
        {
          id: 4,
          title: '1989',
          releaseYear: 2014,
        },
      ],
    },
  ],
};