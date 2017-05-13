app.service('fbAuth',['$rootScope', '$http', '$timeout', '$location',  function($rootScope, $http, $timeout, $location) {

    this.getLoginStatus = function(){
        var _self = this;
        FB.getLoginStatus(function (response){_self.setUserInfo(response)});
    }

    this.watchAuthenticationStatusChange = function() {
        var _self = this;
        FB.Event.subscribe('auth.authResponseChange', function (response){_self.setUserInfo(response)});
    }

    this.getUserInfo = function() {
        var _self = this;
        FB.api('/me',
            {
                fields: 'id,first_name,last_name,name,picture,friends'
            },
            function(res) {
                $timeout(function() {
                    $rootScope.loggedUser = true;
                    $rootScope.user = _self.user = res
                })
            }
        );
    }

    this.setUserInfo = function(response){
        var _self = this;
        if (response.status === 'connected') {
            //Seteo custom header
            $http.defaults.headers.common['x-access-token']= response.authResponse.accessToken;
            window.localStorage['accessToken'] = response.authResponse.accessToken;

            _self.getUserInfo();

            $timeout(function() {
                $rootScope.authTemplate = authTemplates[1];
            });
        }
        else {
            $http.defaults.headers.common['x-access-token']= null;
            window.localStorage['accessToken'] = null;

            $timeout(function(){
                $rootScope.user = {};
                $rootScope.loggedUser = false;
                $rootScope.authTemplate = authTemplates[0];
            });

            $location.path('/');
        }
    }
}]);