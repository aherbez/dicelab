import { percentStr } from '../common/utils'; 
import { ChallengeData, Relations } from './challenge_data';



export class Challenge {
    constructor(data) {
        this.id = data.id || -1;
        this.dieA = {
            sides: data.dieA.sides || 6,
            values: data.dieA.values || [1,2,3,4,5,6]
        }
        
        this.dieB = {
            sides: data.dieB.sides || 6,
            values: data.dieB.values || [1,2,3,4,5,6],
        }

        // -1 for no set number of pips to use
        this.playerPips = data.playerPips || -1;

        this.target = {
            targetVal: data.target.targetVal || '0.4',
            targetRel: data.target.targetRel || Relations.GREATER_OR_EQUAL
        }
    }

    get challengeText() {
        let s = `Can you make dice B win ${percentStr(this.target.targetVal)}`;

        if (this.playerPips !== -1) {
            s += ` using ${this.playerPips} or fewer pips?`;
        }
        return s;
    }
}

export class ChallengeManager {
    constructor(gr) {
        this.registry = gr;
        this.challenges = new Map();
        ChallengeData.forEach(cData => {
            const challenge = new Challenge(cData);
            this.challenges.set(challenge.id, challenge);
        });

        this.lastChallengeID = -1;
        this._currentChallenge = null;
    }

    setToFreeplay() {
        this._currentChallenge = null;
        this.registry.diceManager.clearChallenge();
    }

    setChallenge(id) {
        if (this.challenges.has(id)) {
            this._currentChallenge = this.challenges.get(id);
        
            // setup dice
            this.registry.diceManager.setFromChallenge(this._currentChallenge);
            this.lastChallengeID = id;
        }
    }

    setToRandomChallenge() {
        let keys = Array.from(this.challenges.keys());

        // remove the most recent one
        keys = keys.filter(v => {
            return v !== this.lastChallengeID;
        });

        const challengeID = keys[Math.floor(Math.random() * keys.length)];

        this.setChallenge(challengeID);
    }

    // null for freeplay mode
    get currentChallenge() {
        return this._currentChallenge;
    }


}