angular
  .module('playCards').factory('gameService', gameService);

gameService.$inject = [];

function gameService(){
  var ranks = ['ace', 'two', 'three', 'four' ,'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
  var suits = ['club', 'diamond', 'spade', 'heart'];
  var renderUniqPrefix = 0; // this is needed because ng-repeat can not handle repeating values and track by $index does not allow rerender items
  var selectedPairsId = 'selectedPairs';

  var service = {
    getCards: getCards,
    selectedPairsCount: selectedPairsCount,
    storeStatistics: storeStatistics
  };

  return service;

  function selectedPairsCount(count){
    if (count === undefined){
      var count = localStorage.getItem(selectedPairsId);
      //set default if not saved previously
      if (count === null){
        count = 8;
      }
      return parseInt(count);
    } else {
      localStorage.setItem(selectedPairsId, count.toString());
      return true;
    }
  }

  function storeStatistics(victory){

  }

  function getCards(pairsCount){
    var cards = [];
    var availablePairs = pairsCombinations();
    var output;
    for (var i = 0; i < pairsCount; i++){
      cards[i] = getRandomCard(availablePairs);
    }

    output = doubleCardsArray(cards);
    output = shuffle(output);

    renderUniqPrefix++;

    return output;
  }

  function getRandomCard(pairs){
    var pairIndex = getRandomArbitrary(0, pairs.length - 1);
    var pair = pairs[pairIndex];

    var formedCard = {id: renderUniqPrefix + pair['rank'] + pair['suit'], rank: pair['rank'], suit: pair['suit'], flipped: true};
    pairs.splice(pairIndex, 1);

    return formedCard;
  }

  function pairsCombinations(){
    var output = [];
    for (var i = 0, il = suits.length; i < il; i++){
      for (var j = 0, jl = ranks.length; j < jl; j++){
        output.push({rank: ranks[j], suit: suits[i]});
      }
    }
    return output;
  }

  function doubleCardsArray(input){
    var output = input;

    for (var i = 0, il = input.length; i<il; i++){
      output.push({id: 'd' + input[i]['id'], rank: input[i]['rank'], suit: input[i]['suit'], flipped: input[i]['flipped']});
    }

    return output;
  }

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Fisher-Yates (aka Knuth) Shuffle
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}