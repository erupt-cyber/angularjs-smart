function toTemplate() {
    window.scrollTo(0, 0);
}

var app = angular.module('app', [
    'ngRoute'
]).run(function ($rootScope) {
    $rootScope.name = "AngluarJs smart";
    document.title = $rootScope.name;
}).config(function ($routeProvider) {
    $routeProvider.when('/page/:name', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/" + attr.name + ".html";
        }, resolve: {
            load: function ($q, $route, $rootScope) {
                var deferred = $q.defer();
                var params = $route.current.params;
                var dependencies = [
                    'page/' + params.name + '.js'
                ];
                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }
        }
    });
    $routeProvider.when('/page/:dir/:name', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/" + attr.dir + "/" + attr.name + ".html";
        }, resolve: {
            load: function ($q, $route, $rootScope) {
                var deferred = $q.defer();
                var params = $route.current.params;
                var dependencies = [
                    "page/" + params.dir + "/" + params.name + ".js"
                ];
                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }
        }
    });
    $routeProvider.otherwise({
        redirectTo: '/page/home'
    });
})