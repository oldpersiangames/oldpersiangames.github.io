function companiesNames(data, separator = " و ", lang="fa") {
    result = "";
    data.forEach(function(name, idx, array) {
        if(lang==="fa") {
          result += companies[name].titlefa;
        } else {
          result += companies[name].title;
        }
        if (idx !== array.length -1) {
            result += separator;
        }
    })
    return result;
}

function equalArrays(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every(function(value, index) {return value === arr2[index]});
}

function genGameTitle(title, titlefa, producer, publisher, manual, games, withoutdl=false) {
    manual_text = "";
    is_iranian = "";
    is_dubbed = "";
    is_modified = "";
    is_subtitle = "";
    companies_text = "";
    if(manual) {
      manual_text = " (به همراه کتابچه راهنما)";
    }
    
    if(games[0].iranian) {
      is_iranian = "ایرانی ";
      companies_text = "تولید ";
    }
    if(games[0].dubbed) {
      is_dubbed = "نسخه دوبله فارسی ";
    }
    if(games[0].modified) {
        is_modified = " (نسخه ویرایش شده)";
    }
    if(games[0].subtitle) {
      if(games[0].dubbed) {
        is_dubbed = "نسخه دوبله و "
      }
      is_subtitle = "زیرنویس فارسی ";
    }

  producer = producer.filter(e => e !== 'unknown');
  publisher = publisher.filter(e => e !== 'unknown');
    if(equalArrays(producer, publisher)) {
      companies_text += `${companiesNames(publisher)}`;
    } else  {
      companies_text += `${companiesNames(producer)}، نشر ${companiesNames(publisher)}`
    }
    if(is_iranian) {
      vtitle = `${titlefa[0]} | ${title[0]}`
    } else {
      vtitle = `${title[0]} | ${titlefa[0]}`
    }
    return (withoutdl ? "" : "دانلود ")+`${is_dubbed}${is_subtitle}بازی ${is_iranian}${vtitle} - ${companies_text}${is_modified}${manual_text}`;
  }

function genGameArrayTitle(game, withoutdl=false) {
    return genGameTitle(game[1], game[2], game[3], game[4], game[8], game[9], withoutdl)
}

function genGameFeatures(title, titlefa, manual, games) {
    var result = "";
    if(manual) { result += "<br>به همراه کتابچه راهنمای فارسی"; }
    if(games.length===1) {
        if(games[0].subtitle) { result += "<br>دارای زیرنویس فارسی"; }
        if(games[0].dubbed) { result += "<br>دوبله شده به فارسی"; }
        if(games[0].modified) { result += "<br>به همراه تغییرات"; }
        if(games[0].iranian) { result += "<br>بازی ایرانی"; }
    }
    if(title.length>1) {
        result += "<div class='little-list-wrapper' dir='ltr'>Alternative titles:<ul dir='ltr'>";
        title.forEach(function (item, index) {
            if(index!=0) {result += `<li>${item}</li>`}
        })
        result += "</ul></div>";
    }
    if(titlefa.length>1) {
        result += "<div class='little-list-wrapper'>نام‌های دیگر:<ul>";
        titlefa.forEach(function (item, index) {
            if(index!=0) {result += `<li>${item}</li>`}
        })
        result += "</ul></div>";
    }
    if(games.length>1) {
        result += "<div class='little-list-wrapper'>";

        result += "<div dir='ltr'>Includes:</div><ul dir='ltr'>";
        games.forEach(function (item) {
            result += `<li>${item.title[0]}`;
            if(item.dubbed) {
                result += " (Persian Dubbed)"
            }
            if(item.subtitle) {
                result += " (Persian Subtitle)"
            }
            if(item.modified) {
                result += " (Modified Version)"
            }
            if(item.iranian) {
                result += " (Iranian Game)"
            }
            result += "</li>"
        });
        result += "</ul>";
        
        result += "شامل:<ul>";
        games.forEach(function (item) {
            result += `<li>${item.titlefa[0]}`;
            if(item.dubbed) {
                result += " (دوبله شده به فارسی)"
            }
            if(item.subtitle) {
                result += " (دارای زیرنویس فارسی)"
            }
            if(item.modified) {
                result += " (به همراه تغییرات)"
            }
            if(item.iranian) {
                result += " (بازی ایرانی)"
            }
            result += "</li>"
        });
        result += "</ul>";
        result += "</div>";
    }
    return result;
}
function genGameArrayFeatures(game) {
    return genGameFeatures(game[1], game[2], game[8], game[9])
}

var contribute_link = `href="/download-contribute-guide/" onclick="modal.style.display='block';return false;"`;
// Thanks to https://stackoverflow.com/questions/7531664/
function changeLastSentence(string){
    var found = false;
    var index = null;

    var characterGroups = string.split(' ').reverse();

    var position     = 1,//skip the first one since we know that's the end anyway
        elements     = characterGroups.length,
        element      = null,
        prevHadUpper = false,
        last         = null,
        lookFor      = '';

    while(!found && position < elements) {
        element = characterGroups[position].split('');

        if(element.length > 0) {
           last = element[element.length-1];

           // test last character rule
           if(
              last=='.' ||                // ends in '.'
              last=='!' ||                // ends in '!'
              last=='?' ||                // ends in '?'
              (last=='"' && prevHadUpper) // ends in '"' and previous started [A-Z]
           ) {
              found = true;
              index = position-1;
              lookFor = last+' '+characterGroups[position-1];
           } else {
              if(element[0] == element[0].toUpperCase()) {
                 prevHadUpper = true;
              } else {
                 prevHadUpper = false;
              }
           }
        } else {
           prevHadUpper = false;
        }
        position++;
    }

    var lastSentencePosition = string.lastIndexOf(lookFor)+2;
    return string.substr(0,lastSentencePosition) + `<a ${contribute_link}>${string.substr(lastSentencePosition)}</a>`;
}
