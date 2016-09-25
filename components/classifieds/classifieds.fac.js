(function () {

    "use strict";

    angular
        .module('ngClassifieds')
        .factory('classifiedsFactory', function ($http, $firebaseArray) {

            var ref = new Firebase('https://ngclassifieds-590eb.firebaseio.com/');

            return {
                ref: $firebaseArray(ref)
            };

        })

})();