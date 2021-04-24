var app = new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){
            let damage = this._calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for' + damage
            })
            if (this._checkWin()){
                return;
            }
            this._monsterAttack();
        },
        specialAttack: function (){
            let damage = this._calculateDamage(10, 20);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster Hard for' + damage
            })
            if (this._checkWin()){
                return;
            }
            this._monsterAttack();
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            })
            this._monsterAttack();
        },
        giveUp: function(){
            this.gameIsRunning = false;
        },
        _monsterAttack: function (){
            let damage = this._calculateDamage(5, 15);
            this.playerHealth -=damage;
            this._checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for' + damage
            })
        },
        _calculateDamage: function (min, max){
            return Math.max(Math.floor(Math.random()*max)+1, min);
        },
        _checkWin: function (){
            if(this.monsterHealth <= 0){
                if (confirm('You Won! New Game!')){
                    this.startGame()
                } else{
                    this.gameIsRunning = false;
                }
                return true;
            } else if(this.playerHealth <=0){
                if (confirm('You Lost! New Game!')){
                    this.startGame()
                } else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false
        }

    }
})