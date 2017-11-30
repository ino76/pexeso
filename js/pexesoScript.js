// *** title ***
// author: Daniel Cech
// date: Nov 23, 2017


let listOfLangs = [     "bash",
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
                        "ruby",
                        "swift",
                        "rust",
                        "matlab",
                        "fsharp",
                        "lua",
                        "scala",
                        "haxe",
                        "powershell",
                        "ocaml",
                        "perl",
                        "dart",
                        "coffeescript",
                        "wolframmathematica"
                    ]


// every element should be twice in array
listOfLangs.push.apply(listOfLangs, listOfLangs)

const game = document.getElementById('game')
const coinSound = document.getElementById('coin')
const flipSound = document.getElementById('flip')
let numberOfFlipped = 0
let listOfFlipped = []
let last
let inAnimation = false
let lastLang = null


function start(s){
    shuffle(listOfLangs)
    listOfLangs.forEach(x => {
        game.innerHTML += `<section class="container">
        <div class="card" data-lang="${x}">
                <figure class="front"><span></span></figure>
                <figure class="back" style="background: #f0efea url('images/logos/${x}.png') no-repeat center center; background-size: cover;"></figure>
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
    if(c.currentTarget.classList.contains("flipped")) {
        return
    }
    if(numberOfFlipped < 1) {
        lastLang = c.currentTarget.dataset.lang
        console.log(lastLang)
    }

    if(numberOfFlipped < 2 && this != last) {
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
        console.log(c.currentTarget.dataset.lang)
        if(lastLang == c.currentTarget.dataset.lang){ 
            coinSound.currentTime = 0
            coinSound.play()
            last = null
            numberOfFlipped = 0
            listOfFlipped = []
            lastLang = null
        } else {
            setTimeout(function(){
                listOfFlipped.forEach(c => flip(c))
                inAnimation = true
                last = null
                numberOfFlipped = 0
                listOfFlipped = []
                lastLang = null
                setTimeout(function(){
                    inAnimation = false
                }, 800)
            }, 1500)
        }
    }
}


function flip(c) {
    c.classList.toggle('flipped')
    flipSound.currentTime = 0
    flipSound.play()
}