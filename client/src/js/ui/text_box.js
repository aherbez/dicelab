import { Entity } from '../common/entity';
import { Colors, Dimensions } from '../ui/styles';

export class TextBox extends Entity {
    constructor(w) {
        super();
        
        this.width = w;

        this._text = '';
        this.isDirty = false;
        this.lines = [];
    }

    set text(t) {
        this._text = t;
        this.isDirty = true;
    }

    _updateText(ctx) {
        const words = this._text.split(' ');
        this.lines = [];
        let currLine = words[0];

        for (let i=1; i < words.length; i++ ) {
            let metrics = ctx.measureText(currLine + ' ' + words[i]);
            if (metrics.width > this.width) {
                this.lines.push(currLine);
                currLine = words[i];
            } else {
                currLine += ` ${words[i]}`;
            }
        }
        this.lines.push(currLine);

        this.isDirty = false;
    }

    render(ctx) {
        const { textColor } = Colors;

        ctx.save();
        ctx.fillStyle = textColor;
        ctx.font = '20px Helvetica';

        if (this.isDirty) {
            this._updateText(ctx);
        }

        this.lines.forEach(l => {
            ctx.fillText(l, 0, 0);
            ctx.translate(0, 20);
        });

        // ctx.fillText(this._text, 0, 0);

        ctx.restore();
    }
}