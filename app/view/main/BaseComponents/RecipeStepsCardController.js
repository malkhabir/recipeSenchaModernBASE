Ext.define('FrontEnd.view.layout.RecipeStepsCardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RecipeStepsCardController',

    init: function() {
        var bbar = this.lookup('bbar'),
            card = this.lookup('panel').getLayout(),

            // Lazily create the Indicator (wired to the card layout)
            indicator = card.getIndicator();

        // Render it into our bottom toolbar (bbar)
        bbar.insert(1, indicator);
    },

    onNext: function() {
        var card = this.lookup('panel').getLayout();

        card.next();
    },

    onPrevious: function() {
        var card = this.lookup('panel').getLayout();

        card.previous();
    }
});
