import { Entity } from '../common/entity';
import { Dimensions, Colors } from '../ui/styles';
import { SingleDiePanel } from './single_die_panel';

export class DicePanel extends Entity {
    constructor(gr, diceData) {
        super();
        this.registry = gr;

        this.diePanels = [];
        this.setupDiceDisplays();
    }

    setChallenge(isChallenge) {
        this.diePanels.forEach(dp => {
            dp.setChallenge(isChallenge);
        })
    }

    reset() {
        // clear out any previous ones
        this.diePanels.forEach(dp => {
            dp = null;
        });
        this.diePanels = [];
        this.children = [];

        this.setupDiceDisplays();
    }

    setupDiceDisplays() {
        const { diceManager } = this.registry;
        const { dieSize, dieSeparation } = Dimensions; 

        const offsetY = dieSize + (dieSeparation * 3);

        diceManager.dice.forEach((diceData, i) => {
            const label = String.fromCharCode(i + 65);
            const diePanel = new SingleDiePanel(this.registry, label, diceData, (i > 0));
            diePanel.setPos(0, (i * offsetY));
            this.diePanels.push(diePanel);
            this.children.push(diePanel);
        });
    }
}