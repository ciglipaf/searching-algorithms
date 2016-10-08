var fileInput     =   document.getElementById("csv");
var links;
var nodes;
var graph = {};


// Read CSV file that contains links
// and create object of nodes/links 
readFile = function () {
  var reader = new FileReader();

  reader.onload = function () {
    document.getElementsByClassName("inner cover")[0].style.display = "none";
    
    links          = csvJSON(reader.result);
    nodes          = getNodes(links);

    graph["links"] = links;
    graph["nodes"] = nodes;

    cemal();
  };

  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsBinaryString(fileInput.files[0]);
};

fileInput.addEventListener('change', readFile);



// Convert csv into json format
function csvJSON(csv){

  var lines   = csv.split("\n");
  var headers = ["from", "to", "cost"];
  var json    = [];

  for(var i = 1; i < lines.length ; i++) {
    var obj = {};
    var currentline=lines[i].split(",");
  
    for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
    }

    json.push(obj);
  }

  return json; 
}

function getNodes(json) {

  var lookup  = {};
  var items   = json;
  var result  = [];

  for (var i = 0; i < items.length; i++) {
    var obj   = {};
    var item  = items[i];
    var from  = item.from;

    if( !(from in lookup)) {
      lookup[from] =  1;
      obj["id"]      =  from;
      result.push(obj);
    }
  }

  return result;
}

function cemal() {

  var width         = 600,
      height        = 600;

  var simulation    = d3.forceSimulation()
                        .force("link", d3.forceLink().id(function(d) { return d.id; }))
                        .force("charge", d3.forceManyBody())
                        .force("center", d3.forceCenter(width / 2, height / 2));

  var svgContainer  = d3.select(".playground")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height);

  var node          = svgContainer.append("g")
                                  .attr("class", "nodes")
                                  .selectAll("circle")
                                  .data(graph.nodes)
                                  .enter()
                                  .append("circle")
                                  .attr("r", 10);
  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);


  function ticked() {
    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

}

// function ticked() {
//     .attr("cx", function(d) { return d.x; })
//     .attr("cy", function(d) { return d.y; });
// }
