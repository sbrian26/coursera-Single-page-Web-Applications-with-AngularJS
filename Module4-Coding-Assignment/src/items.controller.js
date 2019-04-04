(function(){
    'use strict';
   
    angular.module('MenuApp')
    .controller('CategoryMenuItemsController',CategoryMenuItemsController);

    CategoryMenuItemsController.$inject = ['CategorySearchResponse'];
    function CategoryMenuItemsController(CategorySearchResponse) {
        var me = this;        
        me.categoryName = CategorySearchResponse.category.name;
        me.menuItems = CategorySearchResponse.menu_items;
    };
    
   })();