var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
var sidemenu = document.getElementById("sidemenu");

// -------------------------Name----------------------------------


// -----------------------------skills----------------------------------------

 

// --------------------------- tabs----------------------

function opentab(tabname, event) {
    for (var tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (var tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

function openmenu(){
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// ----------------------------------------Google sheet-------------------------------------


const scriptURL = 'https://script.google.com/macros/s/AKfycbwKmjG3NyNpPrtA5bRSopIAyI7yn-M5KIMtI-4XpOA0hxy2QxYySDxpqj0zQdE_n-4u/exec';

const form = document.forms['submit-to-google-sheet'];

const messageContainer = document.getElementById('msg');

form.addEventListener('submit', e => {
  e.preventDefault(); 

  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form) 
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
        messageContainer.textContent = 'Form submitted successfully!';
        messageContainer.style.color = 'green';

        form.reset();
    }
    else {
        messageContainer.textContent = 'Form submission failed';
        messageContainer.style.color = 'red';
    }
  })

  .catch (error => {
    messageContainer.textContent = 'An error occurred:' + error.message;
    messageContainer.style.color = 'red';
  });
});
