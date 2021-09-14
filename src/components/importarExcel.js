import XLSX from 'xlsx'
 
function readExcel (file) {
  const types = file.name.split('.')[1];
  
 
  const reader = new FileReader();
  let result = [];
  reader.onload = function(e) {
    const data = e.target.result;
    const wb = XLSX.read(data, {
      type: 'binary'
    });
    wb.SheetNames.forEach((sheetName) => {
      result.push({
        sheetName: sheetName,
        sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
      })
    });
  };
  reader.readAsBinaryString(file.raw)
 
  return result;
}
 
export { readExcel }