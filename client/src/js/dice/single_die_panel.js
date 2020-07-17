import { Entity } from '../common/entity';
import { Dimensions, Colors } from '../ui/styles';
import { DieFace } from '../dice/die_face';

export class SingleDiePanel extends Entity {
    constructor(diceData) {
        super();
        this.diceData = diceData;

        this.bounds.x = (this.diceData.numSides * (Dimensions.dieSize + Dimensions.dieSeparation));
        this.bounds.y = Dimensions.dieSize + (Dimensions.dieSeparation * 2);

        this.initFaces();
    }

    initFaces() {
        const { dieSize, dieSeparation } = Dimensions; 

        this.faces = [];
        this.diceData.values.forEach((v, i) =>  {
            const df = new DieFace(v, (newValue) => {
                this.setDieValue(i, newValue);
            });
            df.setPos((i * (dieSize + dieSeparation)) + (dieSeparation/2), dieSeparation);

            this.children.push(df);
        });
    }

    setDieValue(index, value) {
        console.log(`setting face ${index} to ${value}`);
        this.diceData.values[index] = value;
    }

    // maybe alter pips
    onClick(pos) {
        console.log('clicked on dice panel');
    }

    /*
    drawFace(ctx, n) {
        const { dieSize, dieSeparation } = Dimensions; 

        ctx.save();
        ctx.strokeRect(0, 0, dieSize, dieSize);
        ctx.fillStyle = '#000';
        ctx.translate(dieSize/2, dieSize/2);
        ctx.fillText(`${n}`, 0, 0);
        ctx.restore();
    }

    drawFaces(ctx) {
        const { dieSize, dieSeparation } = Dimensions; 

        ctx.save();

        ctx.translate(dieSeparation/2, dieSeparation);
        this.diceData.values.forEach(v => {
            // this.drawFace(ctx, v);
            ctx.translate(dieSize + dieSeparation, 0);
        });
        ctx.restore();
    }
    */

    render(ctx) {
        ctx.save();

        ctx.strokeRect(0, 0, this.bounds.x, this.bounds.y);

        // this.drawFaces(ctx);

        ctx.restore();
    }
}