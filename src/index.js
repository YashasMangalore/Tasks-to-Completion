import "./styles.css";

const heading = document.getElementById("app");
heading.innerHTML = `<h1>!Jira Board!</h1>`;
heading.setAttribute("contenteditable", true);

const BLANK_TEXT = "";
const DEFAULT_TASK_CARD_MESSAGE = "Add tasks here";

let taskButton = document.getElementById("addTask");
let plannedColumn = document.getElementById("planned");

let count = 0;
taskButton.addEventListener("click", () => {
  let taskCard = document.createElement("div");
  taskCard.setAttribute("class", "taskCard");
  taskCard.setAttribute("id", `taskCard-${++count}`);
  taskCard.setAttribute("contenteditable", true);
  taskCard.setAttribute("draggable", true);
  taskCard.innerHTML = DEFAULT_TASK_CARD_MESSAGE;
  plannedColumn.appendChild(taskCard);

  //existing text removed
  taskCard.addEventListener("click", (event) => {
    if (taskCard.innerText === DEFAULT_TASK_CARD_MESSAGE) {
      taskCard.innerHTML = BLANK_TEXT;
    }
  });
  //remove card which didnt have value
  taskCard.addEventListener("blur", (event) => {
    if (taskCard.innerText === BLANK_TEXT) {
      taskCard.remove();
    }
  });

  //add event that drags
  taskCard.addEventListener("dragstart", (dragEvent) => {
    let selectedCardId = dragEvent.target.id;
    dragEvent.dataTransfer.setData("text", selectedCardId);
    taskCard.style.opacity = 0.3;
  });
  taskCard.addEventListener("dragend", (dragEvent) => {
    taskCard.style.opacity = 1;
  });

  let dragEvents = ["dragover", "dragenter", "drop"];

  dragEvents.forEach((value) => {
    let cols = document.getElementsByClassName("column");

    for (let col of cols) {
      col.addEventListener(value, (event) => {
        event.preventDefault();

        if (value === "drop") {
          let selectedCardId = event.dataTransfer.getData("text");
          let selectedCard = document.getElementById(selectedCardId);
          col.append(selectedCard);
        }
      });
    }
  });
});
//move task to others
// let dropDown = document.createElement("select");
// dropDown.innerHTML = `
//   <option value="planned">Planned</option>
//   <option value="inProgress">Progress</option>
//   <option value="completed">Completed</option>
// `;
// taskCard.append(dropDown);

// dropDown.addEventListener("change", (event) => {
//   let selectedValue = event.target.value; //inprogress value  then
//   let moveToColumn = document.getElementById(selectedValue); //inprogress
//   moveToColumn.append(taskCard);
// });
