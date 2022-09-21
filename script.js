var UndoStack=[]
var RedoStack=[]
var TotalDiscs=3;
var timer=document.getElementsByClassName("timer")[0]
var count=0;
GenerateNewDiscs=(N)=>{
    let width="250";
    let height=" 55";
    let stack = ["chartreuse","rgb(243, 36, 36)","rgb(255, 9, 222)","orange"
    ,"indigo","green","grey","blue","rgb(14, 252, 192)","rgb(21, 172, 34)"];
    for(i=0;i<N;i++){
        let danda=document.getElementsByClassName("danda"+1)[0];
        let newdisc=document.createElement("div");
        let classname="disc"+(i+1);
        newdisc.classList.add(classname,"noDrop");
        newdisc.style.width=width+"px";
        newdisc.style.height=height+"px";
        newdisc.style.backgroundColor=stack[i];
        newdisc.draggable="true";
        // newdisc.ondragstart="drag";
        newdisc.addEventListener('dragstart',drag);
        danda.appendChild(newdisc);
        width-=20;
        height-=5;
    }
    console.log("GENERATION SUCCESUL");
    SAVETOSTACK();
  
}
GenerateNewDiscs(TotalDiscs);



function allowDrop(ev) {
    console.log("HELLO IN allowdrop");
    ev.preventDefault();
  }
  
function IsSmaller(ev,data){
  console.log("In Small check");
  let lastchildindex=ev.target.children.length-1;
  if(ev.target.children.length==0)return;
  let lastchild=ev.target.children[lastchildindex];
  console.log("class :",data);
  let newchild=document.getElementsByClassName(data)[0];
  console.log(lastchild);
  console.log("lastchild",lastchild.offsetWidth,lastchild.offsetHeight);
  console.log(newchild);
  console.log("newchild",newchild.offsetWidth,newchild.offsetHeight);

  if(newchild.offsetWidth < lastchild.offsetWidth && newchild.offsetHeight < lastchild.offsetHeight){
     console.log("true");
    console.log("IN SMALL ENDING");
     return true;
  }else{
    console.log("false");
    console.log("IN SMALL ENDING");
    return false;
  }
}
  function drag(ev) {
    console.log("HELLO IN drag");
    let idxoftopdisk=ev.path[1].children.length-1;
    console.log(idxoftopdisk);
    let toponeclass=ev.path[1].children[idxoftopdisk].classList;
    // console.log(toponeclass);
    element=document.getElementsByClassName(toponeclass);
    // console.log(element);
    // console.log(toponeclass==ev.target.className);
    if(toponeclass != ev.target.className)return
    console.log(ev.target.id);
    ev.dataTransfer.setData("", ev.target.className);

  }

  function drop(ev) {
    ev.preventDefault();
    //check if larger or smaller
    let data = ev.dataTransfer.getData("");
    newelement=document.getElementsByClassName(data)[0];
    if(ev.target.classList.contains("noDrop"))return;
  
    if(IsSmaller(ev,data)==false)return;

    console.log("HELLO IN drop");
    console.log('to drop:',data);
    console.log(document.getElementsByClassName(data)[0]);
    console.log(document.getElementsByClassName(data));
    // console.log("TARGET IS:",ev.target);
    SAVETOSTACK();
    ev.target.appendChild(newelement);
    IncreaseSetCount();
    CheckWin();
  }
  function SAVETOSTACK(){
    console.log("-----------SAVE TO STACK----------------");
    let backdrop=document.getElementsByClassName("backdrop");
    let state=backdrop[0].innerHTML;
    console.log(state);
    console.log("-----------DEBUG----------------");
    console.log(backdrop[0]);
    console.log("-----------DEBUG----------------");
    UndoStack.push(state);
    console.log("LENGTH IS:",UndoStack.length);


  }
  function AttachEventListeners(){
     const temp=document.getElementsByClassName("noDrop");
     console.log(temp.length)


     Array.from(temp).forEach(item=>{
        console.log("ITEM: ",item);
        item.addEventListener('dragstart',drag);
     });
  }
  function UNDO(){
    IncreaseSetCount();

    console.log("UNDO CALLED")
    console.log(document.getElementsByClassName("noDrop"));
    let backdrop=document.getElementsByClassName("backdrop");
    if(UndoStack.length==0){
        console.log("EMPTY");
        return;
    }
    let redostate=backdrop[0].innerHTML
    RedoStack.push(redostate);

    let state=UndoStack.pop();
    console.log("------------STATE---------------");
    console.log(state);
    backdrop[0].innerHTML=state;
    AttachEventListeners();

  }
  function REDO(){
    IncreaseSetCount();

    console.log("REDO CALLED")
    console.log(document.getElementsByClassName("noDrop"));
    let backdrop=document.getElementsByClassName("backdrop");
    if(RedoStack.length==0){
        console.log("EMPTY");
        return;
    }
    let undoState=backdrop[0].innerHTML
    UndoStack.push(undoState);

    let state=RedoStack.pop();
    console.log("------------STATE---------------");
    console.log(state);
    backdrop[0].innerHTML=state;
    AttachEventListeners();
  }

function CheckWin(){
    let noofdics=document.getElementsByClassName("danda3")[0].children.length;
    if(noofdics!=TotalDiscs)return;
    const children=document.getElementsByClassName("danda3")[0].children;
    console.log("WINS: ",document.getElementsByClassName("danda3")[0].children);
    for(i=1;i<=TotalDiscs;i++){
          if(children[i-1].classList[0]!="disc"+i)return;
    }
    alert("WIN!!");
    
}
function LoseStop(){

}
function StartTimer(min,sec,watch){
  let timer=(min*60)+sec;

  const id=setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    watch.innerHTML=minutes + ":" + seconds;
    if(--timer<0){
      alert("YOU LOSE!!!");
      clearInterval(id);
      UndoStack=[];
      RedoStack=[];
      location.reload();

      let stepcount=document.getElementById("steps");
      stepcount.innerHTML="0";
    }

  }, 1000);
}
function IncreaseSetCount(){
  let stepcount=document.getElementById("steps");
  count++;
  stepcount.innerHTML=parseInt(count,10);
}
function START(){
    let input=document.getElementById("input").value;
    document.getElementsByClassName("danda")[0].innerHTML="";
    document.getElementsByClassName("danda")[1].innerHTML="";
    document.getElementsByClassName("danda")[2].innerHTML="";
    if(input>9 || input<3){
        alert("VALID RANGE IS 1-9!!");
    }
    TotalDiscs=input;
    GenerateNewDiscs(TotalDiscs);
    let minutes=document.getElementById("minutes").value;
    let seconds=document.getElementById("seconds").value;
    min=parseInt(minutes,10);
    sec=parseInt(seconds,10);
    console.log(min,":",sec);
    let stepcount=document.getElementById("steps");
    stepcount.innerHTML="0";
    StartTimer( min,sec,timer);
}


