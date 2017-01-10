//here we have an observable with an array that maps over each index at 200 milliseconds and it takes 6 items.
var array = Rx.Observable.interval(200).take(6)
  .map(i => ['1', '2', '3', '4', 'mate', '6'][i]);

//here we map the array to make it itterate over each index and filter out the strings that is not numbers, then we add them together with reduce
var FilterAndReduce = array
    .map( x => parseInt(x))
    .filter(x => !isNaN(x))
    .reduce((x, y) => x + y);

//this funtion does nothing until we subscribe to it
FilterAndReduce.subscribe(x => console.log(x));
//this function displays nothing until the observable has gone through all the indexes in the array
//then it returns with the FilterAndReduce value
//the output will be as follows
//FilterAndReduce result:            -----------------16->
//What gets passed to the function:  -'1'--'2'--'3'---'mate'---'6'->

// These two examples would print out to the console every 200 milliseconds:
//Results from the map would be the sequence that gets parsed printed to the console
//map output:                        -1--2--3--NaN--6-->
//Result from only filter would be the sequence of strings that are numbers printed to the console
// Filter output:                    -1--2--3--4--6-->

//event streamA is an observable of 3 and 4
//event streamB takes those numbers and maps them into 10 * a
//this is used so that we can times a with 10 whenever the value of a changes
var streamA = Rx.Observable.of(3, 4);
var streamB = streamA.map(a => 10 * a);

//this subscribe will call the event streamB function with event streamA´s values
//the output will be: --30-40------>
streamB.subscribe(b => console.log(b));
