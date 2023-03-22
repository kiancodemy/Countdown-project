const inputContainer=document.getElementById('input-container');
const countownForm=document.getElementById('countdownForm');
const dateel=document.getElementById('date-picker');
const complete=document.getElementById('complete');
const completeinfo=document.getElementById('complete-info');
const completebtn=document.getElementById('complete-button');
let countdowntitle='';
let countdowndate='';
let countdownvalue=Date;
let countdownactive;
let savedcountdown;

const countdownel=document.getElementById('countdown');
const countdowneltitle=document.getElementById('countdown-title');
const countdownbtn=document.getElementById('countdown-button');
const timeelement=document.querySelectorAll('span');
const second=1000;
const minute=60*second;
const hour=60*minute;
const day=24*hour;





const today=new Date().toISOString().split('T')[0];
dateel.setAttribute('min',today);


 



function updateDom(){
  countdownactive= setInterval(()=>{
    
  const now=new Date().getTime();
  const distance=countdownvalue-now;
  console.log(distance);
  const days=Math.floor(distance/day);
  const hours=Math.floor((distance%day)/hour);
  const minutes=Math.floor((distance%hour)/minute);
  const seconds=Math.floor((distance%minute)/second);
  console.log(days,hours,minutes,seconds);
  inputContainer.hidden=true;
  if(distance<0){
    
    
    countdownel.hidden=true;
    clearInterval(countdownactive);
    completeinfo.textContent=`${countdowntitle} it has finished on ${countdowndate}`;
    complete.hidden=false;
  }
  else{
    
  countdowneltitle.textContent=`${countdowntitle}`; 
  timeelement[0].textContent=`${days}`;
  timeelement[1].textContent=`${hours}`;
  timeelement[2].textContent=`${minutes}`;
  timeelement[3].textContent=`${ seconds}`;
  complete.hidden=true;

  countdownel.hidden=false;


  }
  
  



  },second)
 

  
}


function updatecountdown(e){
  e.preventDefault();
  console.log(e);
  countdowntitle=e.srcElement[0].value;
  countdowndate=e.srcElement[1].value;
  console.log( countdowntitle,countdowndate);
  savedcountdown={
    title:countdowntitle,
    date:countdowndate
  };
  localStorage.setItem('countdown',JSON.stringify(savedcountdown));
  console.log(savedcountdown);
  
  if(countdowndate===''){
    alert('you have not inserted date')
  }
  else{
    countdownvalue=new Date(countdowndate).getTime();
    console.log( 'countdownvalue:', countdownvalue);
    updateDom(); 
    
  }
  

  
  

  
    
}
countownForm.addEventListener('submit',updatecountdown)

//reset
function reset(){
  complete.hidden=true;
  countdownel.hidden=true;
  inputContainer.hidden=false;
  clearInterval(countdownactive);
  countdowntitle='';
  countdowndate='';
  localStorage.removeItem('countdown');

}
countdownbtn.addEventListener('click',reset);
completebtn.addEventListener('click',reset)


//RESTORE
function restoreprevipucountdown(){
  if(localStorage.getItem('countdown')){
    inputContainer.hidden=true;
    savedcountdown=JSON.parse(localStorage.getItem('countdown'));
    countdowntitle=savedcountdown.title;
    countdowndate=savedcountdown.date;
    countdownvalue=new Date(countdowndate).getTime();
    updateDom();
  }

}
restoreprevipucountdown();