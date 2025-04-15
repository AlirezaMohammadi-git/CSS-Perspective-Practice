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

const cube = document.querySelector(".cubeContainer");

function handleCubeRotation(event) {
  if (isMouseDown) {
    // Calculate the change in mouse position
    const deltaX = event.movementX;
    const deltaY = event.movementY;

    // Retrieve the current rotation values 
    let initialX = parseFloat(getComputedStyle(root).getPropertyValue('--cubeX')) || 0;
    let initialY = parseFloat(getComputedStyle(root).getPropertyValue('--cubeY')) || 0;

    // Update the rotation values based on mouse movement direction
    initialX += deltaX * 0.18;  // Maintain direction for Y-axis
    initialY += deltaY * -0.18; // Invert direction for Y-axis


    // Apply the updated rotation values
    root.style.setProperty('--cubeX', `${initialX}deg`);
    root.style.setProperty('--cubeY', `${initialY}deg`);
  }
}


document.addEventListener('mouseup', () => {
  isMouseDown = false;
})
window.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  initialMouseX = event.clientX;
  initialMouseY = event.clientY;
});
document.addEventListener("mousemove", handleCubeRotation);
document.addEventListener("mouseleave", () => {
  isMouseDown = false;
});

// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------- rotate each layer of cube -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------


// Get all cubies
const cubies = document.querySelectorAll('.cubie');

function rotateLayer(axis, index, degrees) {
  cubies.forEach(cubie => {
    const x = parseInt(cubie.style.getPropertyValue('--x'));
    const y = parseInt(cubie.style.getPropertyValue('--y'));
    const z = parseInt(cubie.style.getPropertyValue('--z'));

    // Check if cubie belongs to the layer we want to rotate
    if (
      (axis === 'x' && x === index) ||
      (axis === 'y' && y === index) ||
      (axis === 'z' && z === index)
    ) {
      // Apply rotation transform
      const computedStyle = getComputedStyle(cubie)
      const currentTransform = computedStyle.transform || '';
      cubie.style.transform = `${currentTransform} rotate${axis.toUpperCase()}(${degrees}deg)`;

      // Update cubie position (for face colors)
      if (axis === 'x') {
        // When rotating around X-axis, Y and Z coordinates change
        const [newY, newZ] = rotateCoordinates(y, z, degrees);
        cubie.style.setProperty('--y', newY);
        cubie.style.setProperty('--z', newZ);
      }
      // Similar logic for Y and Z axis rotations
    }
  });
}

// Helper function to calculate new positions after rotation
function rotateCoordinates(a, b, degrees) {
  const rad = degrees * Math.PI / 180;
  const newA = Math.round(a * Math.cos(rad) - b * Math.sin(rad));
  const newB = Math.round(a * Math.sin(rad) + b * Math.cos(rad));
  return [newA, newB];
}

