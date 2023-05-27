let figure = document.querySelector(".figure");

figure.addEventListener("keydown", function (event) {
  console.log("HEllo World");
  let x = parseInt(figure.style.left);
  let y = parseInt(figure.style.top);
  if (event.keyCode === 37) {
    figure.style.left = x - 10 + "px";
  } else if (event.keyCode === 38) {
    figure.style.top = y - 10 + "px";
  } else if (event.keyCode === 39) {
    figure.style.left = x + 10 + "px";
  } else if (event.keyCode === 40) {
    figure.style.top = y + 10 + "px";
  }
});
