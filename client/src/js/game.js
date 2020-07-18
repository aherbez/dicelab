import { GameRegistry } from './game_registry';
import { GameData } from './game_data';
import { GameScreen } from './ui/game_screen';
import { Colors } from './ui/styles';
import { ToastManager } from './ui/toast_manager';
import { DiceManager } from './dice/dice_data';
import { ChallengeManager } from './challenges/challenge_manager';

/**
 * DicelabClient: main game class
 */

export class DicelabClient {

    constructor(stageId, printCanvasId) {
        let mainScreen = null;
        
        this.initCanvas(stageId);

        this.gameRegistry = new GameRegistry();
        
        this.children = [];

        document.onmousedown = this.mouseDown.bind(this);

        this.startGame();
        this.update();
    }

    initCanvas(stageId) {
        this.canvasEl = document.getElementById(stageId);
        this.ctx = this.canvasEl.getContext('2d');

        this.bounds = {
            width: this.canvasEl.clientWidth,
            height: this.canvasEl.clientHeight,
        }

        this.pos = {
            x: this.canvasEl.offsetLeft,
            y: this.canvasEl.offsetTop
        };
    }

    mouseDown(evt) {
        let localPos = {
            x: evt.clientX - this.pos.x,
            y: evt.clientY - this.pos.y            
        }
        this.children.forEach(c => {
            c.handleClickInternal(localPos);
        })

    }

    startGame() {

        const dm = new DiceManager(2, 6);
        dm.addDie(6);
        dm.addDie(6);
        this.gameRegistry.diceManager = dm;
        this.gameRegistry.diceManager.dice[0].setConstant(3);

        let challenges = new ChallengeManager(this.gameRegistry);
        this.gameRegistry.challenges = challenges;

        this.mainScreen = new GameScreen(this.gameRegistry);
        this.children.push(this.mainScreen);

        // put toasts on top of everything else
        this.gameRegistry.toasts = new ToastManager(this.gameRegistry);
        this.gameRegistry.toasts.setPos(0, 0);
        this.mainScreen.children.push(this.gameRegistry.toasts);
    }

    /**
     * render loop
     */
    render(dt) {
        let ctx = this.ctx;
        let { width, height } = this.bounds;        

        ctx.clearRect(0, 0, width, height);
        ctx.save();

        ctx.save();
        ctx.fillStyle = Colors.backColorMain; // '#ffcb74';
        ctx.fillRect(0, 0, this.bounds.width, this.bounds.height);
        ctx.restore();

        if (this.mainScreen) {
            this.mainScreen._render(ctx);
        } else {
            ctx.save();
            ctx.translate(width/2, height/2);
            ctx.fillText('loading', 0, 0);
            ctx.restore();
        }

        ctx.restore();
    }

    update() {
        let curr = Date.now();
        let deltaTime = curr - this.lastTime;
        this.lastTime = curr;

        this.render(deltaTime);

        requestAnimationFrame(this.update.bind(this));
    }

}