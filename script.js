const app = document.getElementById('app')
const fields = []
const players = [ 
    {
        'name': 'player 1',
        'color': 'red',
        'field': 'cross',
        'wins': 0
    },
    {
        'name': 'player 2',
        'color': 'green',
        'field': 'circle',
        'wins': 0
    },
]
let player = 0;

for(let i = 0; i < 9; i++) { 
    const field = document.createElement('div')

    field.addEventListener('click', function(event){

        console.log(event)
        if(!field.classList.contains('circle') && !field.classList.contains('cross')){
            const currentPlayer = players[player]
            field.classList.add(currentPlayer.field)
            if(isEnd()){
                alert('выиграл игрок - ' + currentPlayer.name )
                ++currentPlayer.wins
                alert(players[0].wins + ":" + players[1].wins)
                clear()
            }
            else if(isDraw()){
                alert('ничья')
                alert(players[0].wins + ":" + players[1].wins)
                clear()
            }
            else {
                if(player === 0){
                    player = 1
                }
                else if(player === 1){
                    player = 0
                }
            }
        }
        
    });

    field.classList.add('field')
    app.appendChild(field)
    fields.push(field)
}

function clear(){
    player = 0
    for(let i of fields){
            i.classList.remove('cross')
            i.classList.remove('circle')
    }
}

function isEnd(){
    let res = false
    const n = 3
    // Горизонталь
    for(let i = 0; i < fields.length; i+=n){  // обход по рядам
        const cell = fields[i] // ячейка
        let isWin = true
        for(let j = i + 1; j < i + n && isWin; j++){ // обход по ряду
            const nextCell = fields[j]
            if( cell.classList.contains('cross') && nextCell.classList.contains('circle') ||
                cell.classList.contains('circle') && nextCell.classList.contains('cross') ||
                !cell.classList.contains('cross') && !cell.classList.contains('circle') ||
                !nextCell.classList.contains('cross') && !nextCell.classList.contains('circle')
              ){
                isWin = false
            }
        }
        if(isWin){
            res = isWin
        }
    }

    // Вертикаль
    for(let i = 0; i < n; i++){ // Обход по столбцам
        const firstCell = fields[i]
        let isWin = true
        for(let j = i; j < fields.length && isWin; j+=n){ // Обход по столбцу
            const cell = fields[j]
            if( firstCell.classList.contains('cross') && cell.classList.contains('circle') ||
                firstCell.classList.contains('circle') && cell.classList.contains('cross')||
                !firstCell.classList.contains('cross') && !firstCell.classList.contains('circle') ||
                !cell.classList.contains('cross') && !cell.classList.contains('circle')
                ){
                isWin = false
            }
        }
        if(isWin){
            res = isWin
        }
    }

    // Главная диагональ
    let isWin = true
    for(let i = n + 1; i < fields.length && isWin; i+=n+1){ // Обход по диагонали
        if( fields[0].classList.contains('cross') && fields[i].classList.contains('circle') ||
            fields[0].classList.contains('circle') && fields[i].classList.contains('cross')||
            !fields[0].classList.contains('cross') && !fields[0].classList.contains('circle') ||
            !fields[i].classList.contains('cross') && !fields[i].classList.contains('circle')
          ){
            isWin = false
        }
    }
    if(isWin){
        res = isWin
    }

    // Второстепенная диагональ
    isWin = true
    for(let i = 2 * n - 2; i < fields.length - 1 && isWin; i += n - 1){ // Обход по диагонали
        if( fields[n-1].classList.contains('cross') && fields[i].classList.contains('circle') ||
            fields[n-1].classList.contains('circle') && fields[i].classList.contains('cross')||
            !fields[n-1].classList.contains('cross') && !fields[n-1].classList.contains('circle') ||
            !fields[i].classList.contains('cross') && !fields[i].classList.contains('circle')
          ){
            isWin = false
        }
    }
    if(isWin){
        res = isWin
    }

    return res
}

function isDraw(){
    let res = true

    for(let i of fields){
        if(!i.classList.contains('cross') && !i.classList.contains('circle')){
            res = false
        }
    }

    return res
}