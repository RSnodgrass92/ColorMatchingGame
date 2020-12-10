let validInput=false;
let numTiles="";
let colorsArr=[];
let cardsArr=[];
let cardsSolved=0;

const startbtn = document.querySelector("#startbtn");
const resetbtn= document.querySelector("#resetbtn");
const cardsection = document.querySelector("#cardsection");


const startPop=document.querySelector("#startPop");
const endPop=document.querySelector("#endPop");
const blackout=document.querySelector("#blackout");
const enterbtn=document.querySelector("#enterbtn");
const okbtn=document.querySelector("#okbtn")
const txtbox=document.querySelector("#userinput");
const startMsg= document.querySelector("#startMsg");

startbtn.addEventListener("click",startGame);
resetbtn.addEventListener("click",resetGame);
enterbtn.addEventListener("click", validateInput);
okbtn.addEventListener("click",function()
{
 endPop.style.display= "none";
});

//! add colorblind mode; add the hexcode for people to see.
function startGame()
{
startPop.style.display= "block";
blackout.style.display="block";
txtbox.focus();
}

function validateInput()
{
   numTiles= +txtbox.value;
   if (txtbox.value !=="")
   {
            if (txtbox.value==="0")
            {
                startMsg.innerHTML="You can not play a game with 0 tiles. Please enter an even number."
            }    
            else if (isNaN(numTiles))
            {
                startMsg.innerHTML="Invalid Input. That is not a number. Please enter an even number.";
            }
    
            else if (numTiles%2!==0)
            {
                startMsg.innerHTML="That number is not even, please enter an even number.";
                
            }
            else 
            {
                startPop.style.display= "none";
                blackout.style.display="none";
                while (cardsection.childNodes.length>0)
                {
                    cardsection.removeChild(cardsection.lastChild);
                }
                runGame();
            }
    txtbox.value="";
    }      
}

function runGame()
{
       
       //generate colors array
       colorsArr= genColorArray();
    
       //generate row/col
       const numRows=findNumRow();
       const numCol= (numTiles/numRows); 
      
       //append rows to section append col to 
       let sliceStart=0;
       let sliceEnd=numCol;
       for (a=0;a<numRows;a++)
           {
            let row= document.createElement("div");
            
            row.className+="row";
            cardsection.appendChild(row);
               
               for(b=0;b<numCol;b++)
               {
                   let card= document.createElement("div")
                   card.className+="card";
                   card.color= colorsArr.slice(sliceStart,sliceEnd)[b];
                   card.flipped=false;
                   card.addEventListener("click",changeCard);
                   cardsArr.push(card);
                   row.appendChild(card);
                   
               }
               sliceStart+=numCol;
               sliceEnd+=numCol;
           }
}


function findNumRow()
{
    let factorsArr=[];
    for (a=1; a<=numTiles; a++)
    {
        if (numTiles%a===0)
        {
            factorsArr.push(a);
        }
    }
    if (factorsArr.length%2 ===0)
    {
        return factorsArr[(factorsArr.length/2)-1];
    }
    return factorsArr[(factorsArr.length/2)-.5];
}
function changeCard()
{

    this.style.background=this.color;
    this.flipped=true; 
    
    let flippedCards=[]

    for (a=0;a<cardsArr.length;a++)
        {
            if (cardsArr[a].flipped === true)
            {
                flippedCards.push(cardsArr[a]);
                
            }
        }
    
    if (flippedCards.length === 2)
    {
        //set timer for  the reveal and reveal
        if (flippedCards[0].color===flippedCards[1].color)
            {
                
                //stop the user from clicking any of the tiles
                for (a=0;a<cardsArr.length;a++)
                {
                    cardsArr[a].removeEventListener("click",changeCard);
                }
                
                setTimeout (function ()
                {    

                flippedCards[0].style.visibility="hidden";
                flippedCards[0].flipped=false;

                flippedCards[1].style.visibility="hidden";
                flippedCards[1].flipped=false;
                flippedCards=[];

                for (a=0;a<cardsArr.length;a++)
                {
                    //make tiles clickable again
                    cardsArr[a].addEventListener("click",changeCard);
                }
                }, 1100);

                
                cardsSolved+=2;
            }
        else
            {
              
                flippedCards[1].style.background=
                flippedCards[1].color;

                for (a=0;a<cardsArr.length;a++)
                {
                    cardsArr[a].removeEventListener("click",changeCard);
                }

                setTimeout(function()
                {
                    flippedCards[0].style.background="radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)";
                    flippedCards[0].flipped=false;


                    flippedCards[1].style.background="radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)";
                    flippedCards[1].flipped=false;
                    flippedCards=[];
                    
                    for (a=0;a<cardsArr.length;a++)
                {
                    cardsArr[a].addEventListener("click",changeCard);
                }
                } ,1100);
                
            }
    }
    
    if (cardsSolved === cardsArr.length)
    {
       setTimeout(function()
       {
        endPop.style.display= "block";
        blackout.style.display="block";
       resetGame();
       startGame();
       }
       ,1100);
       
    }    
}
function resetGame()
{
    numTiles="";
    while (cardsection.childNodes.length>0)
    {
        cardsection.removeChild(cardsection.lastChild);
    }
}

//!check for duplicate colors rare but still 
function genColorArray()
{
    let randColorsArr=[]
    const hexcodeVals= ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    let colorsArr=[];
    let hexStr="";
    let randNum=0;

    //get rand colors
    for (x=0;x<(numTiles/2);x++)
        {
            for (a=0;a<6;a++)
            {
                randNum= Math.floor(Math.random()*hexcodeVals.length);
                hexStr+= hexcodeVals[randNum]; 
            }
            hexStr= "#"+hexStr;
            colorsArr.push(hexStr);
            colorsArr.push(hexStr);
            hexStr="";
        }    

    //randomize the order
    const numTimes=colorsArr.length;
    for (x=0;x<numTimes;x++)
    {
        
        randNum= Math.floor(Math.random()*colorsArr.length);
        randColorsArr.push(colorsArr[randNum]);
        colorsArr.splice(randNum,1);
    }
    
    return randColorsArr;

}