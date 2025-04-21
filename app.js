

// todo: create rubik ✅
// todo : make rubik interactive (to show user all sides) ✅
// todo : create rubik's sides movements ☐




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
const cubeContainer = document.querySelector(".cubeContainer");
const cubes = document.querySelectorAll(".cubie")


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
document.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  initialMouseX = event.clientX;
  initialMouseY = event.clientY;
});
cubeContainer.addEventListener("mousemove", (event) => {
  handleCubeRotation(event)
});
document.addEventListener("mouseleave", () => {
  isMouseDown = false;
});


function changeTransformOrigin() {
  const cubeSize = remToPx(parseInt(getComputedStyle(root).getPropertyValue('--cubie-size').replace('rem', '')))
  cubes.forEach(cube => {
    const x = parseInt(cube.style.getPropertyValue('--x'))
    const y = parseInt(cube.style.getPropertyValue('--y'))
    const z = parseInt(cube.style.getPropertyValue('--z'))
    let transformOriginPoint = { x: 0, y: 0, z: 0 };
    switch (x) {
      case 0:
        transformOriginPoint.x = cubeSize * 1.5;
        break;
      case 1:
        transformOriginPoint.x = cubeSize / 2;
        break;
      case 2:
        transformOriginPoint.x = cubeSize / -2;
        break;
    }
    switch (y) {
      case 0:
        transformOriginPoint.y = cubeSize * 1.5;
        break;
      case 1:
        transformOriginPoint.y = cubeSize / 2;
        break;
      case 2:
        transformOriginPoint.y = cubeSize / -2;
        break;
    }
    switch (z) {
      // related to transform x
      case 0:
        transformOriginPoint.z = cubeSize;
        break;
      case 1:
        transformOriginPoint.z = 0;
        break;
      case 2:
        transformOriginPoint.z = cubeSize * -1;
        break;
    }

    // console.log(transformOriginPoint)
    cube.style.transformOrigin = `${transformOriginPoint.x}px ${transformOriginPoint.y}px ${transformOriginPoint.z}px`;

  })
}
changeTransformOrigin()
// show transform-origin point
cubes.forEach(cube => {
  const style = window.getComputedStyle(cube);
  const origin = style.transformOrigin.split(' ');

  // Parse the origin values
  const originX = parseFloat(origin[0]);
  const originY = parseFloat(origin[1]);
  const originZ = origin.length === 3 ? parseFloat(origin[2]) : 0;

  // Create a dot
  const dot = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.width = '5px';
  dot.style.height = '5px';
  dot.style.backgroundColor = 'black';
  dot.style.borderRadius = '50%';
  dot.style.pointerEvents = 'none';
  dot.style.zIndex = 9999;

  // Apply transformations to position the dot correctly
  dot.style.transform = `translate3d(${originX}px, ${originY}px, ${originZ}px)`;

  // Append the dot to the cube
  cube.appendChild(dot);
});



function rotateCube(axis, index, degrees) {
  const selectedcubes =
    [...cubes]
      .filter(cube => parseInt(cube.style.getPropertyValue(`--${axis.toLowerCase()}`)) === index);

  console.log(selectedcubes.length);
  selectedcubes
    .forEach(cube => {
      cube.style.transform = `translate(-50%, -50%) translate3d(calc((var(--x) - 1) * (var(--cubie-size) + var(--gap))), calc((var(--y) - 1) * (var(--cubie-size) + var(--gap))), calc((var(--z) - 1) * (var(--cubie-size) + var(--gap)))) rotate${axis.toUpperCase()}(${degrees}deg)`
    })
}


function rotateCube2(axis, index, degrees) {
  const selectedcubes =
    [...cubes]
      .filter(cube => parseInt(cube.style.getPropertyValue(`--${axis.toLowerCase()}`)) === index);

  selectedcubes.forEach(cube => {
    rotateCube(axis, index, degrees)
    updateCoordinates(cube, axis, degrees)
  })

}




function remToPx(rem) {
  // Get the root font size (usually 16px by default)
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

  // Convert rem to pixels
  return rem * rootFontSize;
}


function rotateCubeSide(axis, index, degrees) {
  // check for correct degrees
  if (degrees !== 90 && degrees !== -90) {
    console.log('Wrong degrees values. Valid values: ±90');
    return;
  }

  // Select all cubies on the target layer
  const selectedCubes = Array.from(cubes).filter(cube => {
    return parseInt(cube.style.getPropertyValue(`--${axis.toLowerCase()}`)) === index;
  });

  // Create temporary layer
  const layer = document.createElement('div');
  layer.className = 'layer';
  cubeContainer.appendChild(layer);

  // Reset transforms on selected cubies before moving them
  selectedCubes.forEach(cube => {
    cubeContainer.removeChild(cube);
    layer.appendChild(cube);
  });

  // Apply rotation animation to the layer
  setTimeout(() => {
    switch (axis) {
      case 'x':
        root.style.setProperty('--layer-rotateY', `${degrees}deg`);
        break;
      case 'y':
        root.style.setProperty('--layer-rotateX', `${degrees}deg`);
        break;
      case 'z':
        root.style.setProperty('--layer-rotateZ', `${degrees}deg`);
        break;
    }
  }, 500);

  // After animation completes
  setTimeout(() => {

    // Move cubies back with updated positions
    selectedCubes.forEach(cube => {

      layer.removeChild(cube);
      cubeContainer.appendChild(cube);
      updateCoordinates(cube, axis, degrees)
      rotateCube(cube, axis, degrees)

    });

    cubeContainer.removeChild(layer);

  }, 1500); // Match CSS transition duration
}


// function rotateCube(cube, axis, degrees) {

//   // 1. Get current rotation from data attributes (default to 0 if unset)
//   const currentRotations = {
//     X: parseInt(cube.dataset.rotateX) || 0,
//     Y: parseInt(cube.dataset.rotateY) || 0,
//     Z: parseInt(cube.dataset.rotateZ) || 0,
//   };

//   // 2. Update rotation for the target axis
//   const targetAxis = axis.toUpperCase();
//   currentRotations[targetAxis] += degrees;

//   // Keep rotation within 0-360 degrees (optional)
//   currentRotations[targetAxis] %= 360;

//   // 3. Update data attributes with new rotation values
//   cube.dataset.rotateX = currentRotations.X;
//   cube.dataset.rotateY = currentRotations.Y;
//   cube.dataset.rotateZ = currentRotations.Z;

//   // 4. Build the transform string with ALL rotations
//   const newTransform = `
//     translate(-50%, -50%)
//     translate3d(
//       calc((var(--x) - 1) * (var(--cubie-size) + var(--gap))),
//       calc((var(--y) - 1) * (var(--cubie-size) + var(--gap))),
//       calc((var(--z) - 1) * (var(--cubie-size) + var(--gap)))
//     )
//     rotateX(${currentRotations.X}deg)
//     rotateY(${currentRotations.Y}deg)
//     rotateZ(${currentRotations.Z}deg)
//   `.replace(/\s+/g, " "); // Remove line breaks for valid CSS
//   cube.style.transform = newTransform;

// }

function updateCoordinates(cube, axis, degrees) {


  const x = parseInt(cube.style.getPropertyValue('--x'));
  const y = parseInt(cube.style.getPropertyValue('--y'));
  const z = parseInt(cube.style.getPropertyValue('--z'));

  switch (axis.toLowerCase()) {
    case 'x':
      if (degrees === 90) {
        cube.style.setProperty('--y', `${2 - z}`);
        cube.style.setProperty('--z', `${y}`);
      } else {
        cube.style.setProperty('--y', `${z}`);
        cube.style.setProperty('--z', `${2 - y}`);
      }
      break;

    case 'y':
      if (degrees === 90) {
        cube.style.setProperty('--x', `${z}`);
        cube.style.setProperty('--z', `${2 - x}`);
      } else {
        cube.style.setProperty('--x', `${2 - z}`);
        cube.style.setProperty('--z', `${x}`);
      }
      break;

    case 'z':
      if (degrees === 90) {
        cube.style.setProperty('--x', `${2 - y}`);
        cube.style.setProperty('--y', `${x}`);
      } else {
        cube.style.setProperty('--x', `${y}`);
        cube.style.setProperty('--y', `${2 - x}`);
      }
      break;
  }

}

