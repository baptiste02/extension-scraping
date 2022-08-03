//récuperer la div ou on voudra insérer les boutons
let page = document.getElementById("buttonDiv");

//fonction pour mettre des valeurs par defaut
function defaultValues() {
  chrome.storage.sync.get("root", ({ root }) => {
    chrome.storage.sync.get("titre", ({ titre }) => {
      chrome.storage.sync.get("paragraphes", ({ paragraphes }) => {
        chrome.storage.sync.get("sous_titres", ({ sous_titres }) => {
          chrome.storage.sync.get("intro", ({ intro }) => {
            chrome.storage.sync.get("exc", ({ exc }) => {
              document.querySelector("#root").value = root;
              document.querySelector("#intro").value = intro;
              document.querySelector("#paragraphes").value = paragraphes;
              document.querySelector("#sous-titres").value = sous_titres;
              document.querySelector("#titre").value = titre;
              document.querySelector("#test").value = "";
              document.querySelector("#exclusion").value = exc;
            });
          });
        });
      });
    });
  });
}

function createExclusion(exc, p) {
  var func = new Function("p", `return ${exc}`);
  return func(p);
}

//fonction pour créer le texte qui sera affiché pour montrer les selecteurs
function create_selectors_text() {
  chrome.storage.sync.get("root", ({ root }) => {
    chrome.storage.sync.get("titre", ({ titre }) => {
      chrome.storage.sync.get("paragraphes", ({ paragraphes }) => {
        chrome.storage.sync.get("sous-titres", ({ sous_titres }) => {
          chrome.storage.sync.get("intro", ({ intro }) => {
            chrome.storage.sync.get("exc", ({ exc }) => {
              var copy = "";
              if (root) {
                copy += `root : ${root}<br><br>`;
              }
              if (titre) {
                copy += `titre : ${titre}<br><br>`;
              }
              if (intro) {
                copy += `introduction : ${intro}<br><br>`;
              }
              if (sous_titres) {
                copy += `sous-titres : ${sous_titres}<br><br>`;
              }
              if (paragraphes) {
                copy += `paragraphes : ${paragraphes}<br><br>`;
              }
              if (exc) {
                copy += `regles d'exclusion : ${exc}`;
              }
              chrome.storage.sync.set({ selectors: copy });
            });
          });
        });
      });
    });
  });
}

//fonction pour créer une boîte d'alerte personalisée
function createCustomAlert(txt) {
  var ALERT_TITLE = "texte";
  var ALERT_BUTTON_TEXT = "Ok";
  d = document;

  if (d.getElementById("modalContainer")) {
    removeCustomAlert();
  }
  mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
  mObj.id = "modalContainer";
  mObj.style.height = d.documentElement.scrollHeight + "px";

  alertObj = mObj.appendChild(d.createElement("div"));
  alertObj.id = "alertBox";
  if (d.all && !window.opera)
    alertObj.style.top = document.documentElement.scrollTop + "px";
  alertObj.style.left =
    (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
  alertObj.style.visiblity = "visible";

  h1 = alertObj.appendChild(d.createElement("h1"));
  h1.appendChild(d.createTextNode(ALERT_TITLE));

  msg = alertObj.appendChild(d.createElement("p"));
  //msg.appendChild(d.createTextNode(txt));
  msg.innerHTML = txt;

  btn = alertObj.appendChild(d.createElement("a"));
  btn.id = "closeBtn";
  btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
  btn.href = "#";
  btn.focus();
  btn.onclick = function () {
    removeCustomAlert();
    return false;
  };

  alertObj.style.display = "block";
}
//fonction pour retirer la boîte(déclenchée par le bouton ok)
function removeCustomAlert() {
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("modalContainer"));
}

//fonction pour initialiser les chrome.storage
function setUpValues() {
  chrome.storage.sync.set({ root: document.querySelector("#root").value });
  chrome.storage.sync.set({ titre: document.querySelector("#titre").value });
  chrome.storage.sync.set({
    paragraphes: document.querySelector("#paragraphes").value,
  });
  chrome.storage.sync.set({
    sous_titres: document.querySelector("#sous-titres").value,
  });
  chrome.storage.sync.set({ intro: document.querySelector("#intro").value });
  chrome.storage.sync.set({
    exc: document.getElementById("exclusion").value,
  });
}

function createExclusionScript() {
  var exclusion = document.createElement("script");
  exclusion.innerText =
    "export function createExclusion(){alert('createexclusionscript')}";
  document.body.appendChild(exclusion);
}

//fonction déclenchée par le bouton "setup + colors"
function test_scraping() {
  chrome.storage.sync.get("root", ({ root }) => {
    chrome.storage.sync.get("titre", ({ titre }) => {
      chrome.storage.sync.get("paragraphes", ({ paragraphes }) => {
        chrome.storage.sync.get("sous-titres", ({ sous_titres }) => {
          chrome.storage.sync.get("intro", ({ intro }) => {
            chrome.storage.sync.get("exc", ({ exc }) => {
              //createExclusionScript();
              var r = document.querySelector(root);
              if (titre) {
                var t = r.querySelector(titre);
              }
              if (paragraphes) {
                var p = r.querySelectorAll(paragraphes);
              }
              var st = r.querySelectorAll(sous_titres);
              if (intro) {
                var i = r.querySelector(intro);
              }
              /* var test_exclusion = Function(
                "return " + toBeEvaluated + `function(p){return ${exc}}`
              )(); */
              alert("test");
              p.forEach((pItem) => {
                pItem.style.setProperty("background-color", "blue");
              });
              if (t && createExclusion(exc, t)) {
                t.style.setProperty("background-color", "green");
              }
              if (st) {
                st.forEach((stItem) => {
                  stItem.style.setProperty("background-color", "red");
                });
              }
              if (i) {
                i.style.setProperty("background-color", "orange");
              }
              if (st) {
                st.forEach((element) =>
                  element.style.setProperty("background-color", pink)
                );
              }
              if (t) {
                alert(t.innerText);
                t = t.innerText;
              } else {
                alert("titre pas pris en compte");
              }
              if (i) {
                i = i.innerText;
              }
              var s_t = "";
              st.forEach((element) => {
                //if (!exclusion(element)) {
                s_t += element.innerText;
                //} else {
                //alert(exclusion(element));
                //}
              });
              var par = "";
              p.forEach((element) => {
                //if (!exclusion(element)) {
                par += element.innerText;
                //}
              });
              var clip = "";
              if (t) {
                clip += `TITRE : ${t}` + "<br>" + "<br>";
              }
              if (i) {
                clip += `INTRO : ${i}` + "<br>" + "<br>";
              }
              if (s_t) {
                clip += `SOUS-TITRES : ${s_t}` + "<br>" + "<br>";
              }

              clip += `PARAGRAPHES : ${par}` + "<br>" + "<br>";
              //clip = "test";
              alert(clip);
              chrome.storage.sync.set({ clip: clip });
            });
          });
        });
      });
    });
  });
}

// create the buttons
function constructbuttons() {
  //setup + colors button
  let setUpButton = document.createElement("button");
  setUpButton.textContent = "setup + colors";
  setUpButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    setUpValues();
    document.querySelector("#test").value = "value";
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: test_scraping,
    });
  });
  page.appendChild(setUpButton);

  let selectorButton = document.createElement("button");
  selectorButton.textContent = "display selectors";
  selectorButton.addEventListener("click", async () => {
    create_selectors_text();
    chrome.storage.sync.get("selectors", ({ selectors }) => {
      createCustomAlert(selectors);
    });
  });
  page.appendChild(selectorButton);

  let textButton = document.createElement("button");
  textButton.textContent = "display scraping";
  textButton.addEventListener("click", async () => {
    chrome.storage.sync.get("clip", ({ clip }) => {
      createCustomAlert(clip);
    });
  });
  page.appendChild(textButton);

  /* let testButton = document.createElement("button");
  testButton.textContent = "test";
  testButton.addEventListener("click", async () => {
    let excl = new Function("excl", "return `(p)=> ${excl}`");
    let tst = document.getElementById("exclusion").value;
    //alert(excl(tst));
  });
  page.appendChild(testButton); */
}

// Initialize the page by constructing the button
constructbuttons();

//initialize default values
defaultValues();
