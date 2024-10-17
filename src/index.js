
const BASE_URL = "http://localhost:3000";


function displayRamens() {
    fetch(`${BASE_URL}/ramens`)
        .then(response => response.json())
        .then(data => {
            const ramenMenu = document.getElementById("ramen-menu");
            ramenMenu.innerHTML = ""; 
            
            data.forEach(ramen => {
                const ramenImage = document.createElement("img");
                ramenImage.src = ramen.image;
                ramenImage.alt = ramen.name;
                ramenImage.dataset.id = ramen.id; 
                ramenImage.addEventListener("click", handleClick); 
                ramenMenu.appendChild(ramenImage);
            });

            
            if (data.length > 0) {
                showRamenDetails(data[0]);
            }
        })
        .catch(error => {
            console.error("Error fetching ramens:", error);
        });
}


function handleClick(event) {
    const ramenId = event.target.dataset.id;
    fetch(`${BASE_URL}/ramens/${ramenId}`)
        .then(response => response.json())
        .then(ramen => {
            showRamenDetails(ramen);
        })
        .catch(error => {
            console.error("Error fetching ramen details:", error);
        });
}


function showRamenDetails(ramen) {
    document.getElementById("ramen-name").innerText = ramen.name;
    document.getElementById("ramen-image").src = ramen.image;
    document.getElementById("ramen-rating").innerText = `Rating: ${ramen.rating}`;
    document.getElementById("ramen-comment").innerText = `Comment: ${ramen.comment}`;
}


function addSubmitListener() {
    const form = document.getElementById("new-ramen");
    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const newRamen = {
            name: document.getElementById("new-name").value,
            image: document.getElementById("new-image").value,
            rating: document.getElementById("new-rating").value,
            comment: document.getElementById("new-comment").value,
        };

        
        const ramenMenu = document.getElementById("ramen-menu");
        const ramenImage = document.createElement("img");
        ramenImage.src = newRamen.image;
        ramenImage.alt = newRamen.name;
        ramenImage.dataset.id = new Date().getTime(); 
        ramenImage.addEventListener("click", handleClick);
        ramenMenu.appendChild(ramenImage);

        
        form.reset();
    });
}


function main() {
    displayRamens();
    addSubmitListener();
}

document.addEventListener("DOMContentLoaded", main);
