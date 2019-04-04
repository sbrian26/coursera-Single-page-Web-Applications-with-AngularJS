(function(){
    'use strict';
   
    angular.module('MenuApp')
    .controller('MenuCategoriesController',MenuCategoriesController);

    MenuCategoriesController.$inject = ['categoriesList'];
    function MenuCategoriesController(categoriesList){
        var me = this;
        me.categories = categoriesList;    
    }
    
   })();