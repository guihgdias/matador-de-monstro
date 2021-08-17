new Vue({
    el: '#app',

    data: {
        playerLife: 100,
        monsterLife: 100,
        running: false,
        logs: []
    },

    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },

    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        resetGame() {
            this.running = false
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(ultimate) {
            if(this.monsterLife > 0) {
                this.attackPower('playerLife', 1, 10, false, 'Monstro', 'Jogador', 'monster')
            }
            
            if(this.playerLife > 0){
                this.attackPower('monsterLife', 1, 10, ultimate, 'Jogador', 'Monstro', 'player')
            }
        },
        attackPower(atr, min, max, ultimate, source, target, cls) {
            const plus = ultimate ? 1 : 0
            const hurt = this.getRandom(min + plus, max + plus) 
            this[atr] = Math.max(this[atr] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt} de dano`, cls)
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerLife = Math.min(this.playerLife + heal, 100)
            this.registerLog(`O jogador se curou ${heal} de HP`, 'heal')
        },
        healAttack() {
            this.heal(3, 7)
            this.attackPower('playerLife', 1, 10, false, 'Monstro', 'Jogador', 'monster')
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            this.logs.unshift({text, cls})
        }
    },

    watch: {
        hasResult(value) {
            if(value == true) this.running = false
        }
    }
})