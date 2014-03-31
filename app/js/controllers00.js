var stockNgControllers = angular.module('stockNgControllers', []);

stockNgControllers.controller('portfolioController', [
    '$scope', 
    function($scope) {

      $scope.stock = {
        name: null
      };

      $scope.stocks = [];
      $scope.order_by = "name";

      $scope.submit = function() {
        if ($scope.stock.name) {
          $scope.stocks.push({name: $scope.stock.name});
          $scope.stock.name = '';
        }
      };
    }
]);

stockNgControllers.controller('mainController', [
    '$scope', 
    function($scope) {
        $scope.name="Ted";
    }
]);