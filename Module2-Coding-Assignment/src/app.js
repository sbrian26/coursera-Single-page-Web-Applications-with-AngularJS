(function(){
    'use strict';

    angular
        .module('ShoppingListCheckOff',[])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ListService',ShoppingListService);

    ToBuyController.$inject = ['ListService'];
    function ToBuyController(ListService){
        var vm = this;
        
        init();

        function init(){
            ListService.shopforTacoNight();      
        }

        vm.items = ListService.getShoppingList();

        vm.buyItem = function (itemIndex)
        { ListService.buyItem(itemIndex); }

    };

    AlreadyBoughtController.$inject = ['ListService'];
    function AlreadyBoughtController(ListService){
        var vm = this;
        vm.items = ListService.getBoughtList();


    };

    function ShoppingListService() {
        var service = this;            
                   
        var shoppingList = [];
        var boughtList = [];
        
        console.log('shopping list',shoppingList);
        
        service.getShoppingList = function() {
            //return the shoppingList
            return shoppingList;
        };
        
        service.getBoughtList = function() {
            //  return the list of bought items
            return boughtList;
        };

        service.buyItem = function(itemIndex){
            //remove the bought item from the shopping list and push it to the bought items list.
            console.log("Purchasing item",itemIndex);
            
            boughtList.push(shoppingList.splice(itemIndex,1)[0]);
            console.log("Shopping List",shoppingList);
            console.log("Purchased List",boughtList);

        };

        service.shopforTacoNight = makeTacosShoppingList;
        function makeTacosShoppingList (itemQty,minItemCount){
            // populate the initial buy items
            var shoppingItems = ['can(s) refried beans','package 1/8 lb. chicken meat','large avacado','package shredded cheddar cheese','pack taco shell(s)','bottle(s) of hot sauce'];
            
            var itemCount = shoppingItems.length;
            if (minItemCount !== undefined && minItemCount > 0) {
                itemCount = Math.max(minItemcount,itemCount);
            };
            console.log("Initializing Taco List",itemCount);

            if (itemQty === undefined || itemQty <= 0) {itemQty = 1;};
            
            for(var i = 0; i < itemCount ; i++) {
                let itemIndex = i%shoppingItems.length;                
                shoppingList.push( { id: i, name: shoppingItems[itemIndex], quantity: itemQty });
            }
            
        };
    };    
}());