var CardModel = function () {

    this.userOrder;
    this.userName;
    this.numberOfAttempts;
    this.gameTime;
    this.score;
    this.date;

    this.savedCards = [];
    this.cardsOfTwo;
    this.cardsToRemove = [];
    this.cardsToFlip = [];

    this.savedGame = [];
    this.currentGameResult;

    this.startEvent = new Event(this);
    this.cardsToFlipEvent = new Event(this);
    this.cardsToRemoveEvent = new Event(this);
    this.showScoreEvent = new Event(this);

    this.initUser();
};

CardModel.prototype = {

    initUser: function () {
        this.comonGameConditions();
        this.setUser();
    },

    /* -------------------- start ----------------- */

    start: function () {
        this.initUser();
        this.startEvent.notify();
    },

    comonGameConditions: function () {
        this.gameTime = 0;
        this.numberOfAttempts = 0;
    },

    setUser: function () {
        if (localStorage.getItem('findThePairIvnDmr') == undefined) {
            this.newUser();
        } else {
            this.savedGame = JSON.parse(localStorage.getItem('findThePairIvnDmr'));
            this.nextUser();
        }
    },

    newUser: function () {
        this.userOrder = 1;
        this.userName = 'User' + ' ' + this.userOrder;
    },

    nextUser: function () {
        this.userOrder = this.savedGame[this.savedGame.length - 1].userOrder + 1;
        this.userName = 'User' + ' ' + this.userOrder;
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
            this.cardsToRemoveEvent.notify();
        } else if (firstSrc != secondSrc) {
            this.cardsToFlip.push(this.cardsOfTwo.splice(0, 2));
            this.cardsToFlipEvent.notify();
        }
    },

    attemptsCounter: function () {
        this.numberOfAttempts++;
    },

    /* -------------------- reset ----------------- */

    reset: function () {
        this.savedCards = [];
        this.cardsToFlip = [];
        this.cardsToRemove = [];
        this.comonGameConditions();
    },

    /* -------------------- win ----------------- */

    win: function (mapSize) {
        this.scoreGenerate();
        this.prepareDate();
        this.collectTheResult(mapSize);
        this.saveGameResults();
        this.showScoreEvent.notify();
    },

    scoreGenerate: function () {
        this.score = Math.trunc(2160000 / (this.numberOfAttempts * 3 + this.gameTime));
    },

    collectTheResult: function (mapSize) {
        this.currentGameResult = {
            userOrder: this.userOrder,
            userName: this.userName,
            gameTime: this.gameTime,
            numberOfAttempts: this.numberOfAttempts,
            score: this.score,
            mapSize: mapSize,
            date: this.date
        };
    },

    saveGameResults: function () {
        this.savedGame.push(this.currentGameResult);
        localStorage.setItem('findThePairIvnDmr', JSON.stringify(this.savedGame));
    },

    prepareDate: function () {
        let today = new Date();
        let day = today.getDate() + "";
        let month = today.getMonth() + 1 + "";
        let year = today.getFullYear() + "";
        this.date = day + "." + month + "." + year;
    }
};