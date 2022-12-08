const btn = document.querySelector("button");
const emailElm = document.getElementById("email");
btn.addEventListener("click", () => {
  localStorage.removeItem("userData");
  window.location.href = "register.html";
});
const emailValue = JSON.parse(localStorage.getItem("userData")).email;
emailElm.innerText = emailValue;
