/*jshint esversion: 6*/

//Constructor function
function Cell(width, height, color){
  this.width = width || 100;
  this.height = height || 100;
  this.color = color || 'white';
}

Cell.prototype.toHtml = function () {
  const div = document.createElement('div');
  div.style.height = `${this.height}px`;
  div.style.display = 'inline-block';
  div.style.width = `${this.width}px`;
  div.style.border = '0.25px solid black';
  div.style.backgroundColor = this.color;
  return div;
};
