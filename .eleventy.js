const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
const e2a = s => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])

const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
const a2e = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))

const p2a = s => s.replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)])
const a2p = s => s.replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])

var fs = require('fs');
var companies = JSON.parse(fs.readFileSync("./src/_data/companies.json").toString())
eval(fs.readFileSync('./src/_includes/functions.js')+'');

function genGameObjectFeatures(game) {
    return genGameFeatures(game.title, game.titlefa, game.manuals, game.games)
}
function genGameObjectTitle(game, withoutdl=false) {
    return genGameTitle(game.title, game.titlefa, game.producer, game.publisher, game.manuals, game.games, withoutdl)
}

async function genFileRows(game) {
  var result = "";
  if(game.files) {
    var files = game.files
  } else {
    var files = game.tgfiles
  }
  if(!files || !files.length) {
    result += `<tr dir="rtl">
              <td colspan="3" class="lost-text" style="text-align-last:center">
                <p style="margin:3em 0;">${changeLastSentence("در حال حاضر هیچ نسخه‌ای از این انتشار موجود نداریم! این عنوان در معرض فراموشی همیشگی است. آن را دارید؟")}</p>
              </td>
            </tr>`
  }
  if(files) {
  files.forEach(function(file) {
    result += `<tr>
              <td>${file.file_name}</td>
              <td title="${file.file_size} Bytes">${formatBytes(file.file_size)}</td>`;
    if(game.selling) {
      result += `<td class="download">دانلود</td>`;
    } else if(game.ia_id) {
      result += `<td class="download"><a href="`;
      if (file.tgchannel) {
        result += `https://t.me/${file.tgchannel}`
      } else {
        result += `https://archive.org/download/${game.ia_id}/${file.file_name}`
      }
      result += `" target="_blank"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> دانلود</a></td>`;
    } else {
      result += `<td class="download"><a href="https://t.me/OldPersianGames" target="_blank"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> دانلود</a></td>`;
    }
    result += `</tr>`
  })}
  return result;
}

// Thanks to https://stackoverflow.com/questions/15900485/
function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}
function hasCommonTitles(game1, game2) {
  game1titles = [...game1["title"]]
  game1.games.forEach(function(value) {
    game1titles = game1titles.concat(value["title"])
  })

  var game2titles = [...game2["title"]]
  game2.games.forEach(function(value) {
    game2titles = game2titles.concat(value["title"])
  })
  return game1titles.some(r=> game2titles.includes(r));

  //if(game1["title"].some(r=> game2["title"].includes(r))) {return true}
  //return game1["link_to_titles"].some(r=> game2["link_to_titles"].includes(r))
}
const CleanCSS = require("clean-css");
const htmlmin = require("html-minifier");


async function otherreleases(game, games) {
  result = "";
  games.forEach(function(ogame) {
    if(game===ogame.data.game) {return}
    if(hasCommonTitles(game, ogame.data.game)) {
      result += `<li><a href="${ogame.url}">${genGameObjectTitle(ogame.data.game)}</a></li>`;
    }
  });
  if(result!="") {
    result = '<h2>انتشارهای دیگر این بازی</h2><ul class="other-releases">' + result + "</ul>"
  }
  return result;
}

//const fs = require('fs');
const path = require("path");

const Image = require("@11ty/eleventy-img");
var sizeOf = require('image-size');
async function imageShortcode(gameid, src, alt, width = 165, notag = false) {
  if(alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on myImage from: ${src}`);
  }

    let metadata = await Image(src, {
      widths: [width],
      formats: ["jpg"],
      outputDir: "./dist/photos/",
      urlPath: "/photos/",

      // Define custom filenames for generated images
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = gameid+"-"+path.basename(src).split("-")[0];
        return `${name}-${width}w.${format}`;
      }
    });
  const extension = path.extname(src);
  const name = gameid+"-"+path.basename(src).split("-")[0];
  if(!fs.existsSync("./dist/photos/"+name+extension)) {
    console.log("Conpying "+src)
    fs.copyFile(src, "./dist/photos/"+name+extension, (err) => {
      if (err) throw err;
      //console.log('source.txt was copied to destination.txt');
    })
  }
    if(metadata.jpg) {
      var data = metadata.jpg[0];
    } else {
      var data = metadata.jpeg[0];
    }
  if(notag) {
      return [data.url, data.width, data.height];
  } else {
    return `<img src="${data.url}" width="${data.width}" height="${data.height}" title="${alt}" alt="${alt}" loading="lazy" decoding="async">`;
  }
}


const REFRENCE_MAP = []

const faviconPlugin = require("eleventy-favicon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(faviconPlugin, {destination: "./dist"});
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    if( outputPath.endsWith(".json") ) {
      try {
        return JSON.stringify(JSON.parse(content));
      } catch (err) {
        return content;
      }
    }

    return content;
  });


  const { minify } = require("terser");
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addNunjucksAsyncShortcode('gamesJSONphoto', async function(game) {
    if(!game.photos.length) {
      return "[]"
    }
    let a = await imageShortcode(game.id, "./src/games/" + game.id + "/photos/" + game.photos[0].path, "", 200, true);
    let result = [a[0].substring(8), a[1], a[2]]; // substring to remove `/photos/``
    if(game.photos[0].rebuilt) {
      result[3] = true;
    }
    return JSON.stringify(result)
  });

eleventyConfig.addPairedShortcode(
  'ref',
  function ref (content, id, description) {
    const key = this.page.url

    if(id === "") {
      l = 0; 
      if (REFRENCE_MAP[this.page.url]) { l = Object.keys(REFRENCE_MAP[this.page.url]).length; }
      id = (l + 1).toString();
    }

    const footnote = { id, description }

    REFRENCE_MAP[key] = REFRENCE_MAP[key] || {}
    REFRENCE_MAP[key][id] = footnote

    if(content === "") {
      content = e2p(id);
    }

    //console.log(FOOTNOTE_MAP);
    //console.log(Object.keys(FOOTNOTE_MAP[this.page.url]).length);


    return `<sup id="cite_ref-${id}" class="reference"><a href="#cite_note-${id}" title="${description}">&#91;${content}&#93;</a></sup>`;
  }
);
eleventyConfig.addFilter(
  'references', 
  // The first argument is the value the filter is applied to,
  // which is irrelevant here.
  (_, page) => Object.values(REFRENCE_MAP[page.url] || {})
);
  eleventyConfig.addPassthroughCopy("src/fonts/");
  eleventyConfig.addPassthroughCopy("src/dgen/");
  eleventyConfig.addPassthroughCopy("src/google*.html");
  eleventyConfig.addPassthroughCopy("src/Persian.json");
  eleventyConfig.addPassthroughCopy("src/games.json");
  eleventyConfig.addPassthroughCopy("src/handshake.svg");
  eleventyConfig.addPassthroughCopy("src/OPG.jpg");
  eleventyConfig.addPassthroughCopy("src/DataTables-1.10.22");
  eleventyConfig.addPassthroughCopy("src/datatables.min.css");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/.nojekyll");
  eleventyConfig.addPassthroughCopy("src/blog-pictures/");
  eleventyConfig.addFilter("getFirstPhotoPath", function(game) {
    return `/photos/${game.id}-${game.photos[0].path.split("-")[0]}.${game.photos[0].path.split(".").pop()}`
  });
  eleventyConfig.addFilter("hasCommonTitles", hasCommonTitles);
  eleventyConfig.addFilter("jsonStringify", function(value) { return JSON.stringify(value); });
  eleventyConfig.addFilter("toPersianDate", function(value) { return new Date(value).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }); });

  eleventyConfig.addFilter("formatBytes", formatBytes);
  eleventyConfig.addFilter("genGameObjectTitle", genGameObjectTitle);
  eleventyConfig.addFilter("genGameObjectFeatures", genGameObjectFeatures);
  eleventyConfig.addFilter("changeLastSentence", changeLastSentence);

  eleventyConfig.addFilter("toPersianDigits", function(value) { return value.toLocaleString("fa-IR"); });
  eleventyConfig.addFilter("contribute_type", function(value) { switch(value) {
  case "game":
    return "تهیه‌ی بازی";
  case "cover":
    return "تهیه‌ی کاور";
  case "manual":
    return "تهیه‌ی کتابچه‌ی راهنما";
  case "engineering":
    return "مهندسی بازی";
  case "details":
    return "درج مشخصات";
  default:
    return value;
} });
  eleventyConfig.addFilter("consolelog", function(value) { console.log("startttttttttttttttt"); console.log(value); console.log("tamammmmmmmmmmmmmmmmm"); return ""; exit(); });
  eleventyConfig.addShortcode("today_date", function() { return new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }); } );
  eleventyConfig.addShortcode("contribute_link", function() { return contribute_link; } );
  /*eleventyConfig.addFilter("slug", (input) => {
  	const options = {
  		replacement: "-",
  		remove: /[&,+()$~%.'":*?<>{}]/g,
  		lower: true
  	};
  	return slugify(input, options);
  });*/

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addNunjucksAsyncShortcode("otherreleases", otherreleases);
  eleventyConfig.addNunjucksAsyncShortcode("genFileRows", genFileRows);

  // Base Config
  return {
    dir: {
      input: `src`,
      output: `dist`
    }
  };
};
