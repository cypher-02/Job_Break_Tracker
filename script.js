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

// creating paragraph
const startPara = document.createElement("p");
main.append(startPara);

// function to update text
function updateBreak() {
    startPara.textContent = "Remaining break " + a + " min";
}

// show stored value on page load
updateBreak();

sumbit.addEventListener("click", () => {
    // values
    let exit_h = exit_hours.value.trim();
    let exit_min = exit_minutes.value.trim();
    let enter_h = enter_hours.value.trim();
    let enter_min = enter_minutes.value.trim();

    // check empty fields
    if (
        exit_h === "" ||
        exit_min === "" ||
        enter_h === "" ||
        enter_min === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    // string to number
    let ext_h = parseInt(exit_h);
    let ext_min = parseInt(exit_min);
    let ent_h = parseInt(enter_h);
    let ent_min = parseInt(enter_min);

    // validate proper number input
    if (
        isNaN(ext_h) ||
        isNaN(ext_min) ||
        isNaN(ent_h) ||
        isNaN(ent_min)
    ) {
        alert("Please enter valid numbers");
        return;
    }

    // validate time range
    if (
        ext_h < 0 || ext_h > 23 ||
        ent_h < 0 || ent_h > 23 ||
        ext_min < 0 || ext_min > 59 ||
        ent_min < 0 || ent_min > 59
    ) {
        alert("Please enter valid time");
        return;
    }

    // convert both times into total minutes
    let exit_total = ext_h * 60 + ext_min;
    let enter_total = ent_h * 60 + ent_min;

    // check wrong input
    if (enter_total <= exit_total) {
        alert("Error: Enter time must be greater than exit time");
        return;
    }

    // subtract used break time
    a = a - (enter_total - exit_total);

    // save value
    localStorage.setItem("a", JSON.stringify(a));

    // update text
    updateBreak();

    // clear inputs
    exit_hours.value = "";
    exit_minutes.value = "";
    enter_hours.value = "";
    enter_minutes.value = "";
});

reset.addEventListener("click", () => {
    // reset value
    a = 30;

    localStorage.removeItem("a");

    updateBreak();
});
