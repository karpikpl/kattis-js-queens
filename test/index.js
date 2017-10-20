/*jshint esversion: 6, node: true*/
'use strict';

const Index = require('../index');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

function testSolution(input) {

    const result = [];

    Index.init(function (ans) {

            result.push(ans);

            if (arguments.length > 1) {
                throw 'print should be called only with one argument!';
            }
        },
        () => input.shift());
    Index.solution();

    return result;
}

describe('Solution', function () {

    describe('program', function () {

        [
            {
                input: [2, '0 0', '1 1'],
                result: ['INCORRECT']
            },
            {
                input: [2, '0 1', '1 0'],
                result: ['INCORRECT']
            }
        ].forEach((testCase) => {

            it('should solve for ' + testCase.input, function () {

                // Arrange
                const input = testCase.input;

                // Act
                const result = testSolution(input);

                // Assert
                assert.deepEqual(result, testCase.result);
            });

        })
    });

    describe('Data files tests', function () {

        if (!fs.existsSync('datafiles')) {
            return console.log('no data files available');
        }

        fs.readdirSync('datafiles')
            .filter((file) => file.endsWith('.in'))
            .map((file) => {

                const id = file.replace(path.extname(file), '');

                return {
                    input: 'datafiles/' + file,
                    result: 'datafiles/' + id + '.ans'
                }

            })
            .forEach((testCase) => {

                it(`should solve it for ${testCase.input} file`, () => {

                    // Arrange
                    const input = fs.readFileSync(testCase.input, 'UTF8').split('\n');
                    const output = fs.readFileSync(testCase.result, 'UTF8').split('\n');
                    output.pop();

                    // Act
                    const result = testSolution(input);

                    // Assert
                    assert.deepEqual(result, output);
                });
            });

    });
});
