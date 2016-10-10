function dfs(graph, current, goal) {
  var stack = [];
  var visited = [];
  var node;
  var steps         = $("#steps");
  stack.push(current);
  steps.append("<span class='blue'>"+ "Push" +"</span>"+ "<span> = "+ $("#" + current).attr("name") + "</span><br>");
  visited[current] = true;
  while (stack.length && node !=goal) {
    node = stack.pop();
    console.log("start = " + $("#"+node).attr("name"));
    var element       = $("#" + node);
    element.removeClass();
    element.addClass("selected");
    steps.append("<span class='yellow'>"+ "Pop" +"</span>"+ "<span> = "+ $("#" + node).attr("name") + "</span><br>");
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
        steps.append("<span class='blue'>"+ "Push" +"</span>"+ "<span> = "+ $("#" + graph[node][i]).attr("name") + "</span><br>");
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