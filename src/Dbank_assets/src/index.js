import {Dbank} from "../../declarations/Dbank";
 window.addEventListener("load",async function(){
  console.log("finished loading");
  update();
 
});
document.querySelector("form").addEventListener("submit",async function(event) {
  event.preventDefault();
  console.log("submitted");
  const button=event.target.querySelector("#submit-btn");
 const inputAmount=parseFloat(document.getElementById("input-amount").value);
 const outputAmount=parseFloat(document.getElementById("withdrawal-amount").value);
button.setAttribute("disabled",true);
if (inputAmount) {
  await Dbank.topUp(inputAmount);
  document.getElementById("input-amount").value = "";
}
if (outputAmount) {
  await Dbank.withdraw(outputAmount);
  document.getElementById("withdrawal-amount").value = "";
}
await Dbank.compound();
update();


  button.removeAttribute("disabled");
});
async function update(){
  const currentAmount=await Dbank.checkBalance();
  document.getElementById("value").innerText=Math.round(currentAmount*100)/100;
}