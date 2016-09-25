(function () {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', newClassifiedsCtrlFn)

        newClassifiedsCtrlFn.$inject = [
            '$scope',
            '$state',
            '$mdSidenav',
            '$timeout',
            '$mdDialog',
            'classifiedsFactory'
        ]

        function newClassifiedsCtrlFn($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory){

            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;

            $timeout(function (){
                $mdSidenav('left').open();
            })

            $scope
                .$watch(
                    'vm.sidenavOpen',
                    function (sidenav){
                        if(sidenav === false){
                            $mdSidenav('left')
                                        .close()
                                        .then(function (){
                                            $state.go('classifieds');
                                        })
                        }
                    }
                )

            function closeSidebar(){
                vm.sidenavOpen = false;
            }

            function saveClassified(classified){
                if (classified) {
                    classified.contact = {
                        name: 'Davyd WIlb',
                            phone: '(654) 346-3466',
                        email: 'fjfksldkj@gmail.com'
                    }
                    $scope.$emit('newClassified', classified);
                    //vm.sidenavOpen = false;
                    closeSidebar();
                }
            }

        }

})();