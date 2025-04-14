function generateDownloadLink(fileId: string) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export const songs = [
  {
    title: "Careless Whispers",
    audioSrc: "https://drive.google.com/uc?export=download&id=1B3uFOUnZLQivkLkNyX-p9LnYbNi_E3s9",
    youTubeLink: "https://youtu.be/FpXCUsYFT3k?si=4S0aCSeC1BOetpgW",
    originalSongLink: "https://open.spotify.com/track/4jDmJ51x1o9NZB5Nxxc7gY?si=3767ff73de704380",
    saxSheetsLinks: [],
    saxTypes: ["Saxo Alto"],
    genre: "Pop",
    author: "George Michael",
    authorWikiLink: "https://en.wikipedia.org/wiki/George_Michael"
  },
  {
    title: "Close to You",
    author: "The Carpenters",
    authorWikiLink: "https://en.wikipedia.org/wiki/The_Carpenters",
    originalSongLink: "https://open.spotify.com/track/2kyVQg00pphEufGT59M2XH?si=1e2e37cb4c0c4c44",
    saxType: "Saxo Alto",
    audioSrc: "https://drive.google.com/uc?export=download&id=12dlTJADfSUlcNeYGNxlPcDvcaWuTVw4w",
    youTubeLink: "https://youtu.be/XXNVd90DIPk?si=Q1Oqw0LGHONy_Tmw"
  },
  {
    title: "Creep",
    author: "Radiohead",
    authorWikiLink: "https://en.wikipedia.org/wiki/Radiohead",
    originalSongLink: "https://open.spotify.com/track/70LcF31zb1H0PyJoS1Sx1r?si=fe7a47aae5fc488c",
    saxType: "Saxo Alto",
    audioSrc: "https://drive.google.com/uc?export=download&id=1nNScqsNZ5PMuGMc44xCmssxAIirdV4-Y",
    youTubeLink: "https://youtu.be/6GJkUxoNlLk?si=QY7V8mrHLFMcdoAB"
  },
  {
    title: "Don't Start Now",
    author: "Dua Lipa",
    authorWikiLink: "https://en.wikipedia.org/wiki/Dua_Lipa",
    originalSongLink: "https://open.spotify.com/track/3PfIrDoz19wz7qK7tYeu62?si=461fd582955c437e",
    saxType: "Saxo Alto",
    audioSrc: "https://drive.google.com/uc?export=download&id=1ztdReLfKFbIywxuAjIzqgpO2SSrO_JXh",
    youTubeLink: "https://youtu.be/ffQJqLA3_N0?si=Myei8HzsLANezxhQ"
  },
  {
    title: "El Triste",
    author: "Jose Jose",
    authorWikiLink: "https://en.wikipedia.org/wiki/Jos%C3%A9_Jos%C3%A9",
    originalSongLink: "https://open.spotify.com/track/0aTMBEfPCCkKkneU6gLmDD?si=71b32aa046074d14",
    saxType: "Saxo Tenor",
    audioSrc: "https://drive.google.com/uc?export=download&id=1E9WMrQbmWa-WH_zRrQA1Opqy_LA4Fgjp",
    youTubeLink: "https://youtu.be/Xg2q4_jgkTg?si=EaLKb4EKK5e6F8Qh"
  },
  {
    title: "Eye of the Tiger",
    author: "Survivor",
    authorWikiLink: "https://en.wikipedia.org/wiki/Survivor_(band)",
    originalSongLink: "https://open.spotify.com/track/2KH16WveTQWT6KOG9Rg6e2?si=67a12ccb9ec34fd8",
    saxType: "Saxo Alto",
    audioSrc: generateDownloadLink("1cTMQiw70Tc_NdUf0nz_h1P5tYCB51IPO"),
    youTubeLink: "https://youtu.be/kHhzhmNZPUc?si=5atzAi_s36OXbe7x"
  },
  {
    title: "Hasta que te Conocí",
    author: "Juan Gabriel",
    authorWikiLink: "https://en.wikipedia.org/wiki/Juan_Gabriel",
    originalSongLink: "https://open.spotify.com/track/6XLobzCdi98lFcxG3eGYNr?si=fbcb93822d944e94",
    saxType: "Saxo Alto",
    audioSrc: generateDownloadLink("1BnyttPTbd98crJQbJfZwdo6ydj6meQIW"),
    youTubeLink: "https://youtu.be/nMTuJ0ilfuo?si=NyKeAbgg_L0mjtD5"
  },
  {
    title: "Historia de un Amor v2",
    author: "Carlos Eleta Almarán",
    authorWikiLink: "",
    originalSongLink: "https://open.spotify.com/track/2iOt2F845q87LpnP5IYJ7Z?si=aeb7eb42ac0e43a9",
    saxType: "Saxo Tenor",
    audioSrc: generateDownloadLink("1A2dn4NqUwZnThXNJQPVRPALN9wy-bRZJ"),
    youTubeLink: "https://youtu.be/XUwRLL2c5x8?si=uhSezZ425xZu7cBD"
  },
  {
    title: "I Have Nothing",
    author: "Whitney Houston",
    authorWikiLink: "https://en.wikipedia.org/wiki/Whitney_Houston",
    originalSongLink: "https://open.spotify.com/track/31er9IGsfFbwqy1pH4aiTP?si=584cd34e577f498b",
    saxType: "Saxo Alto",
    audioSrc: generateDownloadLink("1Hch7crPml1CkROR5U-NpVS7m-jaOo6Di"),
    youTubeLink: "https://youtu.be/hoOq3Fke2U8?si=dh1BqODgYS-tII61"
  },
  {
    title: "Is This Love",
    author: "Bob Marley",
    authorWikiLink: "https://en.wikipedia.org/wiki/Bob_Marley",
    originalSongLink: "https://open.spotify.com/track/2sevvnMrqH607r5lwk3kFT?si=777d5c6299b34f4b",
    saxType: "Saxo Alto",
    audioSrc: generateDownloadLink("1b02EZyR52Z4cnXmetFGDTzOr8plV2TkD"),
    youTubeLink: "https://youtu.be/dqfRJ7t77xY?si=cmYDc_kB6-H1Sc2C"
  }
];
