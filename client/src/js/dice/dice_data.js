export class DiceData {
    constructor(sides) {
        this.numSides = sides;
        this.values = [];
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
            this.dice[i] = new DiceData(sides);
        }
    }
}