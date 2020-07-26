var oldGrid = [];
var newGrid = [];

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var kill = 0.062;
var deltaT = 1;

function setup() 
{
  createCanvas(200, 200);
  
  for (let i = 0; i < width; i++)
  {
    oldGrid[i] = [];
    newGrid[i] = [];
    for (let j = 0; j < height; j++)
    {
      oldGrid[i][j] = { a: 1, b: 0};
      newGrid[i][j] = { a: 1, b: 0};
    }
  }
  
  for (i = 100; i < 110; i++)
  {
    for (j = 100; j < 110; j++)
    {
      oldGrid[i][j].b = 1;
    }
  }
  
}


function draw() 
{
  background(51);
  
  for (let i = 1; i < width - 1; i++)
  {
    for (let j = 1; j < height - 1; j++)
    {
      var A = oldGrid[i][j].a;
      var B = oldGrid[i][j].b;
      newGrid[i][j].a = A + (dA * laplaceA(i, j)  - A * B * B + feed * (1 - A)) * deltaT;
      newGrid[i][j].b = B + (dB * laplaceB(i, j)  + A * B * B - (kill + feed) * B) * deltaT;
    }
  }
  
  loadPixels();
  for (let i = 0; i < width; i++)
  {
    for (let j = 0; j < height; j++)
    {
      var index = (i + j * width) * 4;
      
      pixels[index + 0] = floor(newGrid[i][j].a * 255);
      pixels[index + 1] = 0;
      pixels[index + 2] = floor(newGrid[i][j].b * 255);
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
  
  swapGrids();
}

function swapGrids()
{
  var temp = oldGrid;
  oldGrid = newGrid;
  newGrid = temp;
}

function laplaceA(i, j)
{
  var sum = 0;
  
  sum += oldGrid[i][j].a * -1;
  sum += oldGrid[i - 1][j].a * 0.2;
  sum += oldGrid[i + 1][j].a * 0.2;
  sum += oldGrid[i][j + 1].a * 0.2;
  sum += oldGrid[i][j - 1].a * 0.2;
  sum += oldGrid[i - 1][j - 1].a * 0.05;
  sum += oldGrid[i + 1][j - 1].a * 0.05;
  sum += oldGrid[i + 1][j + 1].a * 0.05;
  sum += oldGrid[i - 1][j + 1].a * 0.05;
  
  return sum;
}

function laplaceB(i, j)
{
  var sum = 0;
  
  sum += oldGrid[i][j].b * -1;
  sum += oldGrid[i - 1][j].b * 0.2;
  sum += oldGrid[i + 1][j].b * 0.2;
  sum += oldGrid[i][j + 1].b * 0.2;
  sum += oldGrid[i][j - 1].b * 0.2;
  sum += oldGrid[i - 1][j - 1].b * 0.05;
  sum += oldGrid[i + 1][j - 1].b * 0.05;
  sum += oldGrid[i + 1][j + 1].b * 0.05;
  sum += oldGrid[i - 1][j + 1].b * 0.05;
  
  return sum;
}
