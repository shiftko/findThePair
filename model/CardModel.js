var CardModel = function () {
    this.gameTime;
    this.userOrder;
    this.userName;
    this.startEvent = new Event(this);
};

CardModel.prototype = {

    start: function () {
        if (localStorage.getItem('findThePair') == undefined) {
            this.newUser();
            this.startEvent.notify();
        } else {

        };
    },

    newUser: function () {
        this.gameTime = 0;
        this.userOrder = 1;
        this.userName = 'User' + ' ' + this.userOrder;
    },

    selectCard: function (card) {
        console.log(card);
        console.log('card');
    }
};

/* --------------------  ----------------- */