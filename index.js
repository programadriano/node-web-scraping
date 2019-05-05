var request = require('request');
var cheerio = require('cheerio');
//https://www.digitalocean.com/community/tutorials/how-to-use-node-js-request-and-cheerio-to-set-up-simple-web-scraping
request('https://www.hbo.com/game-of-thrones/cast-and-crew', function (error, response, html) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        $('div.w-100').each(function (i, element) {
            var a = $(this).prev();
          // console.log(a.text() + "\n");
          console.log(a.next() + "\n");
        });

    }
});