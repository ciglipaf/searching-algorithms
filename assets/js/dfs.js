function hasPath(graph, current, goal) {
  var stack = [];
  var visited = [];
  var node;
  stack.push(current);
  visited[current] = true;
  while (stack.length) {
    node = stack.pop();
    console.log("start = " + node);
    if (node === goal) {
      return true;
    }
    for (var i = 0; i < graph[node].length; i += 1) {
      if (!visited[graph[node][i]]) {
        stack.push(graph[node][i]);
        console.log("step = " + graph[node][i]);
        visited[graph[node][i]] = true;
      }
    }
  }
  return false;
}


function dfs(graph, source, target, visited) {
  var visit = visited;
  console.log("girdi");
  if (source == target) 
    return;
  else {
    for (var i = 0; i < graph[source].length; i++) {
      if(visit[graph[source][i]] == false) {
        console.log(graph[source][i]);
        dfs(graph, graph[source][i], target, visit);
      }
    }
  }
}