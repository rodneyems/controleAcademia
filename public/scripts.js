const modalOverlay = document.querySelector(".modalOverlay")
const cards = document.querySelectorAll(".card")
modalOverlay.classList.remove("active")

for (let card of cards){
    card.addEventListener("click", function(){
        const videoID = card.getAttribute("id");
        modalOverlay.classList.add("active")
        modalOverlay.querySelector("iframe").src = `https://www.youtube.com/embed/${videoID}`
    })
}

card.addEventListener("")