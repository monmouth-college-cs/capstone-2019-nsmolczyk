// Nate Smolczyk 
// January 23rd, 2019
// Algorithm Visualization Project

var InOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    reverseOrder = [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    randomOrder = d3.shuffle(d3.range(1, 26));

var datasets = [randomOrder, InOrder, reverseOrder];

var $dataSelection = $('#dataSelect'),
    dataSelection = parseInt($dataSelection.val(), 10),
    array = datasets[dataSelection];

var arraySize = 26,
    svgWidth = 700,
    svgHeight = 400,
    barPadding = 5,
    barWidth = (svgWidth / array.length),
    speed = 500;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var rects = svg.selectAll("rect")
    .data(array)
    .enter()
    .append("rect")
    .attr("width", barWidth * .9)
    .attr("height", function (d) { return d * 10 })
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
    })
    .attr("y", function (d) {
        return svgHeight - 10 * d
    });

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function SlowButtonAction() {
    speed = 500;
}

function FastButtonAction() {
    speed = 50;
}

function reset() {
    var $dataSelection = $('#dataSelect'),
        dataSelection = parseInt($dataSelection.val(), 10);
    array = datasets[dataSelection];
    redraw(array);
    rects = svg.selectAll("rect")
        .attr("fill", "lightblue");
}

function setup() {
    var $dataSelection = $('#dataSelect'),
        dataSelection = parseInt($dataSelection.val(), 10);
    array = datasets[dataSelection];
}

function StartButtonAction() {
    selectionSort(array);
}

function redraw(newData) {
    rects = svg.selectAll("rect")
        .data(newData)
        .transition()
        .duration(speed)
        .attr("height", function (d) { return d * 10 })
        .attr("y", function (d) {
            return svgHeight - 10 * d
        })
        .attr("id", function (d) { return "rect" + d });
}

function color(testing, idx, min) {
    rects = svg.selectAll("rect")
        .attr("fill", function (d, i) {
            if (i < idx) {
                return "green";
            } else if (i == min) {
                return "yellow";
            } else if (i == testing) {
                return "blue";
            } else return "lightblue";
        });

}

function swapAnimation(idx, min) {
    rects = svg.selectAll("rect")
        .attr("fill", function (d, i) {
            if (i < idx) {
                return "green";
            } else if (i == idx || i == min) {
                return "orange";
            } else return "lightblue";
        });
}

function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

async function selectionSort(items) {
    var len = items.length,
        min;

    var i, j;
    var sortidx = 0;

    for (i = 0; i < len; i++) {

        //set minimum to this position

        min = i;
        redraw(items);
        await sleep(speed);
        color(i, sortidx);

        //check the rest of the array to see if anything is smaller
        for (j = i + 1; j < len; j++) {
            color(j, sortidx, min);
            await sleep(speed);
            if (items[j] < items[min]) {
                min = j;
                color(j, sortidx, min);
            }
            redraw(items);
        }

        //if the minimum isn't in the position, swap it
        if (i != min) {
            swap(items, i, min);
            redraw(items)
            swapAnimation(i, min);
            await sleep(speed);

        }
        sortidx++;
    }

    rects = svg.selectAll("rect")
        .attr("fill", "green");

}












