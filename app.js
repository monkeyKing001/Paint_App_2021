const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const color = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

let painting = false;
let filling = false;
let brush_color = "#2c2c2c";

canvas.width = 700;
canvas.height= 700;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 700, 700);

ctx.strokeStyle = brush_color
ctx.fillStyle = brush_color
ctx.lineWidth = 2.5;

function startPainting(){
    painting=true;
}

function stopPainting(){
    painting=false;
}

function onMouseMove(event){
// console.log(event)
const x = event.offsetX
const y = event.offsetY
// console.log(x,y)

if(painting){    
ctx.lineTo(x, y);
ctx.stroke();
}  

else{
ctx.beginPath();
ctx.moveTo(x,y);
// console.log(ctx);
}
}


function onMouseDown(event){   
// console.log(event)
startPainting()
const x = event.offsetX
const y = event.offsetY
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", handleFillingClick)
    canvas.addEventListener("contextmenu", handleCM)
}

function handleColorClick(event){
    console.log(event.target.style);  
    const change_color = event.target.style.backgroundColor
    brush_color = change_color;
    ctx.strokeStyle = brush_color;
    ctx.fillStyle = brush_color;
}

Array.from(color).forEach(color => color.addEventListener("click", handleColorClick))

if(range){
    range.addEventListener("input", handleRangeChange);
}

function handleRangeChange(event){
const change_range = event.target.value;
ctx.lineWidth = change_range;
}

if(mode){
    mode.addEventListener("click", handleClickMode);
}

function handleClickMode(){
    if(filling===true){
        filling = false;
        mode.innerText = 'FIll'
    }
    else{
        mode.innerText = 'PAINT'
        filling = true;
    }
}

function handleFillingClick() {
    if(filling===true){
        ctx.fillRect(0, 0, 700, 700)
    }
    else{
    }
}

function handleCM(event){
    event.preventDefault();
}

if(save){
    save.addEventListener("click", handleClickSave)
}

function handleClickSave(){
    const image = canvas.toDataURL()
    const link = document.createElement("a")
    link.href = image;
    link.download = "PaintJs";
    link.click();
    console.log(link)
    console.log(image); 
}