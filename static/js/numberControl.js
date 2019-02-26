var socket = io();
document.querySelector("#plus").addEventListener("click", e => {
  e.preventDefault();
  socket.emit("increment");
});
document.querySelector("#minus").addEventListener("click", e => {
  e.preventDefault();
  socket.emit("decrement");
});
socket.on("increment", function(num) {
  document.querySelector("#number").innerText = num;
});
socket.on("decrement", function(num) {
  document.querySelector("#number").innerText = num;
});

function setup() {
  createCanvas(640, 480);
}

function draw() {
  if (mouseIsPressed) {
    stroke(255);
    fill(255);
    ellipse(mouseX, mouseY, 20, 20);
    socket.emit("draw", mouseX, mouseY);
  }
  socket.on("draw", function(onmouseX, onmouseY) {
    stroke(255);
    fill(255);
    ellipse(onmouseX, onmouseY, 20, 20);
  });
}
