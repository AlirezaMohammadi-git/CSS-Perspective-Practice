const perspectiveOrigin = document.querySelector("#origin");
const perspective = document.querySelector("#perspective");
const rotateX = document.querySelector("#rotateX");
const rotateY = document.querySelector("#rotateY");
const translateZ = document.querySelector("#translateZ");
const root = document.querySelector(":root");

const square = document.querySelector(".mainSquare");
const squareInnerText = document.querySelector(".mainSquare > p");
let isMouseDown = false;
let initialMouseX = 0;
let initialMouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

handleSquareInnerText();

function handlePerspective() {
  if (isMouseDown) {
    root.style.setProperty("--perspective", `${this.value}px`);
    handleSquareInnerText();
  }
}

function handleRotateX() {
  if (isMouseDown) {
    root.style.setProperty("--rotateX", `${this.value}deg`);
    handleSquareInnerText();
  }
}

function handleRotateY() {
  if (isMouseDown) {
    root.style.setProperty("--rotateY", `${this.value}deg`);
    handleSquareInnerText();
  }
}

function handleTranslateZ() {
  if (isMouseDown) {
    root.style.setProperty("--translateZ", `${this.value}px`);
    handleSquareInnerText();
  }
}

function handlePerspectiveOrigin() {
  const newValue = this.value;
  console.log(`New origin value: ${newValue}`);
  root.style.setProperty("--perspective_origin", newValue); // ✅ Fixed name
  handleSquareInnerText();
}

function handleSquareInnerText() {
  const perspective = root.style.getPropertyValue("--perspective");
  const rotateX = root.style.getPropertyValue("--rotateX");
  const rotateY = root.style.getPropertyValue("--rotateY");
  const translateZ = root.style.getPropertyValue("--translateZ");
  const origin = getComputedStyle(root).getPropertyValue(
    "--perspective_origin"
  );

  squareInnerText.textContent = `Perspective:${perspective} \n
  RotateX:${rotateX}
  RotateY:${rotateY}
  TranslateZ:${translateZ}
  Origin:${origin}`;
}
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------- perspective controls events -------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
window.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  initialMouseX = event.clientX;
  initialMouseY = event.clientY;
});
window.addEventListener("mouseup", () => {
  isMouseDown = false;
});
// ----- perspective events
perspective.addEventListener("change", handlePerspective);
perspective.addEventListener("mousemove", handlePerspective);
// ----- rotate X events
rotateX.addEventListener("change", handleRotateX);
rotateX.addEventListener("mousemove", handleRotateX);
// ----- rotate Y events
rotateY.addEventListener("change", handleRotateY);
rotateY.addEventListener("mousemove", handleRotateY);
// perpective origin
perspectiveOrigin.addEventListener("change", handlePerspectiveOrigin);
// perspective origin affects on transform peroperties. for example roateX axie will change base on perspective origin.
// top left : 0% 0%.
// top right : 100% 0%
// ----- rotate Y events
// translateZ is like perspective, but instead of moving camera, it moves the object itself
translateZ.addEventListener("change", handleTranslateZ);
translateZ.addEventListener("mousemove", handleTranslateZ);

// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------  cube section -------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------

const cube = document.querySelector(".cube");
function handleCubeRotation(event) {
  if (isMouseDown) {
    let deltaX = (initialMouseX - event.clientX) * -1;
    let deltaY = initialMouseY - event.clientY;
    root.style.setProperty("--cubeX", `${deltaX}deg`);
    root.style.setProperty("--cubeY", `${deltaY}deg`);
  }
}

cube.addEventListener("mousemove", handleCubeRotation);
cube.addEventListener("mouseleave", () => {
  isMouseDown = false;
});
