require('colors');
let numeral = new require('numeral');
let numbers = new Array(6);
let picks = new Array(50).fill(0);
let win = pick6(numbers).slice();
let winCt = 0;

console.log('winning draw', win);

numeral.nullFormat('N/A');

console.time('lotto');
let totalGames = 1e6;

console.log(`lotto ${numeral(totalGames).format('0,0')}`.red );
console.time('million');

let gameRes = new Array(7).fill(0);

for (let games = 0; games<=totalGames; games++){

    let game = pick6(numbers);

    let pickCt = (game[0] === win[0]);
    pickCt += game[1] === win[1];
    pickCt += game[2] === win[2];
    pickCt += game[3] === win[3];
    pickCt += game[4] === win[4];
    pickCt += game[5] === win[5];

    gameRes[ pickCt ] += 1;

    if( pickCt === 6) {
        winCt += 1;
        console.log('WIN!'.yellow, `${winCt} ${numeral(games).format('0,0')} ${game}`.yellow)
    }

    if(games % 1e6 === 0) {
        console.log(numeral(games).format('0,0'));
        console.timeEnd('million');
        console.time('million');
    }

    picks[game[0]] += 1;
    picks[game[1]] += 1;
    picks[game[2]] += 1;
    picks[game[3]] += 1;
    picks[game[4]] += 1;
    picks[game[5]] += 1;

}
console.timeEnd('lotto');


gameRes.forEach( (i, n) =>
    console.log(
        `${n}`.padStart(5).green,
        `${numeral(i).format('0,0')}`.padStart(13),
        (i) ? numeral(totalGames/i).format('0,0.##').padStart(15) : '--'.padStart(15)
    )
);


// let tot=0;
// picks.forEach((i, n) => {console.log(n.toString().padStart(2), numeral(i).format('0,0')); tot+=i})
// console.log(`total ${numeral(tot).format('0,0')}`.yellow );


function pick6(numbers) {

    var countDown  = 4,
        pick;

    numbers[5] = Math.floor(Math.random() * 59) + 1;

    while (countDown>=0) {
        pick = Math.floor(Math.random() * 59)+1 ;
        if(numbers.indexOf(pick, countDown) === -1) {
            numbers[countDown] = pick;
            countDown -= 1;
        }
    }
    return numbers.sort();
}