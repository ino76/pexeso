// *** title ***
// author: Daniel Cech
// date: Nov 23, 2017


const cards = document.querySelectorAll('.card')
let numberOfFlipped = 0
let listOfFlipped = []
let last
let inAnimation = false

cards.forEach(function(c){
    c.addEventListener('click', flipManager)
})


function flipManager(c) {
    if( numberOfFlipped < 2 && this != last) {
        if(inAnimation) {
            return
        }
        inAnimation = true
        last = this
        numberOfFlipped++
        listOfFlipped.push(this)
        flip(this)
        setTimeout(function(){
            inAnimation = false
        }, 500)
    }

    if(numberOfFlipped == 2) {
        setTimeout(function(){
            listOfFlipped.forEach(c => flip(c))
            last = null
            numberOfFlipped = 0
            listOfFlipped = []
            inAnimation = true
            setTimeout(function(){
                inAnimation = false
            }, 800)
        }, 1500)
    }
    console.log(numberOfFlipped)
}


function flip(c) {
    c.classList.toggle('flipped')
}