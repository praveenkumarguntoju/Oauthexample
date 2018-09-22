var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
  var windowOpened;

  $scope.login = function() {
    debugger;
    $http.get("url").then(function(response) {
      windowOpened = window.open(response.data);
    });
  };

  window.onmessage = function(e) {
    windowOpened.close();
    var urlWithCode = e.data;
    var idx = urlWithCode.lastIndexOf("code=");
    var code = urlWithCode.substring(idx + 5).replace("#", "");
    var splitCode = code.split("&");
    var oauthCode = splitCode[0];
    $http({
      url: "token",
      method: "GET",
      params: { code: oauthCode }
    }).then(function(response) {
      console.log(response);
    });
  };
});
