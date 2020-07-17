import { Colors } from '../ui/styles';

export class DiceData {
    constructor(sides, label, color) {
        this.numSides = sides;
        this.values = [];
        this.label = label || 'A';
        this.color = color || '#fff';

        this.onChangeCB = null;

        this.setAscending();
        this.print();
    }

    setAscending() {
        this.values = Array.from(Array(this.numSides).keys()).map( v => v + 1);
    }

    setConstant(n) {
        this.values = this.values.fill(n);
    }

    setValue(i, v) {
        this.values[i] = v;
        if (this.onChangeCB) {
            this.onChangeCB();
        }
    }

    print() {
        let s = this.values.join(' ');
        console.log(this.numSides, s);
    }

    get totalPips() {
        return this.values.reduce((acc, v) => {
            return acc + v;
        });
    }

}

export class DiceManager {
    constructor(numDice, sides) {
        this.numDice = numDice;
        this.dice = [];
        for (let i=0; i < numDice; i++) {
            const label = String.fromCharCode(i + 65);
            const dd = new DiceData(sides, label, Colors.diceColors[i]);
            dd.onChangeCB = this.updateResults.bind(this);
            this.dice[i] = dd;
        }

        this.lastResults = null;
    }

    getDie(index) {
        if (index < 0 || index >= this.dice.length) return null;
        return this.dice[index];
    }

    // default to getting the first two dice
    getResults() {
        if (this.lastResults === null) {
            this.updateResults();
        }
        return this.lastResults;
    }

    updateResults() {
        this.lastResults = this._compareDice(0, 1);
        console.log('updated results', this.lastResults);
    }

    // ... but allow for more than two to be managed at a time
    _compareDice(indexA, indexB) {
        const d1 = this.getDie(indexA);
        const d2 = this.getDie(indexB);
        if (d1 === null || d2 === null) {
            return {}
        }

        let outcome = {
            totalContests: 0,
            totalNoTies: 0,
            ties: 0,
            dieA: 0,
            dieB: 0,
            dieAFracStr: '',
            dieBFracStr: '',
            dieAPercent: 0,
            dieBPercent: 0,
            winners: [],
            dieAindex: indexA,  // keep these here for ease of use when rendering results
            dieBindex: indexB
        }
        for (let i=0; i < d1.values.length; i++) {
            for (let j=0; j < d2.values.length; j++) {
                const vA = d1.values[i];
                const vB = d2.values[j];
                
                // -1 for a tie so that 0 and 1 can be used to index into the die list
                let winner = -1;
                let index = (j * d1.values.length) + i;

                if (vA === vB) {
                    outcome.ties++;
                } else if (vA > vB) {
                    outcome.dieA++;
                    winner = 0;
                } else {
                    outcome.dieB++;
                    winner = 1;
                }
                outcome.winners[index] = winner;
            }
        }

        
        outcome.totalContests = (d1.values.length * d2.values.length);
        outcome.totalNoTies = outcome.totalContests - outcome.ties;
        

        outcome.dieAFracStr = `${outcome.dieA}/${outcome.totalNoTies}`;
        outcome.dieBFracStr = `${outcome.dieB}/${outcome.totalNoTies}`;
        
        outcome.dieAPercent = (outcome.dieA / outcome.totalNoTies);
        outcome.dieBPercent = (outcome.dieB / outcome.totalNoTies);

        return outcome;
    }
}