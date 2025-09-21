const fs = require("node:fs/promises");
const path = require("node:path");
const converter = require("json-2-csv");

const filePath = path.join(__dirname, "..", "..", "expenses.csv");

const exportToCSV = async (data) => {
  try {
    const csv = await converter.json2csv(data);

    await fs.writeFile(filePath, csv);
    console.log("CSV file exported successfully!");
  } catch (error) {
    console.log("error in exporting to CSV", error);
  }
};

module.exports = exportToCSV;
