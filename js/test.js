(function(win, doc, Vector) {
  'use strict';

  var TILE_SIZE = 32,

      VENDOR_PREFIXES = ['webkit', 'Moz', 'ms', 'O'],


      MapEngine;

  Vector.prototype.to2D = function(){
    return new Vector((2 * this.y + this.x) / 2, (2 * this.y - this.x) / 2);
  };

  Vector.prototype.toIso = function(){
    return new Vector(this.x - this.y, (this.x + this.y) / 2.45);
  };

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  MapEngine = function(options) {
    var canvas = doc.getElementById('canvas'),
        center = new Vector(win.innerWidth/2, win.innerHeight/2),
        camera = new Vector(0, 0);


    function addStyle(element, type, value) {
      var pfxType = capitaliseFirstLetter(type);
      element.style[type] = value;
      VENDOR_PREFIXES.forEach(function(pfx) {
        element.style[pfx + pfxType] = value;
      });
    }

    function createTile(type, x, y, color) {
      var div = doc.createElement('div'),
          isoVector = new Vector(x, y).toIso();
      div.setAttribute('class', 'tile ' + type);
      addStyle(div, 'width', TILE_SIZE + 'px');
      addStyle(div, 'height', TILE_SIZE + 'px');
      addStyle(div, 'left', (TILE_SIZE*isoVector.x) + 'px');
      addStyle(div, 'top', (TILE_SIZE*isoVector.y) + 'px');
      addStyle(div, 'background-color', color);
      div.innerHTML = color; // for TESTING
      return div;
    }

    function createFloor(x, y, color) {
      return createTile('floor', x, y, color);
    }

    function createRightWall(x, y, color) {
      return createTile('right-wall', x, y, color);
    }

    function createLeftWall(x, y, color) {
      return createTile('left-wall', x, y, color);
    }

    canvas.appendChild(createFloor(0, 0, 'green'));
    canvas.appendChild(createFloor(1, 0, 'darkgreen'));
    canvas.appendChild(createFloor(2, 0, 'pink'));

    canvas.appendChild(createFloor(0, 1, 'lightgreen'));
    canvas.appendChild(createFloor(1, 1, 'magenta'));
    canvas.appendChild(createFloor(2, 1, 'lightblue'));

    canvas.appendChild(createLeftWall(0, 0, 'blue'));
    canvas.appendChild(createRightWall(0, 0, 'darkblue'));

    addStyle(canvas, 'transform', 'translate(' + (camera.x+center.x) + 'px, ' + (camera.y+center.y) + 'px)');
  };

  new MapEngine();

}(window, document, Vector));
