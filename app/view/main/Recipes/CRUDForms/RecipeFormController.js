Ext.define('FrontEnd.controller.RecipeFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.recipeformcontroller',

    onUpdateClick: function () {
        debugger;
        var form = this.getView();
        var formWindow = form.up();
        var record = form.getValues();
        var selectedImagePath = form.query('image')[0].getSrc();
        record.imagePath = getLastArrayItem(selectedImagePath.split('/'));

        if (form.isValid()) {
            form.submit({
                params: { ImagePath: record.imagePath },
                success: function (form, action) {
                    debugger
                    var result = action.msg;
                    if (action.success === true) {
                        var alertDialog = Ext.toast({
                            message: 'Saved',
                            alignment: 'c-c',
                            timeout: '2000',
                            title: 'success',
                            autoClose: true,
                            closeAction: 'destroy',
                            style: {
                                backgroundColor: 'rgba(75, 192, 192, 0.5)' // Set your desired RGBA color (with 0.5 alpha for transparency)
                            },
                            bodyStyle: 'background:#ffc; padding:10px;'
                        });

                        alertDialog.setHeight(60)
                        alertDialog.setWidth(60)

                        Ext.getCmp('gridingredientid').getStore().reload();
                        formWindow.close();
                    } else {
                        Ext.Msg.alert('Error', result.msg)
                    }
                },
                failure: function (form, action) {
                    var result = action.msg
                    Ext.Msg.alert('Error', result);
                }
            });
        } else {
            Ext.Msg.alert('Invalid Data', 'Please correct form errors.')
        }
    },

    onCancelClick: function () {
        this.getView().up('window').close();
    },

    // onUpdateClick: function() {
    //     var form = this.getView();
    //     var formWindow = form.up();
    //     var record = form.getValues();
    //     var selectedImagePath = form.query('image')[0].getSrc();
    //     record.imagePath = getLastArrayItem(selectedImagePath.split('/'));      

    //     if (form.isValid()) {
    //         Ext.Ajax.request({
    //             url: 'https://localhost:7270/api/ingredient/' + record.ingredientId,
    //             method: 'PUT',
    //             jsonData: record,
    //             success: function(response) {
    //                 var result = Ext.decode(response.responseText);
    //                 if(result.success === true){
    //                     var alertDialog = Ext.toast({
    //                         message: 'Edited',
    //                         alignment: 'c-c',
    //                         timeout: '2000',
    //                         title: 'success',
    //                         autoClose: true,
    //                         closeAction: 'destroy',
    //                         style: {
    //                             backgroundColor: 'rgba(75, 192, 192, 0.5)' // Set your desired RGBA color (with 0.5 alpha for transparency)
    //                         },
    //                         bodyStyle: 'background:#ffc; padding:10px;'
    //                     });

    //                     alertDialog.setHeight(60)
    //                     alertDialog.setWidth(60)

    //                     Ext.getCmp('gridingredientid').getStore().reload();
    //                     formWindow.close();
    //                 } else {
    //                     Ext.Msg.alert('Error', result.msg)
    //                 }

    //             },
    //             failure: function(response) {
    //                 var result = Ext.decode(response.responseText);
    //                 Ext.Msg.alert('Error', result.title);
    //             }
    //         });
    //     } else {
    //         Ext.Msg.alert('Invalid Data', 'Please correct form errors.');
    //     }
    // },

    onImageTap: function (imageComponent) {
        debugger;
        // var record = this.getView().getValues();
        // var formType = this.getView().getInitialConfig().xtype;
        var imageReference = imageComponent.reference;
        setImage(imageReference)


        // switch (formType) {
        //     case 'createingredientform':
        //         setImage(imageReference)
        //         break;
        //     case 'editrecipeform':
        //         setImage()
        //         break;  
        //     default:
        //         // Code to handle other xtypes
        //         break;
        // }


    },

    onBack: function () {
        var card = this.getView().getLayout();

        card.previous();
    },

    onNext: function () {
        var card = this.getView().getLayout();

        card.next();
    },

    init: function (view) {
        // var viewModel = view.getViewModel(),
        //     activeItem = view.getActiveItem(),
        //     layout = view.getLayout(),
        //     indicator = layout.getIndicator(),
        //     bbar = view.lookup('buttonToolbar');

        // viewModel.set('step', activeItem.title);

        // bbar.insert(1, indicator);
    },

    // onExpandClick: function () {
    //     debugger
    //     var form = this.getView();
    //     var rightContainer = form.items.getAt(1); // Access the second item (right container)
    //     var isExpanded = rightContainer.getWidth() > 0; // Check if currently expanded

    //     // Create an animation
    //     var animation = Ext.create('Ext.util.Animate', {
    //         target: rightContainer,
    //         duration: 500,
    //         easing: 'easeInOut',
    //         from: {
    //             width: isExpanded ? 300 : 0
    //         },
    //         to: {
    //             width: isExpanded ? 0 : 300
    //         },
    //         callback: function () {
    //             // Reset the width after the animation completes
    //             rightContainer.setWidth(isExpanded ? 0 : 300);
    //         }
    //     });

    //     // Run the animation
    //     animation.run();
    // },

    onCreateRecipe: function () {
        var form = this
        Ext.Msg.confirm('Create recipe', 
            'Would you like to save your changes?', 
            (buttonId) => {if(buttonId === 'yes'){submitRecipe(form)}else{return}} )

        

    },

    onEditRecipe: function () {
        var form = this
        Ext.Msg.confirm('Edit recipe', 
            'Would you like to save your changes?', 
            (buttonId) => {if(buttonId === 'yes'){submitUpdateRecipe(form)}else{return}} )
        
    },

    onImageUpdateClick: function () {

    }

});

var getLastArrayItem = function (array) {
    return array[array.length - 1]
}

var setImage = function (imageReference) {

    var fileField = Ext.create('Ext.field.File', {
        buttonText: 'Select Image',
        listeners: {
            change: function (field, value) {
                // Handle file selection logic here
                var imageData
                var file = field.getFiles()[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    imageData = e.target.result;
                    // Update the image source with the new data
                    // Assuming your image component has an itemId of 'image'
                    // Ext.getCmp('editrecipeform').query('[reference=instruction0.picture]')[0]
                    Ext.getCmp('editrecipeform').query('[reference=' + imageReference + ']')[0].setSrc(imageData);
                    // Ext.getCmp(imageReference).setSrc(imageData);
                    Ext.getCmp('fileFieldWin').close()
                };
                reader.readAsDataURL(file);

            }
        }
    });
    var win = Ext.create('Ext.window.Window', {
        title: 'Edit Image',
        id: 'fileFieldWin',
        layout: 'fit',
        items: [fileField],
        bbar: [{
            xtype: 'button',
            text: 'Cancel',
            handler: function () {
                Ext.getCmp('fileFieldWin').close()
            }
        }]
    });

    win.show();


}

var getImagesAsync = function () {
    Ext.Ajax.request({
        url: Ext.getApplication() ?? '' .apiUrl ?? '' + 'ingredient/container/recipeas/',
        // url: 'https://localhost:7270/api/ingredient/container/recipeas/',
        method: 'GET',
        success: function (response) {
            try {
                debugger
                const data = Ext.decode(response.responseText);
                const matchingIngredientUrls = data.map(imageSrc => ({ imageSrc, value: imageSrc }));
                console.log(matchingIngredientUrls);

                if (this.picker) {
                    this.picker.destroy();
                    this.picker = null;
                }

                if (!this.picker) {
                    this.picker = Ext.Viewport.add({
                        xtype: 'picker',
                        slots: [{
                            name: "ingredientImage",
                            title: 'Ingredients',
                            itemTpl: '<img src="{imageSrc}" width="40" height="40">',
                            itemConfig: {
                                ui: 'round', // Optional UI config
                                getItemTpl: function (record, index) {
                                    // Use a function to dynamically adjust the itemTpl based on the record properties
                                    var selectedCls = record.get('selected') ? 'selected-slot' : '';
                                    var width = record.get('selected') ? 60 : 40; // Adjust width as needed
                                    var height = record.get('selected') ? 60 : 40; // Adjust height as needed

                                    return {
                                        selectedCls: selectedCls,
                                        width: width,
                                        height: height,
                                        imageSrc: record.get('imageSrc')
                                    };
                                }
                            },
                            data: matchingIngredientUrls,
                            itemCls: 'selected-slot' // Add a CSS class for the selected slot
                        }],
                        listeners: {
                            show: function () {
                                // Set a high zIndex to ensure the picker is on top (Needed mobile devices)
                                this.setZIndex(9999);
                            },
                            pick: function (picker, values, slot, eOpts) {
                                // Change Image on Edit Form.
                                Ext.getCmp('createingredientform').lookupReference('ingredientImage').setSrc(values['ingredientImage'])

                            }
                        }
                    });
                }

                // Set a high zIndex to ensure the picker is on top
                this.picker.show();
            } catch (e) {
                console.error('Error decoding JSON:', e);
            }
        },
        failure: function (response, options) {
            console.error('Error fetching blob names:', response.statusText);
        }
    });
}

var CustomSubmitter = {
    APIUrl: '',

}

function submitRecipe (thisForm) {
    var form = thisForm.getView();
    var formWindow = form.up();
    var imageComponents = form.query('[xtype=image]')

    // var recipeId = Ext.getCmp('gridrecipesid').getSelection().data.recipeId
    var APIUrl = 'https://malkhabirapi.azurewebsites.net/api/recipe/create/'
    // var APIUrl = 'https://localhost:7270/api/recipe/create/'
    var changes = []

    for (let fieldName in form.getFields()) {
        field = form.getFields()[fieldName]
        if (field.xtype === 'textfield' ||
            field.xtype === 'textareafield' ||
            field.xtype === 'combobox' ||
            field.xtype === 'spinnerfield') {
            // console.log(field.xtype)
            // console.log(field.reference)
            changes.push(
                {
                    type: 'text',
                    referenceName: field.getName(),
                    value: field.getValue()
                }
            )

        }
    }

    imageComponents.forEach(comp => {
        changes.push({ type: 'image', referenceName: comp.reference, value: comp.getSrc() })
    })
    debugger

    // Initialize a recipe object
    const recipe = {
        RecipeId: '', // assuming this is generated later
        RecipeName: '',
        MealDescription: '',
        PreparationTime: 0,
        MealType: '',
        Calories: 0.0,
        Picture: '',
        Ingredients: [],
        Instructions: []
    };

    // Iterate over changes array
    for (const change of changes) {
        if (change.type === 'text') {
            switch (change.referenceName) {
                case 'recipeId':
                    recipe.RecipeId = change.value;
                    break;
                case 'recipeName':
                    recipe.RecipeName = change.value;
                    break;
                case 'mealDescription':
                    recipe.MealDescription = change.value;
                    break;
                case 'mealType':
                    recipe.MealType = change.value;
                    break;
                // Assuming 'numberOfsteps' refers to the total number of steps/instructions
                case 'numberOfsteps':
                    // Initialize Instructions array with the given number of steps
                    const numberOfSteps = parseInt(change.value);
                    recipe.Instructions = new Array(numberOfSteps).fill().map((_, index) => ({
                        InstructionId: '',
                        InstructionIndex: index, // Starting from 0
                        InstructionValue: '',
                        InstructionImage: ''
                    }));                        break;
                default:
                    // Check if the change reference is an instruction step
                    if (change.referenceName.startsWith('instruction')) {
                        const instructionIndex = parseInt(change.referenceName.match(/\d+/)[0]);
                        const instructionField = change.referenceName.split('.')[1]; // Get the last part after the last '.'
                        if (instructionField === 'text') {
                            // Assign instruction text to the corresponding step
                            recipe.Instructions[instructionIndex].InstructionValue = change.value;
                        } else if (instructionField === 'instructionId') {
                            recipe.Instructions[instructionIndex].InstructionId = change.value;
                            recipe.Instructions[instructionIndex].InstructionIndex = instructionIndex;

                        } else if (instructionField === 'instruction') {
                        
                        } else if (instructionField === 'recipePicture') {
                        
                        }
                    } 
                    break;
            }
        } else if (change.type === 'image') {
            // Assuming 'recipeImage' is the recipe picture and 'instructionX.instructionPicture.instruction' is the picture for instruction X
            if (change.referenceName === 'recipeImage') {
                recipe.Picture = change.value;
            } else if (change.referenceName.startsWith('instruction')) {
                const instructionIndex = parseInt(change.referenceName.match(/\d+/)[0]);
                const instructionField = change.referenceName.split('.')[1]; // Get the last part after the last '.'
                if (instructionField === 'instructionPicture') {
                    // Assign instruction picture to the corresponding step
                    recipe.Instructions[instructionIndex].InstructionImage = change.value;
                }
            }
        }
    }

    // Output the constructed recipe object
    console.log(recipe);


    if (form.isValid()) {

        Ext.Ajax.request({
            url: APIUrl,
            method: 'POST',
            params: {
                payload: JSON.stringify(recipe)
            },
            success: function (response) {
                var alertDialog = Ext.toast({
                    message: 'Saved',
                    alignment: 'c-c',
                    timeout: '2000',
                    title: 'success',
                    autoClose: true,
                    closeAction: 'destroy',
                    style: {
                        backgroundColor: 'rgba(75, 192, 192, 0.5)' // Set your desired RGBA color (with 0.5 alpha for transparency)
                    },
                    bodyStyle: 'background:#ffc; padding:10px;'
                });

                alertDialog.setHeight(60)
                alertDialog.setWidth(60)

                Ext.getCmp('gridrecipesid').getStore().reload();
                formWindow.close();
            },
            failure: function (response) {
                debugger

            }
        });

        
    } else {
        
    }
}

function submitUpdateRecipe(thisForm) {
    debugger
        var form = thisForm.getView();
        var formWindow = form.up();
        var APIUrl
        var recipeId = Ext.getCmp('gridrecipesid').getSelection().data.recipeId
        var invalidFields = [];

        if (form.xtype !== 'createrecipeform') {
            APIUrl = 'https://malkhabirapi.azurewebsites.net/api/recipe/update/' + recipeId
            // APIUrl = 'https://localhost:7270/api/recipe/update/' + recipeId
        } else {
            APIUrl = 'https://malkhabirapi.azurewebsites.net/api/recipe/create/'
            // APIUrl = 'https://localhost:7270/api/recipe/create/'
        }

        var changes = []

        for (let fieldName in form.getFields()) {
            field = form.getFields()[fieldName]
            if (field.xtype === 'textfield' ||
                field.xtype === 'textareafield' ||
                field.xtype === 'combobox' ||
                field.xtype === 'spinnerfield') {

                changes.push(
                    {
                        type: 'text',
                        referenceName: field.getName(),
                        value: field.getValue()
                    }
                )

            }
        }



        var imageComponents = form.query('[xtype=image]')
        imageComponents.forEach(comp => {
            changes.push({ type: 'image', referenceName: comp.reference, value: comp.getSrc() })
        })
        debugger

        // Initialize a recipe object
        const recipe = {
            RecipeId: '', // assuming this is generated later
            RecipeName: '',
            MealDescription: '',
            PreparationTime: 0,
            MealType: '',
            Calories: 0.0,
            Picture: '',
            Ingredients: [],
            Instructions: []
        };

        // Iterate over changes array
        for (const change of changes) {
            if (change.type === 'text') {
                switch (change.referenceName) {
                    case 'recipeId':
                        recipe.RecipeId = change.value;
                        break;
                    case 'recipeName':
                        recipe.RecipeName = change.value;
                        break;
                    case 'mealDescription':
                        recipe.MealDescription = change.value;
                        break;
                    case 'mealType':
                        recipe.MealType = change.value;
                        break;
                    // Assuming 'numberOfsteps' refers to the total number of steps/instructions
                    case 'numberOfsteps':
                        // Initialize Instructions array with the given number of steps
                        const numberOfSteps = parseInt(change.value);
                        recipe.Instructions = Array.from({ length: numberOfSteps }, (_, index) => ({
                            InstructionId: null,
                            InstructionValue: "",
                            InstructionImage: "",
                            InstructionIndex: index
                        }));                        break;
                    default:
                        // Check if the change reference is an instruction step
                        if (change.referenceName.startsWith('instruction')) {
                            const instructionIndex = parseInt(change.referenceName.match(/\d+/)[0]);
                            const instructionField = change.referenceName.split('.')[1]; // Get the last part after the last '.'
                            if (instructionField === 'text') {
                                // Assign instruction text to the corresponding step
                                recipe.Instructions[instructionIndex].InstructionValue = change.value;
                            } else if (instructionField === 'instructionId') {
                                recipe.Instructions[instructionIndex].InstructionId = change.value;
                                recipe.Instructions[instructionIndex].InstructionIndex = instructionIndex;

                            } else if (instructionField === 'instruction') {
                            
                            } else if (instructionField === 'recipePicture') {
                            
                            }
                        } 
                        break;
                }
            } else if (change.type === 'image') {
                // Assuming 'recipeImage' is the recipe picture and 'instructionX.instructionPicture.instruction' is the picture for instruction X
                if (change.referenceName === 'recipeImage') {
                    recipe.Picture = change.value;
                } else if (change.referenceName.startsWith('instruction')) {
                    const instructionIndex = parseInt(change.referenceName.match(/\d+/)[0]);
                    const instructionField = change.referenceName.split('.')[1]; // Get the last part after the last '.'
                    if (instructionField === 'instructionPicture') {
                        // Assign instruction picture to the corresponding step
                        recipe.Instructions[instructionIndex].InstructionImage = change.value;
                    }
                }
            }
        }

        // Output the constructed recipe object
        console.log(recipe);


        if (form.isValid()) {

            Ext.Ajax.request({
                url: APIUrl,
                method: 'POST',
                params: {
                    payload: JSON.stringify(recipe)
                },
                success: function (response) {
                    var alertDialog = Ext.toast({
                        message: 'Saved',
                        alignment: 'c-c',
                        timeout: '2000',
                        title: 'success',
                        autoClose: true,
                        closeAction: 'destroy',
                        style: {
                            backgroundColor: 'rgba(75, 192, 192, 0.5)' // Set your desired RGBA color (with 0.5 alpha for transparency)
                        },
                        bodyStyle: 'background:#ffc; padding:10px;'
                    });

                    alertDialog.setHeight(60)
                    alertDialog.setWidth(60)

                    Ext.getCmp('gridrecipesid').getStore().reload();
                    formWindow.close();
                },
                failure: function (response) {
                    debugger
                    Ext.Msg.alert('Failure', response)

                }
            });
        } else {
            Object.keys(form.getFields()).forEach(function (fieldName) {
                var field = form.getFields()[fieldName]
                if (!field.isValid()) {
                    invalidFields.push(field.getName());
                }
            });


            console.log('Invalid fields:', invalidFields);
            Ext.Msg.alert('Invalid Data', 'Please correct review the following fields: ' + invalidFields)
        }
}

