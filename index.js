window.addEventListener("DOMContentLoaded", (ev) => {
  // These are the necessay DOM elements stored in variables
  const squaresContainer = document.querySelector("#squares");
  const circlesContainer = document.querySelector("#circles");
  const containers = document.querySelectorAll(".container");

  // This is the object of all the shapes different location details and it will be updated next when user interacts.
  let shapeLocations = {
    aside: {
      squares: 6,
      circles: 6,
    },
    main: {
      red: {
        squares: 0,
        circles: 0,
      },

      green: {
        squares: 0,
        circles: 0,
      },

      yellow: {
        squares: 0,
        circles: 0,
      },

      pink: {
        squares: 0,
        circles: 0,
      },

      purple: {
        squares: 0,
        circles: 0,
      },
    },
  };
  // console.log(shapeLocations);

  // This function is responsiblee to fetch/load data from local storage and update the main object
  const loadFromLocalStorage = () => {
    const updatedShapeLocations =
      JSON.parse(window.localStorage.getItem("shapeLocations")) ||
      shapeLocations;
    shapeLocations = { ...shapeLocations, ...updatedShapeLocations };
  };

  // This function is responsible to save modified and updated actions
  const updateLocalStorage = () => {
    const updatedShapeLocations = { ...shapeLocations };

    // const {aside, main} = updatedShapeLocations;

    ["aside", "main"].forEach((section) => {
      if (section == "aside") {
        for (let shapeType in updatedShapeLocations[section]) {
          updatedShapeLocations[section][shapeType] =
            document.getElementById(shapeType).childElementCount;
        }
        return;
      }

      for (let containerType in updatedShapeLocations[section]) {
        for (let shapeType in updatedShapeLocations[section][containerType]) {
          updatedShapeLocations[section][containerType][shapeType] =
            document.querySelectorAll(
              `#${containerType} .${shapeType.slice(0, -1)}`
            ).length;
        }
      }
    });

    window.localStorage.setItem(
      "shapeLocations",
      JSON.stringify(updatedShapeLocations)
    );
  };

  // This function is responsible to create different type of shapes
  const createShape = () => {
    // this.shapeType = shapeType;
    // this.count = +count;
    // this.destination = destination;

    const { aside, main } = shapeLocations;

    for (let shapeType in aside) {
      const container = document.getElementById(shapeType);
      const count = aside[shapeType];

      for (let index = 0; index < count; index++) {
        const shape = document.createElement(`div`);
        shape.className = shapeType.slice(0, -1);
        shape.draggable = true;

        container.appendChild(shape);

        shape.ondragstart = dragStart;
        shape.ondragend = dragEnd;
      }
    }

    for (let containerType in main) {
      const container = document.getElementById(containerType);

      for (let shapeType in main[containerType]) {
        const count = main[containerType][shapeType];

        for (let index = 0; index < count; index++) {
          const shape = document.createElement(`div`);
          shape.className = shapeType.slice(0, -1);
          shape.draggable = true;

          container.appendChild(shape);

          shape.ondragstart = dragStart;
          shape.ondragend = dragEnd;
        }
      }
    }
  };

  
  
  let activeElement = null; // Initially activeElement should be null
  // These dragStart and dragEnd functions attached with all dynamically created shapes ('square', 'circle') to perform necessary behavior and functionalities are needed.
  const dragStart =(ev) => {
    activeElement = ev.target;
    activeElement.classList.add("dragging");
  }

  const dragEnd = (ev) => {
    ev.preventDefault();
    if (!activeElement) return;
    activeElement.classList.remove("dragging");
    activeElement = null;
  }

  // This function will append the shape elements on containers
  let dropTarget = null;
  const drop = (ev) => {
    ev.preventDefault();
    if (!activeElement) return;

    dropTarget = ev.target.closest(".container");

    dropTarget.appendChild(activeElement);
    activeElement.classList.remove("dragging");
    activeElement = null;
    dropTarget = null;

    updateLocalStorage();
  }
  
  loadFromLocalStorage(); // Before createShape Function its necessary to call this function to load and update first the shapeLocations object
  createShape();  // This Call will create the shapes in the containers


  // This loop is to automate the repetitive tasks with containers
  containers.forEach((container) => {
    // console.log(container)
    container.ondragover = (ev) => ev.preventDefault();
    container.ondrop = drop;
  });

// --------------------------------------------- My Old Codes ---------------------------------------------

  // let initialObjectsCreated = false;
  // const createObjects = (quantity, objectType, container) => {
  //   initialObjectsCreated = true;
  //   if (objectType == "circle") {
  //     for (let cout = 1; cout <= +quantity; cout++) {
  //       const circle = document.createElement("div");
  //       circle.className = "circle";

  //       circle.draggable = true;

  //       circle.ondragstart = dragStartFunc;
  //       circle.ondragend = dragEndFunc;

  //       container.appendChild(circle);
  //     }
  //   } else if (objectType == "square") {
  //     for (let cout = 1; cout <= +quantity; cout++) {
  //       const square = document.createElement("div");
  //       square.className = "square";

  //       square.draggable = true;

  //       square.ondragstart = dragStartFunc;
  //       square.ondragend = dragEndFunc;

  //       container.appendChild(square);
  //     }
  //   }
  // };

  // if (!initialObjectsCreated) {
  //   createObjects(6, "square", squaresContainer)
  //   createObjects(6, "circle", circlesContainer)
  // };

  // const defaultobjectsLocation = {
  //   defaultCont: {
  //     squares: 5,
  //     circles: 5
  //   },
  //   redCont: {
  //     squares: 0,
  //     circles: 0
  //   },
  //   greenCont: {
  //     squares: 0,
  //     circles: 0
  //   },
  //   yellowCont: {
  //     squares: 0,
  //     circles: 0
  //   },
  //   pinkCont: {
  //     squares: 0,
  //     circles: 0
  //   },
  //   purpleCont: {
  //     squares: 0,
  //     circles: 0
  //   },
  // };
  // const objectsLocation = {
  //   defaultCont: {
  //     squares: squaresContainer.querySelectorAll(".square").length,
  //     circles: circlesContainer.querySelectorAll(".square").length
  //   },
  //   redCont: {
  //     squares: document.querySelector("#red").querySelectorAll(".square").length,
  //     circles: document.querySelector("#red").querySelectorAll(".circle").length
  //   },
  //   greenCont: {
  //     squares: document.querySelector("#green").querySelectorAll(".square").length,
  //     circles: document.querySelector("#green").querySelectorAll(".circle").length
  //   },
  //   yellowCont: {
  //     squares: document.querySelector("#yellow").querySelectorAll(".square").length,
  //     circles: document.querySelector("#yellow").querySelectorAll(".circle").length
  //   },
  //   pinkCont: {
  //     squares: document.querySelector("#pink").querySelectorAll(".square").length,
  //     circles: document.querySelector("#pink").querySelectorAll(".circle").length
  //   },
  //   purpleCont: {
  //     squares: document.querySelector("#purple").querySelectorAll(".square").length,
  //     circles: document.querySelector("#purple").querySelectorAll(".circle").length
  //   }
  // };

  // function loadFromLocalStorage(){
  //   const objectsLocation = JSON.parse(window.localStorage.getItem("objectsLocation")) || defaultobjectsLocation;
  // }

  // Drag and Drop Logic

  // For Colored Containers
  //   containers.forEach((container) => {
  //     container.ondragover = (ev) => ev.preventDefault();

  //     container.ondrop = dropFunc;
  //   });

  //   // Storing data on localstorage

  //   function updateLocalStorage() {
  //     window.localStorage.setItem(
  //       "objectsLocation",
  //       JSON.stringify(objectsLocation)
  //     );
  //   }
  // });

  // function fetchDataFromLocalStorage(){
  //   const objectsLocation = JSON.parse(
  //     window.localStorage.getItem("objectsLocation")
  //   );
  //   console.log(objectsLocation)

  //   // For Squares
  //   for (const property in objectsLocation.squares) {
  //     switch (property) {
  //       case "default":
  //         createObjects(objectsLocation.squares[property], "square", squaresContainer)
  //         break;
  //       case "red":
  //         createObjects(objectsLocation.squares[property], "square", document.getElementById("red"))
  //         break;
  //       case "green":
  //         createObjects(objectsLocation.squares[property], "square", document.getElementById("green"))
  //         break;
  //       case "yellow":
  //         createObjects(objectsLocation.squares[property], "square", document.getElementById("yellow"))
  //         break;
  //       case "pink":
  //         createObjects(objectsLocation.squares[property], "square", document.getElementById("pink"))
  //         break;
  //       case "purple":
  //         createObjects(objectsLocation.squares[property], "square", document.getElementById("purple"))
  //         break;

  //       default:
  //         break;
  //     };
  //   };

  //   // For Ciercles
  //   for (const property in objectsLocation.circles) {
  //     switch (property) {
  //       case "default":
  //         createObjects(objectsLocation.circles[property], "circle", circlesContainer)
  //         break;
  //       case "red":
  //         createObjects(objectsLocation.circles[property], "circle", document.getElementById("red"))
  //         break;
  //       case "green":
  //         createObjects(objectsLocation.circles[property], "circle", document.getElementById("green"))
  //         break;
  //       case "yellow":
  //         createObjects(objectsLocation.circles[property], "circle", document.getElementById("yellow"))
  //         break;
  //       case "pink":
  //         createObjects(objectsLocation.circles[property], "circle", document.getElementById("pink"))
  //         break;
  //       case "purple":
  //         createObjects(objectsLocation.circles[property], "circle", document.getElementById("purple"))
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  // };
  // fetchDataFromLocalStorage();
});
