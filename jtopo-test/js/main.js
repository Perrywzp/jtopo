$(document).ready(function(){                                        
            var canvas = document.getElementById('canvas');
            var stage = new JTopo.Stage(canvas);
            //显示工具栏
            showJTopoToobar(stage);
            var scene = new JTopo.Scene(stage);    
            scene.background = './img/bg.jpg';
            
            // 节点
            function newNode(x, y, w, h, txt){
                var node = new JTopo.Node(txt);
                node.setLocation(x, y);
                node.setSize(w, h);
                node.setImage("./img/people/1.jpg");
                node.fillColor = 'rgba(0,255,255)';
                node.editAble = true;
                node.rotate = 0;
                // node.alpha = "0.5";
                scene.add(node);
                return node;
            }
            
            // 简单连线
            function newLink(nodeA, nodeZ, text, dashedPattern){
                var link = new JTopo.Link(nodeA, nodeZ, text);        
                link.lineWidth = 3; // 线宽
                link.dashedPattern = dashedPattern; // 虚线
                link.bundleOffset = 60; // 折线拐角处的长度
                link.bundleGap = 20; // 线条之间的间隔
                link.textOffsetY = 3; // 文本偏移量（向下3个像素）
                link.strokeColor = '0,200,255';
                scene.add(link);
                return link;
            }
            
            // 折线
            function newFoldLink(nodeA, nodeZ, text, direction, dashedPattern){
                var link = new JTopo.FoldLink(nodeA, nodeZ, text);
                link.direction = direction || 'horizontal';
                link.arrowsRadius = 15; //箭头大小
                link.lineWidth = 3; // 线宽
                link.bundleOffset = 60; // 折线拐角处的长度
                link.bundleGap = 20; // 线条之间的间隔
                link.textOffsetY = 3; // 文本偏移量（向下3个像素）
                link.strokeColor = JTopo.util.randomColor(); // 线条颜色随机
                link.dashedPattern = dashedPattern;
                scene.add(link);
                return link;
            }
            
            // 二次折线
            function newFlexionalLink(nodeA, nodeZ, text, direction, dashedPattern){
                var link = new JTopo.FlexionalLink(nodeA, nodeZ, text);
                link.direction = direction || 'horizontal';
                link.arrowsRadius = 10;
                link.lineWidth = 3; // 线宽
                link.offsetGap = 35;
                link.bundleGap = 15; // 线条之间的间隔
                link.textOffsetY = 10; // 文本偏移量（向下15个像素）
                link.strokeColor = '0,250,0';
                link.dashedPattern = dashedPattern; 
                scene.add(link);
                return link;
            }
            
            // 曲线
            function newCurveLink(nodeA, nodeZ, text){
                var link = new JTopo.CurveLink(nodeA, nodeZ, text);
                link.lineWidth = 3; // 线宽
                scene.add(link);
                return link;
            }
            
            var from = newNode(300, 20, 150, 150,'霄哥');
            from.setImage("./img/people/2.jpg");
            var to = newNode(30, 150, 150, 150,'川哥');
            to.setImage("./img/people/3.jpg");
            var link = newLink(from, to, '', 5);
            link.arrowsRadius = 10;
            
            // var from = newNode(100, 120, 30, 30);
            // var to = newNode(300, 120, 30, 30);
            // var link = newLink(from, to, 'Link');
            
            // var from = newNode(100, 200, 30, 30);
            // var to = newNode(200, 300, 30, 30);
            // var link = newFoldLink(from, to, 'FoldLink');
            // var link = newFoldLink(to, from,'FoldLink', 'vertical', 5);
            
            // var from = newNode(100, 300, 30, 30);
            // var to = newNode(200, 400, 30, 30);
            // var link = newFoldLink(from, to, 'FoldLink', 'vertical');
            
            // var from = newNode(450, 250, 30, 30);
            // var to = newNode(400, 100, 30, 30);
            // var link = newFlexionalLink(from, to, 'FlexLink1');
            // var from = newNode(600, 100, 30, 30);
            // var to = newNode(650, 200, 30, 30);
            // var link = newFlexionalLink(from, to, 'f', 'vertical', 2);
            
            
            // var from = newNode(450, 400, 30, 30);
            // var link = newLink(from, from, 'loop');
            
            // var from = newNode(550, 400, 30, 30);
            // var to = newNode(650, 300, 30, 30);
            // var link = newCurveLink(from, to, 'curve');
            $("div.menu #addNode").click(function(){
                var from = newNode(300, 20, 150, 150,'霄哥');
                from.setImage("./img/people/2.jpg");
                var to = newNode(30, 150, 150, 150,'川哥');
                to.setImage("./img/people/3.jpg");
                var link = newLink(from, to, '', 5);
                link.arrowsRadius = 10;
            });

            $("div.menu #save").click(function(){
                var nodes = stage.find('node');
                console.log(nodes);
            });
            $("div.menu #distroy").click(function(){
                var nodes = stage.find('node');
                scene.clear();
            });
});
    