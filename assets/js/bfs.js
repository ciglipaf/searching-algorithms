function create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

function createAdjList(nodes, links) {
  console.log(nodes);
  var adjList = create2DArray(nodes.length);

  for (var i = 0; i < links.length; i++) {
    adjList[links[i].source.group].push(links[i].target.group);
    adjList[links[i].target.group].push(links[i].source.group);
  }

  // remove duplicate adjantency
  for (var i = 0; i < nodes.length; i++) {
    adjList[i] = adjList[i].filter((v, i, a) => a.indexOf(v) === i); 
  }

  console.log(adjList);

  return adjList;
}


var Queue = function() {
 this.items = [];
};

Queue.prototype.enqueue = function(obj) {
 this.items.push(obj);
};

Queue.prototype.dequeue = function() {
 return this.items.shift();
};

Queue.prototype.isEmpty = function() {
 return this.items.length === 0;
};

var doBFS = function(graph, source, target) {
  var bfsInfo = [];
  for (var i = 0; i < graph.length; i++) {
     bfsInfo[i] = {
      // distance not necessary for unweighted graphs, it can be computed while backtracing
       distance: null,
       predecessor: null }
     ;
  }

  bfsInfo[source].distance = 0;
  var queue = new Queue();
  queue.enqueue(source);

while (!queue.isEmpty()) {
  var deque= queue.dequeue();

  // UI staff
  var element       = $("#" + deque);
  element.removeClass();
  element.addClass("visited");
  var steps         = $("#steps");
  steps.append("<span class='yellow'>"+ "Deque" +"</span>"+ "<span> = "+ $("#" + deque).attr("name") + "</span><br>");

  if (deque == target)
    break;
  for (i = 0; i < graph[deque].length; i++){
     var neighbor = graph[deque][i];
     // distance is used for checking if it is visited or not
     if(bfsInfo[neighbor].distance === null){
        bfsInfo[neighbor].distance = bfsInfo[deque].distance + 1;
        bfsInfo[neighbor].predecessor = deque;
        queue.enqueue(neighbor);

        // UI staff
        element       = $("#" + neighbor);
        element.removeClass();
        element.addClass("seen");
  steps.append("<span class='blue'>"+ "Enqueue" +"</span>"+ "<span> = "+ $("#" + neighbor).attr("name") + "</span><br>");
     }
   }
}

 return bfsInfo;
};

function backtrace(graph, source, target) {

  // UI staff
  var steps         = $("#steps");
  steps.append("--------------------------" + "<br>");
  steps.append("Finding Path..." + "<br>");
  var element = $("#" + target);
  element.removeClass();
  element.addClass("selected");
  steps.append(element.attr("name") + "<br>");

  console.log("target: " + target);
  while(target != source) {
    target = graph[target].predecessor;
    console.log("path: " + target);  

    // UI staff
    element = $("#" + target);
    element.removeClass();
    element.addClass("selected");
    steps.append(element.attr("name") + "<br>");
  }
}

function getPath(from, to) {
  var adjList = createAdjList(nodes, links);
  var bfsInfo = doBFS(adjList, from, to);
  // for (var i = 0; i < adjList.length; i++) {
  //     console.log("vertex " + i + ": distance = " + bfsInfo[i].distance + ", predecessor = " + bfsInfo[i].predecessor);
  // }
  backtrace(bfsInfo, from, to);
}
