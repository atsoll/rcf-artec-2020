var app = angular.module('seminaire', ['ui.bootstrap','ngAnimate']);
prefix = '/rcf-artec-2020'


app.controller('ctrl', function($scope, $window, $animate) {
  $scope.endAudio = function(){
    scope.showAudio = false
  }

});

app.directive('imageGrid', function() {
  return {
   restrict: 'E',
   scope: {
     portraits: '=',
     pieces: '=',
     son: '@',
     mini: '@',
     prefix: '@',
     video: '='
   },
   templateUrl: prefix + '/templates/img_grid.html',
   translude: true,
   link: function(scope, element) {

     scope.index = 0
     scope.completed = false
     let imageLists = [[],[]]
     let docuList = []
     let daList = []
     for(let i=0;i< parseInt(scope.pieces);i++) {
       docuList.push(prefix + '/templates/' + scope.prefix + '/documentation/' + String(i+1) + '.html')
       daList.push(prefix + '/templates/' + scope.prefix + '/data/' + String(i+1) + '.html')
       for(let j=0; j< scope.portraits.length;j++) {
         imageLists[j].push(prefix + '/style/images/portraits/' + scope.portraits[j] + '/' + String(i+1) + '.png');
       }
     }
     scope.infoLists = imageLists;
     scope.documentList = docuList;
     scope.dataList = daList
     scope.showAudio = false
     scope.replique = prefix + '/sound/' + scope.son
     scope.inc_index = function() {
       if(scope.index < scope.infoLists[0].length-1 && !scope.completed) {
        scope.index += 1
      }
      if(scope.index == scope.infoLists[0].length-1) {
        audio = document.getElementsByClassName("replique")[0].children[0];
        scope.completed=true
        scope.showAudio = true
        audio.addEventListener("ended", function(){
          scope.showAudio = false;
          scope.$apply()
        });
        audio.play();
      }
     }

   }
 }
});
