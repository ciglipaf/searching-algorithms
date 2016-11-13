var doAstar(graph, source, target) {
  var node = {
    city: []
  };
  var openList[];
  var closedList[];
  var dist;

  // get heuristic distance file
  $.ajaxSetup({async:false});
  $.getJSON( "../2D.csv", function( data ) {
    dist = data;
  });
  console.log(dist);

  for (var i = 0; i < data.length; i++) {
    node["x"] = data[i].X;
    node["y"] = data[i].Y;
    node["f"] = null;
    node["g"] = null;
    node["h"] = null;
    node[data[i].City] = data[i].City;
  }

  node = JSON.stringify(node);
  alert(node);
}
