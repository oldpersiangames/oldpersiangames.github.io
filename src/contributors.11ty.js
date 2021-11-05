class Test {
  data() {
    return {
      // Writes to "/my-permalink/index.html"
      title: "مشارکت‌کنندگان",
      layout: "page"
    };
  }

  render(data) {
  	var result = '<p style="border:thin solid #bbd;background-color:#ddf;padding:5px;">ترتیب بر اساس حروف الفبا می‌باشد.</p>';
  	var contributors = {};

  	data.games.forEach(function(game) {
  		game.contributors.forEach(function(contributor) {

  			if(!contributors[contributor.username]) {
  				contributors[contributor.username] = {};
  				contributors[contributor.username].games = 0;
  				contributors[contributor.username].covers = 0;
  				contributors[contributor.username].manuals = 0;
  				contributors[contributor.username].engineering = 0;
          contributors[contributor.username].details = 0;
          if(data.users[contributor.username] && data.users[contributor.username].sort) {
            contributors[contributor.username].sort = data.users[contributor.username].sort;
          } else {
            contributors[contributor.username].sort = -1;
          }
  			}
  			
  			contributor.contribute.forEach(function(contribute) {
  				if(contribute === "game") {
  					contributors[contributor.username].games += 1;
  				}
  				if(contribute === "cover") {
  					contributors[contributor.username].covers += 1;
  				}
  				if(contribute === "manual") {
  					contributors[contributor.username].manuals += 1;
  				}
  				if(contribute === "engineering") {
  					contributors[contributor.username].engineering += 1;
  				}
          if(contribute === "details") {
            contributors[contributor.username].details += 1;
          }
  			});
  			
  		});
  	});
    var arr = Object.entries(contributors);
    //console.log(arr);
    
arr.sort(function(a, b){
    //if(a[1]["sort"] !== -1 && b[1]["sort"] === -1) { return -1; }
    //if(a[1]["sort"] === -1 && b[1]["sort"] !== -1) { return 1; }
    //if(a[1]["sort"] === -1 && b[1]["sort"] === -1) { return (b[1]["games"]+b[1]["manuals"]+b[1]["engineering"]*2)-(a[1]["games"]+a[1]["manuals"]+a[1]["engineering"]*2); }
    //return a[1]["sort"] - b[1]["sort"]
  var x = a[0];
  var y = b[0];
  if(x.toLowerCase() !== y.toLowerCase()) { x = x.toLowerCase(); y = y.toLowerCase(); }
  return x > y ? 1 : (x < y ? -1 : 0); // or return x.localeCompare(y);
});
  	arr.forEach(([username, contributes]) => {
  		var display_name = username;
  		var extra_details = "";
  		var extra_contributes = "";
  		if(data.users[username]) {
  			var user = data.users[username];
  			if(user.display_name) {
  				display_name = user.display_name;
  			}
  			if(user.website) {
  				extra_details += `<a href="${user.website}" target="_blank">[وبسایت]</a> `;
  			}
  			if(user.github) {
  				extra_details += `<a href="https://github.com/${user.github}" target="_blank">[گیت‌هاب]</a> `;
  			}
        if(user.email) {
          extra_details += `<a href="mailto:${user.email}">[ایمیل: ${user.email}]</a> `;
        }
  			if(!user.telegram) {
          user.telegram = username;
  			}
        if(user.telegram!=="none") {
          extra_details += `<a href="https://t.me/${user.telegram}" target="_blank">[تلگرام: <span dir="ltr">@${user.telegram}</span>]</a> `;
        }
  			if(user.contributes) {
  				user.contributes.forEach(function(value) {
  					extra_contributes += `<li>${value}</li>`;
  				});
  				
  			}
  		} else {
        extra_details += `<a href="https://t.me/${username}" target="_blank">[تلگرام: <span dir="ltr">@${username}</span>]</a> `;
      }
  		result += `<h2 id="${username}">${display_name} <span style="font-size:70%">${extra_details}</span></h2>
  		<ul>${extra_contributes}` +
  		(contributes.games ? `<li>مشارکت در تهیه‌ی ${contributes.games} بازی</li>` : '') +
  		(contributes.covers ? `<li>مشارکت در تهیه‌ی ${contributes.covers} کاور</li>` : '') +
  		(contributes.manuals ? `<li>مشارکت در تهیه‌ی ${contributes.manuals} کتابچه</li>` : '') +
  		(contributes.engineering ? `<li>مشارکت در مهندسی ${contributes.engineering} بازی</li>` : '') +
      (contributes.details ? `<li>مشارکت در درج مشخصات ${contributes.details} بازی</li>` : '')

  		result += `</ul>`;
  	});
  	return result;
  }
}

module.exports = Test;
