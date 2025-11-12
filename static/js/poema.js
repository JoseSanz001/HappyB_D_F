// poema.js - escribe el poema línea por línea con efecto de máquina de escribir
(function(){
  const container = document.getElementById('poem');
  const actions = document.getElementById('poem-actions');
  if(!container) return;

  let iLine = 0;
  function typeLine(line, cb){
    container.innerHTML += "<div class='line'></div>";
    const el = container.querySelectorAll('.line')[iLine];
    let i = 0;
    const t = setInterval(()=>{
      el.textContent = line.substring(0, ++i);
      if(i >= line.length){
        clearInterval(t);
        iLine++;
        cb && cb();
      }
    }, 40); // velocidad por caracter
  }

  function next(){
    if(iLine >= lines.length){
      // terminado
      actions.style.display = 'block';
      return;
    }
    typeLine(lines[iLine], ()=>{
      // pequeña pausa antes de la siguiente
      setTimeout(next, 600);
    });
  }

  // inicio con leve retraso para sentir suspense
  setTimeout(next, 800);
})();
