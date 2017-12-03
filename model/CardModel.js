var CardModel = function () {
    this.gameTime;
    this.userOrder;
    this.userName;
    this.numberOfAttempts;
    this.savedCards = [];
    this.cardsOfTwo;
    this.cardsToRemove = [];

    this.startEvent = new Event(this);
};

CardModel.prototype = {

    start: function () {
        if (localStorage.getItem('findThePair') == undefined) {
            this.newUser();
            this.startEvent.notify();
        } else {
            //here should be the algorithm about what will happened if there are
            //savings in local storage
        }
    },

    newUser: function () {
        this.gameTime = 0;
        this.userOrder = 1;
        this.userName = 'User' + ' ' + this.userOrder;
        this.numberOfAttempts = 0;
    },

    /* -------------------- selectCard ----------------- */

    //we send cards to this funciton from view selectCardEvent
    selectCard: function (card) {
        this.saveCard(card);
    },

    saveCard: function (card) {
        this.savedCards.push(card);
        if (this.savedCards.length % 2 == 0) {
            this.checkCards();
            this.attemptsCounter();
        }
    },

    checkCards: function () {
        this.cardsOfTwo = this.savedCards.splice(0, 2);
        var firstSrc = this.cardsOfTwo[0].childNodes[0].getAttribute('src');
        var secondSrc = this.cardsOfTwo[1].childNodes[0].getAttribute('src');
        if (firstSrc == secondSrc) {
            this.cardsToRemove.push(this.cardsOfTwo.splice(0, 2));
            setTimeout(this.removeCards.bind(this), 1000);
        } else if (firstSrc != secondSrc) {
            console.log('different');
        }
    },

    removeCards: function () {
        this.cardsToRemove[0][0].remove();
        this.cardsToRemove[0][1].remove();
        this.cardsToRemove.splice(0, 1);
    },

    attemptsCounter: function () {
        this.numberOfAttempts++;
    }
};

/* --------------------  ----------------- */