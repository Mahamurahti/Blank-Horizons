export function showNotification(setter) {
    setter(true)
    setTimeout(() => {
        setter(false)
    }, 2000)
}

export const GameStatus = {
    WIN: 'win',
    LOSE: 'lose'
}

export function checkIfWon(correct, wrong, word) {
    let status = GameStatus.WIN

    word.split('').forEach(letter => {
        if(!correct.includes(letter)) status = ''
    })

    if(wrong.length >= 6) status = GameStatus.LOSE

    return status
}