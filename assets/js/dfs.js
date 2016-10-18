function dfs(graph, current, goal, maxDepth) {
  var stack = [];
  var visited = []; // dfs mantığına aykırı ve gidilen yolu takip et. Stacki sort ettiğnde zaten implemente etmiş oluckasın. Bütün algoalr.
  var node;          // depth ve cost tut nodelardas

  // UI staff
  var steps         = $("#steps");
  stack.push(current);
  steps.append("<span class='blue'>"+ "Push" +"</span>"+ "<span> = "+ $("#" + current).attr("name") + "</span><br>");
  // UI staff

  visited[current] = true; // Only added to show DFS algorithm, otherwise it doesn't make sense to keep track of visited
                           // nodes while DFS has advantage of space.

  while (stack.length) {

    if (typeof maxDepth !== "undefined")
      if (maxDepth <= 0)
        return;

    node = stack.pop();

    // UI staff
    console.log("start = " + $("#"+node).attr("name"));
    var element       = $("#" + node);
    element.removeClass();
    element.addClass("selected");
    steps.append("<span class='yellow'>"+ "Pop" +"</span>"+ "<span> = "+ $("#" + node).attr("name") + "</span><br>");
    // UI staff

    if (node === goal) {
      return true;
    }
    for (var i = 0; i < graph[node].length; i += 1) {
       if (!visited[graph[node][i]]) {
        stack.push(graph[node][i]);

        // UI staff
        console.log("step = " + $("#" + graph[node][i]).attr("name"));
        var element       = $("#" + graph[node][i]);
        element.removeClass();
        element.addClass("seen");
        var steps         = $("#steps");
        steps.append("<span class='blue'>"+ "Push" +"</span>"+ "<span> = "+ $("#" + graph[node][i]).attr("name") + "</span><br>");
        // UI staff

         visited[graph[node][i]] = true;
      }
    }

    if (typeof maxDepth !== "undefined")
      maxDepth--;
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