(function() {
     var model = new CardModel(),
         view = new CardView(model),
         controller = new CardController(model, view);
 })();