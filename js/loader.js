let preloadSection2 = new createjs.LoadQueue();
let preloadSection3 = new createjs.LoadQueue();
let preloadSection4 = new createjs.LoadQueue();
let preloadSection5 = new createjs.LoadQueue();
let preloadChars = new createjs.LoadQueue();
let preloadCSSImages = new createjs.LoadQueue();
let preloadSectionFinal = new createjs.LoadQueue();


window.addEventListener("load", ()=> {
  "use strict";

  loadSection2();
  loadSection3();
  loadSection4();
  loadSection5();
  loadCharacters();
  loadCSSImages();
  loadSectionFinal();
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

function loadCSSImages() {
  console.log(' === loading CSS images ===');
  preloadCSSImages.on("complete", handleCSSImagesLoadComplete, this);
  preloadCSSImages.loadManifest([
    {id: "map", src: "images/map.png"},
    {id: "mapmobile", src: "images/map-mobile.jpg"},
    {id: "sprites", src: "images/sprites.png"}
  ]);
}

function loadSectionFinal() {
  console.log(' === loading final section images ===');
  preloadSectionFinal.on("complete", handleFinalImagesLoadComplete, this);
  preloadSectionFinal.loadManifest([
    {id: "monet04", src: "images/monet-04.png"},
    {id: "monet03", src: "images/monet-03.png"},
    {id: "monet02", src: "images/monet-02.png"},
    {id: "monet01", src: "images/monet-01.png"},
    {id: "app1", src: "images/app-1.png"},
    {id: "app2", src: "images/app-2.png"},
    {id: "tel1", src: "images/tel-1.png"},
    {id: "tel2", src: "images/tel-2.png"}
  ]);
}

function handleCSSImagesLoadComplete() {
  console.log(' === loading CSS images complete ===');
  const mq = window.matchMedia('(max-width: 1024px)');
  let mapImgSrc = null;
  if (mq.matches) {
    mapImgSrc = preloadCSSImages.getItem("mapmobile").src;
  } else {
    mapImgSrc = preloadCSSImages.getItem("map").src;
  }
  // let mapImgSrc = preloadCSSImages.getItem("map").src;
  document.querySelector(".map").style.backgroundImage = 'url(' + mapImgSrc + ')';

  let spriteImgSrc = preloadCSSImages.getItem("sprites").src;
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
  
  let person3 = preloadSection3.getResult("person3");
  person3.classList.add("person");
  let section3f = preloadSection3.getResult("section3f");
  section3f.classList.add("figure");

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
  let char1 = preloadChars.getResult("char1");
  char1.classList.add("character-image");
  let char2 = preloadChars.getResult("char2");
  char2.classList.add("character-image");
  let char3 = preloadChars.getResult("char3");
  char3.classList.add("character-image");
  let char4 = preloadChars.getResult("char4");
  char4.classList.add("character-image");
  let char5 = preloadChars.getResult("char5");
  char5.classList.add("character-image");

  let char1Element = document.querySelector(".section.character-1");
  let childElement = char1Element.querySelector(".character-name");
  char1Element.querySelector(".character-socket").insertBefore(char1, childElement);

  let char2Element = document.querySelector(".section.character-2");
  childElement = char2Element.querySelector(".character-name");
  char2Element.querySelector(".character-socket").insertBefore(char2, childElement);

  let char3Element = document.querySelector(".section.character-3");
  childElement = char3Element.querySelector(".character-name");
  char3Element.querySelector(".character-socket").insertBefore(char3, childElement);

  let char4Element = document.querySelector(".section.character-4");
  childElement = char4Element.querySelector(".character-name");
  char4Element.querySelector(".character-socket").insertBefore(char4, childElement);

  let char5Element = document.querySelector(".section.character-5");
  childElement = char5Element.querySelector(".character-name");
  char5Element.querySelector(".character-socket").insertBefore(char5, childElement);
}

function handleFinalImagesLoadComplete() {
  let sectionFinalElem = document.querySelector(".section.section-final");
  let monetSocketElem = sectionFinalElem.querySelector(".map .map-socket");
  monetSocketElem.querySelector(".monet-4").appendChild(preloadSectionFinal.getResult("monet04"));
  monetSocketElem.querySelector(".monet-3").appendChild(preloadSectionFinal.getResult("monet03"));
  monetSocketElem.querySelector(".monet-2").appendChild(preloadSectionFinal.getResult("monet02"));
  monetSocketElem.querySelector(".monet-1").appendChild(preloadSectionFinal.getResult("monet01"));

  let footerTelBlock = sectionFinalElem.querySelector(".footer .tel-block");
  footerTelBlock.querySelector(".download-1 .btn-circle").appendChild(preloadSectionFinal.getResult("app1"));
  footerTelBlock.querySelector(".download-2 .btn-circle").appendChild(preloadSectionFinal.getResult("app2"));
  let tel1Img = preloadSectionFinal.getResult("tel1");
  tel1Img.classList.add("tel", "tel-1");
  let tel2Img = preloadSectionFinal.getResult("tel2");
  tel2Img.classList.add("tel", "tel-2");
  footerTelBlock.appendChild(tel1Img);
  footerTelBlock.appendChild(tel2Img);

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