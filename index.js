/*jshint esversion: 6, node: true*/
'use strict';

// put your solution in this method
function solution(toPrint, toRead) {

    const startAll = new Date();
    const N = parseInt(readline());

    const columns = {};
    const rows = {};
    const diagonals = [];

    for (let i=0; i<N; i++) {
        const input = readline().split(' ');
        const x = parseInt(input[0]);
        const y = parseInt(input[1]);

        if (columns[x] || rows[y] || diagonals.some(f => f(x,y))) {
            return print('INCORRECT');
        }
        columns[x] = true;
        rows[y] = true;

        diagonals.push((X,Y) => {
            return Y === (-X + x + y)
        });
        diagonals.push((X,Y) => {
            return Y === (X + y - x)
        });
    }
    print('CORRECT');

    log(`Solved ALL in ${new Date() - startAll}`);
}

// run solution without any params for kattis
if (typeof process === 'undefined' || process.release.name !== 'node') {

    solution();
}

// node js internals below -----------------------------------------------------

function init(toPrint, toRead) {

    // replace global functions with ones for node or tests
    // kattis is using 'print' and 'readline' for standard I/O
    if (typeof global !== 'undefined') {
        global.print = toPrint;
        global.readline = toRead;
    }
}

// interactive mode - input from command line
if (typeof process !== 'undefined' && process.argv[2] === 'i') {

    const Readline = require('readline');
    const input = [];

    const inputProcessor = Readline.createInterface({input: process.stdin, output: process.stdout});

    inputProcessor.on('line', (line) => {

        input.push(line);

        if (!line) {
            inputProcessor.close();
        }
    });

    inputProcessor.on('close', () => {

        init(console.log, () => input.shift());

        solution();
    });
}

// input from process params
if (typeof process !== 'undefined' && process.argv[2] && process.argv[2] !== 'i') {

    const input = process.argv[2].split('\\n');
    init(console.log, () => input.shift());

    solution();
}

function log() {

    if (typeof process !== 'undefined' && process.release.name === 'node') {
        console.log.call(this, ...arguments);
    }
}

if (typeof module !== 'undefined') {
    module.exports.solution = solution;
    module.exports.init = init;
}
