import axios from 'axios';
import ExcelJS  from 'exceljs';
import moment from 'moment';

const ExportGantt = {
  
  out: async function (taskItems: any){
    let tasks = [];
    console.log(taskItems);
    const targetItems = [];
    const convertItem = function(items){
      items.forEach((item) => {
        let target = item;
        let targetStart = moment(item.start_date);
        let targetEnd = moment(item.complete);
        target.start = targetStart.format('YYYY-MM-DD');
        target.end = targetEnd.format('YYYY-MM-DD');
        console.log(item)
        targetItems.push(item);
      });
      tasks = targetItems;
    };
    convertItem(taskItems)
    console.log(tasks);
//return;
/*
    const tasks = [
      { id: 1, title: "企画", start: "2024-01-05", end: "2024-01-12" },
      { id: 2, title: "技術スタック選定", start: "2024-01-05", end: "2024-01-12" },
      { id: 3, title: "設計", start: "2024-01-12", end: "2024-01-19" },
      { id: 4, title: "製造", start: "2024-01-12", end: "2024-01-26" },
      { id: 5, title: "単体テスト PH-1", start: "2024-01-19", end: "2024-01-26" },
      { id: 6, title: "単体テスト PH-2", start: "2024-01-19", end: "2024-02-02" },
      { id: 7, title: "結合テスト PH-1", start: "2024-01-26", end: "2024-02-09" },
      { id: 8, title: "結合テスト PH-2", start: "2024-02-02", end: "2024-02-16" },
    ];
*/    

    // 期間の計算 (表示する最初の日付と最後の日付を決定)
    const minDate = moment.min(tasks.map(task => moment(task.start)));
    const maxDate = moment.max(tasks.map(task => moment(task.end)));
    const diffDays = maxDate.diff(minDate, 'days');

    // Excel ワークブックの作成
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Gantt Chart');

    // スタイルの設定
    const titleStyle = {
      font: { bold: true, size: 12 },
      alignment: { vertical: 'middle', horizontal: 'center' },
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } }, // Light gray
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    const taskStyle = {
      alignment: { vertical: 'middle', horizontal: 'left', indent: 1 },
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    const ganttStyle = {
      fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '66FFC0CB' } }, // Light pink
      border: {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    };

    // ヘッダーの作成 (日付)
    worksheet.mergeCells(1, 2, 1, 2 + diffDays);
    worksheet.getCell(1, 2).value = '日付';
    worksheet.getCell(1, 2).style = titleStyle;

    let currentDate = minDate.clone();
    for (let i = 0; i <= diffDays; i++) {
      worksheet.getColumn(2 + i).width = 4; // 列の幅を調整
      worksheet.getCell(2, 2 + i).value = currentDate.format('MMM DD'); // 日付のフォーマット
      worksheet.getCell(2, 2 + i).style = titleStyle;
      currentDate.add(1, 'days');
    }

    // タスク行の作成
    tasks.forEach((task, index) => {
      const row = index + 3; // タスクは3行目から開始
      worksheet.getCell(row, 1).value = task.title;
      worksheet.getCell(row, 1).style = taskStyle;

      const taskStart = moment(task.start);
      const taskEnd = moment(task.end);

      const startColumn = 2 + taskStart.diff(minDate, 'days');
      const endColumn = 2 + taskEnd.diff(minDate, 'days');

      for (let i = startColumn; i <= endColumn; i++) {
        worksheet.getCell(row, i).style = ganttStyle;
      }
    });

    // 罫線
    worksheet.addRow(['']).commit();
    const rows = worksheet.getRows(1, tasks.length + 3);
    rows.forEach(row => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });
    
    const uint8Array = await workbook.xlsx.writeBuffer();
        const blob = new Blob([uint8Array], {type: 'application/octet-binary'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export2.xlsx`;
        a.click();
        a.remove() 
  },
}
export default ExportGantt;