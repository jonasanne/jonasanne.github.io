document.addEventListener('DOMContentLoaded', (event) => {
    console.log('dom loaded');
  });

  function submit(){

      button = document.getElementById('button-submit');
      arrow = document.getElementsByClassName("arrow-svg")[0];
      emailfield = document.getElementById("input-email");
      messageField = document.getElementById("message-submit");
      //check if email input is empty

      if(emailfield.value ==""){
          return;
      }
      emailfield.value = "";
      emailfield.placeholder ="";
      //wait 0.5s
      setTimeout(
        function() {
            //do
            button.style.width = "390px";
            arrow.style.display = "none";


        }, 500);
      setTimeout(
        function() {
            //do
            messageField.style.display = "block";
            messageField.innerText = "thanks for subscribing!";
      

        }, 1000);

      //wait 2 sec
      setTimeout(
        function() {
            emailfield.placeholder ="Enter your email-adress...";

            button.style.width = "60px";
            messageField.innerText = "";
            messageField.style.display = "none";
            arrow.style.display = "inline";
        }, 2500);
      
      
  }
