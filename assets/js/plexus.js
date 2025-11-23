const canvas = document.getElementById("plexus");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const points = [];
const numPoints = 200;
const maxDistance = 150;

for(let i = 0; i < numPoints; i++){
  points.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  points.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if(p.x < 0 || p.x > width) p.vx *= -1;
    if(p.y < 0 || p.y > height) p.vy *= -1;

    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
    ctx.fill();
  });

  for(let i=0; i<points.length; i++){
    for(let j=i+1; j<points.length; j++){
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < maxDistance){
        ctx.strokeStyle = "#ffffff";
        ctx.globalAlpha = 0.2 * (1 - dist/maxDistance);
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
