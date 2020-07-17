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

        const offsetY = Dimensions.dieSize + (Dimensions.dieSeparation * 3);

        diceManager.dice.forEach((diceData, i) => {
            const diePanel = new SingleDiePanel(diceData);
            diePanel.setPos(0, (i * offsetY));
            this.children.push(diePanel);
        });
    }

    render(ctx) {
        // draw a panel per die
        
    }
}