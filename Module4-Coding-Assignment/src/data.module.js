(function(){
 'use strict';
 
 angular.module('data',[])
  .constant('MenuDataConfig',{
    menuCategoriesUrl:' https://davids-restaurant.herokuapp.com/categories.json',
    menuItemsUrl:'https://davids-restaurant.herokuapp.com/menu_items.json'
});

})();