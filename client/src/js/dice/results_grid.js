import { Entity } from '../common/entity';
import { Dimensions, Colors } from '../ui/styles';

/*
Renders competitive results for two dice
Hard-coded to only support two, since more would require a drastically different
approach to visual display
*/
export class ResultsGrid extends Entity {
    constructor(gr) {
        super();
        this.registry = gr;

        const { diceManager } = this.registry;

        this.dieA = diceManager.getDie(0) || null;
        this.dieB = diceManager.getDie(1) || null;
    }

    renderError(ctx) {
        const { resultsPanelSize } = Dimensions; 
        
        ctx.save();

        ctx.textAlign = "center";
        ctx.translate(resultsPanelSize/2, resultsPanelSize/2);
        ctx.fillText('Grid requires two dice', 0, 0);
        ctx.restore();
    }

    renderGrid(ctx) {
        const { resultsPanelSize } = Dimensions; 
        
        const d1 = this.dieA;
        const d2 = this.dieB;

        const valuesA = [...this.dieA.values].sort();
        const valuesB = [...this.dieB.values].sort();

        const gridUnitsX = d1.numSides + 1;
        const gridUnitsY = d2.numSides + 1;

        const cellWidth = resultsPanelSize / gridUnitsX;
        const cellHeight = resultsPanelSize / gridUnitsY;

        const fontSize = Math.floor(Math.min(cellWidth, cellHeight) * 0.8);

        ctx.save();
        ctx.font = `${fontSize}px Helvetica`;

        ctx.save();
        ctx.translate(cellWidth, cellHeight);

        // render actual results
        for (let i=0; i < d1.numSides; i++) {
            for (let j=0; j < d2.numSides; j++) {
                let fillColor = Colors.tiedColor;
                if (valuesA[i] > valuesB[j]) {
                    fillColor = d1.color;
                } else if (valuesB[j] > valuesA[i]) {
                    fillColor = d2.color;
                }
                ctx.fillStyle = fillColor;
                ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }
        ctx.restore();

        ctx.strokeRect(0, 0, resultsPanelSize, resultsPanelSize);

        // draw grid units
        ctx.save();
        for (let i=0; i < gridUnitsX; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, resultsPanelSize);
            ctx.stroke();

            if (i > 0) {
                ctx.save();
                ctx.translate(cellWidth * 0.2, cellHeight * 0.8);
                ctx.fillText(valuesA[i-1]+'', 0, 0);
                ctx.restore();
            }

            ctx.translate(cellWidth, 0);
        }
        ctx.restore();

        // draw grid units
        ctx.save();
        for (let i=0; i < gridUnitsY; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(resultsPanelSize, 0);
            ctx.stroke();

            if (i > 0) {
                ctx.save();
                ctx.translate(cellWidth * 0.2, cellHeight * 0.8);
                ctx.fillText(valuesB[i-1]+'', 0, 0);
                ctx.restore();
            }

            ctx.translate(0, cellHeight);
        }
        ctx.restore();

        
        ctx.restore();
    }

    render(ctx) {
        if (this.dieA === null || this.dieB === null) {
            this.renderError(ctx);
            return;
        }

        this.renderGrid(ctx);
    } 
}