var fileInput     =   document.getElementById("csv");
var example       =   document.getElementById("example");
var links;
var nodes;
var graph = {};


// Read CSV file that contains links
// and create object of nodes/links 
readFile = function () {
  var reader = new FileReader();

  reader.onload = function () {

    document.getElementsByClassName("inner cover")[0].style.display = "none";
    document.getElementsByClassName("dropdown")[0].style.display    = "initial";
    document.getElementsByClassName("dropdown")[1].style.display    = "initial";

    
    links          = csvJSON(reader.result);
    nodes          = getNodes(links);

    graph["links"] = links;
    graph["nodes"] = nodes;

    initializeGraph();
    initializeDrowdowns(nodes);
  };

  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsBinaryString(fileInput.files[0]);
};

uploadedFile = function () {

        document.getElementsByClassName("inner cover")[0].style.display = "none";
        document.getElementsByClassName("dropdown")[0].style.display    = "initial";
        document.getElementsByClassName("dropdown")[1].style.display    = "initial";

        links          = exampleJSON;
        nodes          = getNodes(links);

        graph["links"] = links;
        graph["nodes"] = nodes;

        initializeGraph();
        initializeDrowdowns(nodes);

};

fileInput.addEventListener('change', readFile);
example.addEventListener('click', uploadedFile);



// Convert csv into json format
function csvJSON(csv){

  var lines   = csv.split("\n");
  var headers = ["source", "target", "cost"];
  var json    = [];

  for(var i = 0; i < lines.length ; i++) {
    var obj = {};
    var currentline=lines[i].split(",");
  
    for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
    }

    json.push(obj);
  }
console.log(json);
  return json; 
}

function getNodes(list) {

  var lookup  = {};
  var result  = [];

  for (var i = 0; i < list.length; i++) {
    var obj   = {};
    var node  = list[i];
    var source  = node.source;

    if( !(source in lookup)) {
      lookup[source]   =  1;
      obj["group"]   =  result.length ;
      obj["id"]      =  source;
      result.push(obj);
    }

   
  }

  return result;
}

function initializeGraph() {

  var width         = 800,
      height        = 800;


  var color = d3.scaleOrdinal(d3.schemeCategory20);


  var simulation    = d3.forceSimulation()
                        .force("link", d3.forceLink().id(function(d) { return d.id; }))
                        .force("charge", d3.forceManyBody().theta(50))
                        .force("collusion", d3.forceCollide(60))
                        .force("center", d3.forceCenter(width / 2, height / 2));

  var svg  = d3.select(".graph")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height);

  var link          = svg.selectAll("line")
                            .data(graph.links)
                            .enter()
                            .append("line")
                            .attr("class", "link")
                            .attr("from", function (d) { return d.source })
                            .attr("to", function(d) { return d.target })
                            .attr("stroke", function (d, i) { return color(i); });

  var node          = svg.selectAll("circle")
                            .data(graph.nodes)
                            .enter()
                            .append("circle")
                            .attr("class", "node")
                            .attr("r", 15)
                            .attr("id", function (d) { return d.group; })
                            .attr("fill", function (d,i) { return color(d.group); });

  var label         = svg.selectAll("text")
                          .data(graph.nodes)
                          .enter()
                          .append("text")
                          .attr("class", "name")
                          .text(function(d) { return d.id; });


  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links)
      .distance(function(d) { return d.cost });

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    label
        .attr("x", function(d)  { return d.x; })
        .attr("y", function (d) { return d.y - 25; });

  }

}

function initializeDrowdowns(nodes) {
  var source = false;
  var target = false;
  var from;
  var to;

  for(var i = 0; i < nodes.length; i++) {
    var li       = document.createElement("li");
    var a        = document.createElement("a");
    a.setAttribute("data-value", nodes[i].group);
    var text     = document.createTextNode(nodes[i].id);
    li.appendChild(a).appendChild(text);
    var li_clone = li.cloneNode(true);

    document.getElementById("sourceList").appendChild(li);
    document.getElementById("targetList").appendChild(li_clone);
  }

  $("#sourceList li a").click(function(){
    $(".graph svg .node").removeClass("visited");
    $(".graph svg .node").removeClass("selected");
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    source = true;
    begin(source, target);
  });

  $("#targetList li a").click(function(){
    $(".graph svg .node").removeClass("visited");
    $(".graph svg .node").removeClass("selected");
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    target = true;
    begin(source, target);
  });

}

function begin(source, target) {
  if(source && target) {
    from = $("#source").val();
    to   = $("#target").val();
    console.log("from" + from + " to "+ to);
    getPath(from, to);
  }
}
