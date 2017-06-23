/*jshint esversion: 6*/
const App = {
  rootElement: '#app',
  selectedColor: 'white',
  resetColor: 'white',
  cellWidth: 25,
  cellHeight: 25,
  grid: [],
  start: function(){
    this.cacheDOM();
    this.makeGrid();
    this.bindEvents();
    this.render();
  },
  makeGrid: function(){
    this.grid = new Array(this.rowsInput.value);
    for (let rowIndex = 0; rowIndex < this.rowsInput.value; rowIndex += 1) {
      this.grid[rowIndex] = new Array(this.colsInput.value);
      for (let colIndex = 0; colIndex < this.colsInput.value; colIndex += 1) {
        this.grid[rowIndex][colIndex] = new Cell(this.cellWidth, this.cellHeight, this.resetColor);
      }
    }
  },
  cacheDOM: function(){
    this.root = document.querySelector(this.rootElement);
    this.colorPicker = this.root.querySelector('.color-picker');
    this.gridOutput = this.root.querySelector('.grid-output');
    this.gridOptions = this.root.querySelector('.grid-options');
    this.rowsInput = this.root.querySelector('.rows-input');
    this.colsInput = this.root.querySelector('.cols-input');
  },
  bindEvents: function(){
      this.colorPicker.addEventListener('input', () => this.setColor(this.colorPicker.value));
      this.gridOptions.addEventListener('submit', (event) => {
        this.confirmGrid(event);
      });
  },
  confirmGrid: function(){
    event.preventDefault();
    this.makeGrid();
    this.render();
  },
  // FOR COLOR PICKER ---------------------->
  setColor: function(newColor){
    this.selectedColor = newColor;
    console.log(this);
  },
  // ------------------------------------------->
  // FOR CELLS -------------------------->
  changeColor: function(rowIndex, colIndex){
    const cell = this.grid[rowIndex][colIndex];
    cell.color = this.selectedColor;
    this.render();
  },
  // ----------------------------------------->
  resetGrid: function(){
    this.selectedColor = 'white';
    this.makeGrid();
    this.render();
  },
  render: function(){
    this.gridOutput.innerHTML = '';
    //RESET button ------------------------------------->
    const resetButton = document.createElement('button');
    resetButton.textContent = 'RESET';
    resetButton.addEventListener('click', () => this.resetGrid());
    this.gridOutput.appendChild(resetButton);
    // ------------------------------------------------>
    //GRID ------------------------------------------>
    this.grid.forEach((row, rowIndex) => {
      const rowContainer = document.createElement('div');
      rowContainer.style.height = `${this.cellHeight}px`;
      row.forEach((cell, colIndex) => {
        const element = cell.toHtml();
        element.addEventListener('click', () => this.changeColor(rowIndex, colIndex));
        rowContainer.appendChild(element);
      });
      this.gridOutput.appendChild(rowContainer);
    });
    // ----------------------------------------------->
  }
};

App.start();
