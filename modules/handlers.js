var fs = require('fs');
var formidable = require('formidable');

exports.upload = function(request, response) {
  console.log("Responding to request: upload.");
  var form = new formidable.IncomingForm();
  form.parse(request, function(err, fields, files) {
    if (err) throw err;
    fs.renameSync(files.upload.path, "test.png");
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

exports.welcome = function(request, response) {
  console.log("Responding to request: welcome.");
  fs.readFile('templates/start.html', function(err, html) {
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    response.write(html);
    response.end();
  });
}

exports.show = function(request, response) {
  fs.readFile("test.png", "binary", function(err, file) {
    if (err) throw err;
    response.writeHead(200, {
      "Content-Type": "image/png"
    });
    response.write(file, "binary");
    response.end();
  });
}

exports.error = function(request, response) {
  console.log("Winter is Coming");
  response.write("404 | Sorry, I'm lost :O");
  response.end();
}