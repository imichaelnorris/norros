// HTML purists hate this one simple trick.
function CreateKeyboard(elem) {
    elem.innerHTML = `<div class="row">
    <p>
      <button code="Backquote" alt="~">\`</button>
      <button code="Digit1" alt="!">1</button>
      <button code="Digit2" alt="@">2</button>
      <button code="Digit3" alt="#">3</button>
      <button code="Digit4" alt="$">4</button>
      <button code="Digit5" alt="%">5</button>
      <button code="Digit6" alt="^">6</button>
      <button code="Digit7" alt="&">7</button>
      <button code="Digit8" alt="*">8</button>
      <button code="Digit9" alt="(">9</button>
      <button code="Digit0" alt=")">0</button>
      <button code="Minus" alt="_">-</button>
      <button code="Equal" alt="+">=</button>
      <button code="Backspace">Backspace</button>
  </div>
  <div class="row">
    <p>
      <button code="Tab">Tab</button>
      <button code="KeyQ">Q</button>
      <button code="KeyW">W</button>
      <button code="KeyE">E</button>
      <button code="KeyR">R</button>
      <button code="KeyT">T</button>
      <button code="KeyY">Y</button>
      <button code="KeyU">U</button>
      <button code="KeyI">I</button>
      <button code="KeyO">O</button>
      <button code="KeyP">P</button>
      <button code="BracketLeft" alt="{">[</button>
      <button code="BracketRight" alt="}">]</button>
      <button code="Backslash" alt="|">\\</button>
  </div>
  <div class="row">
    <p>
      <button code="CapsLock">Caps Lock</button>
      <button code="KeyA">A</button>
      <button code="KeyS">S</button>
      <button code="KeyD">D</button>
      <button code="KeyF">F</button>
      <button code="KeyG">G</button>
      <button code="KeyH">H</button>
      <button code="KeyJ">J</button>
      <button code="KeyK">K</button>
      <button code="KeyL">L</button>
      <button code="Semicolon" alt=":">;</button>
      <button code="Quote" alt='"'>'</button>
  </div>
  <div class="row">
    <p>
      <button code="ShiftLeft">Shift</button>
      <button code="KeyZ">Z</button>
      <button code="KeyX">X</button>
      <button code="KeyC">C</button>
      <button code="KeyV">V</button>
      <button code="KeyB">B</button>
      <button code="KeyN">N</button>
      <button code="KeyM">M</button>
      <button code="Comma" alt="<">,</button>
      <button code="Period" alt=">">.</button>
      <button code="Slash" alt="?">/</button>
  </div>
  <div class="row">
    <p>
      <button code="ControlLeft">Ctrl</button>
      <button code="Fn" disabled>Fn</button>
      <button code="Meta" disabled>Meta</button>
      <button code="Space">Spacebar</button>
      <button code="AltRight">Alt</button>
      <button code="FnRight" disabled>Fn</button>
      <button code="ControlRight">Ctrl</button>
  </div>`;
    return elem
}

function mouseEvent(elem, eventType) {
    if (eventType === 'keydown') {
        elem.style.borderStyle = 'inset';
    } else if (eventType === 'keyup') {
        elem.style.borderStyle = 'outset';
    } else {
        console.log(`mouseEvent: eventType: "${eventType}" not supported`);
    }
}

var debug = false;
// Mappings to keys from keypress codes for that sweet O(1) lookup time.
var codeToKeyMap = {};

window.addEventListener('load', (event) => {
    var keyboard = document.querySelector('div.keyboard');
    keyboard.querySelectorAll('button').forEach(
        (key) => {
            codeToKeyMap[key.getAttribute('code')] = key;
            // Started messing around with displaying alt keys on top of the main key.
            // if (key.getAttribute('alt')) {
            //   key.innerHTML = `<div>${key.getAttribute('alt')}<br>${key.innerHTML}`;
            // }
        }
    );

    window.addEventListener('keydown', function (e) {
        if (!(e.code in codeToKeyMap)) {
            if (debug) {
                console.log("key not supported");
                console.log(e);
            }
            return;
        }
        var key = codeToKeyMap[e.code];
        mouseEvent(key, e.type);
    }, /* useCapture: */ true);

    window.addEventListener('keyup', function (e) {
        if (!(e.code in codeToKeyMap)) {
            if (debug) {
                console.log("key not supported");
                console.log(e);
            }
            return;
        }
        var key = codeToKeyMap[e.code];
        mouseEvent(key, e.type);
    }, /* useCapture: */ true);
});;