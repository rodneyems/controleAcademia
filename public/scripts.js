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

document.querySelector(".close-modal").addEventListener("click", function(){
    modalOverlay.classList.remove("active")
    modalOverlay.querySelector("iframe").src = ""
})

card.addEventListener("")