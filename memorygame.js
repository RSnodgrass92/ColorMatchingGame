let validInput=false;
let numTiles=0;
let colorsArr=[];
let cardsArr=[];
let cardsSolved=0;

const startbtn = document.querySelector("#startbtn")
const cardsection = document.querySelector("#cardsection")
const resetbtn= document.querySelector("#resetbtn")
startbtn.addEventListener("click",startGame);
resetbtn.addEventListener("click",resetGame);

//!turn off start button while game is running fix zero input and negative input add colorblind mode; add the hexcode for people to see.

function startGame()
{
   if (numTiles===0)
   {

   validInput=false;
    while(validInput===false) 
    {
        let isANumber= true;
     
        let isEven= true;
        
        numTiles= prompt("how many tiles would you like to play with, it must be an even number"); 
        if (isNaN(numTiles))
        {
            alert("Invalid Input that is NOT a number");
            isANumber=false;
          
        }

         else if (numTiles%2!==0 && isANumber=== true)
        {
            alert("The number must be even");
            isEven = false;
        }
        else 
        {
            validInput=true;
        }
    }
   //generate colors array
    colorsArr= genColorArray();
    
    //generate row/col
    const numRows=findNumRow();
    const numCol= (numTiles/numRows); 
    console.log(numCol);
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
    console.log(flippedCards);
    if (flippedCards.length === 2)
    {
        //set timer for  the reveal and reveal
        if (flippedCards[0].color===flippedCards[1].color)
            {
                setTimeout (function ()
                {
                flippedCards[0].style.visibility="hidden";
                flippedCards[0].flipped=false;

                flippedCards[1].style.visibility="hidden";
                flippedCards[1].flipped=false;
                flippedCards=[];
                }, 1100);

                cardsSolved+=2;
            }
        else
            {
              
                flippedCards[1].style.background=
                flippedCards[1].color;

                setTimeout(function()
                {
                    flippedCards[0].style.background="radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)";
                    flippedCards[0].flipped=false;


                    flippedCards[1].style.background="radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)";
                    flippedCards[1].flipped=false;
                    flippedCards=[];
                } ,1100);
                
            }
    }
    
    if (cardsSolved === cardsArr.length)
    {
       setTimeout(function()
       {
       alert ("congrats you win\n\n hit OK to start a new game");
       resetGame();
       startGame();
       }
       ,1100);
       
    }    
}
function resetGame()
{
    numTiles=0;
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