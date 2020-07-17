import { Entity } from '../common/entity';
import { Dimensions, Colors } from '../ui/styles';
import { SingleDiePanel } from './single_die_panel';

export class DicePanel extends Entity {
    constructor(gr, diceData) {
        super();
        this.registry = gr;

        this.setupDiceDisplays();
    }

    setupDiceDisplays() {
        const { diceManager } = this.registry;
        const { dieSize, dieSeparation } = Dimensions; 

        const offsetY = dieSize + (dieSeparation * 3);

        diceManager.dice.forEach((diceData, i) => {
            const label = String.fromCharCode(i + 65);
            const diePanel = new SingleDiePanel(label, diceData);
            diePanel.setPos(0, (i * offsetY));
            this.children.push(diePanel);
        });
    }
}