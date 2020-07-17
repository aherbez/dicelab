import { Entity } from '../common/entity';
import { Dimensions, Colors } from '../ui/styles';
import { DieFace } from '../dice/die_face';

export class SingleDiePanel extends Entity {
    constructor(label, diceData) {
        super();
        this.label = label || 'A';
        this.diceData = diceData;

        const { dieSize, dieSeparation, diePanelOffsetX } = Dimensions; 

        this.bounds.x = (this.diceData.numSides * (dieSize + dieSeparation)) + diePanelOffsetX;
        this.bounds.y = Dimensions.dieSize + (Dimensions.dieSeparation * 2);

        this.initFaces();
    }

    initFaces() {
        const { dieSize, dieSeparation, diePanelOffsetX } = Dimensions; 

        this.faces = [];
        this.diceData.values.forEach((v, i) =>  {
            const df = new DieFace(v, (newValue) => {
                // this.setDieValue(i, newValue);
                this.diceData.setValue(i, newValue);
            });
            df.setPos((i * (dieSize + dieSeparation)) + (dieSeparation/2) + diePanelOffsetX,
                dieSeparation);
            this.children.push(df);
        });
    }

    /*
    setDieValue(index, value) {
        console.log(`setting face ${index} to ${value}`);
        // this.diceData.values[index] = value;
        this.diceData.setValue(index, value);
    }
    */

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
        ctx.fillText(this.label, 10, dieSize * 0.8);
        ctx.restore();
    }

    render(ctx) {
        ctx.save();

        ctx.fillStyle = this.diceData.color;
        ctx.fillRect(0, 0, this.bounds.x, this.bounds.y);
        ctx.strokeRect(0, 0, this.bounds.x, this.bounds.y);

        this.drawDieName(ctx);

        ctx.restore();
    }
}