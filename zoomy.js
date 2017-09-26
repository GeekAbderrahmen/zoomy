(function() {

  var Wg, Hg, ratioH, ratioW;

  this.Zoomy = function() {

    // internal properties
    this.name = "Zoomy";

    // Default params
    var defaults = {
      type: "rect",
      max: 200
    };

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }

  }

  // ----- PUBLIC METHODS -----

  Zoomy.prototype.open = function() {
    buildHtml.call(this);
    initEvents.call(this);
    console.log('opening zoomy');
  }

  Zoomy.prototype.hovered = function(e) {
    var divs = document.getElementById("magnet");
    var imgs = document.getElementById("preview-img");
    Wg = imgs.clientWidth;
    Hg = imgs.clientHeight;
    ratioH = Hg/180;
    ratioW = Wg/400;
    if(divs !== null){
        divs.style.display = "block";
        divs.style.top = e.pageY + "px";
        divs.style.left = e.pageX + "px";
    }
    if(imgs !== null){
        imgs.style.marginTop = - (e.pageY * ratioH) + "px";
        imgs.style.marginLeft = - (e.pageX * ratioW) + "px";
    }
    if(((parseInt(divs.style.left) + 50) * ratioW) > Wg || ((parseInt(divs.style.top) + 50) * ratioH) > Hg) {
      console.log('OUTED ******* ');
      imgs.style.marginTop = - Hg + "px";
      imgs.style.marginLeft = - Wg + "px";
    }
  }

  Zoomy.prototype.outed = function(e) {
    //console.log("outed", e);
    var divs = document.getElementById("magnet");
    if(divs !== null){
      divs.style.display = "none";
    }
  }

  // ----- UTILS PRIVATE METHODS -----

  // Build the html
  function buildHtml() {
    var docFrag;
    docFrag = document.createDocumentFragment();
    this.zoom = document.querySelectorAll('img.foo');
    if(document.getElementById("magnet") == null){
      var square = document.createElement('div');
      square.setAttribute("id", "magnet");
      square.style.width = "50px";
      square.style.height = "50px";
      square.style.border = "3px solid red";
      square.style.position = "absolute";
      square.style.display = "none";
      square.style.top = "0px";
      square.style.left = "0px";
      square.style.cursor = "none";
      document.body.appendChild(square);
    }

  }

  // Initialize events
  function initEvents() {
    for(var i = 0; i < this.zoom.length; i++) {
      this.zoom[i].addEventListener('mousemove', this.hovered.bind(this));
      this.zoom[i].addEventListener('mouseout', this.outed.bind(this));
    }

  }

  // Extend defaults with user options
  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

}());

var mineZoom = new Zoomy();

mineZoom.open();
