(function () {
    'use strict';
    angular.module('LunchCheck',[])
    .controller('LunchCheckController',LunchCheckController);
        
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        
        $scope.lunchItems = "";
        $scope.promptMessage = "Please enter the items you normally eat for lunch. Separate each item with a comma e.g. Sandwich, Apple, Cheese.";       
        $scope.promptType = 'info';        
        $scope.alertType = 'info';
        $scope.alertMessage = '';
        $scope.alertIsVisible = false;
        $scope.clearAlert = function(){
            $scope.alertMessage= '';
            $scope.alertType= 'info';
            $scope.alertIsVisible= false;
        }
        $scope.CheckIfTooMuch = function() {
           // If the textbox is empty and the user clicks the "Check If Too Much" button, 
            //the message "Please enter data first" should show up. 
            //'Empty' here means either "" (empty string) or a string with just spaces in it. 
            //(Hint: AngularJS ng-model already performs the trimming for you, 
            //so there shouldn't be anything you need to do.)

            console.log($scope.lunchItems);
            var Items = $scope.lunchItems.split(',');

            // filter the array excluding empty items
            var lunchCount = Items.filter( function (el){
                // do not include array item if is null or empty string
                return el != null && el.trim() != "";
            }).length;
            console.log(lunchCount);


            //determine the lunch item state and set UI messaging
            if (!lunchCount || lunchCount == 0)
            {
                // empty array
                $scope.alertMessage= 'Please enter data first.';
                $scope.alertType= 'danger';
                $scope.alertIsVisible= true;
            } else
            {                
                if (lunchCount <= 3)
                {                    
                    $scope.alertMessage= 'Enjoy!';
                    $scope.alertType= 'success';
                    $scope.alertIsVisible= true;
                }
                else
                {
                    $scope.alertMessage= "Too Much!";
                    $scope.alertType= 'warning';
                    $scope.alertIsVisible= true;
                }
            }


        }

        $scope.CheckItemFormat = function() {
            $scope.alertMessage= 'exited input';
            $scope.alertType= 'warning';
            $scope.alertIsVisible= true;
        }
        
    }
    // String.prototype.splitPlus = function(sep) {
    //     var a = this.split(sep)
    //     console.log(a);
    //     if (a[0] == '' && a.length == 1) return [];
    //     return a;
    //    };
})();