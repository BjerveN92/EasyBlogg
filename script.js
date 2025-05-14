document.addEventListener("DOMContentLoaded", function(){
    // hämtar element från HTML
    // const saveButton = document.getElementById("save-btn");
    const blogPostsContainer = document.getElementById("blog-posts");

    
        // funktion: ladda inlägg från localstore
    function loadPosts() {
    // hämta sparade inlägg. Om det inte finns några inlägg, då får man en tom lista
        let posts = localStorage.getItem("blogPosts"); // hämtar string från localstore
        if (posts){
            posts = JSON.parse(posts); // gör om strängen till en lista med objekt
        }
        else {
            posts = []; // skapar en tom lista ifall det inte finns några inlägg
        }

        // rensar innehållet där inläggen visas
        blogPostsContainer.innerHTML = "";

        for (let post of posts) {
            // skapar nytt inlägg på sidan genom att skapa en ny DIV med nytt klassnamn
            const postDiv = document.createElement("postDiv");
            postDiv.className = "blog-post";
            postDiv.innerHTML =`            
                <h3>${post.title}</h3>
                <h5>${post.date}</h5>
                <p>${post.content}</p>`;
            // lägger till inlägget i "blogPostsContainer" ("blog-posts"(HTML))
            blogPostsContainer.appendChild(postDiv)
        }
    }

    function savePost(){
        // hämta data från input-fälten och
        // skapar nytt inlägg som ett objekt
        const newPost = {
            title: document.getElementById("title").value,
            date: document.getElementById("date").value,
            content: document.getElementById("content").value
        };

        if (!newPost.title || !newPost.date || !newPost.content) {
            alert("Fyll i alla fält innan du sparar.");
            return;
        }
        

        // hämta alla inlägg

        let posts = localStorage.getItem("blogPosts");
        if(posts) {
            posts = JSON.parse(posts);
        }
        else {
            posts = [];
        }

        // lägger till det nya inkögget i listan(posts)
        posts.push(newPost);

        // spara listan till localstorage genom att omvandla listan till en strängen
        localStorage.setItem("blogPosts", JSON.stringify(posts));

        // töm alla inputs (hela formuläret)
        document.getElementById("blog-form").reset();

        //ladda om inläggen för att få med det nya inlägget + dom förgående (kallar på funktionen loadPosts)
        loadPosts()
    }

        // funktionen "savePost" är kopplad till spara-knappen
        const saveButton = document.getElementById("save-btn");
        if (saveButton) {
            saveButton.addEventListener("click", savePost);
        } else {
            console.error("Save button not found");
        }

        // ladda alla sparade inlägg när sidan öppnas
        loadPosts();

});
