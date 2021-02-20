const calculateRandom = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      mana: 0,
      winner: null,
      log: [],
    };
  },
  computed: {
    playerHealthBar() {
      return { width: this.playerHealth + "%" };
    },
    monsterHealthBar() {
      return { width: this.monsterHealth + "%" };
    },
    specialAttackReady() {
      return this.mana >= 3;
    },
  },
  watch: {
    playerHealth(value) {
      if (value === 0 && this.monsterHealth === 0) {
        this.winner = "draw";
      } else if (value === 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value === 0 && this.playerHealth === 0) {
        this.winner = "draw";
      } else if (value === 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.mana++;
      const attack = calculateRandom(5, 12);
      this.monsterHealth -= attack;
      if (this.monsterHealth < 0) this.monsterHealth = 0;
      this.addLog("Player", "attacked for", attack);
      this.attackBack();
    },
    specialAttack() {
      this.mana = 0;
      const attack = calculateRandom(5, 12) + calculateRandom(5, 12);
      this.monsterHealth -= attack;
      if (this.monsterHealth < 0) this.monsterHealth = 0;
      this.addLog("Player", "special attacked for", attack);
      this.attackBack();
    },
    heal() {
      this.mana++;
      const healValue = calculateRandom(8, 20);
      this.playerHealth += healValue;
      if (this.playerHealth > 100) this.playerHealth = 100;
      this.addLog("Player", "heals for", healValue);
      this.attackBack();
    },
    surrender() {
      this.addLog("Player", "surrender", "");
      this.winner = "monster";
    },
    attackBack() {
      const attack = calculateRandom(8, 15);
      this.playerHealth -= attack;
      if (this.playerHealth < 0) this.playerHealth = 0;
      this.addLog("Monster", "attacks for", attack);
    },
    addLog(who, what, value) {
      this.log.unshift(`${who} ${what} ${value}`);
    },
    newGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.mana = 0;
      this.winner = null;
      this.log = [];
    },
  },
});

app.mount("#game");
