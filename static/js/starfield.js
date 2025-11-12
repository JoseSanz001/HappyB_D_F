// starfield.js - dibuja estrellas en canvas (fondo galaxia)
(function(){
  const canvas = document.getElementById('starfield');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars;

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    init();
  }

  function init(){
    stars = [];
    const cnt = Math.floor((w*h)/6000);
    for(let i=0;i<cnt;i++){
      stars.push({
        x: Math.random()*w,
        y: Math.random()*h,
        z: Math.random()*1.2 + 0.1,
        r: Math.random()*1.3 + 0.2
      });
    }
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    // fondo suave
    const grad = ctx.createLinearGradient(0,0,0,h);
    grad.addColorStop(0,'#000016');
    grad.addColorStop(1,'#001022');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);

    // nebulosa (sutil)
    const g2 = ctx.createRadialGradient(w*0.2,h*0.2,10,w*0.5,h*0.45,Math.max(w,h)/1.2);
    g2.addColorStop(0,'rgba(120,10,150,0.05)');
    g2.addColorStop(1,'rgba(10,10,30,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0,0,w,h);

    // estrellas
    for(let s of stars){
      s.x += (s.z-0.5)*0.3;
      s.y += (s.z-0.5)*0.2;
      s.x += Math.sin(Date.now()/10000 + s.z*10)*0.02;
      if(s.x < 0) s.x = w;
      if(s.x > w) s.x = 0;
      if(s.y < 0) s.y = h;
      if(s.y > h) s.y = 0;
      const alpha = Math.min(1, 0.2 + s.z*0.9 + Math.sin((Date.now()+s.x)/3000)*0.2);
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.arc(s.x,s.y,s.r*s.z,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  addEventListener('resize', resize);
  resize();
  draw();
})();
