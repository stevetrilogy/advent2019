const fs = require('fs');

const wirePoints = {};

class Point {

  constructor(coordinates) {
    // console.log(`Creating a new Point with ${coordinates}`);
    const matches = coordinates.match(/x(-?[0-9]+)y(-?[0-9]+)/);
    // console.log(matches);
    this.x = parseInt(matches[1]);
    this.y = parseInt(matches[2]);
  }

  toString() {
    return `x${this.x}y${this.y}`;
  }

}


const getPoints = (start, vector) => {
  const [direction, distance] = [vector.substr(0,1), vector.substr(1)];
  const newPoints = [];
  switch (direction) {
    case 'U':
      // Increment y value
      // console.log(`We're going up ${distance} points`);
      for (let i = 0; i <= distance; i++) {
        const newPoint = new Point(`x${start.x}y${start.y+i}`);
        newPoints.push(newPoint);
      }
      break;
    case 'D':
      // Decrement y value
      // console.log(`We're going down ${distance} points`);
      for (let i = 0; i <= distance; i++) {
        const newPoint = new Point(`x${start.x}y${start.y-i}`);
        newPoints.push(newPoint);
      }
      break;
    case 'L':
      // Increment x value
      // console.log(`We're going left ${distance} points`);
      for (let i = 0; i <= distance; i++) {
        const newPoint = new Point(`x${start.x-i}y${start.y}`);
        newPoints.push(newPoint);
      }
      break;
    case 'R':
      // Decrement x value
      // console.log(`We're going right ${distance} points`);
      for (let i = 0; i <= distance; i++) {
        const newPoint = new Point(`x${start.x+i}y${start.y}`);
        newPoints.push(newPoint);
      }
      break;
  }
  return newPoints;
}

const traceWire = (directions, index) => {
  if (!directions) {
    return false;
  }

  let currentPoint = new Point('x0y0'); 

  // Take each direction and add the resulting points to allPoints
  wirePoints[index] = [];
  wirePoints[index].push(...directions.split(',').map(direction => {
    const points = getPoints(currentPoint, direction);
    currentPoint = points[points.length-1];
    return points;
  }));
  console.log(wirePoints[index].length);
}

const main = (err, data) => {
  if (err) {
    console.log(err);
    process.exit();
  }
  data.split('\n').forEach((directions, index) => traceWire(directions, index));
}


const result = fs.readFile('advent-03-input.txt', 'utf8', main);

