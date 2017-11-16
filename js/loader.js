let preloadSection2 = new createjs.LoadQueue();
let preloadSection3 = new createjs.LoadQueue();
let preloadSection4 = new createjs.LoadQueue();
let preloadSection5 = new createjs.LoadQueue();
let preloadChars = new createjs.LoadQueue();

window.addEventListener("load", ()=> {
  "use strict";

  loadSection2();
  loadSection3();
  loadSection4();
  loadSection5();
  loadCharacters();
});

function loadSection2() {
  console.log(' === loading section 2 resources ===');
  preloadSection2.on("complete", handleSection2LoadComplete, this);
  preloadSection2.loadManifest([
      {id: "person2", src: "images/person-2.png"},
      {id: "section2", src: "images/section-2.png"}
  ]);
}

function loadSection3() {
  console.log(' === loading section 3 resources ===');
  preloadSection3.on("complete", handleSection3LoadComplete, this);
  preloadSection3.loadManifest([
    {id: "cubeblue", src: "images/cube-blue.png"},
    {id: "person3", src: "images/person-3.png"},
    {id: "section3f", src: "images/section-3-f.png"}
  ]);
}

function loadSection4() {
  console.log(' === loading section 4 resources ===');
  preloadSection4.on("complete", handleSection4LoadComplete, this);
  preloadSection4.loadManifest([
    {id: "mango", src: "images/Mango.gif"},
    {id: "fruit", src: "images/Fruit.gif"},
    {id: "monster", src: "images/Monster.gif"},
    {id: "idol", src: "images/Idol.gif"},
    {id: "frog", src: "images/Frog.gif"},
    {id: "barrel", src: "images/Barrel.gif"},
    {id: "bamboo", src: "images/Bamboo.gif"}
  ]);
}

function loadSection5() {
  console.log(' === loading section 5 resources ===');
  preloadSection5.on("complete", handleSection5LoadComplete, this);
  preloadSection5.loadManifest([
    {id: "fireball", src: "images/Fireball.gif"},
    {id: "tornado", src: "images/Tornado.gif"},
    {id: "crossfire", src: "images/Crossfire.gif"},
    {id: "boardcleaner", src: "images/BoardCleaner.gif"},
    {id: "waterring", src: "images/WaterRing.gif"},
    {id: "goldenidol", src: "images/GoldenIdol.gif"},
    {id: "combined", src: "images/Combined.gif"}
  ]);
}

function loadCharacters() {
  console.log(' === loading characters ===');
  preloadChars.on("complete", handleCharsLoadComplete, this);
  preloadChars.loadManifest([
    {id: "char1", src: "images/char-1.png"},
    {id: "icofb", src: "images/ico-fb.png"},
    {id: "char2", src: "images/char-2.png"},
    {id: "char3", src: "images/char-3.png"},
    {id: "char4", src: "images/char-4.png"},
    {id: "char5", src: "images/char-5.png"}
  ]);
}

function handleSection2LoadComplete() {
  let personImage = preloadSection2.getResult("person2");
  personImage.classList.add("person");

  // cache section element 
  let section2Element = document.querySelector(".section-2");

  // add img programmaticaly
  section2Element.querySelector(".socket").appendChild(personImage);
  //setCSSBackgroundImageForElement(section2Element, preloadSection2, "section2");
}

function handleSection3LoadComplete() {
  // section 3
  let section3Element = document.querySelector(".section-3");
  let cubeBlue = preloadSection3.getResult("cubeblue");
  let person3 = preloadSection3.getResult("person3");
  person3.classList.add("person");
  let section3f = preloadSection3.getResult("section3f");
  section3f.classList.add("figure");
  section3Element.querySelector(".cube.cube-3.cube-vis.cube-animate-1").appendChild(cubeBlue);
  section3Element.querySelector(".cube.cube-3.cube-vis.cube-animate-2").appendChild(cubeBlue);
  section3Element.querySelector(".socket").appendChild(person3);
  section3Element.appendChild(section3f);
}

function handleSection4LoadComplete() {
  // section 4
  let section4Element = document.querySelector(".section-4");
  let section4ScreenElem = section4Element.querySelector(".screen .screen-inner");
  section4ScreenElem.querySelector("#tab-1").appendChild(preloadSection4.getResult("mango"));
  section4ScreenElem.querySelector("#tab-2").appendChild(preloadSection4.getResult("fruit"));
  section4ScreenElem.querySelector("#tab-3").appendChild(preloadSection4.getResult("monster"));
  section4ScreenElem.querySelector("#tab-4").appendChild(preloadSection4.getResult("idol"));
  section4ScreenElem.querySelector("#tab-5").appendChild(preloadSection4.getResult("frog"));
  section4ScreenElem.querySelector("#tab-6").appendChild(preloadSection4.getResult("barrel"));
  section4ScreenElem.querySelector("#tab-7").appendChild(preloadSection4.getResult("bamboo"));
}

function handleSection5LoadComplete() {
  let section5Element = document.querySelector(".section-5");
  let section5ScreenElem = section5Element.querySelector(".screen .screen-inner");
  section5ScreenElem.querySelector("#tab-21").appendChild(preloadSection5.getResult("fireball"));
  section5ScreenElem.querySelector("#tab-22").appendChild(preloadSection5.getResult("tornado"));
  section5ScreenElem.querySelector("#tab-23").appendChild(preloadSection5.getResult("crossfire"));
  section5ScreenElem.querySelector("#tab-24").appendChild(preloadSection5.getResult("boardcleaner"));
  section5ScreenElem.querySelector("#tab-25").appendChild(preloadSection5.getResult("waterring"));
  section5ScreenElem.querySelector("#tab-26").appendChild(preloadSection5.getResult("goldenidol"));
  section5ScreenElem.querySelector("#tab-27").appendChild(preloadSection5.getResult("combined"));
}

function handleCharsLoadComplete() {
  let icoFb1 = preloadChars.getResult("icofb");
  let icoFb2 = icoFb1.cloneNode();
  let icoFb3 = icoFb1.cloneNode();
  let icoFb4 = icoFb1.cloneNode();
  let icoFb5 = icoFb1.cloneNode();

  let char1Element = document.querySelector(".section.character-1");
  char1Element.querySelector(".character-socket").appendChild(preloadChars.getResult("char1"));
  char1Element.querySelector(".btn-authorize .btn-circle").appendChild(icoFb1);

  let char2Element = document.querySelector(".section.character-2");
  char2Element.querySelector(".character-socket").appendChild(preloadChars.getResult("char2"));
  char2Element.querySelector(".btn-authorize .btn-circle").appendChild(icoFb2);

  let char3Element = document.querySelector(".section.character-3");
  char3Element.querySelector(".character-socket").appendChild(preloadChars.getResult("char3"));
  char3Element.querySelector(".btn-authorize .btn-circle").appendChild(icoFb3);

  let char4Element = document.querySelector(".section.character-4");
  char4Element.querySelector(".character-socket").appendChild(preloadChars.getResult("char4"));
  char4Element.querySelector(".btn-authorize .btn-circle").appendChild(icoFb4);

  let char5Element = document.querySelector(".section.character-5");
  char5Element.querySelector(".character-socket").appendChild(preloadChars.getResult("char5"));
  char5Element.querySelector(".btn-authorize .btn-circle").appendChild(icoFb5);
}

function setCSSBackgroundImageForElement(element, loadQueue, resourceId) {
  "use strict";
  let bgImage = loadQueue.getResult(resourceId, true);

  let reader = new window.FileReader();
  reader.readAsDataURL(bgImage); 
  reader.onloadend = function() {
      let base64data = reader.result;
      element.style.backgroundImage = 'url(' + base64data + ')';
      element.style.backgroundPosition = '50% 100%';
  };
}