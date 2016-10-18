var app = angular.module('weatherSaver', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider

		.when('/', {
			templateUrl: '/pages/main.html',
			controller: 'mainCtrl',
			controllerAs: 'main'
		})

		.when('/home', {
			templateUrl: '/pages/main.html',
			controller: 'mainCtrl',
			controllerAs: 'main'
		})

		.when('/login', {
			templateUrl: '/pages/login.html',
			controller: 'loginCtrl',
			controllerAs: 'login'
		})

		.when('/help', {
			templateUrl: '/pages/help.html',
			controller: 'helpCtrl',
			controllerAs: 'help'
		})


});

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
	var self = this;
	self.show_download = false;
	self.temp_checked = false;
	self.fahrenheit = true;
	self.check = function() {
		if (navigator.geolocation) {
			self.show_download = true;
			navigator.geolocation.getCurrentPosition(function(position) {
				var lat = position.coords.latitude,
						long = position.coords.longitude,
						url = 'https://weather-saver.herokuapp.com/' + lat + '/' + long;
				$http
					.get(url)
					.success(function(data) {
						self.show_download = false;
						var temperature = Math.round((1.8 * (data.main.temp - 273)) + 32); // convert Kelvin to Fahrenheit
						self.name = data.name;
						if (self.fahrenheit) {
							self.temp = temperature;
							self.status = 'F';
						} else {
							self.temp = newTemp(temperature, true);
							self.fahrenheit = false;
							self.status = 'C';
						}
		        self.current = data.weather[0].main;
		        self.conditions = data.weather[0].description;
		        self.temp_checked = true;
					});
			});
		}
	}

	function newTemp(t, f_status) {
		if (f_status) {
			// return Celsius
			return Math.round(((t - 32) * 5 ) / 9);
		}
		// return Fahrenheit 
		return Math.round(((t * 9) / 5 ) + 32);
	}

	self.convert = function() {
		var status;
		self.temp = newTemp(self.temp, self.fahrenheit);
		if (!self.fahrenheit) { 
			self.fahrenheit = true;
			self.status = 'F';
		} else {
			self.fahrenheit = false;
			self.status = 'C';
		}
	}

}]);

app.controller('loginCtrl', ['$scope', function($scope) {

}]);

app.controller('helpCtrl', ['$scope', function($scope) {
	
}]);