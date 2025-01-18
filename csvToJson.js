const fs = require('fs');

function parseCSV(filePath) {
    const csvData = fs.readFileSync(filePath, 'utf8');
    const [headers, ...rows] = csvData.split('\n').map((line) => line.split(',').map(cell => cell.trim()));
    
    return rows.map((row) => {
      const obj = {};
      row.forEach((value, idx) => {
        const keys = headers[idx].split('.');
        let current = obj;
        keys.forEach((key, i) => {
          if (i === keys.length - 1) {
            current[key] = value.trim();
          } else {
            current[key] = current[key] || {};
            current = current[key];
          }
        });
      });
      return obj;
    });
}


module.exports = parseCSV