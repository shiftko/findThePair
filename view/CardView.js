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
        if (this.checkIfSizeSelected()) {
            console.log('size is selected');
        } else {
            console.log('choose the size of the field please');
        }
    },

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

    checkIfSizeSelected: function () {
        var condition = false;
        for (var sizeBtn of this.sizeBtns) {
            if (sizeBtn.checked) {
                condition = true;
            };
        }
        return condition;
    },

};

/* --------------------  ----------------- */