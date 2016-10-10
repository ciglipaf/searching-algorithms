function dfs(graph, current, goal) {
  var stack = [];
  var visited = [];
  var node;
  stack.push(current);
  visited[current] = true;
  while (stack.length) {
    node = stack.pop();
    console.log("start = " + $("#"+node).attr("name"));
    var element       = $("#" + node);
    element.removeClass();
    element.addClass("visited");
    var steps         = $("#steps");
    steps.append("<span class='yellow'>"+ "Push" +"</span>"+ "<span> = "+ $("#" + node).attr("name") + "</span><br>");
    if (node === goal) {
      return true;
    }
    for (var i = 0; i < graph[node].length; i += 1) {
      if (!visited[graph[node][i]]) {
        stack.push(graph[node][i]);
        console.log("step = " + $("#" + graph[node][i]).attr("name"));
        var element       = $("#" + graph[node][i]);
        element.removeClass();
        element.addClass("seen");
        var steps         = $("#steps");
        steps.append("<span class='blue'>"+ "Pop" +"</span>"+ "<span> = "+ $("#" + graph[node][i]).attr("name") + "</span><br>");
        visited[graph[node][i]] = true;
      }
    }
  }
  return false;
}


// function dfs(graph, source, target, visited) {
//   var visit = visited;
//   console.log("girdi");
//   if (source == target) 
//     return;
//   else {
//     for (var i = 0; i < graph[source].length; i++) {
//       if(visit[graph[source][i]] == false) {
//         console.log(graph[source][i]);
//         dfs(graph, graph[source][i], target, visit);
//       }
//     }
//   }
// }