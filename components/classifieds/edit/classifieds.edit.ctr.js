(function () {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', editClassifiedsCtrlFn)

    editClassifiedsCtrlFn.$inject = [
        '$scope',
        '$state',
        '$mdSidenav',
        '$timeout',
        '$mdDialog',
        'classifiedsFactory'
    ]

    function editClassifiedsCtrlFn($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory){

        var vm = this;
        vm.classifieds = classifiedsFactory.ref;
        vm.classified = vm.classifieds.$getRecord($state.params.id);
        vm.closeSidebar = closeSidebar;
        vm.saveEdit = saveEdit;

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

        function saveEdit(classified){
            vm.classifieds
                    .$save(vm.classified)
                    .then(function (){
                        $scope.$emit('editSaved','Edit Saved')
                        closeSidebar();
                        //vm.sidenavOpen = false;
                    })

        }

    }

})();