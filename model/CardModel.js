var CardModel = function () {
    this.cards = [];
    this.selectedCards = [];
    this.addCardEvent = new Event(this);
    this.selectCardEvent = new Event(this);
    this.deselectCardEvent = new Event(this);
    this.deleteCardEvent = new Event(this);
};

CardModel.prototype = {

    addCard: function (card) {
        this.cards.push(card);
        this.addCardEvent.notify();
    },

    getCards: function () {
        return this.cards;
    },

    selectCard: function () {

    },

    deselectCard: function () {

    },

    deleteCard: function () {

    }
}

/* --------------------  ----------------- */