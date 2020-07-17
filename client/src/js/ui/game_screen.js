import { Entity } from '../common/entity';
import { GameRegistry } from '../game_registry';
import { Button } from '../ui/button';
import { Colors } from './styles';
import { DicePanel } from '../dice/dice_panel';
import { ResultsGrid } from '../dice/results_grid';
import { ResultsPercent } from '../dice/results_percent';

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

        this.resultsGrid = new ResultsGrid(this.registry);
        this.resultsGrid.setPos(10, 200);
        this.children.push(this.resultsGrid);

        this.resultsPercent = new ResultsPercent(this.registry);
        this.resultsPercent.setPos(400, 200);
        this.children.push(this.resultsPercent);

        this.challengeButton = new Button({
            label: 'challenge',
            callback: () => {this.setChallenge();},
            width: 100

        });
        this.challengeButton.setPos(690, 300);
        this.children.push(this.challengeButton);

        this.freeplayButton = new Button({
            label: 'freeplay',
            callback: () => {this.clearChallenge();},
            width: 100

        });
        this.freeplayButton.setPos(690, 200);
        this.children.push(this.freeplayButton);

    }

    resetGame(isChallenge) {
        this.dicePanel.reset();
        this.resultsGrid.reset();

        this.dicePanel.setChallenge(isChallenge);
    }

    clearChallenge() {
        const { challenges, diceManager } = this.registry;
        challenges.setToFreeplay();
        console.log('FREEPLAY!');
        this.resetGame(false);
    }

    setChallenge() {
        const { challenges, diceManager } = this.registry;
        challenges.setToRandomChallenge();
        console.log('RANDOM CHALLENGE');
        this.resetGame(true);

    }
}