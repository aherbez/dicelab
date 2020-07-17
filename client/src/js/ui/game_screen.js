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

       
    }

    saveData() {
        const { playerStorage } = this.registry;
        playerStorage.saveData();
    }

    loadData() {
        const { playerStorage } = this.registry;
        playerStorage.loadPlayerData();

    }

    resetData() {
        console.log(`resetting data`);
    }

}