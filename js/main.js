const userNameElm = document.getElementById("user-name-input");
const emailElm = document.getElementById("email-input");
const passwordElm = document.getElementById("password-input");
const PasswordConfElm = document.getElementById("confirm-password-input");
const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    checkUserNameValidation() &&
    checkEmailValidation() &&
    checkPasswordValidation() &&
    checkConfPasswordValidation()
  ) {
    loggedIn();
  } else {
    checkUserNameValidation();
    checkEmailValidation();
    checkPasswordValidation();
    checkConfPasswordValidation();
  }
});

const register = async () => {
  const params = {
    username: userNameElm.value,
    email: emailElm.value,
    password: passwordElm.value,
    password_confirmation: PasswordConfElm.value,
  };

  let response = await fetch("https://goldblv.com/api/hiring/tasks/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(params),
  });
  let data = await response.json();
  // console.log("data", data);
  localStorage.setItem("userData", JSON.stringify(data));
};

const loggedIn = async () => {
  await register();
  checkAuth();
};

const displayError = (elem, mess) => {
  elem.parentElement.lastElementChild.innerText = mess;
  elem.classList.add("danger-border");
  elem.classList.remove("success-border");
};
const displaySuccess = (elem) => {
  elem.parentElement.lastElementChild.innerText = "";
  elem.classList.add("success-border");
  elem.classList.remove("danger-border");
};

const checkUserNameValidation = () => {
  const userNameVal = userNameElm.value.trim();
  const regexp = /^[^0-9][a-zA-Z0-9]{3,13}[a-zA-Z]$/;
  if (userNameVal === "") {
    displayError(userNameElm, "User name is required");
    return false;
  } else if (!regexp.test(userNameVal)) {
    displayError(userNameElm, "Invaild user name");
    return false;
  } else {
    displaySuccess(userNameElm);
    return true;
  }
};

const checkEmailValidation = () => {
  const emailVal = emailElm.value.trim();
  const regexp = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (emailVal === "") {
    displayError(emailElm, "Email is required");
    return false;
  } else if (!regexp.test(emailVal)) {
    displayError(emailElm, "Invaild email");
    return false;
  } else {
    displaySuccess(emailElm);
    return true;
  }
};

const checkPasswordValidation = () => {
  const passwordVal = passwordElm.value.trim();
  const regexp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@%$#?!^&*-]).{8,}$/i;
  if (passwordVal === "") {
    displayError(passwordElm, "Password is required");
    return false;
  } else if (!regexp.test(passwordVal)) {
    displayError(
      passwordElm,
      "Password must contain at least one uppercase, lowercase letter, number, symbol and minimum 8 characters."
    );
    return false;
  } else {
    displaySuccess(passwordElm);
    return true;
  }
};
const checkConfPasswordValidation = () => {
  const PasswordConfVal = PasswordConfElm.value.trim();
  const passwordVal = passwordElm.value.trim();
  if (PasswordConfVal === "") {
    displayError(PasswordConfElm, "Please confirm your password");
    return false;
  } else if (PasswordConfVal !== passwordVal) {
    displayError(PasswordConfElm, "Passwords doesn't match");
    return false;
  } else {
    displaySuccess(PasswordConfElm);
    return true;
  }
};

const checkAuth = () => {
  const storageUserData = JSON.parse(localStorage.getItem("userData"));
  if (storageUserData) {
    // console.log(storageUserData);
    window.location.href = "success.html";
  }
};
checkAuth();
