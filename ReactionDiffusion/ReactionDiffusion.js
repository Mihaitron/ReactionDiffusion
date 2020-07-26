var oldGrid = [];
var newGrid = [];

var dA = 1;
var dB = 0.5;
var feed = 0.0545;
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
  
  for (i = width / 2 - 5; i < width / 2 + 5; i++)
  {
    for (j = height / 2 - 5; j < height / 2 + 5; j++)
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
      newGrid[i][j].a = A + (dA * laplace(i, j, 'A')  - A * B * B + feed * (1 - A)) * deltaT;
      newGrid[i][j].b = B + (dB * laplace(i, j, 'B')  + A * B * B - (kill + feed) * B) * deltaT;
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

function laplace(i, j, who)
{
  var sum = 0;
  var count = 0;
  
  switch (who)
  {
    case 'A':
      for (let x = i - 1; x <= i + 1; x++)
      {
        for (let y = j - 1; y <= j + 1; y++)
        {
          count++;
          if (count == 5)
          {
            sum += oldGrid[x][y].a * -1;
          }
          else if (count % 2 == 0)
          {
            sum += oldGrid[x][y].a * 0.2;
          }
          else if (count % 2 == 1)
          {
            sum += oldGrid[x][y].a * 0.05;
          }
        }
      }
      break;
    case 'B':
      for (let x = i - 1; x <= i + 1; x++)
      {
        for (let y = j - 1; y <= j + 1; y++)
        {
          count++;
          if (count == 5)
          {
            sum += oldGrid[x][y].b * -1;
          }
          else if (count % 2 == 0)
          {
            sum += oldGrid[x][y].b * 0.2;
          }
          else if (count % 2 == 1)
          {
            sum += oldGrid[x][y].b * 0.05;
          }
        }
      }
      break;
  }
  
  
  return sum;
}
