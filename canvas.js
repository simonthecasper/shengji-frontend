
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//c is for context
var c = canvas.getContext('2d');

// fillRect(x, y, width, height)
c.fillStyle = 'rgba(255, 0, 0, 0.5)';
c.fillRect(100, 100, 200, 100);

c.fillStyle = 'rgba(0, 0, 255, 0.5)';
c.fillRect(500, 100, 200, 100);


// Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(100, 200);
c.strokeStyle = "#000000";
c.stroke();


c.lineTo(400, 300);
c.strokeStyle = "#0346a7";
c.stroke();


// Arc / Circle
// c.beginPath();
// c.arc(400, 400, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();


for (var i = 0; i < 300; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
}