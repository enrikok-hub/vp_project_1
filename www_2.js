const http = require("http");
const fs = require("fs");
//laeme moodulid päringu parsimiseks
const url = require("url");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Enriko, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '<img src="vp_banner_2025_TA.jpg" alt="kursuse bänner">';
const pageBody = '\t<h1>Enriko, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	//parsin URL-i
	console.log("päring " + req.url);
	let currentUrl = url.parse(req.url, true);
	console.log("parsituna " + currentUrl.pathname)
	
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"})
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
		res.write(pageFoot);
		return res.end();
	}
	
	else if(currentUrl.pathname === "/vanasonad"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageBanner);
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageHead);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
				res.write(pageFoot);
				return res.end();
			} else {
				let folkWisdom = data.split(";");
				let folkWisdomOutput = "\n\t<ol>";
				for (let i = 0; i < folkWisdom.length; i ++){
					folkWisdomOutput += "\n\t\t<li>" + folkWisdom[i] + "</li>";
				}
				folkWisdomOutput += "\n\t</ol>";
				res.write(pageHead);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.fullDate() + ".</p>");
				res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
				res.write(folkWisdomOutput);
				res.write(pageFoot);
				return res.end();
			}
	    });
	}
}).listen(5129);