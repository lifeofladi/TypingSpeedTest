const textArea = document.querySelector("#textarea");
const theTimer = document.querySelector("#timer");
const timerContainr = document.querySelector(".timer-containr");
const resetBtn = document.querySelector("#reset-btn");
const testText = document.querySelector("#tstx p").innerHTML;
const textAreaContainr = document.querySelector(".txtarea-containr");
var m = 0, s = 0, ms = 0;
var interval;

// Timer function
const runTimer = () => {
  theTimer.textContent = (m<10 ? '0'+m : m) + ":" + (s<10 ? '0'+s : s) + ":" + (ms<10 ? '0'+ms : ms);
  ms++;
  if (ms == 100) {
    ms = 0;
    s++;
  }
  if (s == 60) {
    s = 0;
    m++;
  }
}
//Start function
var start = function () {
  if (!interval) {
    interval = setInterval(runTimer, 10);
    timerContainr.style.boxShadow = "0px 1px 6px 0px green";
  } // stops timer from starting again after initial start.
}

// Pause timer if textarea is cleared after initial start
const textAreaCleared = () => {
  if (textArea.value == "") {
    clearInterval(interval);
    interval = false;
    timerContainr.style.boxShadow = "0px 1px 6px 0px orange";
  }
}

// Match the text entered with the provided text on the page:
const spellCheck = () => {
  let textEntered = textArea.value;
  let testTextMatch = testText.substring(0, textEntered.length);

  if (textEntered == testText) {
    textAreaContainr.style.boxShadow = "0px 1px 6px 0px green";
    clearInterval(interval);
  }else if (textEntered == testTextMatch) {
    textAreaContainr.style.boxShadow = "0px 1px 6px 0px orange";
  }else {
    textAreaContainr.style.boxShadow = "0px 1px 6px 0px red";
  }
}
//Diable pasting in textarea
  textArea.onpaste = e => {
    e.preventDefault();
    return false;
  };

// Reset
const reset = () => {
  clearInterval(interval);
  interval = false;
  m = 0, s = 0, ms = 0;
  textArea.value = "";
  theTimer.innerHTML = "99:99:99";
  textAreaContainr.style.boxShadow = null;
  timerContainr.style.boxShadow = null;
}
// Event listeners:
textArea.addEventListener("keydown", start);
textArea.addEventListener("keyup", () => {
  textAreaCleared();
  spellCheck();
});
resetBtn.addEventListener("click", reset);
