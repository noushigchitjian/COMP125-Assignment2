"use strict";


(function(){

    function highlightActiveLink() 
    {
        let title = document.title;

        title = title.toLowerCase();

        console.log(`The title of the page is ${title}`);

        let navAnchors = document.querySelectorAll("li a");

        for (const anchor of navAnchors) 
        {

            let anchorString = anchor.getAttribute("href");
            anchorString = anchorString.substr(0, anchorString.length - 5);

            if ((title === "home") && (anchorString === "index") || (title === anchorString)) 
            {
                anchor.className = "nav-link active";
            }
        }

        return title;
    }

    function addParagraphsToJumbotron() 
    {
        
        let jumbotron = document.getElementsByClassName("jumbotron")[0];

        if (jumbotron) 
        {
            
            let newParagraph = document.createElement("p");

           
            newParagraph.textContent =
                `
               welcome to my Website
                
                `;

            
            jumbotron.appendChild(newParagraph);
           
            let newDiv = document.createElement("div");
            
            newDiv.innerHTML =
                `
                <p id="secondParagraph">
                my project goals are onhold for now unfortunately 
                </p>
                `;

            // step 4 attach the new element
            jumbotron.appendChild(newDiv);


            return true;

        }

        return false;
    }

   


    // named function
    function Start()
    {
       console.log('%cApp Started...', "color:white; font-size: 24px;");   

       let title = highlightActiveLink();

       let success = addParagraphsToJumbotron();

       if(success) 
       {
        console.log("successfully added paragraphs to jumbotron");
       }
       else
       {
        console.warn("content not added to jumbotron - does not exist");
       }

       let formValidated = validateForm();
       if(formValidated)
       {
        console.log("successfully validated form");
       }
       else
       {
        console.warn("form not validated - does not exist");
       }

    } 



    window.addEventListener("load", Start);

})();




