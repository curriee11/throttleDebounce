const input = document.querySelector("input");
const defaultText = document.getElementById("default");
const debounceText = document.getElementById("debounce");
const throttleText = document.getElementById("throttle");

const updateDebounceText = debounce(
  // giving text as paramenter in callback of debounce
  (text) => {
    debounceText.textContent = text;
  }
);

const updateThrottleText = throttle((text) => {
  throttleText.textContent = text;
});
// sends request each time we type code in input box
input.addEventListener("input", (e) => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
});
// debounce and throttle adds time delay
// with debounce function waits for a specified time and if nothing chnges in that specified then it calls the function
// When a debounced function is invoked repeatedly, it postpones its execution until after a certain amount of time has passed since the last time it was invoke
function debounce(cb, delay = 1000) {
  let timeout;
  return (...args) => {
    // The global clearTimeout() method cancels a timeout previously established by calling setTimeout().
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

// throttle does not wait until everything is done
// it contiuously sends request after every set time of delay
function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };
  return (...args) => {
    // if we are in this waiting period dont call this function
    if (shouldWait) {
      waitingArgs = args;
      return;
    }
    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}
