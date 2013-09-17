(function(win, doc, Vector) {
  'use strict';

  var TILE_SIZE = 32,

      VENDOR_PREFIXES = ['webkit', 'Moz', 'ms', 'O'],


      MapEngine;

  Vector.prototype.to2D = function(){
    return new Vector((2 * this.y + this.x) / 2, (2 * this.y - this.x) / 2);
  };

  Vector.prototype.toIso = function(){
    return new Vector(this.x - this.y, (this.x + this.y) / 2.385);
  };

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  MapEngine = function(options) {
    var canvas = doc.getElementById('canvas'),
        center = new Vector(win.innerWidth/2, win.innerHeight/2),
        camera = new Vector(0, 0),

        x, y;


    function addStyle(element, type, value) {
      var pfxType = capitaliseFirstLetter(type);
      element.style[type] = value;
      VENDOR_PREFIXES.forEach(function(pfx) {
        element.style[pfx + pfxType] = value;
      });
    }

    function createTile(type, x, y, color, bgImage) {
      var div = doc.createElement('div'),
          isoVector = new Vector(x, y).toIso();
      div.setAttribute('class', 'tile ' + type);
      addStyle(div, 'width', TILE_SIZE + 'px');
      addStyle(div, 'height', TILE_SIZE + 'px');
      addStyle(div, 'left', ((TILE_SIZE-1)*isoVector.x) + 'px');
      addStyle(div, 'top', ((TILE_SIZE-1)*isoVector.y) + 'px');
      if (bgImage) {
        addStyle(div, 'background-image', 'url(' + bgImage + ')');
      } else {
        addStyle(div, 'background-color', color);
        div.innerHTML = color; // for TESTING
      }
      return div;
    }

    function createFloor(x, y, color, bgImage) {
      return createTile('floor', x, y, color, bgImage);
    }

    function createRightWall(x, y, color, bgImage) {
      return createTile('right-wall', x, y, color, bgImage);
    }

    function createLeftWall(x, y, color, bgImage) {
      return createTile('left-wall', x, y, color, bgImage);
    }

    function createPerson(x, y) {
      var div = doc.createElement('div'),
          isoVector = new Vector(x, y).toIso();
      div.setAttribute('class', 'person');
      addStyle(div, 'left', ((TILE_SIZE-1)*isoVector.x) + 'px');
      addStyle(div, 'top', ((TILE_SIZE-1)*isoVector.y) + 'px');
      return div;
    }

    for (x=-5; x<6; ++x) {
      for (y=-5; y<6; ++y) {
        canvas.appendChild(createFloor(x, y, 'green'));
      }
    }

    canvas.appendChild(createFloor(0, 0, 'green'));
    canvas.appendChild(createFloor(1, 0, 'darkgreen'));
    canvas.appendChild(createFloor(2, 0, 'pink'));

    canvas.appendChild(createFloor(0, 1, 'lightgreen', 'img/rough_path.png'));
    canvas.appendChild(createFloor(1, 1, 'magenta', 'img/rough_path.png'));
    canvas.appendChild(createFloor(2, 1, 'lightblue', 'img/rough_path.png'));

    canvas.appendChild(createLeftWall(0, 0, 'blue'));
    canvas.appendChild(createRightWall(0, 0, 'darkblue'));

    canvas.appendChild(createPerson(3.3, 0));

    addStyle(canvas, 'transform', 'translate(' + (camera.x+center.x) + 'px, ' + (camera.y+center.y) + 'px)');
  };

  new MapEngine();

}(window, document, Vector));
