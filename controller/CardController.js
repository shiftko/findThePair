var CardController = function (model, view) {
    this.model = model;
    this.view = view;

    this.init();
};

CardController.prototype = {

    init: function () {
        this.setupHandlers()
            .enable();
    },

    setupHandlers: function () {
        this.startBtnHandler = this.start.bind(this);

        return this;
    },

    enable: function () {

        this.view.startBtnEvent.attach(this.startBtnHandler);

        return this;
    },

    start: function () {
        this.model.start();
    }

    /* --------------------  ----------------- */


};