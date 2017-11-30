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
        this.puzzleBody = document.getElementById('puzzleBody');
        this.timer = document.getElementById('timer');
        this.sizeBtns = document.querySelectorAll('.selectSize input[name=size]');
        this.cards = document.getElementsByClassName('card');

        return this;
    },

    setupHandlers: function () {
        this.startBtnHandler = this.startBtnMeth.bind(this);
        this.sizeBtnsHandler = this.sizeBtnsMeth.bind(this);

        /* Event Dispatcher */

        return this;
    },

    linkEvents: function () {
        this.startBtn.addEventListener('click', this.startBtnHandler);
        for (var sizeBtn of this.sizeBtns) {
            sizeBtn.addEventListener('click', this.sizeBtnsHandler);
        }

        /* Event Dispatcher */

        return this;
    },

    startBtnMeth: function () {
        console.log('you pressed startBtn'); // delete later
        this.startBtnEvent.notify({});
    },

    sizeBtnsMeth: function () {
        console.log('the size you have selected is ' + event.target.getAttribute('size')); // delete later
        this.selectSizeEvent.notify({
            size: event.target.getAttribute('size')
        });
    }

};

/* --------------------  ----------------- */