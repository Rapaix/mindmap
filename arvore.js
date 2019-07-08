function Node(value) {
    this.value = value;
    this.children = [];
  }
  
  class ArvoreMagica {
    constructor() {
      this.root = null;
    }
  
    add(value, toNodevalue) {
      // Create new node.
      const node = new Node(value);
      // If the toNodevalue arg is passed, find that node. Else, return null.
      const parent = toNodevalue ? this.findBFS(toNodevalue) : null;
      // If the parent isn't null, meaning it's not the root node
      // push the new node as a child to that parent node.
      if (parent) {
        parent.children.push(node);
      } else {
        // If there is no parent, set the node equal to the root.
        if (!this.root) {
          this.root = node;
        } else {
          // You can't have two roots.
          return 'Oops! You can\'t have two roots!'
        }
      }
    }
  
    remove(value) {
      // If the node's value we want to remove is equal to the root's value
      // remove the node by setting it to null.
      if (this.root.value === value) {
        this.root = null;
      }
  
      // Define a queue, with the initial value of an array with the root.
      const queue = [this.root];
      while (queue.length) {
        // Get the first node in the queue.
        const node = queue.shift();
        // Get all the children that node has.
        for (let [index, child] of node.children.entries()) {
          // If one of the children's value is equal to the node's value we want to remove:
          if (child.value === value) {
            // Delete that specific child node from the children entries array.
            node.children.splice(index, 1);
          } else {
            queue.push(child);
          }
        }
      }
    }
  
    contains(value) {
      return !!this.findBFS(value);
    }
  
    findBFS(value) {
      // Breadth-first search.
      // Define a queue, with the initial value of an array with the root.
      const queue = [this.root];
      while (queue.length) {
        // Get the first node of the array.
        const node = queue.shift();
        // If the node's value is equal to the value we want, return that node.
        if (node.value === value) {
          return node;
        }
        // Push the children of that node to the queue.
        for (const child of node.children) {
          queue.push(child);
        }
      }
      // If the queue has no length, meaning the value hasn't been found, return null.
      return null;
    }
  
    preOrder(node, fn) {
      if(node) {
        if(fn) {
          fn(node);
        }
        for(const child of node.children) {
          this.preOrder(child, fn);
        }
      }
    }
  
    postOrder(node, fn) {
      if(node) {
        for(const child of node.children) {
          this.postOrder(child, fn);
        }
        if(fn) {
          fn(node);
        }
      }
    }
  
    traverseDFS(fn, method) {
      // Depth-first search.
      const current = this.root;
      if (method) {
        // If a method has been passed as an arg, invoke that method on the current node.
        this[`${method}`](current, fn);
      } else {
        this.preOrder(current, fn);
      }
    }
  
    traverseBFS(fn) {
      // Breadth-first search.
      const queue = [this.root];
      // Define a queue, with the initial value of an array with the root.
      while (queue.length) {
        // The current node is equal to the first element in the array.
        const node = queue.shift();
        // If a function had been passed, invoke that function on the node.
        if (fn) {
          fn(node);
        }
        for (const child of node.children) {
          // Push all children of the node to the array.
          queue.push(child);
        }
      }
    }
  
    print() {
      if(!this.root) {
        return console.log('There\'s no root');
      }
      // Add a newline to distinguish different levels of ArvoreMagica.
      const newline = new Node('|');
      // After the root, a newline always follows, as it's the top level.
      const queue = [this.root, newline];
      let string = '';
      while (queue.length) {
        // Node is equal to first item in array.
        const node = queue.shift();
        // Set var string equal to the node's value stringified. 
        string += `${node.value.toString()} `;
        if (node === newline && queue.length) {
          queue.push(newline);
        }
        for (const child of node.children) {
          queue.push(child);
        }
      }
      console.log(string.slice(0, -2).trim());
    }
  
    printByLevel() {
      if(!this.root) {
        return console.log('No root node found');
      }
      // Same as print method, however instead of using the pipe symbol
      // to distuingish different levels, you print the levels on different lines.
      const newline = new Node('\n');
      const queue = [this.root, newline];
      let string = '';
      while(queue.length) {
        const node = queue.shift();
        string += node.value.toString() + (node.value !== '\n' ? ' ' : '');
        if(node === newline && queue.length) {
          queue.push(newline);
        }
        for(const child of node.children) {
          queue.push(child);
        }
      }
      console.log(string.trim());
    }
  }

let arvore = new ArvoreMagica();
arvore.add("Pai");
arvore.add("filho1", "Pai");
arvore.add("filho2", "filho1");
arvore.add("filho3", "Pai");
arvore.add("filho4", "filho3");
arvore.print();


var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;
	
var i = 0,
	duration = 750,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = arvore.raiz;
root.x0 = height / 2;
root.y0 = 0;
  
update(root);

d3.select(self.frameElement).style("height", "500px");


function update(source) {
    atualizarSelect();
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);
  
    nodes.forEach(function(d) { d.y = d.depth * 180; });
  
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });
  
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click);
  
    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
  
    nodeEnter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.value; })
        .style("fill-opacity", 1e-6);
  
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
  
    nodeUpdate.select("circle")
        .attr("r", 10)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });
  
    nodeUpdate.select("text")
        .style("fill-opacity", 1);
  
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();
  
    nodeExit.select("circle")
        .attr("r", 1e-6);
  
    nodeExit.select("text")
        .style("fill-opacity", 1e-6);
  
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });
  
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = {x: source.x0, y: source.y0};
          return diagonal({source: o, target: o});
        });
  
     
    link.transition()
        .duration(duration)
        .attr("d", diagonal);
  
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        })
        .remove();
  
    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
  
  // Toggle children on click.
  function click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d);
  }