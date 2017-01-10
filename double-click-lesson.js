//these variables makes us use the button inside functions
var button = document.querySelector('.button');
var label = document.querySelector('h4');

//this observable is listening for the event of 'click' on the button
var clickStream = Rx.Observable.fromEvent(button, 'click');

//this function takes the clicks it gets in a 250 millisecond span and maps those into an array
//if that array is equal to 2 it is not filtered away and is a valid double click.
var doubleClickStream = clickStream
  .buffer(() => clickStream.debounce(250))
  .map(arr => arr.length)
  .filter(len => len === 2);

//first observable call
//without this line this function will never run
//this function aslo makes the double click event change the label to 'double click'
doubleClickStream.subscribe(event => {
  label.textContent = 'double click';
});

//second observable call with a different function
//this function waits a second then it subscribes to the observable and changes the label
//back to '-'
doubleClickStream
  .delay(1000)
  .subscribe(suggestion => {
    label.textContent = '-';
  });
