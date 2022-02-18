var fs = require('fs');
const path = require("path");
const glob = require("glob");

const baseDir = path.join(__dirname, "..", "games");
const gamesPath = path.join(baseDir, "*" + path.sep);

module.exports = async () => {
  const games = await glob(gamesPath);
  const res = [];
  for (const game of games) {
    files = null; tgfiles = null;

    if (fs.existsSync(game+"files.json")) {
      files = {files: JSON.parse(fs.readFileSync(game+"files.json"))};
    }
    if (fs.existsSync(game+"tgfiles.json")) {
      tgfiles = {tgfiles: JSON.parse(fs.readFileSync(game+"tgfiles.json"))};
    }

    info = JSON.parse(fs.readFileSync(game+"info.json"));

    if(((files && files.files.length) || (tgfiles && tgfiles.tgfiles.length)) && info["manuals"]) {
      info.manuals.forEach(function(manual){
        if(manual.release_type === "printed") {
          if((!Array.isArray(manual.files) || !manual.files.length)) {
            info.defects.push("کتابچه‌ی راهنمای این بازی گم‌شده است. آن را دارید؟");
          }
        }
      })
    }

    const photos = await glob(game+"photos/*.jpg");
    photos.sort(function(a, b) {
      return parseInt(path.basename(a).split("-")[0])-parseInt(path.basename(b).split("-")[0])
    })

    photosArr = []
    for (const photo of photos) {
      filename = path.basename(photo)
      title = path.parse(filename.substring(filename.indexOf('-') + 1)).name;

      switch(title) {
        case "front":
          title = "Front Cover"
          break;
        case "back":
          title = "Back Cover"
          break;
        case "media-disc":
          title = "Media: Disc"
          break;
        case "manual-front":
          title = "Manual: Front"
          break;
        case "manual-back":
          title = "Manual: Back"
          break;
        case "case-front":
          title = "Case: Front"
          break;
        case "case-back":
          title = "Case: Back"
          break;
        case "screenshot-autorun":
          title = "Screenshot: Autorun"
          break;
        case "screenshot-setup":
          title = "Screenshot: Setup"
          break;
        case "screenshot":
          title = "Screenshot"
          break;
        case "extras-poster":
          title = "Extras: Poster"
          break;
        case "extras":
          title = "Extras"
          break;
        default:
      }

      photosArr.push({title: title, path: filename})
    }

    res.push({ id: path.basename(game), ...info, ...files, ...tgfiles, photos: photosArr });
  }
  return res;
};
