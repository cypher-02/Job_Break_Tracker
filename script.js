let a = 30;

// get stored value when page loads
let storedValue = localStorage.getItem("a");

if (storedValue !== null) {
    a = JSON.parse(storedValue);
}

const main = document.querySelector(".main");
const sumbit = document.querySelector(".sumbit");
const exit_hours = document.querySelector(".exit_hours");
const exit_minutes = document.querySelector(".exit_minutes");
const enter_hours = document.querySelector(".enter_hours");
const enter_minutes = document.querySelector(".enter_minutes");
const reset = document.querySelector(".reset");

//creating paragrapgh
const startPara = document.createElement("p");
main.append(startPara);

// function to update text
function updateBreak(){
    startPara.textContent = "Remaining break " + a + " min";
}

// show stored value on page load
updateBreak();

sumbit.addEventListener('click', ()=>{
    //values
    let exit_h = exit_hours.value.trim();
    let exit_min = exit_minutes.value.trim();
    let enter_h = enter_hours.value.trim();
    let enter_min = enter_minutes.value.trim();
    
    if(exit_hours.value || exit_minutes.value < enter_hours.value || enter_minutes.value){
        alert("Error wrong input");
    }

    //string conversion
    let ent_h = parseFloat(exit_h);
    let ent_min = parseFloat(exit_min);
    let ext_h = parseFloat(enter_h);
    let ext_min = parseFloat(enter_min);

    //hours to min
    let ent_h_to_min = ent_h * 60;
    let ext_h_to_min = ext_h * 60;
    
    ent_h_to_min = ent_h_to_min + ent_min;
    ext_h_to_min = ext_h_to_min + ext_min;

    
    a = a-(ext_h_to_min - ent_h_to_min);

    // save value
    localStorage.setItem('a', JSON.stringify(a));

    // update text
    updateBreak();

    exit_hours.value = "";
    exit_minutes.value = "";
    enter_hours.value = "";
    enter_minutes.value = "";
});
 
reset.addEventListener('click',()=>{
    // reset value
     a = 30;

    localStorage.removeItem("a");

    updateBreak();
});

