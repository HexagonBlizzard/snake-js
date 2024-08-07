'use strict';
let x = 17;
let y = 11;
let templocalx = 0;
let templocaly = 0;
let a = Array(...Array(x)).map(() => Array(...Array(y)));
let i1;
let j1;
let end;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
let winner = '';
let islose;
let isreverse;
let p1wins = 0;
let p2wins = 0;
let max;
let appleplaced = false;
let p1score = document.getElementById('p1score');
let p2score = document.getElementById('p2score');
let islooping = true;
let temp = false;
if (document.documentElement.clientWidth / x > document.documentElement.clientHeight / y){
    canvas.width = document.documentElement.clientHeight / y * x;
    canvas.height = document.documentElement.clientHeight;
    canvas.style.height = '100%';
    canvas.style.left = (document.documentElement.clientWidth-canvas.width)/2;
}
else {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientWidth / x * y;
    canvas.style.width = '100%';
    canvas.style.top = (document.documentElement.clientHeight-canvas.height)/2;
}
var Mgradient = ctx.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
var BGgradient = ctx.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
var AGradient = ctx.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
AGradient.addColorStop(0, '#311181');
AGradient.addColorStop(1, '#650682');
BGgradient.addColorStop(0, '#010121');
BGgradient.addColorStop(1, '#150120');
Mgradient.addColorStop(0, "#D13131");
Mgradient.addColorStop(1, "#95D120");
let w = (canvas.width / x);
let h = (canvas.height / y);
let userimg = document.getElementById("user1img")
if (userimg.clientWidth > userimg.clientHeight){
    userimg.style.width = "4vh"
    userimg.style.top = ((document.documentElement.clientHeight / 25) - userimg.height) / 2 + document.documentElement.clientHeight / 100;
}
else {
    userimg.style.height = "4vh"
    userimg.style.top = document.documentElement.clientHeight / 100;
}
userimg = document.getElementById("user2img")
if (userimg.clientWidth > userimg.clientHeight){
    userimg.style.width = "4vh";
    userimg.style.top = ((document.documentElement.clientHeight / 25) - userimg.height) / 2 + document.documentElement.clientHeight / 100;
}
else {
    userimg.style.height = "4vh";
    userimg.style.top += document.documentElement.clientHeight / 100;
}
class Snake{
    constructor (name, x, y, dir, len){
        this.name = name;
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.buffer = dir;
        this.buffertime = false;
        this.len = len;
        this.id = 0
        this.data = [x, y, len, dir]
    }
    reset(){
        this.x = this.data[0];
        this.y = this.data[1];
        this.dir = this.data[3];
        this.buffer = this.data[3];
        this.buffertime = false;
        this.len = this.data[2];
    }
}
let playrs = [new Snake('p1', 9, 6, 'up', 4), new Snake('p2', 2, 6, 'up', 4)];
function rand(max) {
    return Math.floor(Math.random() * max);
} //функция, возвращающая целочисленное рандомное число, но max - потолок
for (let i = 0; i < playrs.length;i++){
    playrs[i].id = i;
}
let p1 = 0
let p2 = 1
function placeApple() {
    let x1 = rand(x);
    let y1 = rand(y);
    while (typeof(a[x1][y1]) == 'object'){
        if (x1 != x) {
            x1++;
        }
        else if (x1 == x && y1 == y){
            x1 = 0;
            y1 = 0;
        }
        else {
            x1 = 0;
            y1++;
        }
    }
    a[x1][y1] = -1;
    appleplaced = true;
} //функция, ставящая яблоки
function reload() {
    if (winner){
        if (islose){
            console.log(winner + ' lose');
        }
        else {
            console.log(winner + ' win');
        }
    }
    for (let i = 0;i < x;i++) {
        for (let j = 0;j < y;j++) {
            a [i][j] = 0;
        }
    } //заполнение всего массива нулями
    for (let i of playrs){ 
        i.reset();
        let b = 1;
        for (let j = i.y, temp = i.y + i.len; j < temp; j++, b++) {
            a[i.x][j] = [i.id, b];
        } //отметка змейки
    }
    if (winner){
        if (islose){
            if(isreverse){
                if (winner == 'p1'){
                    p1wins += 1;
                }
                else{
                    p2wins += 1;
                }
            }
            else{
                if (winner == 'p1'){
                    p2wins += 1;
                }
                else{
                    p1wins += 1;
                }
            }
        }
        else{
            if (isreverse){
                if (winner == 'p1'){
                    p2wins += 1;
                }
                else{
                    p1wins += 1;
                }
            }
            else{
                if (winner == 'p1'){
                    p1wins += 1;
                }
                else{
                    p2wins += 1;
                }
            }
        }
    }

    if (Math.random()>0.5){
        isreverse = true
    }
    else{
        isreverse = false
    }
    if (isreverse){
        p1 = 1
        p2 = 0
    }
    else{
        p1 = 0
        p2 = 1
    }
    p1score.innerHTML = p1wins;
    p2score.innerHTML = p2wins;
    winner = '';
    islose = false;
    placeApple();
} // функция подготовки карты
reload();
document.addEventListener('keydown', function (e){
    switch (e.key){
        case ('P'):
        case ('З'):
        case ('p'):
        case ('з'):
            end = !end;
            break;
        case ('ArrowLeft'):
            if (playrs[p1].x - 1 == -1){
                templocalx = x - 1;
            }
            else{
                templocalx = playrs[p1].x - 1;
            }
            temp = a[templocalx][playrs[p1].y][0] != p1 || a[templocalx][playrs[p1].y][1] != 2;
            if (temp){
                playrs[p1].dir = 'left';
                playrs[p1].buffertime = true;
            }
            if (playrs[p1].buffertime && temp){
                playrs[p1].buffer = 'left';
            }
            break;
        case ('ArrowUp'):
            if (playrs[p1].y - 1 == -1){
                templocaly = y - 1;
            }
            else{
                templocaly = playrs[p1].y - 1;
            }
            temp = a[playrs[p1].x][templocaly][0] != p1 || a[playrs[p1].x][templocaly][1] != 2;
            if (temp){
                playrs[p1].dir = 'up';
                playrs[p1].buffertime = true;
            }
            if (playrs[p1].buffertime && temp){
                playrs[p1].buffer = 'up';
            }
            break;
        case ('ArrowRight'):
            if (playrs[p1].x + 1 == x){
                templocalx = 0;
            }
            else{
                templocalx = playrs[p1].x + 1;
            }
            temp = a[templocalx][playrs[p1].y][0] != p1 || a[templocalx][playrs[p1].y][1] != 2;
            if (temp){
                playrs[p1].dir = 'right';
                playrs[p1].buffertime = true;
            }
            if (playrs[p1].buffertime && temp){
                playrs[p1].buffer = 'right';
            }
            break;
        case ('ArrowDown'):
            if (playrs[p1].y + 1 == y){
                templocaly = 0;
            }
            else{
                templocaly = playrs[p1].y + 1;
            }
            temp = a[playrs[p1].x][templocaly][0] != p1 || a[playrs[p1].x][templocaly][1] != 2;
            if (temp){
                playrs[p1].dir = 'down';
                playrs[p1].buffertime = true;
            }
            if (playrs[p1].buffertime && temp){
                playrs[p1].buffer = 'down';
            }
            break;
        case ('Ф'):
        case ('A'):
        case ('ф'):
        case ('a'):
            if (playrs[p2].x - 1 == -1){
                templocalx = x - 1;
            }
            else{
                templocalx = playrs[p2].x - 1;
            }
            temp = a[templocalx][playrs[p2].y][0] != p2 || a[templocalx][playrs[p2].y][1] != 2;
            if (temp){
                playrs[p2].dir = 'left';
                playrs[p2].buffertime = true;
            }
            if (playrs[p2].buffertime && temp){
                playrs[p2].buffer = 'left';
            }
            break;
        case ('Ц'):
        case ('W'):
        case ('ц'):
        case ('w'):
            if (playrs[p2].y - 1 == -1){
                templocaly = y - 1;
            }
            else{
                templocaly = playrs[p2].y - 1;
            }
            temp = a[playrs[p2].x][templocaly][0] != p2 || a[playrs[p2].x][templocaly][1] != 2;
            if (temp){
                playrs[p2].dir = 'up';
                playrs[p2].buffertime = true;
            }
            if (playrs[p2].buffertime && temp){
                playrs[p2].buffer = 'up';
            }
            break;
        case ('В'):
        case ('D'):
        case ('в'):
        case ('d'):
            if (playrs[p2].x + 1 == x){
                templocalx = 0;
            }
            else{
                templocalx = playrs[p2].x + 1;
            }
            temp = a[templocalx][playrs[p2].y][0] != p2 || a[templocalx][playrs[p2].y][1] != 2;
            if (temp){
                playrs[p2].dir = 'right';
                playrs[p2].buffertime = true;
            }
            if (playrs[p2].buffertime && temp){
                playrs[p2].buffer = 'right';
            }
            break;
        case ('Ы'):
        case ('S'):
        case ('ы'):
        case ('s'):
            if (playrs[p2].y + 1 == y){
                templocaly = 0;
            }
            else{
                templocaly = playrs[p2].y + 1;
            }
            temp = a[playrs[p2].x][templocaly][0] != p2 || a[playrs[p2].x][templocaly][1] != 2;
            if (temp){
                playrs[p2].dir = 'down';
                playrs[p2].buffertime = true;
            }
            if (playrs[p2].buffertime && temp){
                playrs[p2].buffer = 'down';
            }
            break;
    }
}) //определение направления движения
function Iteration() {
    if (!end){
        ctx.fillStyle = BGgradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        for (let i = 0;i < x;i++){
            for (let j = 0;j < y;j++){
                if (typeof(a[i][j]) == 'object'){
                    if (a[i][j][1] >= playrs[a[i][j][0]].len){
                        a[i][j] = 0;
                    }
                    else {
                        a[i][j][1] += 1;
                    }
                }
            }
        } //отрезаем ей хвост
        for (let i of playrs){
            switch (i.dir){
                case ('down'):
                    i.y++;
                    if (i.y == y) {
                        if (islooping){
                            i.y = 0;
                            if (typeof(a[i.x][i.y]) == 'object') {
                                islose = true
                                winner = i.name;
                                reload();
                                return;
                            }
                        }
                        else{
                            islose = true
                            winner = i.name;
                            reload();
                            return;
                        }
                    }
                    if (typeof(a[i.x][i.y]) == 'object') {
                        islose = true
                        winner = i.name;
                        reload();
                        return;
                    }
                    else if (a[i.x][i.y] == 0) {
                        a[i.x][i.y] = [i.id, 1];
                    }
                    else if (a[i.x][i.y] == -1) {
                        a[i.x][i.y] = [i.id, 1];
                        i.len++;
                        appleplaced = false;
                    }
                    break;
                case ('right'):
                    i.x++;
                    if (i.x == x){
                        if (islooping){
                            i.x = 0;
                            if (typeof(a[i.x][i.y]) == 'object') {
                                islose = true
                                winner = i.name;
                                reload();
                                return;
                            }
                        }
                        else{
                            islose = true
                            winner = i.name;
                            reload();
                            return;
                        }
                    }
                    if (typeof(a[i.x][i.y]) == 'object'){
                        islose = true
                        winner = i.name;
                        reload();
                        return;
                    }
                    else if (a[i.x][i.y] == 0){
                        a[i.x][i.y] = [i.id, 1];
                    } 
                    else if (a[i.x][i.y] == -1){
                        a[i.x][i.y] = [i.id, 1];
                        i.len++;
                        appleplaced = false;
                    }
                    break;
                case ('up'):
                    i.y--;
                    if (i.y == -1) {
                        if (islooping){
                            i.y = y-1;
                            if (typeof(a[i.x][i.y]) == 'object') {
                                islose = true
                                winner = i.name;
                                reload();
                                return;
                            }
                        }
                        else{
                            islose = true
                            winner = i.name;
                            reload();
                            return;
                        }
                    }
                    if (typeof(a[i.x][i.y]) == 'object') {
                        islose = true
                        winner = i.name;
                        reload();
                        return;
                    }
                    else if (a[i.x][i.y] == 0) {
                        a[i.x][i.y] = [i.id, 1];
                    }
                    else if (a[i.x][i.y] == -1) {
                        a[i.x][i.y] = [i.id, 1];
                        i.len++;
                        appleplaced = false;
                    }
                    break;
                case ('left'):
                    i.x--;
                    if (i.x == -1) {
                        if (islooping){
                            i.x = x-1;
                            if (typeof(a[i.x][i.y]) == 'object') {
                                islose = true
                                winner = i.name;
                                reload();
                                return;
                            }
                        }
                        else{
                            islose = true
                            winner = i.name;
                            reload();
                            return;
                        }
                    }
                    if (typeof(a[i.x][i.y]) == 'object') {
                        islose = true
                        winner = i.name;
                        reload();
                        return;
                    }
                    else if (a[i.x][i.y] == 0) {
                        a[i.x][i.y] = [i.id, 1];
                    }
                    else if (a[i.x][i.y] == -1) {
                        a[i.x][i.y] = [i.id, 1];
                        i.len++;
                        appleplaced = false;
                    }
            }//двигаем голову змейки
            if (i.buffertime){
                switch (i.buffer){
                    case ('left'):
                        if (i.x-1 > -1){
                            if (a[i.x - 1][i.y] != [i.id, 2]){
                                i.dir = i.buffer;
                            }
                        }
                        break;
                    case ('top'):
                        if (i.y-1 > -1){
                            if (a[i.x][i.y - 1] != [i.id, 2]){
                                i.dir = i.buffer;
                            }
                        }
                        break;
                    case ('right'):
                        if (i.x+1 < x){
                            if (a[i.x + 1][i.y] != [i.id, 2]){
                                i.dir = i.buffer;
                            }
                        }
                        break;
                    case ('down'):
                        if (i.y+1 < y){
                            if (a[i.x][i.y + 1] != [i.id, 2]){
                                i.dir = i.buffer;
                            }
                        }
                        break;         
                }
                i.buffertime = false;
            }//теперь за одну итерацию можно сделать разворот
        }
        if (!appleplaced) {
            placeApple();
        }// ставлю яблоко
        for (let i = 0;i < x;i++) {
            for (let j = 0;j < y;j++) {
                i1 = i*w;
                j1 = j*h;
                if (typeof(a[i][j]) == 'object') {
                    if (a[i][j][0] == 0){
                        ctx.fillStyle = AGradient;
                    }
                    else {
                        ctx.fillStyle = Mgradient;
                    }
                    ctx.fillRect(i1, j1, w+1, h+1);
                }
                else if (a[i][j] == -1) {
                    ctx.fillStyle = '#CC2222';
                    ctx.fillRect(i1, j1, w, h);
                }
            }
        } //рисуем всё то, что получилось
    }
}
setInterval(()=>{Iteration()}, 150); //сам игровой цикл