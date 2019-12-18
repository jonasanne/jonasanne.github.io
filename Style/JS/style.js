
function submit() {

  button = document.getElementById('button-submit');
  arrow = document.getElementsByClassName("arrow-svg")[0];
  emailfield = document.getElementById("input-email");
  messageField = document.getElementById("message-submit");
  //check if email input is empty
  var validate = validateEmail(emailfield);
  //if valid
  if (validate == true) {

    emailfield.value = "";
    emailfield.placeholder = "";
    //wait 0.5s
    setTimeout(
      function () {
        //do
        button.style.width = "340px";
        arrow.style.display = "none";


      }, 500);
    setTimeout(
      function () {
        //do
        messageField.style.display = "block";
        messageField.innerText = "thanks for subscribing!";


      }, 1000);

    //wait 2 sec
    setTimeout(
      function () {
        emailfield.placeholder = "Enter your email-adress...";

        button.style.width = "60px";
        messageField.innerText = "";
        messageField.style.display = "none";
        arrow.style.display = "inline";
      }, 2500);
  }







}
//countdown
function countDown() {
  //set date in timestamp
  var countDownDate = new Date("Dec 20, 2019 18:00:00").getTime();
  console.log(countDownDate);

  //update every 1 sec
  var update = setInterval(function () {
    //today's date
    var today = new Date().getTime();

    //diffrence between date and now
    var diff = countDownDate - today;

    //covert to days,hours,minutes,seconds
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    //display
    var timer = document.getElementById("timer-detail");
    timer.innerHTML = days + " : " + hours + " : " + minutes + " : " + seconds;


    //when done
    if (diff <= 0) {
      clearInterval(update);
      timer.innerHTML = "We are live!";
    }

  }, 1000);
}


//validate email
function validateEmail(emailField) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(emailField.value) == false) {
    alert('Invalid Email Address');
    return false;
  }

  return true;

}



countDown();



document.addEventListener('DOMContentLoaded', (event) => {
  console.log('dom loaded');
});