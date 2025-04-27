const canvas = document.getElementById("canvas");
const scr = document.getElementById("score");
const ctx = canvas.getContext("2d");
let btns = document.querySelectorAll(".btns");


let gameInterval;
let isPause = false;
let check = false;
let score=0;
let level =200;

function start()
{
    gameInterval= setInterval(game,level);
}
function pause()
{
    clearInterval(gameInterval);
    isPause=true;
}
function resume()
{
    if(isPause)
    {
        start();
        isPause=false;
    }
}

canvas.height = window.innerHeight * 0.5;
canvas.width = window.innerWidth * 1;
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight * 0.50;
    canvas.width = window.innerWidth * 1;
});

const box =20;
let dx = box;
let dy = 0;
const rows = canvas.width/box;
const cols = canvas.height/box;

let snake =[{x:box*5,y:box*5}];
let food ={
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box,
};

//Checking button press

document.addEventListener("keydown",(e)=>{
    checkPause();
    if(e.key=="ArrowLeft" && dx===0)
    {
        dx=-box;
        dy=0;
    }
    else if((e.key=="ArrowRight")&& dx===0)
    {
        dx=box;
        dy=0;
    }
    else if(e.key=="ArrowUp" && dy===0)
    {
        dy=-box;
        dx=0;
    }
    else if(e.key=="ArrowDown" && dy===0)
    {
        dy=box;
        dx=0;
    }

    if(	e.code === "Space")
    {
        pause();
    }
});

//Checking button clicked

document.getElementById("up").addEventListener("click",()=>{
    checkPause();
    if(dy===0)
    {
        dy=-box;
        dx=0;
    }
});
document.getElementById("down").addEventListener("click",()=>{
    checkPause();
    if(dy===0)
    {
        dy=box;
        dx=0;
    }
});
document.getElementById("left").addEventListener("click",()=>{
    checkPause();
    if(dx===0)
    {
        dx=-box;
        dy=0;
    }
});
document.getElementById("right").addEventListener("click",()=>{
    checkPause();
    if(dx===0)
    {
        dx=box;
        dy=0;
    }
});

document.getElementById("pause").addEventListener("click", () => {
    if (isPause) {
        resume();
    } else {
        pause();
    }
});

document.querySelector(".modebtn").addEventListener("click", () => {
    if(!check)
    {
        document.body.style.backgroundColor = "#222831";
        document.getElementById("canvas").style.backgroundColor="#393E46";
        for(btn of btns)
        {
            btn.style.backgroundColor="#393E46";
        }
    }
    else
    {
        document.getElementById("canvas").style.backgroundColor="rgb(52, 175, 52)";
        document.body.style.backgroundColor = "white";
        for(btn of btns)
        {
            btn.style.backgroundColor="ButtonFace";
        }
    }
    check=!check;
})




//Main logic

function game()
{
    //update score
    scr.innerText=score;
    //clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //draw snake
    ctx.fillStyle="black";
    for(let i=0;i<snake.length;i++)
    {
        
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
    }

    //draw food
    ctx.fillStyle="red";
    ctx.fillRect(food.x,food.y,box,box);

    let head = {x: snake[0].x + dx,y: snake[0].y +dy};

    //Game end conditions

    if(head.x<0 || head.x>=canvas.width || head.y<0 || head.y>=canvas.height)
    {
        clearInterval(gameInterval);
        document.getElementById("popup").style.display="flex";
        document.getElementById("endscore").innerText=score;
        document.getElementById("main").style.filter="blur(10px)";
        document.getElementById("popup").style.zIndex="5";
        return;
    }

    for(let i=1;i<snake.length;i++)
    {
        if(head.x===snake[i].x && head.y===snake[i].y)
        {
            clearInterval(gameInterval);
            document.getElementById("popup").style.display="flex";
            document.getElementById("endscore").innerText=score;
            document.getElementById("main").style.filter="blur(10px)";
            document.getElementById("popup").style.zIndex="5";
            return;
        }
    }

    //Eat food and change position
    if(head.x===food.x && head.y===food.y)
    {
        score=score+5;
        food ={
            x: Math.floor(Math.random() * cols) * box,
            y: Math.floor(Math.random() * rows) * box,
        };
    }
    else
    {
        snake.pop();
    }
    snake.unshift(head);

    //draw eyes
    ctx.fillStyle = "white";

    if(dy>0)
    {
        ctx.fillRect(snake[0].x + 5, snake[0].y - 5, 3, 3);
        ctx.fillRect(snake[0].x + 12, snake[0].y - 5, 3, 3);
    }
    else if(dy<0)
    {
        ctx.fillRect(snake[0].x + 5, snake[0].y + 25, 3, 3);
        ctx.fillRect(snake[0].x + 12, snake[0].y + 25, 3, 3);
    }
    else if(dx>0)
    {
        ctx.fillRect(snake[0].x - 5, snake[0].y + 5, 3, 3);
        ctx.fillRect(snake[0].x - 5, snake[0].y + 10, 3, 3);
    }
    if(dx<0)
    {
        ctx.fillRect(snake[0].x + 25, snake[0].y + 5, 3, 3);
        ctx.fillRect(snake[0].x + 25, snake[0].y + 10, 3, 3);
    }

}

function restart()
{
    closebox();
    level=200;
    score=0;
    snake =[{x:box*5,y:box*5}]; 
    food ={
        x: Math.floor(Math.random()*rows)*box,
        y: Math.floor(Math.random()*cols)*box,
    };
    dx=box;
    dy=0;
    clearInterval(gameInterval);
    gameInterval = setInterval(game,level);
}

function menu(){
    pause();
    document.getElementById("choose").style.display="flex";
    document.getElementById("main").style.filter="blur(10px)";
    document.getElementById("choose").style.zIndex="5";
    document.getElementById("popup").style.display="none";
}

function closebox(){
    resume();
    document.getElementById("choose").style.display="none";
    document.getElementById("popup").style.display="none";
    document.getElementById("main").style.filter="none";
}

function setLevel(val){
    level=val;
    pause();
    resume();
}

function checkPause(){
    if (isPause) {
        resume();
    }
}

start();