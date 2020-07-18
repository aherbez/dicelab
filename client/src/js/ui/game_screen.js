import { Entity } from '../common/entity';
import { GameRegistry } from '../game_registry';
import { Button } from '../ui/button';
import { Colors } from './styles';
import { DicePanel } from '../dice/dice_panel';
import { ResultsGrid } from '../dice/results_grid';
import { ResultsPercent } from '../dice/results_percent';
import { TextBox } from './text_box';

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

        this.challengeText = new TextBox(300);
        this.challengeText.setPos(400, 500);
        this.children.push(this.challengeText);

        this.challengeButton = new Button({
            label: 'challenge',
            callback: () => {this.setChallenge();},
            width: 100,
            radius: 2,

        });
        this.challengeButton.setPos(690, 300);
        this.children.push(this.challengeButton);

        this.freeplayButton = new Button({
            label: 'freeplay',
            callback: () => {this.clearChallenge();},
            width: 100,
            radius: 2
        });
        this.freeplayButton.setPos(690, 200);
        this.children.push(this.freeplayButton);

        const diceSides = [4,6,8];
        diceSides.forEach((numSides, i) => {
            const b = new Button({
                label: `${numSides}`,
                callback: () => {this.clearChallenge(numSides)},
                width: 30,
                height: 30,
                radius: 2,
                border: 1

            });
            b.setPos(690 + (i*32), 250);
            this.children.push(b);
        });

    }

    /*
        radius: 10,
    fill: '#AFA',
    disabledColor: '#AAA',
    strokeColor: '#000',
    strokeColorDisabled: '#000',
    border: 3,    
    */

    resetGame(isChallenge) {
        this.dicePanel.reset();
        this.resultsGrid.reset();

        this.challengeText.visible = isChallenge;

        this.dicePanel.setChallenge(isChallenge);
    }

    clearChallenge(numSides = 6) {
        const { challenges, diceManager } = this.registry;
        challenges.setToFreeplay();
        diceManager.clearChallenge(numSides);

        this.challengeText.text = '';

        this.resetGame(false);
    }

    setChallenge() {
        const { challenges, diceManager } = this.registry;
        challenges.setToRandomChallenge();

        const challenge = challenges.currentChallenge;

        diceManager.setFromChallenge(challenge);
        this.challengeText.text = challenge.challengeText;

        this.resetGame(true);

    }
}