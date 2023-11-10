let canvas = document.querySelector('.myCanvas');
let ctx = canvas.getContext('2d');
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

let circles = [];
let colors = ['#093804', '#a4d69f', '#a4d69f'];
function dist(x1, y1, x2, y2) {
  var a = x1 - x2;
  var b = y1 - y2;

  return Math.sqrt(a * a + b * b);
}
function createCircles() {
  while (true) {
    var total = 15;
    var count = 0;
    var attempts = 0;

    while (count < total) {
      var newC = newCircle();
      if (newC !== null) {
        circles.push(newC);
        count++;
      }
      attempts++;
      if (attempts > 100) {
        console.log('finished');
        return;
      }
    }

    for (var i = 0; i < circles.length; i++) {
      var circle = circles[i];

      if (circle.growing) {
        if (circle.edges()) {
          circle.growing = false;
        } else {
          for (var j = 0; j < circles.length; j++) {
            var other = circles[j];
            if (circle !== other) {
              var d = dist(circle.x, circle.y, other.x, other.y);
              var distance = circle.r + other.r;

              if (d - 2 < distance) {
                circle.growing = false;
                break;
              }
            }
          }
        }
      }
      circle.grow();
    }
  }
}

function newCircle() {
  var x = Math.floor(Math.random() * width);
  var y = Math.floor(Math.random() * height);
  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d - 5 < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    let cir = new Circle(x, y);
    if (!cir.edges()) {
      return cir;
    }
  }
  return null;
}

function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 5;
  this.growing = true;

  this.grow = function () {
    if (this.growing) {
      this.r += 1;
    }
  };

  this.show = function () {
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  };

  this.edges = function () {
    return (
      this.x + this.r >= width - 0 ||
      this.x - this.r <= 0 ||
      this.y + this.r >= height - 0 ||
      this.y - this.r <= 0
    );
  };
}

createCircles();
circles.forEach((c) => {
  c.show();
});
