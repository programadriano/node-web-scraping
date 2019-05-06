
var fs = require('fs'),
    http = require('http'),
    https = require('https');

var request = require('request');
var cheerio = require('cheerio');

const db = require('./config/db');
const characterRepository = require('./repository/characterRepository');


request('https://www.hbo.com/game-of-thrones/cast-and-crew', function (error, response, html) {


    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);

        $('section div.w-100 a').each(function (i, element) {
            var a = $(this);
            var name = a.parent().find("span").first().text();


            var thumb = a.find('img').attr('src');

            downloadImageToUrl('https://www.hbo.com' + thumb, './uploads/' + name.toLowerCase().trim().replace(' ', '_') + ".jpeg");

            let characters = {
                name: name,
                thumb: name.toLowerCase().trim().replace(' ', '_') + ".jpeg"
            };

            characterRepository.create(characters);

        });
    }
});



var Stream = require('stream').Transform;

var downloadImageToUrl = (url, filename, callback) => {

    var client = http;
    if (url.toString().indexOf("https") === 0) {
        client = https;
    }

    client.request(url, function (response) {
        var data = new Stream();

        response.on('data', function (chunk) {
            data.push(chunk);
        });

        response.on('end', function () {
            fs.writeFileSync(filename, data.read());
        });
    }).end();
};