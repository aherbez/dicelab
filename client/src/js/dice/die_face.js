import { Entity } from '../common/entity';
import { Dimensions, Colors } from '../ui/styles';

class DiePip extends Entity {
    constructor() {
        super();
        const { pipRad } = Dimensions;

        this.bounds.x = pipRad;
        this.bounds.y = pipRad;
    }
    
    onClick(pos) {
        const { pipRad } = Dimensions;

        const len = pos.x * pos.x + pos.y * pos.y;
        if (len <= (pipRad * pipRad)) {
            console.log('removing pip!');
        }
    }

    render(ctx) {
        const { pipRad } = Dimensions;
        const { pipColor } = Colors; 

        ctx.save();


        ctx.beginPath();
        ctx.arc(pipRad/2, pipRad/2, pipRad, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

export class DieFace extends Entity {
    constructor(n, changeCB) {
        super();
        this.changeCB = changeCB || null;
        this.setNumPips(n);
    }

    setNumPips(n) {
        const { dieSize, pipRad } = Dimensions;

        const pipOffset = -(pipRad/2);
        this.pips = [];

        // top-left
        if (n > 3) {
            const p = new DiePip();
            p.setPos(dieSize * 0.2 + pipOffset, dieSize * 0.2 + pipOffset);
            this.pips.push(p);            
        }

        // top-right
        if (n > 1) {
            const p = new DiePip();
            p.setPos(dieSize * 0.8 + pipOffset, dieSize * 0.2 + pipOffset);
            this.pips.push(p);
        }

        // cent-left and cent-right
        if (n > 5) {
            const p = new DiePip();
            p.setPos(dieSize * 0.2 + pipOffset, dieSize * 0.5 + pipOffset);
            this.pips.push(p);            

            const p2 = new DiePip();
            p2.setPos(dieSize * 0.8 + pipOffset, dieSize * 0.5 + pipOffset);
            this.pips.push(p2);
        }

        // center dot
        if ((n % 2 === 1) || (n > 6)) {
            const p = new DiePip();
            p.setPos(dieSize * 0.5 + pipOffset, dieSize * 0.5 + pipOffset);
            this.pips.push(p);
        }

        // bottom-left
        if (n > 1) {
            const p = new DiePip();
            p.setPos(dieSize * 0.2 + pipOffset, dieSize * 0.8 + pipOffset);
            this.pips.push(p); 
        }

        // bottom-right
        if (n > 3) {
            const p = new DiePip();
            p.setPos(dieSize * 0.8 + pipOffset, dieSize * 0.8 + pipOffset);
            this.pips.push(p);
        }

        // top-cent
        if (n > 6) {
            const p = new DiePip();
            p.setPos(dieSize * 0.5 + pipOffset, dieSize * 0.2 + pipOffset);
            this.pips.push(p);
        }

        // bottom-cent
        if (n > 6) {
            const p = new DiePip();
            p.setPos(dieSize * 0.5 + pipOffset, dieSize * 0.8 + pipOffset);
            this.pips.push(p);
        }

        this.children = [];
        this.children = this.children.concat(this.pips);
    }

    onClick(pos) {

    }

    render(ctx) {
        const { dieSize } = Dimensions;

        ctx.save();

        ctx.strokeRect(0, 0, dieSize, dieSize);


        ctx.restore();
    }
}