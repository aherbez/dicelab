import { Entity } from '../common/entity';
import { Dimensions, Colors } from '../ui/styles';
import { DieFace } from '../dice/die_face';

export class SingleDiePanel extends Entity {
    constructor(gr, label, diceData, isChallengePanel) {
        super();
        this.registry = gr;
        this.diceData = diceData;

        const { dieSize, dieSeparation, diePanelOffsetX } = Dimensions; 

        this.bounds.x = (this.diceData.numSides * (dieSize + dieSeparation)) + diePanelOffsetX;
        this.bounds.y = Dimensions.dieSize + (Dimensions.dieSeparation * 2);

        // can this panel be manipulated in challenge mode?
        this.isChallengePanel = isChallengePanel;

        this.initFaces();
    }

    setChallenge(playingChallenge) {
        if (playingChallenge && !this.isChallengePanel) {
            this.enabled = false;
        }
    }

    initFaces() {
        const { dieSize, dieSeparation, diePanelOffsetX } = Dimensions; 

        this.faces = [];
        this.diceData.values.forEach((v, i) =>  {
            const df = new DieFace(v, (newValue) => {
                this.diceData.setValue(i, newValue);
            });
            df.setPos((i * (dieSize + dieSeparation)) + (dieSeparation/2) + diePanelOffsetX,
                dieSeparation);
            this.children.push(df);
        });
    }

    // maybe alter pips
    onClick(pos) {
        console.log('clicked on dice panel');
    }

    drawDieName(ctx) {
        const { dieSize, dieSeparation, diePanelOffsetX } = Dimensions;
        const { textColor } = Colors; 

        ctx.save();
        ctx.font = '60px Helvetica';
        ctx.fillStyle = textColor;
        ctx.fillText(this.diceData.label, 10, dieSize * 0.8);
        ctx.restore();
    }

    drawTotalPips(ctx) {

        const { textColor } = Colors;
        const { dieSize, dieSeparation, diePanelOffsetX } = Dimensions;
        
        const rightEdge = this.bounds.x + 10 + dieSize;
        
        // only get this once since the getter runs through the values array
        const totalPips = this.diceData.totalPips;
        let pipStr = `${totalPips}`;

        const currChallenge = this.registry.challenges.currentChallenge;
        if ((currChallenge !== null) && (currChallenge.playerPips !== -1)) {
            pipStr = `${totalPips}/${currChallenge.playerPips}`;
        }

        ctx.save();
        ctx.textAlign = "center";
        ctx.fillStyle = textColor;
        ctx.font = `${dieSize * 0.8}px Helvetica`;
        ctx.fillText(pipStr, rightEdge, dieSize * 0.8);

        ctx.font = `${dieSize * 0.2}px Helvetica`;
        ctx.fillText('pips', rightEdge, dieSize);
        ctx.restore();
    }

    render(ctx) {
        ctx.save();

        ctx.fillStyle = this.diceData.color;
        ctx.fillRect(0, 0, this.bounds.x, this.bounds.y);
        ctx.strokeRect(0, 0, this.bounds.x, this.bounds.y);

        this.drawDieName(ctx);

        if (this.isChallengePanel) {
            this.drawTotalPips(ctx);
        }

        ctx.restore();
    }
}