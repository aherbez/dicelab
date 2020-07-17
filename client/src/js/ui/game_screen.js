import { Entity } from '../common/entity';
import { GameRegistry } from '../game_registry';
import { Button } from '../ui/button';
import { Colors } from './styles';

export class GameScreen extends Entity {
    constructor(gr) {
        super();
        this.registry = gr;

        this.init();
    }

    init() {

        this.resetButton = new Button({
            label: 'reset',
            callback: () => {this.resetData();}
        });
        this.resetButton.setPos(10, 550);
        this.children.push(this.resetButton);


        this.showManagersButton = new Button({
            label: 'managers',
            callback: () => { this.showManagersPanel(); },
            width: 150,
            height: 40,
        });
        this.showManagersButton.setPos(490, 550);
        this.children.push(this.showManagersButton);

        this.showUpgradesButton = new Button({
            label: 'upgrades',
            callback: () => { this.showUpgradesPanel(); },
            width: 140,
            height: 40,
        });
        this.showUpgradesButton.setPos(650, 550);
        this.children.push(this.showUpgradesButton);
        

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

        const { playerInventory, playerStats, playerStorage, achievements } = this.registry;
        playerInventory.resetData();
        playerStats.resetData();
        achievements.resetData();

        playerStorage.saveData();
    }

}