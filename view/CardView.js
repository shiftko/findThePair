var CardView = function (model) {
    this.model = model;
    this.startBtnEvent = new Event(this);
    this.selectCardEvent = new Event(this);
    this.resetBtnEvent = new Event(this);
    this.winEvent = new Event(this);
    //    this.scoreBtnEvent = new Event(this);
    //    this.pauseBtnEvent = new Event(this);
    //    this.continueBtnEvent = new Event(this);
    //    this.selectSizeEvent = new Event(this);

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
        this.resultBtns = document.getElementById('resultBtns');
        this.themeBtns = document.getElementById('themeBtns');
        this.timerValue = document.querySelector('#timer h1');
        this.puzzleBody = document.getElementById('puzzleBody');
        this.sizeBtns = document.querySelectorAll('.selectSize input[name=size]');
        this.cards = document.getElementsByClassName('card');

        this.gameTimeControl;

        return this;
    },

    setupHandlers: function () {
        this.startBtnHandler = this.startBtnMeth.bind(this);
        this.sizeBtnsHandler = this.sizeBtnsMeth.bind(this);
        this.pauseBtnHandler = this.pauseBtnMeth.bind(this);
        this.setCardEventHandler = this.setCard.bind(this);
        this.scoreBtnHandler = this.scoreBtnMeth.bind(this);
        this.themeSelectHandler = this.themeSelectMeth.bind(this);

        /* Handlers from Event Dispatcher */

        this.startHandler = this.startTimer.bind(this);
        this.cardsToFlipHandler = this.cardsToFlip.bind(this);
        this.cardsToRemoveHandler = this.cardsToRemove.bind(this);
        this.showScoreHandler = this.showScore.bind(this);

        return this;
    },

    linkEvents: function () {
        this.startBtn.addEventListener('click', this.startBtnHandler);
        for (var sizeBtn of this.sizeBtns) {
            sizeBtn.addEventListener('click', this.sizeBtnsHandler);
        };
        this.pauseBtn.addEventListener('click', this.pauseBtnHandler);
        this.scoreBtn.addEventListener('click', this.scoreBtnHandler);
        this.themeSelect.addEventListener('click', this.themeSelectHandler);

        /* Event Dispatcher */

        this.model.startEvent.attach(this.startHandler);
        this.model.cardsToFlipEvent.attach(this.cardsToFlipHandler);
        this.model.cardsToRemoveEvent.attach(this.cardsToRemoveHandler);
        this.model.showScoreEvent.attach(this.showScoreHandler);

        return this;
    },

    /* -------------------- startBtnAction ----------------- */

    startBtnMeth: function () {
        if (this.checkIfSizeSelected()) {
            this.tuneBtns();
            if (this.startBtn.getAttribute('status') == 'Start') {
                this.statusSwitcher(this.startBtn, 'Reset');
                this.startBtnEvent.notify();
                this.flipAllCards();
                this.cards = document.getElementsByClassName('card');
                this.setCardEvent();
            } else if (this.startBtn.getAttribute('status') == 'Reset') {
                this.statusSwitcher(this.startBtn, 'Start');
                this.statusSwitcher(this.pauseBtn, 'Pause');
                this.timerReset();
                this.resetCards();
                this.resetBtnEvent.notify();
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
        this.gameTimeControl = setInterval(this.runTimer.bind(this), 1000);
    },

    runTimer: function () {
        this.model.gameTime++;
        var minutes = Math.trunc(this.model.gameTime / 60);
        var seconds = this.model.gameTime % 60;
        var time = minutes + ' ' + ':' + ' ' + seconds;
        var newTime = document.createTextNode(time);
        this.timerValue.removeChild(this.timerValue.childNodes[0]);
        this.timerValue.appendChild(newTime);
    },

    timerReset: function () {
        clearInterval(this.gameTimeControl);
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
                transform: "scaleX(1)",
                background: "#dd99ff"
            },
            {
                transform: "scaleX(0)",
                background: "#111"
            },
            {
                transform: "scaleX(1)",
                background: "#dd99ff"
            }
        ], 600);
        setTimeout(this.removeImage(card), 300);
    },

    cardsToRemoveAnimation: function (card) {
        card.animate([
            {
                opacity: "1"
            },
            {
                opacity: "0"
            }
        ], 600);
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

    /* -------------------- setCardEvent ----------------- */

    setCardEvent: function () {
        for (var card of this.cards) {
            card.addEventListener('click', this.setCardEventHandler);
        };
    },

    setCard: function () {
        this.selectCardEvent.notify(event.currentTarget);
        this.markCard(event.currentTarget);
        this.flipCard(event.currentTarget);
        this.pointerEventSwitch(event.currentTarget, 'none');
    },

    markCard: function (card) {
        if (card.status == 'none') {
            card.status = 'selected';
        } else if (card.status == 'selected') {
            card.status = 'none';
        };
    },

    /* -------------------- cardsToFlip ----------------- */

    cardsToFlip: function () {
        setTimeout(this.flipBackCards.bind(this), 1000);
    },

    flipBackCards: function () {
        this.flipCard(this.model.cardsToFlip[0][0]);
        this.pointerEventSwitch(this.model.cardsToFlip[0][0], 'none');
        this.model.cardsToFlip[0][0].status = 'none';
        this.flipCard(this.model.cardsToFlip[0][1]);
        this.pointerEventSwitch(this.model.cardsToFlip[0][1], 'none');
        this.model.cardsToFlip[0][1].status = 'none';
        this.model.cardsToFlip.splice(0, 1);
    },

    /* -------------------- cardsToRemove ----------------- */

    cardsToRemove: function () {
        setTimeout(this.removeCards.bind(this), 1200);
        setTimeout(this.cardsToRemoveAnimate.bind(this), 600);
    },

    cardsToRemoveAnimate: function () {
        this.cardsToRemoveAnimation(this.model.cardsToRemove[0][0]);
        this.cardsToRemoveAnimation(this.model.cardsToRemove[0][1]);
    },

    removeCards: function () {
        this.model.cardsToRemove[0][0].remove();
        this.model.cardsToRemove[0][1].remove();
        this.model.cardsToRemove.splice(0, 1);
        this.checkWinConditions();
    },

    /* -------------------- checkWinConditions ----------------- */

    checkWinConditions: function () {
        this.cards = document.getElementsByClassName('card');
        if (this.cards.length == 0) {
            clearInterval(this.gameTimeControl);
            for (var sizeBtn of this.sizeBtns) {
                if (sizeBtn.checked) {
                    this.winEvent.notify(sizeBtn.getAttribute('size'));
                }
            }
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
                card.status = 'none';
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
        image.setAttribute('src', `images/images/${imgList[imageNo]}`);
        image.setAttribute('alt', 'img');
        image.style.height = "100%";
        image.style.width = "100%";
        block.appendChild(image);
    },

    clearBody: function () {
        var iterations = this.puzzleBody.childNodes.length;
        for (var i = 0; i < iterations; i++) {
            this.puzzleBody.childNodes[0].remove();
        };
    },

    /* -------------------- pauseBtnMeth ----------------- */

    pauseBtnMeth: function () {
        if (this.pauseBtn.getAttribute('status') == 'Pause') {
            this.statusSwitcher(this.pauseBtn, 'Continue');
            clearInterval(this.gameTimeControl);
            for (var card of this.cards) {
                if (card.status != 'selected') {
                    this.pointerEventSwitch(card, 'none');
                };
            };
        } else if (this.pauseBtn.getAttribute('status') == 'Continue') {
            this.statusSwitcher(this.pauseBtn, 'Pause');
            this.startTimer();
            for (var card of this.cards) {
                if (card.status != 'selected') {
                    this.pointerEventSwitch(card, 'none');
                };
            };
        };
    },

    /* -------------------- win ----------------- */

    showScore: function () {
        this.pointerEventSwitch(this.startBtn, 'none');
        this.pointerEventSwitch(this.pauseBtn, 'none');
        this.pointerEventSwitch(this.scoreBtn, 'none');
        this.statusSwitcher(this.startBtn, 'Start');
        this.statusSwitcher(this.scoreBtn, 'Back');
        this.resetBtnEvent.notify();
        this.timerReset();
        //        this.scoreBtn.click();
        this.showResultBtnsSwitch();
        this.setResultBtnsEvent();
        this.showLastResult();
    },

    /* -------------------- scoreBtnMeth ----------------- */

    scoreBtnMeth: function () {
        this.tuneBtns2();
        if (this.puzzleBody.childNodes.length != 0) {
            this.clearBody();
        };
        if (this.scoreBtn.getAttribute('status') == 'Score') {
            this.statusSwitcher(this.scoreBtn, 'Back');
            this.showResultBtnsSwitch();
            this.setResultBtnsEvent();
        } else if (this.scoreBtn.getAttribute('status') == 'Back') {
            this.statusSwitcher(this.scoreBtn, 'Score');
            this.showResultBtnsSwitch();
            this.resetCards();
        };
    },

    tuneBtns2: function () {
        for (var sizeBtn of this.sizeBtns) {
            if (sizeBtn.disabled) {
                sizeBtn.disabled = false;
            } else {
                sizeBtn.disabled = true;
            };
        };
        this.pointerEventSwitch(this.themeSelect, 'none');
        this.pointerEventSwitch(this.startBtn, 'none');
    },

    drawTable: function (size) {
        if (this.scoreTable == undefined) {
            this.createTable();
            this.fillinTheTable(size);
        } else {
            this.scoreTable.remove();
            this.createTable();
            this.fillinTheTable(size);
        }
    },

    createTable: function () {
        let tab = document.createElement('table');
        this.puzzleBody.appendChild(tab);

        tab.id = "scoreTable";
        tab.style.marginTop = "60px";

        this.scoreTable = document.getElementById('scoreTable');

        let headers = ['date', 'user', 'time', 'attempts', 'score'];
        this.scoreConstructor('th', headers);
    },

    scoreConstructor: function (blocksType, fillers) {
        let mainBlock = document.createElement('tr');
        mainBlock.className = 'scoreTableBlock';

        for (var filler of fillers) {
            let subblock = document.createElement(blocksType);
            let subblockFiller = document.createTextNode(filler);
            subblock.appendChild(subblockFiller);
            mainBlock.appendChild(subblock);
        };

        this.scoreTable.appendChild(mainBlock);
    },

    fillinTheTable: function (size) {
        var resultsToDraw = [];
        for (var user of this.model.savedGame) {
            if (user.mapSize == size) {
                resultsToDraw.push(user);
            };
        };
        for (var user of resultsToDraw) {
            let userResults = [
                user.date,
                user.userName,
                user.gameTime,
                user.numberOfAttempts,
                user.score
            ];
            this.scoreConstructor('td', userResults);
        };
    },

    /* -----------------------showResultBtnsSwitch----------------------- */

    showResultBtnsSwitch: function () {
        if (this.resultBtns.style.display == "") {
            this.resultBtns.style.display = "block";
        } else if (this.resultBtns.style.display == "block") {
            this.resultBtns.style.display = "";
        };
    },

    setResultBtnsEvent: function () {
        var btns = document.querySelectorAll("div#resultBtns a");
        for (var btn of btns) {
            btn.addEventListener('click', this.startDrawTable.bind(this));
        };
    },

    startDrawTable: function () {
        var size = event.target.getAttribute('size');
        this.drawTable(size);
    },

    showLastResult: function () {
        var lastResult = this.model.savedGame[this.model.savedGame.length - 1];
        var btns = document.querySelectorAll("div#resultBtns a");
        for (var btn of btns) {
            if (btn.getAttribute('size') == lastResult.mapSize) {
                btn.click();
            };
        };
    },

    /* ----------------------- theme ----------------------- */

    themeSelectMeth: function () {
        this.tuneBtns3();
        if (this.puzzleBody.childNodes.length != 0) {
            this.clearBody();
        };
        if (this.themeSelect.getAttribute('status') == 'Theme') {
            this.statusSwitcher(this.themeSelect, 'Back');
            this.showThemeBtns();
            this.setThemeBtnsEvent();
        } else if (this.themeSelect.getAttribute('status') == 'Back') {
            this.statusSwitcher(this.themeSelect, 'Theme');
            this.showThemeBtns();
            this.resetCards();
        };
    },

    tuneBtns3: function () {
        for (var sizeBtn of this.sizeBtns) {
            if (sizeBtn.disabled) {
                sizeBtn.disabled = false;
            } else {
                sizeBtn.disabled = true;
            };
        };
        this.pointerEventSwitch(this.scoreBtn, 'none');
        this.pointerEventSwitch(this.startBtn, 'none');
    },

    showThemeBtns: function () {
        if (this.themeBtns.style.display == "") {
            this.themeBtns.style.display = "block";
        } else if (this.themeBtns.style.display == "block") {
            this.themeBtns.style.display = "";
        };
    },

    setThemeBtnsEvent: function () {
        var btns = document.querySelectorAll("div#themeBtns a");
        for (var btn of btns) {
            btn.addEventListener('click', this.selectTheme.bind(this));
        };
    },

    selectTheme: function () {
        var selectedTheme = event.target.getAttribute('theme');
        for (var theme of themeList) {
            if (theme.themeName == selectedTheme) {
                this.applyTheme(theme);
            };
        };
    },

    applyTheme: function (theme) {
        console.log('selected Theme ' + theme.themeName);

        var sizeBtnsTxt = document.querySelectorAll('.selectSize label');
        for (var btnTxt of sizeBtnsTxt) {
            btnTxt.style.color = theme.sizeBtnsTextCol;
        };

        var selectSizeCol = document.getElementsByClassName('selectCol');
        var firstCol = selectSizeCol[0];
        var secondCol = selectSizeCol[1];
        firstCol.style.backgroundColor = theme.sizeBtnsBlock1Col;
        secondCol.style.backgroundColor = theme.sizeBtnsBlock2Col;

        var controlBtnsText = document.querySelectorAll('.controlBtns a');
        for (var btnTxt of controlBtnsText) {
            btnTxt.style.color = theme.controlBtnsTextCol;
            btnTxt.style.backgroundColor = theme.controlBtnsBackgroundCol;
        };

        var controlBtnsBlocks = document.getElementsByClassName('block');
        var block1 = controlBtnsBlocks[0];
        var block2 = controlBtnsBlocks[1];
        block1.style.backgroundColor = theme.controlBtnsBlock1Col;
        block2.style.backgroundColor = theme.controlBtnsBlock2Col;

        var timerTextCol = document.querySelector('#timer h1');
        timerTextCol.style.color = theme.timerTextCol;

        this.timer.style.backgroundColor = theme.timerBlockCol;

        this.puzzleBody.style.backgroundColor = theme.puzzleBodyBlockCol;

    }

};