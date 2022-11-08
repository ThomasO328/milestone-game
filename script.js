class totalScore{
    constructor(totalTime, cards){
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeLeft = totalTime;
        this.timer = document.getElementById('time-left');
        this.ticker = document.getElementById('flips');
    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeLeft = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards();
            this.countDown = this.startCountDown();
            this.busy = false;
        }, 500);
        this.hideCards();
        this.timer.innerText = this.timeLeft;
        this.ticker.innerText = this.totalClicks;
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

    flipCard(card){
        if(this.canFlipCard(card)){
           this.totalClicks++;
           this.ticker.innerText = this.totalClicks; 
           card.classList.add('visible')
           if(this.cardToCheck)
                this.checkForMatch(card);
           else
                this.cardToCheck = card;
        }
    }
    checkForMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

        this.cardToCheck = null;
    }
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card1);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length === this.cardsArray.length)
            this.youWin();
    }
    cardMisMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1500);
    }
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }
    startCountDown(){
        return setInterval(() => {
            this.timeLeft--;
            this.timer.innerText = this.timeLeft;
            if(this.timeLeft === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('game-over').classList.add('visible');
    }
    youWin() {
        clearInterval(this.countDown);
        document.getElementById('you-win').classList.add('visible');
    }
    shuffleCards(){
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randomIndex].style.order = i;
            this.cardsArray[i].style.order = randomIndex;
        }
    }
     canFlipCard(card) {
        return !this.matchedCards.includes(card) && card !== this.cardToCheck && !this.busy;
    }
}

function ready() {
    let instructions = Array.from(document.getElementsByClassName('instruction-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new totalScore(120, cards)

    instructions.forEach(instruction => {
        instruction.addEventListener('click', () => {
            instruction.classList.remove('visible');
             game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}