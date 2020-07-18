export const Relations = {
    GREATER_OR_EQUAL: 1,
    LESS_OR_EQUAL: 2,
    GREATER: 3,
    LESSER: 4
}

export const ChallengeData = [
    {
        id: 1,
        dieA: {
            sides: 6,
            values: [3,3,3,3,3,3]
        },
        dieB: {
            sides: 6,
            values: [3,3,3,3,3,3]
        },
        playerPips: 18,
        target: {
            targetVal: 0.5,
            targetRel: Relations.GREATER_OR_EQUAL
        }
    },
    {
        id: 2,
        dieA: {
            sides: 4,
            values: [1,2,3,4]
        },
        dieB: {
            sides: 4,
            values: [3,3,3,3]
        },
        playerPips: -1,
        target: {
            targetVal: 0.25,
            targetRel: Relations.GREATER_OR_EQUAL
        }
    },
    {
        id: 3,
        dieA: {
            sides: 8,
            values: [2,4,2,4,2,4,6,6]
        },
        dieB: {
            sides: 4,
            values: [3,3,3,3]
        },
        playerPips: 16,
        target: {
            targetVal: 0.75,
            targetRel: Relations.GREATER_OR_EQUAL
        }
    },
]