// Color Picker

class Picker
{
  constructor(target,height, width) 
  {
    this.target = target;
    this.height = height;
    this.width = width;
    this.target.height = height;
    this.target.width = width;
    this.context = this.target.getContext("2d");
    this.circle = { x: 10, y: 10, height: 7, width: 7};
    this.mouseEvent();
  }

  getcolor()
  {
    setInterval(() =>this.coloradd(), 0.001 ) ;
  }

  coloradd()
  { // 128 - 144 Color Pallet  146-150 Circle
    let gradient = this.context.createLinearGradient(0,0,this.width,0);
    gradient.addColorStop(0,"rgb(255,0,0)");
    gradient.addColorStop(0.15,"rgb(255,0,255)");
    gradient.addColorStop(0.33,"rgb(0,0,255)");
    gradient.addColorStop(0.49,"rgb(0,255,255)");
    gradient.addColorStop(0.67,"rgb(0,255,0)");
    gradient.addColorStop(0.84,"rgb(255,255,0)");
    gradient.addColorStop(1,"rgb(255,0,0)");
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.width, this.height);
    gradient = this.context.createLinearGradient(0,0,0,this.height);
    gradient.addColorStop(0,"rgba(255,255,255,1)");
    gradient.addColorStop(0.5,"rgba(255,255,255,0)");
    gradient.addColorStop(0.5,"rgba(0,0,0,0)");
    gradient.addColorStop(1,"rgba(0,0,0,1)");
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.beginPath();
    this.context.arc(this.circle.x, this.circle.y,this.circle.width, 0, Math.PI*2);
    this.context.strokeStyle = "black";
    this.context.stroke();
    this.context.closePath();
  }

  mouseEvent()
  {
    let mousedown = false;
    const onMouseDown = (a) =>
    {
      let Xnow = a.clientX - this.target.offsetLeft;
      let Ynow = a.clientY - this.target.offsetTop;
      if(Ynow > this.circle.y && Ynow < this.circle.y + this.circle.width 
      && Xnow > this.circle.x && Xnow < this.circle.x + this.circle.height)
      {
        mousedown = true;
      }else
      {
        this.circle.x = Xnow;
        this.circle.y = Ynow;
      }
    }
    const onMouseMove = (a) =>
    {
      if(mousedown)
      {
        let Xnow = a.clientX - this.target.offsetLeft;
        let Ynow = a.clientY - this.target.offsetTop;
        this.circle.x = Xnow;
        this.circle.y = Ynow;
      }
    }
    const onMouseUp = () =>
    {
      mousedown = false;
    }
    this.target.addEventListener("mousedown",onMouseDown);
    this.target.addEventListener("mousemove",onMouseMove);
    this.target.addEventListener("mousemove", () => this.selectedcolorCallback(this.submitcolor()));
    document.addEventListener("mouseup",onMouseUp);

  }

  submitcolor()
  {
    let colordata = this.context.getImageData(this.circle.x, this.circle.y, 1, 1);
    return {red: colordata.data [0], green: colordata.data [1], blue: colordata.data [2]};
  }

  selectedcolor(callback)
  {
    this.selectedcolorCallback = callback;
  }
}
let picker = new Picker (document.getElementById("color-picker"),512,512);

picker.getcolor();
picker.selectedcolor((color =>
  {
    let selected = document.getElementsByClassName("selected")[0];
    selected.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue}`;

  let pixels = document.querySelectorAll(".pixel");
  pixels.forEach(pixels =>
    { 
       pixels.addEventListener("click", (j) => 
        {
        switch(currentMode)
        {
        case "black":
          j.target.style.backgroundColor = `rgb(${color.red},${color.green},${color.blue}`;
          break;
        case "colors":
          j.target.style.backgroundColor = randomColor();
          break;
        }     
    });
  });
}
  ))

  //Grid
const buttons = document.querySelectorAll("button");
const grid = document.querySelector(".grid");

let pixel = ""; 
let gridsize = 50; //Initial gride size

const FunctionGrid = (gridSize) => 
{
  for(i = 0; i < gridSize ** 2; i++) 
  {
    pixel = document.createElement("div")
    pixel.classList.add("pixel");
    grid.appendChild(pixel);
  }
  grid.style.gridTemplateColumns =  `repeat(${gridSize}, auto)`;
  grid.style.gridTemplateRows =  `repeat(${gridSize}, auto)`;
}

FunctionGrid(gridsize);

const clear = (request) => // Clear resets the grind no matter where is placed
{
  if(request === "newsize")
  {
    gridsize = prompt("Choose a new size (max: 100)", 50);
    if(gridsize > 100 || gridsize === null)
    {
    gridsize = 100;
    }
  }
  grid.innerHTML = "";
  FunctionGrid(gridsize);
  active();
}

let currentMode = "black"; // Initial pixel color
buttons.forEach(button => 
{
  button.addEventListener("click", () => {
    if(button.id === "newsize" || button.id === "reset")
    {
      clear(button.id);
    }
    else
    {
      currentMode = button.id;
    }
  });
});

const randomColor = () => 
{
  let color = "rgba(";
  for(let i = 0;i< 3;i++)
  {
    color += Math.floor(Math.random() * 255) + ",";
  }
  return color + "1)";
}




active();

