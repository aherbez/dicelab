import { Colors } from '../ui/styles';

export class DiceData {
    constructor(sides, label, color) {
        this.numSides = sides;
        this.values = [];
        this.label = label || 'A';
        this.color = color || '#fff';
        this.setAscending();
        this.print();
    }

    setAscending() {
        this.values = Array.from(Array(this.numSides).keys()).map( v => v + 1);
    }

    setConstant(n) {
        this.values = this.values.fill(n);
    }

    print() {
        let s = this.values.join(' ');
        console.log(this.numSides, s);
    }

}

export class DiceManager {
    constructor(numDice, sides) {
        this.numDice = numDice;
        this.dice = [];
        for (let i=0; i < numDice; i++) {
            const label = String.fromCharCode(i + 65);

            this.dice[i] = new DiceData(sides, label, Colors.diceColors[i]);
        }
    }

    getDie(index) {
        if (index < 0 || index >= this.dice.length) return null;
        return this.dice[index];
    }
}