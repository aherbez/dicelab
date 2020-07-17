import { Entity } from '../common/entity';
import { Dimensions, Colors } from '../ui/styles';
import { percentStr } from '../common/utils'; 

export class ResultsPercent extends Entity {
    constructor(gr) {
        super();
        this.registry = gr;
        const { percentPanelW, percentPanelH } = Dimensions;
        
        this.bounds.x = percentPanelW;
        this.bounds.y = percentPanelH;
        
    }

    render(ctx) {
        const { diceManager } = this.registry;
        const { percentPanelW, percentPanelH } = Dimensions;
        const { tiedColor, textColor } = Colors; 

        const outcome = diceManager.getResults();
        const {
            dieAindex,
            dieBindex,
            ties,
            dieA,
            dieB,
            dieAPercent,
            dieBPercent
        } = outcome; 

        const dA = diceManager.getDie(dieAindex);
        const dB = diceManager.getDie(dieBindex);

        ctx.save();

        const rowH = percentPanelH / 3;
        const colW = percentPanelW / 4;

        // draw color fills
        ctx.save();
        ctx.fillStyle = dA.color;
        ctx.fillRect(0, 0, colW, rowH);
        ctx.fillStyle = dB.color;
        ctx.fillRect(0, rowH, colW, rowH);
        ctx.fillStyle = tiedColor;
        ctx.fillRect(0, (rowH * 2), colW, rowH);
        ctx.restore();

        // draw text
        ctx.save();
        ctx.fillStyle = textColor;
        ctx.font = `${rowH * 0.8}px Helvetica`;
        ctx.textAlign = "center";
        ctx.fillText(dA.label, colW * 0.5, rowH * 0.8);
        ctx.fillText(dB.label, colW * 0.5, rowH * 1.8);
        ctx.font = `${colW/4}px Helvetica`;
        ctx.fillText('tied', colW * 0.5, rowH * 2.8);
        ctx.restore();

        // draw totals
        ctx.save();
        ctx.fillStyle = textColor;
        ctx.font = `${rowH * 0.6}px Helvetica`;
        ctx.textAlign = "center";
        ctx.fillText(`${dieA}`, colW * 1.5, rowH * 0.8);
        ctx.fillText(`${dieB}`, colW * 1.5, rowH * 1.8);
        ctx.fillText(`${ties}`, colW * 1.5, rowH * 2.8);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = textColor;
        ctx.font = `${colW * 0.4}px Helvetica`;
        ctx.textAlign = "center";
        ctx.fillText(`${percentStr(dieAPercent)}`, colW * 2.5, rowH * 0.65);
        ctx.fillText(`${percentStr(dieBPercent)}`, colW * 2.5, rowH * 1.65);
        ctx.restore();

        ctx.save();
        // ctx.strokeRect(0, 0, percentPanelW, percentPanelH);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(colW*3, 0);
        ctx.moveTo(0, rowH);
        ctx.lineTo(colW*3, rowH);
        ctx.moveTo(0, rowH*2);
        ctx.lineTo(colW*3, rowH*2);
        ctx.moveTo(0, rowH*3);
        ctx.lineTo(colW*2, rowH*3);

        ctx.moveTo(0, 0);
        ctx.lineTo(0, rowH*3);
        ctx.moveTo(colW, 0);
        ctx.lineTo(colW, rowH*3);
        ctx.moveTo(colW*2, 0);
        ctx.lineTo(colW*2, rowH*3);
        ctx.moveTo(colW*3, 0);
        ctx.lineTo(colW*3, rowH*2);

        ctx.stroke();

        ctx.restore();


        ctx.restore();

    }
}