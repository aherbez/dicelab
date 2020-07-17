import { Entity } from '../common/entity';
import { GameRegistry } from '../game_registry';
import { Button } from '../ui/button';
import { Colors } from './styles';
import { DicePanel } from '../dice/dice_panel'; 

export class GameScreen extends Entity {
    constructor(gr) {
        super();
        this.registry = gr;

        this.init();
    }

    init() {
        this.dicePanel = new DicePanel(this.registry);
        this.dicePanel.setPos(10, 10);
        this.children.push(this.dicePanel);
       
    }
}