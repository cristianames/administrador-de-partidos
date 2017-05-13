adminapp.controller('mainController', function($scope, $location, $window) {
    $scope.goHome = function() {
        $location.path('/');
        $window.location.reload();
    };
});