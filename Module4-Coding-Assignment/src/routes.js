(function(){
 'use strict';

 angular.module('MenuApp')
 .config(RoutesConfig);

 RoutesConfig.$Inject = ['$stateProvider','$urlRouterProvider'];
 function RoutesConfig($stateProvider,$urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider
  .state('Home',{
    url: '/',
    templateUrl:'src/templates/home.template.html'    
  })

  .state('categoryList',{
    url: '/category',
    templateUrl:'src/templates/menu-categories.template.html',
    controller: 'MenuCategoriesController as categoriesCtrl',
    resolve: {
      categoriesList: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories()
          .then( function(response) {
            console.log(response);
            return response.data;
          })
          .catch(function(error){
             console.log("An Error occured retrieving menu categories",error);
          });
        }]
    }

  })
  
  .state('categoryDetails',{    
    url:'/category/{shortName}',
    templateUrl:'src/templates/menu-items.template.html',
    controller: 'CategoryMenuItemsController as menuItemsCtrl',
    resolve:{     
      CategorySearchResponse:[ '$stateParams','MenuDataService',function ($stateParams,MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.shortName)
          .then( function(response) {
            console.log(response);
            return response.data;
          })
          .catch(function(error){
             console.log("An Error occured retrieving menu categories",error);
          });
        }]
    }
  });

 };

})();