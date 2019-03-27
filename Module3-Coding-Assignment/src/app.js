(function(){
    'use strict';

    angular
    .module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems',MenuItemsDisplayDirective)
    .constant('MenuItemsUrl','https://davids-restaurant.herokuapp.com/menu_items.json');

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var controller = this;
 
        controller.searchTerm = "";
        controller.search = function () {
           // pass the search terms to the menu search service
           var MenuItemsSearch = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
           // async
           MenuItemsSearch.then(function (searchResults) {
                console.log('controller found items',searchResults);
                controller.found = searchResults;
            });           
        };

        controller.onRemove = function(ix){
            console.log('controller removing item at index:',ix);
            console.log('Item is:',controller.found);        
            console.log('Item is:',controller.found[ix].name);            
            console.log('removed item:',controller.found.splice(ix,1));
        };

        
    };

    function MenuItemsDisplayDirective() {
        var ddo = {
            templateUrl: 'founditems.html',                       
            scope:{
               found: '<',
               myRemove: '&'               
            }
            // controller: MenuItemsDisplayDirectiveController,
            // controllerAs: 'menu',
            // bindToController: true   
          };        
          return ddo;
    };
    // function MenuItemsDisplayDirectiveController() {
       
    // };

    MenuSearchService.$inject = ['MenuItemsUrl','$http'];
    function MenuSearchService(MenuItemsUrl,$http) {
                       
            this.getMatchedMenuItems = function (searchTerm) {
                //$http returns a promise
                return $http({
                    method: 'GET',
                    url: MenuItemsUrl
                })
                .then(function (response) {
                    // process result and only keep items that match
                    console.log('MenuSearchService.GetMenuItems HTTP Response:',  response);
                    // return menu items 
                    if (!searchTerm || searchTerm == ""|searchTerm == "*") {
                        return response.data.menu_items;
                    }                    
                    // response.data.filter( function());
                    console.log('SearchTerm:',searchTerm)
                    var i = 0;
                    return response.data.menu_items.filter(function(value,i){
                        // value.name = "("+(i++)+")"+value.name;
                        return value.description.toLowerCase().includes(searchTerm);
                        });
                    


                 })
                .catch(function (error) {
                      console.log(error);  
                });
                
                
            };

            
        
    };
}());