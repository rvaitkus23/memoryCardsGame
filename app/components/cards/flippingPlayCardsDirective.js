/**
 * @desc this directive displays and controls one playing card
 * @example <flipping-play-card rank="seven" suit="spade" flipped="false"/>
 * @param suit: defines what suit of card has to be displayed: diamond, heart and spades
 * @param rank: defines what rank of card has to be displayed: 2-10, jack, queen, king, ace
 * @param flipped:binds to scope value to open or close card
 */
angular
  .module('playCards')
  .directive('flippingPlayCard', flippingPlayCardDirective);

function flippingPlayCardDirective() {
  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/cards/flippingPlayCard.directive.html',
    scope: {
      rank: '@',
      suit: '@',
      flipped: '='
    }
  };

  return directive;
}
