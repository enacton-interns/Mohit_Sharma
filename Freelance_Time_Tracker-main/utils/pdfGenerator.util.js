const PDFDocument = require("pdfkit");

async function generateTimeEntriesPDF(entires) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    doc.fontSize(20).text("Time Entries Report", { align: "center" });
    doc.moveDown();

    entires.forEach((entry, index) => {
      doc
        .fontSize(12)
        .text(`${index + 1}. Project ID: ${entry.projectId}`)
        .text(`   User ID: ${entry.userId}`)
        .text(`   Start Time: ${new Date(entry.startTime).toLocaleString()}`)
        .text(`   End Time: ${new Date(entry.endTime).toLocaleString()}`)
        .text(`   Description: ${entry.description}`)
        .moveDown();
    });

    doc.end();
  });
}

module.exports = { generateTimeEntriesPDF };
