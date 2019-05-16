/*
 * Shadow Grid v0.0.2
 * A high performance table rendering engine for the web
 * Release Date: 05-15-2019
 * https://github.com/ericdrowell/shadow-grid
 * Licensed under the MIT or GPL Version 2 licenses.
 *
 * Copyright (C) 2019 Eric Rowell @ericdrowell
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
const ShadowGrid = function(config) {
  this.cellHeights = config.cellHeights;
  this.cellWidths = config.cellWidths;
  this.cells = config.cells;
  this.cellRenderer = config.cellRenderer;
  this.container = config.container;
  this.numRows = config.numRows;
  this.numCols = config.numCols;
  this.viewportWidth = config.viewportWidth;
  this.viewportHeight = config.viewportHeight;

  this.viewport = document.createElement('div');
  this.viewport.className = 'shadow-grid-viewport';
  this.viewport.style.display = 'inline-block';
  this.viewport.style.width = this.viewportWidth + 'px';
  this.viewport.style.height = this.viewportHeight + 'px';
  this.viewport.style.overflow = 'scroll';
  
  this.table = document.createElement('div');
  this.table.style.display = 'inline-block';
  this.table.className = 'shadow-grid-table';

  this.setTableSize();
  this.buildPool();
  this.updatePool();

  this.viewport.appendChild(this.table);
  this.container.appendChild(this.viewport);
};

ShadowGrid.prototype = {
  updatePool: function() {
    //let numRows = this.numRows;
    //let numCols = this.numCols;

    let cellWidths = this.cellWidths;
    let cellHeights = this.cellHeights;
    let cells = this.cells;
    let cellIndices = [0, 1, 2, 3];
    let pool = this.pool;
    
    for (let cellIndex of cellIndices) {
      let poolIndex = cellIndex;
      let cell = cells[cellIndex];
      let poolCell = pool[poolIndex];

      let rowIndex = 0;
      let colIndex = 0;

      poolCell.innerHTML = cell.val;
      poolCell.style.width = cellWidths[colIndex] + 'px';
      poolCell.style.height = cellHeights[rowIndex] + 'px';
    }
  },
  buildPool: function() {
    let poolSize = 4;

    this.pool = [];

    let frag = document.createDocumentFragment();

    for (let n =0; n<poolSize; n++) {
      let cell = document.createElement('div');
      cell.className = 'shadow-grid-cell';
      cell.style.display = 'inline-block';

      this.pool.push(cell);
      frag.appendChild(cell);
    }

    this.table.appendChild(frag);
  },
  setTableSize: function() {
    let tableWidth = 0;
    let tableHeight = 0;

    for (let height of this.cellHeights) {
      tableHeight += height;
    }
    for (let width of this.cellWidths) {
      tableWidth += width;
    }

    this.tableWidth = tableWidth;
    this.tableHeight = tableHeight;

    this.table.style.width = tableWidth + 'px';
    this.table.style.height = tableHeight + 'px';
  }
};

// export
(function (global) {
  'use strict';

  // AMD support
  if (typeof define === 'function' && define.amd) {
    define(function () { return ShadowGrid; });
  // CommonJS and Node.js module support.
  } else if (typeof exports !== 'undefined') {
    // Support Node.js specific `module.exports` (which can be a function)
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = ShadowGrid;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    exports.ShadowGrid = ShadowGrid;
  } else {
    global.ShadowGrid = ShadowGrid;
  }
})(this);