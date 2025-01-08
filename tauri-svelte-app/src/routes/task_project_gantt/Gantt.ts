import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import moment from 'moment';

const Gantt = {

  drawChart: async function (items: any[]){
    try {

      const array1 = ['a', 'b', 'c'];
      const target = [];
      items.forEach((row) => {
        console.log(row);
        let rowItem = {};
        rowItem.name = row.title;
        let startDate = moment(row.start_date);
        let endDate = moment(row.complete);
        rowItem.start = new Date(startDate.format("YYYY-MM-DD"));
        rowItem.end = new Date(endDate.format("YYYY-MM-DD"));
        target.push(rowItem);
      });
      console.log(target);
      let tasks = target;
/*
      const tasks = [
        { name: "タスクA", start: new Date("2024-01-01"), end: new Date("2024-01-09") },
        { name: "タスクB", start: new Date("2024-01-03"), end: new Date("2024-01-08") },
        { name: "タスクC", start: new Date("2024-01-06"), end: new Date("2024-01-10") },
        { name: "タスクD", start: new Date("2024-01-09"), end: new Date("2024-01-18") },
        { name: "タスク11", start: new Date("2024-01-09"), end: new Date("2024-01-18") },
        { name: "タスク12", start: new Date("2024-01-09"), end: new Date("2024-01-18") },
        { name: "タスク13", start: new Date("2024-01-09"), end: new Date("2024-01-18") },
        { name: "タスク14", start: new Date("2024-01-09"), end: new Date("2024-01-18") },
      ];
*/
    
      // SVGのサイズとマージン
      const margin = { top: 20, right: 30, bottom: 30, left: 100 };
      //const width = 600 - margin.left - margin.right;
      //const height = 200 - margin.top - margin.bottom;
      const width = 700 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;
    
      // SVG要素の作成
      const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
    
      // 時間軸のスケール
      const timeScale = d3.scaleTime()
        .domain([d3.min(tasks, d => d.start), d3.max(tasks, d => d.end)])
        .range([0, width]);
    
      // カテゴリ軸（タスク名）のスケール
      const taskScale = d3.scaleBand()
        .domain(tasks.map(d => d.name))
        .range([0, height])
        .padding(0.1);
    
      // 時間軸の作成
      svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(timeScale));
    
      // カテゴリ軸の作成
      svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(taskScale));
    //font-size: 10px;
      // タスクバーの描画
      svg.selectAll(".bar")
        .data(tasks)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", d => taskScale(d.name))
        .attr("height", taskScale.bandwidth())
        .attr("x", d => timeScale(d.start))
        .attr("width", d => timeScale(d.end) - timeScale(d.start))
        .style("fill", "rgb(115, 240, 198)")
        ;
    
      // タスク名のラベル
      svg.selectAll(".label")
        .data(tasks)
        .enter().append("text")
        .attr("class", "label")
        .attr("y", d => taskScale(d.name) + taskScale.bandwidth() / 2)
        .attr("x", d => timeScale(d.start) + (timeScale(d.end) - timeScale(d.start)) / 2)
        .text(d => d.name)
        .style("font-size", "10px")
        .style("dominant-baseline", "middle")
        .style("text-anchor", "middle")
        ;
    }catch(e){
      console.log(e);
    }
  },

}
export default Gantt;