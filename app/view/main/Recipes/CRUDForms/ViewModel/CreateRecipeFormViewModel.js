Ext.define('FrontEnd.view.main.Recipes.CRUDForms.ViewModel.CreateRecipeFormViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.createrecipeformviewmodel',

    data: {
        maxSteps: 1,
        activeItemIndex: 0,
        step: ''
    },

    formulas: {
        step: {
            bind: '{index}',
            get: function(index) {
                var activeItem = this.getView().getActiveItem();
                var title = activeItem.title || '';
                return title + (index > 1 ? ' ' + index: '');
            }
        },
    },

});

