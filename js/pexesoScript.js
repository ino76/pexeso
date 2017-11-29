// *** title ***
// author: Daniel Cech
// date: Nov 23, 2017


let listOfLangs = [   "bash",
                        "c",
                        "cpp",
                        "crystal",
                        "csharp",
                        "elixir",
                        "git",
                        "go",
                        "haskell",
                        "java",
                        "javascript",
                        "kotlin",
                        "python",
                        "ruby"
                    ]


// every element should be twice in array
listOfLangs.push.apply(listOfLangs, listOfLangs)

const game = document.getElementById('game')
let numberOfFlipped = 0
let listOfFlipped = []
let last
let inAnimation = false
let lastLang


function start(s){
    shuffle(listOfLangs)
    listOfLangs.forEach(x => {
        game.innerHTML += `<section class="container">
        <div class="card">
                <figure class="front"><span></span></figure>
                <figure class="back" style="background: #f0efea url('images/logos/${x}.png') no-repeat center bottom;" data-lang="${x}"></figure>
        </div>
    </section>`
    })
    const cards = document.querySelectorAll('.card')
    cards.forEach(function(c){
        c.addEventListener('click', flipManager)
    })
}


function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}


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