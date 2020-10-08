const pdf = require("pdf-creator-node");
const fs = require("fs");

var html = fs.readFileSync("./template.html", "utf8");

var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Report</div>',
  },
  footer: {
    height: "28mm",
    contents: {
      first: "Cover page",
      2: "Second page",
      default:
        '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
      last: "Last Page",
    },
  },
};

module.exports.create = (req, res) => {
  var document = {
    html: html,
    data: {
      desc: req.body.content,
    },
    path: "./output.pdf",
  };

  pdf.create(document, options);
  var data = fs.readFileSync("./output.pdf");
  res.contentType("application/pdf");
  res.send(data);
};
