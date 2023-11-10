function _1(md){return(
md`#  HW2 Medium baseline (4pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _ycounts1(){return(
[]
)}

function _years1(data){return(
data.map(item => item.Year)
)}

function _5(ycounts1,years1,data)
{
  ycounts1.length = 0; 
  var minYear = Math.min(...years1); 
  var maxYear = Math.max(...years1); 
  for (var y=minYear; y<=maxYear; y++) { 
    ycounts1.push({year:y, gender:"male", count:0}); 
    ycounts1.push({year:y, gender:"female", count:0}); 
  }
  data.forEach (x=> {
    var i = (x.Year-minYear)*2 + (x.Gender== "男" ? 0 : 1); 
    ycounts1[i].count++;
  })
  return ycounts1
}


function _6(Plot,ycounts1){return(
Plot.plot({
  
  grid: true,
  y: {label: "count"},

  marks: [
    Plot.ruleY([0]),
    Plot.barY(ycounts1, {x: "year", y: "count"}),
  ]
})
)}

function _plot2(Inputs){return(
Inputs.form({
  mt:  Inputs.range([0, 100], {label: "marginTop", step: 1}),
  mr:  Inputs.range([0, 100], {label: "marginRight", step: 1}),
  mb:  Inputs.range([0, 100], {label: "marginBottom", step: 1}),
  ml:  Inputs.range([0, 100], {label: "marginLeft", step: 1}),
})
)}

function _8(Plot,plot2,ycounts1){return(
Plot.plot({
  marginTop: plot2.mt,
  marginRight: plot2.mr,
  marginBottom: plot2.mb,
  marginLeft: plot2.ml,
  
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(ycounts1, {x: "year", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("ycounts1")).define("ycounts1", _ycounts1);
  main.variable(observer("years1")).define("years1", ["data"], _years1);
  main.variable(observer()).define(["ycounts1","years1","data"], _5);
  main.variable(observer()).define(["Plot","ycounts1"], _6);
  main.variable(observer("viewof plot2")).define("viewof plot2", ["Inputs"], _plot2);
  main.variable(observer("plot2")).define("plot2", ["Generators", "viewof plot2"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","plot2","ycounts1"], _8);
  return main;
}
