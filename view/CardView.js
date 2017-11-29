var CardView = function (model) {
    this.model = model;
    this.startBtnEvent = new Event(this);
    this.resetBtnEvent = new Event(this);
    this.pauseBtnEvent = new Event(this);
    this.continueBtnEvent = new Event(this);
    this.selectSizeEvent = new Event(this);
    this.selectCardEvent = new Event(this);

    this.init();
};

CardView.prototype = {

    init: function () {
        this.getControl()
            .setupHandlers()
            .linkEvents();
    },

    getControl: function () {
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.sizeBtns = document.querySelectorAll('.selectSize input[name=size]');
        this.cards = document.getElementsByClassName('card');

        return this;
    },

    setupHandlers: function () {
        return this;
    },

    linkEvents: function () {
        return this;
    }

};

/* --------------------  ----------------- */