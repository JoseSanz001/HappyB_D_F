// sorpresa.js - animación de galaxia + frases flotantes
(function(){
  const canvas = document.getElementById('sorpresaCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w,h;
  const particles = [];
  const texts = [];
  let time = 0;

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  addEventListener('resize', resize);
  resize();

  // crear partículas en espiral (galaxia)
  function spawnParticles(){
    particles.length = 0;
    const count = 220;
    for(let i=0;i<count;i++){
      const angle = i*(Math.PI*2)/35 + Math.random()*0.6;
      const radius = (i/count)*Math.min(w,h)/2.2 + Math.random()*20;
      particles.push({
        x: w/2 + Math.cos(angle)*radius,
        y: h/2 + Math.sin(angle)*radius,
        baseX: w/2, baseY: h/2,
        angle: angle,
        radius: radius,
        speed: 0.0008 + Math.random()*0.0016,
        size: 0.6 + Math.random()*1.6,
        hue: 200 + Math.random()*140
      });
    }
  }

  // frases flotantes: se crean periódicamente
  function spawnText(){
    const txt = phrases[Math.floor(Math.random()*phrases.length)];
    texts.push({
      text: txt,
      x: Math.random()*w,
      y: h + 20,
      vy: -0.5 - Math.random()*0.9,
      alpha: 0,
      life: 0,
      ttl: 7000 + Math.random()*6000
    });
    // limita cantidad
    if(texts.length>8) texts.shift();
  }

  spawnParticles();
  setInterval(spawnText, 1300);

  function draw(){
    time += 1;
    // fondo oscuro
    ctx.fillStyle = 'rgba(4,6,15,0.25)';
    ctx.fillRect(0,0,w,h);

    // brillo central
    const g = ctx.createRadialGradient(w/2,h/2,10,w/2,h/2,Math.max(w,h)/2);
    g.addColorStop(0,'rgba(240,120,200,0.12)');
    g.addColorStop(0.4,'rgba(120,160,255,0.06)');
    g.addColorStop(1,'rgba(0,0,10,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    // dibuja partículas en órbita
    for(let p of particles){
      // modifica contorno para rotar espiral
      p.angle += p.speed * (1 + Math.sin(time/200)*0.5);
      p.x = p.baseX + Math.cos(p.angle)*p.radius;
      p.y = p.baseY + Math.sin(p.angle)*p.radius * 0.9;
      const glow = Math.abs(Math.sin((p.angle+time/300)*3))*0.8 + 0.2;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${0.06 + glow*0.6})`;
      ctx.arc(p.x,p.y,p.size + glow*1.3,0,Math.PI*2);
      ctx.fill();
    }

    // dibuja textos flotantes
    ctx.font = "bold 26px system-ui, sans-serif";
    ctx.textAlign = "center";
    for(let t of texts){
      t.y += t.vy;
      t.life += 16;
      t.alpha = Math.min(1, t.life/400);
      const fade = 1 - Math.max(0, (t.life - t.ttl + 200)/t.ttl);
      ctx.save();
      ctx.globalAlpha = t.alpha * fade;
      // sombra suave
      ctx.shadowColor = "rgba(255,200,255,0.9)";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "white";
      ctx.fillText(t.text, t.x, t.y);
      ctx.restore();
    }

    // overlay corazón pulsante en el centro
    const centerX = w/2, centerY = h/2;
    const pulse = 1 + 0.06*Math.sin(time/12);
    drawHeart(centerX, centerY, 80 * pulse);

    requestAnimationFrame(draw);
  }

  function drawHeart(cx, cy, size){
    ctx.save();
    ctx.translate(cx,cy);
    ctx.scale(1,1);
    ctx.beginPath();
    const x = 0, y = -size/8;
    ctx.moveTo(x, y + size/2);
    ctx.bezierCurveTo(x - size, y - size/2, x - size*1.4, y + size/1.5, x, y + size);
    ctx.bezierCurveTo(x + size*1.4, y + size/1.5, x + size, y - size/2, x, y + size/2);
    ctx.closePath();
    // gradiente
    const g = ctx.createLinearGradient(-size, -size, size, size);
    g.addColorStop(0, 'rgba(255,100,150,0.95)');
    g.addColorStop(1, 'rgba(255,200,220,0.9)');
    ctx.fillStyle = g;
    ctx.shadowColor = 'rgba(255,60,120,0.35)';
    ctx.shadowBlur = 30;
    ctx.fill();
    ctx.restore();
  }

  draw();
})();
