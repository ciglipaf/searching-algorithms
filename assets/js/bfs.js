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
  var element = document.getElementById(deque);
  element.className = "";
  element.classList.add("visited");
  

  if (deque == target)
    break;
  for (i = 0; i < graph[deque].length; i++){
     var neighbor = graph[deque][i];
     // distance is used for checking if it is visited or not
     if(bfsInfo[neighbor].distance === null){
        bfsInfo[neighbor].distance = bfsInfo[deque].distance + 1;
        bfsInfo[neighbor].predecessor = deque;
        queue.enqueue(neighbor);
     }
   }
}

 return bfsInfo;
};

function backtrace(graph, source, target) {
  var element = document.getElementById(source);

  element.className = "";
  element.classList.add("selected");
  console.log("target: " + target);
  while(target != source) {
    element = document.getElementById(target);
    target = graph[target].predecessor;
    console.log("path: " + target);  

    element.className = "";
    element.classList.add("selected");
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
