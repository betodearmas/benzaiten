/*HAM MENU*/

const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('.off-screen-menu');

hamMenu.addEventListener('click', ()=>{
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active')
})

document.addEventListener('DOMContentLoaded', function() {
    const hamMenu = document.querySelector('.ham-menu');
    const scrollThreshold = 450; // Change this value to your desired scroll amount
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
});


/*POP-UP*/
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const close = document.getElementById("close");

    // Show the popup after 5 seconds
    setTimeout(() => {
        popup.style.display = "flex";
    }, 5000);

    // Close the popup
    close.addEventListener("click", () => {
        popup.style.display = "none";
    });


    document.addEventListener("DOMContentLoaded", function() {
        const popup = document.getElementById("popup");
        const close = document.getElementById("close");
    
        // Check if the popup has been shown in this session
        if (!sessionStorage.getItem("popupShown")) {
            // Show the popup after 5 seconds
            setTimeout(() => {
                popup.style.display = "flex";
                sessionStorage.setItem("popupShown", "true");
            }, 5000);
        }
    
        // Close the popup
        close.addEventListener("click", () => {
            popup.style.display = "none";
        });
    });
    

    /*POP-UP STOPS APPEARING AFTER ONE SESSION LOAD
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const close = document.getElementById("close");

    // Check if the popup has been shown in this session
    if (!sessionStorage.getItem("popupShown")) {
        // Show the popup after 5 seconds
        setTimeout(() => {
            popup.style.display = "flex";
            sessionStorage.setItem("popupShown", "true");
        }, 5000);
    }

    // Close the popup
    close.addEventListener("click", () => {
        popup.style.display = "none";
    });
});*/

    // Handle form submission
    document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;

        fetch("/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            popup.style.display = "none";
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});