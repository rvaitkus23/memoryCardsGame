angular
  .module('playCards').controller('gameController',gameController);

gameController.$inject = ['$timeout', 'gameService'];

function gameController($timeout, gameService){
  var vm = this;
  var currentOpen = [];
  var blockOpening = false;
  var gameStart = 0;
  var timerTimeout = null;

  vm.cardsOutput = [];
  vm.moves = 0;
  vm.pairsOpend = 0;
  vm.timer = 0;

  vm.slider = {
    value: gameService.selectedPairsCount(),
    options: {
      floor: 2,
      ceil: 52,
      hideLimitLabels: true,
      onEnd: function(){
        makeOutput();
        gameService.selectedPairsCount(vm.slider.value);
      }
    }
  };

  vm.cardClicked = function(index){
    if (blockOpening || !vm.cardsOutput[index]['flipped']) return;
    vm.moves++;
    vm.cardsOutput[index]['flipped'] = false;

    // if first to open
    if (currentOpen.length === 0){
      currentOpen.push(index);
    } else {
      if (vm.cardsOutput[currentOpen[0]].rank === vm.cardsOutput[index]['rank'] &&
            vm.cardsOutput[currentOpen[0]].suit === vm.cardsOutput[index]['suit']){
        currentOpen = [];
        vm.pairsOpend++;
        $timeout(function() {
          if (vm.slider.value === vm.pairsOpend) {
            $timeout.cancel(timerTimeout);
            alert('You won! In ' + vm.moves + ' moves. Total time spent: ' + timeOutput(vm.timeSpent));
          }
        }, 500);
      } else {
        blockOpening = true;
        currentOpen.push(index);
        $timeout(function(){
          vm.cardsOutput[currentOpen[0]]['flipped'] = true;
          vm.cardsOutput[currentOpen[1]]['flipped'] = true;
          currentOpen = [];
          blockOpening = false;
        },1000);
      }
    }
  };

  vm.resetGame = makeOutput;

  makeOutput();

  function makeOutput(){
    vm.cardsOutput = gameService.getCards(vm.slider.value);
    vm.moves = 0;
    vm.pairsOpend = 0;

    gameStart = new Date();

    turnOnCounter();
  }

  function turnOnCounter(){
    if (timerTimeout !== null)$timeout.cancel(timerTimeout);
    timerTimeout = $timeout(function(){
      vm.timeSpent = new Date() - gameStart;
      turnOnCounter()
    }, 1000);
  }

  function timeOutput(ms){
    var totalSeconds = Math.floor(ms/1000);
    var minutes = Math.floor(totalSeconds/60);
    var seconds = totalSeconds % 60;
    var output = (minutes > 0) ? (minutes + ' min '): '';
    output += seconds + 's';
    return output;
  }
}