const pdfDoc = require("pdfkit");
const fs = require("fs");

const doc = new pdfDoc();

module.exports.create = (req, res) => {
  doc.pipe(fs.createWriteStream("repot.pdf"));
  doc.fontSize(15).text(req.body.content);
  doc.end();
};
