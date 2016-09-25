(function () {

    "use strict";

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', classifiedsCtrlFn)

    classifiedsCtrlFn.$inject = [
        '$scope',
        '$http',
        'classifiedsFactory',
        '$mdSidenav',
        '$mdToast',
        '$mdDialog',
        '$state'
    ]

    function classifiedsCtrlFn($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog, $state){

        var vm = this;

        vm.categories;
        vm.classified;
        vm.classifieds;
        vm.closeSidebar = closeSidebar;
        vm.deleteClassified = deleteClassified;
        vm.editClassified = editClassified;
        vm.editing;
        vm.openSidebar = openSidebar;
        vm.saveClassified = saveClassified;
        vm.saveEdit = saveEdit;

        vm.classifieds = classifiedsFactory.ref;
        vm.classifieds
                    .$loaded()
                    .then(function (classifieds){
                        vm.categories = getCategories(classifieds);
                    });

        $scope.$on('newClassified',function (event, classified){
            vm.classifieds.$add(classified);
            showToast('classified saved');
        })

        $scope.$on('editSaved',function (event, message){
            showToast(message);
        })

        var contact = {
            name: 'Davyd WIlb',
            phone: '(654) 346-3466',
            email: 'fjfksldkj@gmail.com'
        }

        function closeSidebar(){
            $mdSidenav('left').close();
        }

        function openSidebar(){
            $state.go('classifieds.new');
        }

        function deleteClassified(event, classifiedToDelete){
            var confirm = $mdDialog
                                .confirm()
                                .title('Are you sure you want to delete ' + classifiedToDelete.title + '?')
                                .ok('Yes').cancel('No')
                                .targetEvent(event)

            $mdDialog
                .show(confirm)
                .then(
                    function () {
                        vm.classifieds.$remove(classifiedToDelete);
                        showToast('Classified Deleted');
                    },
                    function () {}
                )

        }

        function editClassified(classifiedToEdit){
            $state.go('classifieds.edit', {
                id: classifiedToEdit.$id,
            })
        }

        function getCategories(classifieds){
            var categories = [];
            angular
                .forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    })
                })
            return _.uniq(categories);
        }

        function saveClassified(classified){
            vm.classifieds.push(classified);
            vm.classified = {};
            closeSidebar();
            showToast('Classified Saved');
        }
        function saveEdit(){
            vm.editing = false;
            vm.classified ={};
            closeSidebar();
            showToast('Edit Saved');
        }

        function showToast(msg){
            $mdToast.show(
                $mdToast
                    .simple()
                    .content(msg)
                    .position('top right')
                    .hideDelay(3000)
            );
        }

    }

})();
