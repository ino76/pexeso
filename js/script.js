// *** title ***
// author: Daniel Cech
// date: Nov 23, 2017


const cards = document.querySelectorAll('.card')
let numberOfFlipped = 0
let listOfFlipped = []
let last

cards.forEach(function(c){
    c.addEventListener('click', flipManager)
})


function flipManager(c) {
    if(numberOfFlipped < 2 && this != last) {
        numberOfFlipped++
        listOfFlipped.push(this)
        flip(this)
        last = this
    }

    if(numberOfFlipped == 2) {
        setTimeout(function(){
            listOfFlipped.forEach(c => flip(c))
            last = null
            numberOfFlipped = 0
            listOfFlipped = []
        }, 1500)
    }
    console.log(numberOfFlipped)
}


function flip(c) {
    c.classList.toggle('flipped')
}