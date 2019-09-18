var querystring = require("querystring"),
  fs = require("fs"),
  formidable = require("formidable"),
  uppath = '',
  type = ''; 

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  form.uploadDir = './nodedoc/file-upload'
  console.log("about to parse");
  form.parse(request, function (error, fields, files) {
    console.log("parsing done");

    console.log(files)
    type = '.' + files.upload.name.split('.')[1]

    fs.rename(files.upload.path, files.upload.path + type, function (err) {
      if (err) {
        console.log(err)
        fs.unlink(files.upload.path + type);
        fs.rename(files.upload.path, files.upload.path + type);
      }
      uppath = '';
      uppath = files.upload.path + type;

      response.writeHead(200, { "Content-Type": "text/html" });
      response.write("received image:<br/>");
      if (['.png', '.jpg', '.ico'].includes(type)) {
        response.write("<img src='/show' />");
      } else {
        response.write("filename is" + uppath);
      }
      response.end();
    });
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, { "Content-Type": "image/png" });
  fs.createReadStream(uppath).pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;