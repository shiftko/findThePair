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
        this.themeSelect = document.getElementById('themeSelect');
        this.scoreBtn = document.getElementById('scoreBtn');
        this.timer = document.getElementById('timer');
        this.timerValue = document.querySelector('#timer h1');
        this.puzzleBody = document.getElementById('puzzleBody');
        this.sizeBtns = document.querySelectorAll('.selectSize input[name=size]');
        this.cards = document.getElementsByClassName('card');

        this.timerControl;
        this.gameTime = 0;

        return this;
    },

    setupHandlers: function () {
        this.startBtnHandler = this.startBtnMeth.bind(this);
        this.sizeBtnsHandler = this.sizeBtnsMeth.bind(this);
        this.pauseBtnHandler = this.pauseBtnMeth.bind(this);

        /* Event Dispatcher */

        return this;
    },

    linkEvents: function () {
        this.startBtn.addEventListener('click', this.startBtnHandler);
        for (var sizeBtn of this.sizeBtns) {
            sizeBtn.addEventListener('click', this.sizeBtnsHandler);
        }
        this.pauseBtn.addEventListener('click', this.pauseBtnHandler)

        /* Event Dispatcher */

        return this;
    },

    /* -------------------- startBtnAction ----------------- */

    startBtnMeth: function () {
        if (this.checkIfSizeSelected()) {
            this.tuneBtns();
            if (this.startBtn.getAttribute('status') == 'Start') {
                this.statusSwitcher(this.startBtn, 'Reset');
                this.startTimer();
                this.flipAllCards();
            } else if (this.startBtn.getAttribute('status') == 'Reset') {
                this.statusSwitcher(this.startBtn, 'Start');
                this.timerReset();
                this.resetCards();
            };
        } else {
            alert('Choose the size of the field please');
        };
    },

    checkIfSizeSelected: function () {
        var condition = false;
        for (var sizeBtn of this.sizeBtns) {
            if (sizeBtn.checked) {
                condition = true;
            };
        }
        return condition;
    },

    statusSwitcher: function (target, status) {
        var newStatus = document.createTextNode(status);
        target.removeChild(target.childNodes[0]);
        target.appendChild(newStatus);
        target.setAttribute('status', status);
    },

    tuneBtns: function () {
        for (var sizeBtn of this.sizeBtns) {
            if (sizeBtn.disabled) {
                sizeBtn.disabled = false;
            } else {
                sizeBtn.disabled = true;
            };
        };
        this.pointerEventSwitch(this.themeSelect, 'none');
        this.pointerEventSwitch(this.scoreBtn, 'none');
        this.pointerEventSwitch(this.pauseBtn, 'auto');
    },

    pointerEventSwitch: function (target, status) {
        if (target.style.pointerEvents == '') {
            target.style.pointerEvents = status;
        } else {
            target.style.pointerEvents = '';
        };
    },

    /* -------------------- resetCards ----------------- */

    resetCards: function () {
        for (var sizeBtn of this.sizeBtns) {
            if (sizeBtn.checked) {
                this.drawGrid(sizeBtn.getAttribute('size'));
            }
        };
    },

    /* -------------------- timerWork ----------------- */

    startTimer: function () {
        var sec = this.gameTime;
        var timerValue = this.timerValue;
        this.timerControl = setInterval(function () {
            sec++;
            var minutes = Math.trunc(sec / 60);
            var seconds = sec % 60;
            var time = minutes + ' ' + ':' + ' ' + seconds;
            var newTime = document.createTextNode(time);
            timerValue.removeChild(timerValue.childNodes[0]);
            timerValue.appendChild(newTime);
        }, 1000);
    },

    timerReset: function () {
        clearInterval(this.timerControl);
        var zeroTime = document.createTextNode('0 : 0');
        this.timerValue.removeChild(this.timerValue.childNodes[0]);
        this.timerValue.appendChild(zeroTime);
    },

    /* -------------------- cardsFlips ----------------- */

    flipAllCards: function () {
        for (var card of this.cards) {
            this.flipCard(card);
        };
    },

    flipCard: function (card) {
        card.animate([
            {
                transform: "scaleX(1)"
            },
            {
                transform: "scaleX(0)"
            },
            {
                transform: "scaleX(1)"
            }
        ], 600);
        setTimeout(this.removeImage(card), 300);
    },

    removeImage: function (card) {
        return function () {
            if (card.childNodes[0].style.display == '') {
                card.childNodes[0].style.display = 'none';
            } else {
                card.childNodes[0].style.display = '';
            };
        };
    },

    /* -------------------- sizeBtnsAction ----------------- */

    sizeBtnsMeth: function () {
        this.drawGrid(event.target.getAttribute('size'));
    },

    drawGrid: function (size) {
        if (this.cards.length != 0) {
            this.clearBody();
        };
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var card = document.createElement('div');
                card.className = 'card';
                card.style.left = (j * 480 / size) + 2 + 'px';
                card.style.top = (i * 480 / size) + 2 + 60 + 'px';
                card.style.height = (480 / size) - 4 + 'px';
                card.style.width = (480 / size) - 4 + 'px';

                this.puzzleBody.appendChild(card);
            };
        };
        this.drawImages();
    },

    drawImages: function () {
        var blocksAmount = this.cards.length;
        var imagesAmount = blocksAmount / 2;
        var fakeList = [];
        for (var i = 0; i < blocksAmount; i++) {
            fakeList[i] = i;
        };
        for (var i = 0; i < imagesAmount; i++) {
            for (var j = 0; j < 2; j++) {
                var blockNo = Math.round(Math.random() * (fakeList.length - 1));
                this.setImages(fakeList[blockNo], i);
                fakeList.splice(blockNo, 1);
            };
        };
    },

    setImages: function (blockNo, imageNo) {
        var block = this.cards[blockNo];
        var image = document.createElement('img');
        image.setAttribute('src', `/images/images/${imgList[imageNo]}`);
        image.setAttribute('alt', 'img');
        image.style.height = "100%";
        image.style.width = "100%";
        block.appendChild(image);
    },

    clearBody: function () {
        var iterations = this.cards.length;
        for (var i = 0; i < iterations; i++) {
            this.cards[0].remove();
        };
    },

    /* -------------------- pauseBtnMeth ----------------- */

    pauseBtnMeth: function () {
        if (this.pauseBtn.getAttribute('status') == 'Pause') {
            this.statusSwitcher(this.pauseBtn, 'Continue');
            clearInterval(this.timerControl);
        } else if (this.pauseBtn.getAttribute('status') == 'Continue') {
            this.statusSwitcher(this.pauseBtn, 'Pause');
            this.startTimer();
        };
    },

};