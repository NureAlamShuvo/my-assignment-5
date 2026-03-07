document.getElementById("signin-btn").addEventListener("click", function(){
    const inputUsername = document.getElementById("input-username");
    valueOfUsername = inputUsername.value;

    const inputPass = document.getElementById("input-pass");
    valueOfPass = inputPass.value;

    if(valueOfUsername === "admin" && valueOfPass === "admin123"){
        window.location.assign("./home.html");
    }
    else{
        alert("Please enter defult username and password");
    }
});
