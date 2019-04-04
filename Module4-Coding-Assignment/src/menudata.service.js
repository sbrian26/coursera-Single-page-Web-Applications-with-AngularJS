(function(){
    'use strict';

angular.module('data')
 .service('MenuDataService',MenuDataService);

 MenuDataService.$inject = ['$http','MenuDataConfig']
 function MenuDataService ($http, MenuDataConfig) {
    console.log("Initializing MenuDataService");
    var service = this;

    service.getAllCategories = function()  {
        console.log('Retrieving categories...');
        return $http({
            method:"GET",
            url:MenuDataConfig.menuCategoriesUrl
        });
    };

    service.getItemsForCategory = function(categoryShortName) {
        
        return $http({
            method:"GET",
            url:MenuDataConfig.menuItemsUrl,
            params:{category:categoryShortName}
        });
    };
 };



})();