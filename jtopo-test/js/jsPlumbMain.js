jsPlumb.ready(function() {
    var color = "#E8C870";
	var instance = jsPlumb.getInstance({
    // notice the 'curviness' argument to this Bezier curve.  the curves on this page are far smoother
    // than the curves on the first demo, which use the default curviness value.      
	    Connector : [ "Bezier", { curviness:50 } ],
	    DragOptions : { cursor: "pointer", zIndex:2000 },
	    PaintStyle : { strokeStyle:color, lineWidth:2 },
	    EndpointStyle : { radius:5, fillStyle:color },
	    HoverPaintStyle : {strokeStyle:"#7073EB" },
	    EndpointHoverStyle : {fillStyle:"#7073EB" },
	    Container:"container-id"
 	});

 	function addNode(parentId, nodeId, nodeLable, position) {
	  var panel = d3.select("#" + parentId);
	  panel.append('div').style('width','120px').style('height','50px')
	    .style('position','absolute')
	    .style('top',position.y).style('left',position.x)
	    .style('border','2px #9DFFCA solid').attr('align','center')
	    .attr('id',nodeId).classed('node',true)
	    .text(nodeLable);
	 
	  return jsPlumb.getSelector('#' + nodeId)[0];
	}

	function addPorts(instance, node, ports, type) {
	  //Assume horizental layout
	  var number_of_ports = ports.length;
	  var i = 0;
	  var height = $(node).height();  //Note, jquery does not include border for height
	  var y_offset = 1 / ( number_of_ports + 1);
	  var y = 0;
	 
	  for ( ; i < number_of_ports; i++ ) {
	    var anchor = [0,0,0,0];
	    var paintStyle = { radius:5, fillStyle:'#FF8891' };
	    var isSource = false, isTarget = false;
	    if ( type === 'output' ) {
	      anchor[0] = 1;
	      paintStyle.fillStyle = '#D4FFD6';
	      isSource = true;
	    } else {
	      isTarget =true;
	    }
	 
	    anchor[1] = y + y_offset;
	    y = anchor[1];
	 
	    instance.addEndpoint(node, {
	      uuid:node.getAttribute("id") + "-" + ports[i],
	      paintStyle: paintStyle,
	      anchor:anchor,
	      maxConnections:-1,
	      isSource:isSource,
	      isTarget:isTarget
	    });
	  }
	}

	function connectPorts(instance, node1, port1, node2 , port2) {
	  // declare some common values:
	  var color = "gray";
	  var arrowCommon = { foldback:0.8, fillStyle:color, width:5 },
	  // use three-arg spec to create two different arrows with the common values:
	  overlays = [
	    [ "Arrow", { location:0.8 }, arrowCommon ],
	    [ "Arrow", { location:0.2, direction:-1 }, arrowCommon ]
	  ];
	 
	  var uuid_source = node1.getAttribute("id") + "-" + port1;
	  var uuid_target = node2.getAttribute("id") + "-" + port2;
	 
	  instance.connect({uuids:[uuid_source, uuid_target]});
	}
	var node1 = addNode('container-id','node1', 'node1', {x:'80px',y:'20px'});
	var node2 = addNode('container-id','node2', 'node2', {x:'280px',y:'20px'});
	 
	addPorts(instance, node1, ['out1','out2'],'output');
	addPorts(instance, node2, ['in','in1','in2'],'input');
	 
	connectPorts(instance, node1, 'out2', node2, 'in');
	instance.draggable($('.node'));

	function getTreeData() {
	  var tree = [
	    {
	      text: "Nodes",
	      nodes: [
	        {
	          text: "Node1",
	        },
	        {
	          text: "Node2"
	        }
	      ]
	    }
	  ]; 
 
  		return tree;
	}
	//Initialize Control Tree View
	$('#control-panel').treeview({data: getTreeData()});
 	//Handle drag and drop
	$('.list-group-item').attr('draggable','true').on('dragstart', function(ev){
	  //ev.dataTransfer.setData("text", ev.target.id);
	  ev.originalEvent.dataTransfer.setData('text',ev.target.textContent);
	  console.log('drag start');
	});
	 
	$('#container-id').on('drop', function(ev){
	  //avoid event conlict for jsPlumb
	  if (ev.target.className.indexOf('_jsPlumb') >= 0 ) {
	    return;
	  }
	 
	  ev.preventDefault();
	  var mx = '' + ev.originalEvent.offsetX + 'px';
	  var my = '' + ev.originalEvent.offsetY + 'px';
	 
	  console.log('on drop : ' + ev.originalEvent.dataTransfer.getData('text'));
	  var uid = new Date().getTime();
	  var node = addNode('flow-panel','node' + uid, 'node', {x:mx,y:my});
	  addPorts(instance, node, ['out'],'output');
	  addPorts(instance, node, ['in1','in2'],'input');
	  instance.draggable($(node));
	}).on('dragover', function(ev){
	  ev.preventDefault();
	  console.log('on drag over');
	});
});