const gamesr = require('src/_data/games.js');
var games = null;
gamesr().then(result => {
  games = "";
  for (gameIndex = 0; gameIndex < result.length; gameIndex++) { 
    if(!result[gameIndex].ia_id && !result[gameIndex].selling && result[gameIndex].tgfiles && result[gameIndex].tgfiles.length && result[gameIndex].id != "mountaineer-hi-vu") {
      games = games + " " + result[gameIndex].id
    }
  }
  process.stdout.write(games.trim())
}).catch(err => {
  console.log(err);
});
