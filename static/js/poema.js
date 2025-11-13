const poem = [
  "Hoy es un día especial, porque celebra la existencia de alguien que ilumina cada lugar al que llega.",
  "No todos los días nace una persona capaz de transformar lo cotidiano en algo mágico, y tú tienes ese don: el de hacer sonreír sin intentarlo, el de contagiar alegría y dejar huellas bonitas en quienes te rodean.",
  "Deseo de corazón que este nuevo año te traiga mil razones para reír, para soñar en grande y para seguir brillando como solo tú sabes hacerlo.",
  "Que la vida te devuelva multiplicado todo lo bueno que das, porque personas como tú merecen lo mejor del mundo.",
  "Gracias por ser inspiración, por tu forma única de ver la vida y por demostrar que la belleza verdadera va mucho más allá de lo que se ve.",
  "Ojalá la vida me siga regalando el privilegio de coincidir contigo y verte alcanzar todo lo que te propongas.",
  "Feliz cumpleaños, preciosa. Que tu día esté lleno de luz, amor y momentos que te hagan sentir tan especial como realmente eres. 🌙",
  "ATT: J.A.S 😊😘"
];

const poemContainer = document.getElementById("poem");
let delay = 0;

poem.forEach((line, index) => {
  setTimeout(() => {
    const p = document.createElement("p");
    p.classList.add("line");
    p.textContent = line;
    poemContainer.appendChild(p);

    if (index === poem.length - 1) {
      setTimeout(() => {
        document.getElementById("poem-actions").style.display = "block";
      }, 2000);
    }
  }, delay);
  delay += 2500;
});
