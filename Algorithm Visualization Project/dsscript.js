var stackWidth = 200,
    stackHeight = 500;

var stack = [],
    svg2 = d3.select('.stack')
        .attr("width", stackWidth)
        .attr("height", stackHeight),
    stackBlockWidth = stackWidth,
    stackBlockHeight = 50,
    padding = 5;

function drawStack() {

    d3.selectAll("text").remove();
    d3.selectAll("rect").remove();

    var stackBlocks = svg2.selectAll("rect")
        .data(stack)
        .enter()
        .append("rect")
        .attr("width", stackBlockWidth)
        .attr("height", stackBlockHeight - padding)
        .attr("y", function (d, i) {
            return stackHeight - stackBlockHeight * (i + 1);
        })
        .attr("fill", "red");

    var stackLabels = svg2.selectAll("text")
        .data(stack)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("y", function (d, i) {
            return stackHeight - stackBlockHeight * (i + 1) + (stackBlockHeight) / 2;
        })
        .attr("x", function (d, i) {
            return stackBlockWidth / 2;
        })
        .attr("fill", "black")
        .attr("font-size", 20);

}

function stackpush(val) {

    stack.push(val);
    drawStack();
}

function stackpop() {

    stack.pop();
    drawStack();
}

function pushButtonAction() {

    var inputTag = d3.select('input');
    var pushMe = inputTag.property('value');
    var integer = parseInt(pushMe, 10);
    stackpush(integer);
    inputTag.property("value", "");
}

function popButtonAction() {

    stackpop();

}

var queueWidth = 500,
    queueHeight = 50,
    queueBlockWidth = 60;

var queue = [],
    svg3 = d3.select('.queue')
        .attr("width", queueWidth)
        .attr("height", queueHeight);

function drawQueue() {

    d3.selectAll("text").remove();
    d3.selectAll("rect").remove();

    var queueBlocks = svg3.selectAll("rect")
        .data(queue)
        .enter()
        .append("rect")
        .attr("width", queueBlockWidth - padding)
        .attr("height", queueHeight)
        .attr("x", function (d, i) {
            return queueWidth - queueBlockWidth * (i + 1);
        })

    var queueLabels = svg3.selectAll("text")
        .data(queue)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return queueWidth - queueBlockWidth * (i + 1) + queueBlockWidth / 2.5;
        })
        .attr("y", queueHeight / 2)
        .attr("fill", "black")
        .attr("font-size", 20);

}


function queueEnqueue(val) {
    queue.push(val);
    drawQueue();
}

function queueDequeue() {

    queue.shift();
    drawQueue();
}

function enqueueButtonAction() {

    var inputTag = d3.select('#enqueueinput');
    var pushMe = inputTag.property('value');
    var integer = parseInt(pushMe, 10);
    queueEnqueue(integer);
    inputTag.property("value", "");
}

function dequeueButtonAction() {
    queueDequeue()
}