function newEvent() {
    return {
        start: 5,
        end: 10,
        magnitude: m = Math.round(Math.random() * 100)
    };
}
window.addEventListener('load', function() {

// Generate our example data
var processData = [];
var processes = ["P1", "P2"];
processes.forEach(function(p, i, arr) {
    var processEvents = d3.range(5).map(newEvent);
    processData.push({
        "label": p,
        "events": processEvents
    });
});

// Create the Gantt chart
var ganttchart = eventline()
    .bandMargin(10)
    .labelMargin(70)
    .domain([
        0,
       500 
    ])
    .axisArgs({
        "tickSize": 1,
        "tickInterval": 1
    });

// Render chart
d3.select("#gantt-chart")
    .datum(processData)
    .call(ganttchart);
});
