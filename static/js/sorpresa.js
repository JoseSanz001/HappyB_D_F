const canvas = document.getElementById("galaxia");
const ctx = canvas.getContext("2d");
let width, height, estrellas = [];

function ajustar() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", ajustar);
ajustar();

// Crear estrellas
for (let i = 0; i < 400; i++) {
  estrellas.push({
    x: Math.random() * width - width / 2,
    y: Math.random() * height - height / 2,
    z: Math.random() * 1000,
    r: Math.random() * 2
  });
}

function dibujar() {
  ctx.fillStyle = "rgba(0, 0, 20, 0.3)";
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(width / 2, height / 2);

  // Estrellas girando
  estrellas.forEach((e) => {
    e.z -= 2;
    if (e.z <= 0) e.z = 1000;

    let k = 128.0 / e.z;
    let px = e.x * k;
    let py = e.y * k;
    if (px >= -width/2 && px <= width/2 && py >= -height/2 && py <= height/2) {
      let tamaño = (1 - e.z / 1000) * e.r * 2;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(px, py, tamaño, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // Corazón central
  const tiempo = Date.now() / 300;
  const tamaño = 12 + Math.sin(tiempo) * 2;
  ctx.scale(tamaño, tamaño);
  ctx.beginPath();
  for (let t = 0; t < Math.PI * 2; t += 0.02) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    ctx.lineTo(x, -y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(255, 105, 180, 0.8)";
  ctx.fill();
  ctx.restore();

  requestAnimationFrame(dibujar);
}

dibujar();
