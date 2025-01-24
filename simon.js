let gameseq= [];
let userseq = [];
let btns = ["yellow","green","purple","red"];
let highscore = 0;
let highsc = document.querySelector('h3');

let started = false;
let level = 0;
let h2 = document.querySelector('h2');

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("Game started");
        started = true;
        levelup();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
 
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randidx = Math.floor(Math.random()*4);
    let randclr = btns[randidx];
    let clr = document.querySelector(`.${randclr}`);
    btnflash(clr);
    gameseq.push(randclr);
}

function checkans(idx){
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelup,1000);
        }
    } else{
        h2.innerHTML = `Game Over! Your score is <b>${level}</b><br>Press any key to restart`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "white"; 
        },150)
        highscore = Math.max(level,highscore);
        highsc.innerText = `High Score is ${highscore}`;
        reset();
    }
}

function btnpress(){
    let btn = this;
    userflash(btn);
    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length-1);
}
let allbtns = document.querySelectorAll('.boxes');
for(btn of allbtns){
    btn.addEventListener("click", btnpress);
}

function reset(){
    gameseq = [];
    userseq = [];
    level = 0;
    started = false;
}