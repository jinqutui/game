// ============================================
// RPG英语闯关 - 游戏引擎
// ============================================

const Game = {
  // 游戏状态
  state: {
    currentScreen: 'start',
    currentChapter: null,
    currentStage: null,
    currentQuestion: 0,
    correctCount: 0,
    wrongCount: 0,
    usedHint: false,
    monsterHp: 0,
    monsterMaxHp: 0,
    playerHp: 0,
    playerMaxHp: 0,
    shieldActive: false,
    isAnswering: false,
    combo: 0
  },

  // DOM缓存
  dom: {},

  // 初始化
  init() {
    this.loadProgress();
    this.cacheDom();
    this.bindEvents();
    this.createParticles();
    this.showScreen('start');
    this.updateStartScreen();
  },

  // ---- 存档系统 ----
  loadProgress() {
    try {
      const saved = localStorage.getItem('rpg_english_save');
      if (saved) {
        const data = JSON.parse(saved);
        Object.assign(GAME_DATA.player, data);
      }
    } catch (e) {
      console.warn('存档读取失败:', e);
    }
  },

  saveProgress() {
    try {
      localStorage.setItem('rpg_english_save', JSON.stringify(GAME_DATA.player));
    } catch (e) {
      console.warn('存档保存失败:', e);
    }
  },

  resetProgress() {
    if (confirm('确定要重新开始吗？所有进度将会丢失！')) {
      localStorage.removeItem('rpg_english_save');
      Object.assign(GAME_DATA.player, {
        name: "勇者", level: 1, hp: 100, maxHp: 100,
        exp: 0, maxExp: 100, gold: 0, potions: 3,
        stars: 0, totalStars: 0, achievements: [],
        currentChapter: 1, currentStage: 0, completedStages: {}
      });
      this.showScreen('start');
      this.updateStartScreen();
      this.showToast('进度已重置', 'info');
    }
  },

  // ---- DOM缓存 ----
  cacheDom() {
    this.dom = {
      container: document.getElementById('game-container'),
      screens: {
        start: document.getElementById('start-screen'),
        main: document.getElementById('main-screen'),
        chapter: document.getElementById('chapter-screen'),
        game: document.getElementById('game-screen'),
        result: document.getElementById('result-screen')
      }
    };
  },

  // ---- 事件绑定 ----
  bindEvents() {
    // 开始按钮
    document.getElementById('start-btn').addEventListener('click', () => {
      this.showScreen('main');
      this.renderMainScreen();
    });

    // 继续按钮
    document.getElementById('continue-btn').addEventListener('click', () => {
      this.showScreen('main');
      this.renderMainScreen();
    });

    // 返回按钮
    document.querySelectorAll('.back-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.dataset.back;
        if (target) this.showScreen(target);
        if (target === 'main') this.renderMainScreen();
        if (target === 'chapter') this.renderChapterScreen();
      });
    });

    // 药水按钮
    document.getElementById('potions-btn').addEventListener('click', () => {
      this.usePotion();
    });

    // 商店按钮
    document.getElementById('shop-btn').addEventListener('click', () => {
      this.showModal('shop');
    });

    // 成就按钮
    document.getElementById('achievement-btn').addEventListener('click', () => {
      this.showModal('achievement');
    });

    // 设置按钮
    document.getElementById('settings-btn').addEventListener('click', () => {
      this.showModal('settings');
    });

    // 弹窗关闭
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
        }
      });
    });
  },

  // ---- 页面切换 ----
  showScreen(name) {
    Object.values(this.dom.screens).forEach(s => s.classList.remove('active'));
    this.dom.screens[name].classList.add('active');
    this.state.currentScreen = name;
  },

  // ---- 粒子效果 ----
  createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#00cec9', '#00b894'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      p.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 10}s;
      `;
      container.appendChild(p);
    }
  },

  // ---- 开始页面 ----
  updateStartScreen() {
    const p = GAME_DATA.player;
    const hasProgress = p.currentChapter > 1 || Object.keys(p.completedStages).length > 0;
    document.getElementById('continue-btn').style.display = hasProgress ? 'block' : 'none';
    document.getElementById('player-level-display').textContent = `Lv.${p.level}`;
  },

  // ---- 主页面 ----
  renderMainScreen() {
    const p = GAME_DATA.player;

    // 更新头部信息
    document.getElementById('player-name').textContent = p.name;
    document.getElementById('player-level-text').textContent = `Lv.${p.level}`;
    document.getElementById('stat-hp').textContent = p.hp;
    document.getElementById('stat-gold').textContent = p.gold;
    document.getElementById('stat-potions').textContent = p.potions;
    document.getElementById('stat-stars').textContent = p.totalStars;

    // 渲染章节列表
    const container = document.getElementById('chapters-list');
    container.innerHTML = '';

    GAME_DATA.chapters.forEach((chapter, index) => {
      const chapterNum = index + 1;
      const isUnlocked = chapterNum <= p.currentChapter;
      const isCompleted = this.isChapterCompleted(chapterNum);
      const isCurrent = chapterNum === p.currentChapter && !isCompleted;

      const chapterStars = this.getChapterStars(chapterNum);
      const totalStages = chapter.stages.length;
      const completedStages = this.getCompletedStagesInChapter(chapterNum);
      const progress = totalStages > 0 ? (completedStages / totalStages) * 100 : 0;

      const card = document.createElement('div');
      card.className = `chapter-card ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${!isUnlocked ? 'locked' : ''}`;

      const icons = ['🏰', '🌍', '🛒', '🍽️', '🏙️', '⏰', '🎨', '👨‍👩‍👧‍👦', '🌤️', '🏆'];

      card.innerHTML = `
        <div class="chapter-icon">${icons[index] || '📖'}</div>
        <div class="chapter-info">
          <div class="chapter-title">第${chapterNum}章：${chapter.title}</div>
          <div class="chapter-subtitle">${chapter.subtitle}</div>
          <div class="chapter-progress">
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="chapter-stars">
              ${[1,2,3].map(s => `<span class="star ${s <= chapterStars ? 'earned' : ''}">⭐</span>`).join('')}
            </div>
          </div>
        </div>
        ${!isUnlocked ? '<div class="chapter-lock">🔒</div>' : ''}
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          this.state.currentChapter = chapterNum;
          this.showScreen('chapter');
          this.renderChapterScreen();
        });
      }

      container.appendChild(card);
    });
  },

  // ---- 章节详情页面 ----
  renderChapterScreen() {
    const chapterNum = this.state.currentChapter;
    const chapter = GAME_DATA.chapters[chapterNum - 1];
    const p = GAME_DATA.player;

    document.getElementById('chapter-detail-title').textContent = `第${chapterNum}章：${chapter.title}`;
    document.getElementById('chapter-detail-subtitle').textContent = chapter.subtitle;
    document.getElementById('chapter-description').textContent = chapter.description;

    const container = document.getElementById('stages-list');
    container.innerHTML = '';

    chapter.stages.forEach((stage, index) => {
      const stageKey = `${chapterNum}-${index}`;
      const isUnlocked = index === 0 || p.completedStages[`${chapterNum}-${index - 1}`];
      const isCompleted = p.completedStages[stageKey];
      const isBoss = stage.type === 'battle';
      const stageStars = p.completedStages[stageKey]?.stars || 0;

      const card = document.createElement('div');
      card.className = `stage-card ${isCompleted ? 'completed' : ''} ${isBoss ? 'boss-stage' : ''} ${!isUnlocked ? 'locked' : ''}`;

      const typeLabels = {
        vocabulary: '📝 词汇',
        sentence: '💬 句型',
        spelling: '✏️ 拼写',
        battle: '⚔️ Boss'
      };

      card.innerHTML = `
        <div class="stage-header">
          <div class="stage-number">${isBoss ? '💀' : index + 1}</div>
          <div class="stage-title">${stage.title}</div>
          <div class="stage-type-badge">${typeLabels[stage.type] || stage.type}</div>
        </div>
        <div class="stage-desc">${stage.instruction}</div>
        ${isCompleted ? `
          <div class="stage-stars">
            ${[1,2,3].map(s => `<span class="star ${s <= stageStars ? 'earned' : ''}">⭐</span>`).join('')}
          </div>
        ` : ''}
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          this.startStage(chapterNum, index);
        });
      }

      container.appendChild(card);
    });
  },

  // ---- 开始关卡 ----
  startStage(chapterNum, stageIndex) {
    const chapter = GAME_DATA.chapters[chapterNum - 1];
    const stage = chapter.stages[stageIndex];

    this.state.currentChapter = chapterNum;
    this.state.currentStage = stageIndex;
    this.state.currentQuestion = 0;
    this.state.correctCount = 0;
    this.state.wrongCount = 0;
    this.state.usedHint = false;
    this.state.isAnswering = false;
    this.state.combo = 0;

    // 设置战斗参数
    if (stage.type === 'battle') {
      this.state.monsterHp = stage.monsterHp || 5;
      this.state.monsterMaxHp = stage.monsterHp || 5;
      this.state.playerHp = GAME_DATA.player.hp;
      this.state.playerMaxHp = GAME_DATA.player.maxHp;
      this.state.shieldActive = false;
    }

    // 设置主题
    const gameScreen = this.dom.screens.game;
    gameScreen.className = `screen active theme-${chapter.bgTheme}`;

    this.showScreen('game');
    this.renderQuestion();
  },

  // ---- 渲染问题 ----
  renderQuestion() {
    const chapter = GAME_DATA.chapters[this.state.currentChapter - 1];
    const stage = chapter.stages[this.state.currentStage];
    const qIndex = this.state.currentQuestion;

    if (qIndex >= stage.questions.length) {
      this.finishStage();
      return;
    }

    const question = stage.questions[qIndex];
    const total = stage.questions.length;

    // 更新顶部信息
    document.getElementById('game-stage-name').textContent = stage.title;
    document.getElementById('game-question-count').textContent = `${qIndex + 1} / ${total}`;
    document.getElementById('potions-count').textContent = GAME_DATA.player.potions;

    // 战斗区域
    const battleArea = document.getElementById('battle-area');
    if (stage.type === 'battle') {
      battleArea.style.display = 'flex';
      battleArea.innerHTML = `
        <div class="monster-area">
          <div class="monster-emoji" id="monster-emoji">${stage.monsterEmoji || '👹'}</div>
          <div class="monster-name">${stage.monsterName || '怪物'}</div>
          <div class="monster-hp-bar">
            <div class="monster-hp-fill" id="monster-hp-fill" style="width: ${(this.state.monsterHp / this.state.monsterMaxHp) * 100}%"></div>
          </div>
          <div class="monster-hp-text">${this.state.monsterHp} / ${this.state.monsterMaxHp}</div>
        </div>
      `;

      // 玩家HP
      const playerArea = document.getElementById('player-fight-area');
      playerArea.style.display = 'flex';
      const hpPercent = (this.state.playerHp / this.state.playerMaxHp) * 100;
      document.getElementById('player-hp-fill').style.width = `${hpPercent}%`;
      document.getElementById('player-hp-fill').className = `player-hp-fill ${hpPercent < 30 ? 'low' : ''}`;
      document.getElementById('player-hp-text').textContent = `${this.state.playerHp} / ${this.state.playerMaxHp}`;
    } else {
      battleArea.style.display = 'none';
      document.getElementById('player-fight-area').style.display = 'none';
    }

    // 问题区域
    const questionArea = document.getElementById('question-area');
    questionArea.innerHTML = `
      <div class="question-card">
        <div class="question-text">${question.q}</div>
        <div class="question-hint" id="question-hint">${question.hint || ''}</div>
      </div>
    `;

    // 选项/输入区域
    const optionsArea = document.getElementById('options-area');
    optionsArea.innerHTML = '';

    if (question.options) {
      // 选择题
      const letters = ['A', 'B', 'C', 'D'];
      question.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
          <span class="option-letter">${letters[i]}</span>
          <span>${opt}</span>
        `;
        btn.addEventListener('click', () => this.checkAnswer(i, btn));
        optionsArea.appendChild(btn);
      });
    } else {
      // 拼写题
      optionsArea.innerHTML = `
        <div class="spelling-area">
          <div class="spelling-input-wrapper">
            <input type="text" class="spelling-input" id="spelling-input"
              placeholder="输入你的答案..." autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false">
          </div>
          <button class="spelling-submit" id="spelling-submit" disabled>确认答案 ✓</button>
          ${question.hint ? `<button class="hint-btn" id="hint-btn">💡 使用提示 (-1药水)</button>` : ''}
        </div>
      `;

      const input = document.getElementById('spelling-input');
      const submitBtn = document.getElementById('spelling-submit');

      input.addEventListener('input', () => {
        submitBtn.disabled = input.value.trim().length === 0;
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim().length > 0) {
          this.checkSpelling(input.value.trim());
        }
      });

      submitBtn.addEventListener('click', () => {
        this.checkSpelling(input.value.trim());
      });

      const hintBtn = document.getElementById('hint-btn');
      if (hintBtn) {
        hintBtn.addEventListener('click', () => this.showHint());
      }

      // 自动聚焦
      setTimeout(() => input.focus(), 300);
    }

    // 提示按钮（选择题）
    if (question.options && question.hint) {
      const hintBtn = document.createElement('button');
      hintBtn.className = 'hint-btn';
      hintBtn.textContent = '💡 使用提示 (-1药水)';
      hintBtn.addEventListener('click', () => this.showHint());
      optionsArea.appendChild(hintBtn);
    }
  },

  // ---- 检查答案（选择题） ----
  checkAnswer(selectedIndex, btnElement) {
    if (this.state.isAnswering) return;
    this.state.isAnswering = true;

    const chapter = GAME_DATA.chapters[this.state.currentChapter - 1];
    const stage = chapter.stages[this.state.currentStage];
    const question = stage.questions[this.state.currentQuestion];
    const isCorrect = selectedIndex === question.answer;

    // 禁用所有选项
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
      btn.classList.add('disabled');
      if (i === question.answer) btn.classList.add('correct');
    });

    if (isCorrect) {
      btnElement.classList.add('correct');
      this.onCorrectAnswer(stage);
    } else {
      btnElement.classList.add('wrong');
      this.onWrongAnswer(stage);
    }

    // 延迟进入下一题
    setTimeout(() => {
      this.state.currentQuestion++;
      this.state.isAnswering = false;
      this.renderQuestion();
    }, isCorrect ? 800 : 1500);
  },

  // ---- 检查拼写 ----
  checkSpelling(input) {
    if (this.state.isAnswering) return;
    this.state.isAnswering = true;

    const chapter = GAME_DATA.chapters[this.state.currentChapter - 1];
    const stage = chapter.stages[this.state.currentStage];
    const question = stage.questions[this.state.currentQuestion];
    const inputEl = document.getElementById('spelling-input');
    const submitBtn = document.getElementById('spelling-submit');

    const isCorrect = input.toUpperCase() === question.answer.toUpperCase();

    inputEl.disabled = true;
    submitBtn.disabled = true;

    if (isCorrect) {
      inputEl.classList.add('correct');
      this.onCorrectAnswer(stage);
    } else {
      inputEl.classList.add('wrong');
      this.onWrongAnswer(stage);
    }

    setTimeout(() => {
      this.state.currentQuestion++;
      this.state.isAnswering = false;
      this.renderQuestion();
    }, isCorrect ? 800 : 2000);
  },

  // ---- 答对 ----
  onCorrectAnswer(stage) {
    this.state.correctCount++;
    this.state.combo++;

    // 战斗模式：扣怪物血
    if (stage.type === 'battle') {
      this.state.monsterHp--;
      this.showDamageNumber('monster', '-1', false);

      const monsterEmoji = document.getElementById('monster-emoji');
      if (monsterEmoji) {
        monsterEmoji.classList.add('hit');
        setTimeout(() => monsterEmoji.classList.remove('hit'), 500);
      }

      // 怪物死亡
      if (this.state.monsterHp <= 0) {
        setTimeout(() => {
          if (monsterEmoji) monsterEmoji.classList.add('defeated');
        }, 300);
      }
    }

    // 连击提示
    if (this.state.combo >= 3) {
      this.showToast(`🔥 ${this.state.combo}连击！`, 'success');
    }
  },

  // ---- 答错 ----
  onWrongAnswer(stage) {
    this.state.wrongCount++;
    this.state.combo = 0;

    // 战斗模式：扣玩家血
    if (stage.type === 'battle') {
      if (this.state.shieldActive) {
        this.state.shieldActive = false;
        this.showToast('🛡️ 护盾抵消了伤害！', 'info');
        this.showDamageNumber('player', '🛡️', true);
      } else {
        const damage = 15;
        this.state.playerHp = Math.max(0, this.state.playerHp - damage);
        this.showDamageNumber('player', `-${damage}`, false);

        const hpFill = document.getElementById('player-hp-fill');
        if (hpFill) {
          const hpPercent = (this.state.playerHp / this.state.playerMaxHp) * 100;
          hpFill.style.width = `${hpPercent}%`;
          hpFill.className = `player-hp-fill ${hpPercent < 30 ? 'low' : ''}`;
        }
        const hpText = document.getElementById('player-hp-text');
        if (hpText) hpText.textContent = `${this.state.playerHp} / ${this.state.playerMaxHp}`;

        // 玩家死亡
        if (this.state.playerHp <= 0) {
          setTimeout(() => this.gameOver(), 1000);
          return;
        }
      }
    }

    // 显示正确答案
    const chapter = GAME_DATA.chapters[this.state.currentChapter - 1];
    const question = chapter.stages[this.state.currentStage].questions[this.state.currentQuestion];
    if (question.options) {
      this.showToast(`正确答案：${question.options[question.answer]}`, 'error');
    } else {
      this.showToast(`正确答案：${question.answer}`, 'error');
    }
  },

  // ---- 显示伤害数字 ----
  showDamageNumber(target, text, isHeal) {
    const area = target === 'monster' ? document.getElementById('battle-area') : document.getElementById('player-fight-area');
    if (!area) return;

    const num = document.createElement('div');
    num.className = `damage-number ${isHeal ? 'heal' : ''}`;
    num.textContent = text;
    num.style.left = '50%';
    num.style.top = '40%';
    num.style.transform = 'translateX(-50%)';
    area.style.position = 'relative';
    area.appendChild(num);

    setTimeout(() => num.remove(), 1000);
  },

  // ---- 使用提示 ----
  showHint() {
    if (GAME_DATA.player.potions <= 0) {
      this.showToast('没有药水了！', 'error');
      return;
    }

    const chapter = GAME_DATA.chapters[this.state.currentChapter - 1];
    const stage = chapter.stages[this.state.currentStage];
    const question = stage.questions[this.state.currentQuestion];

    if (!question.hint) {
      this.showToast('这题没有提示', 'info');
      return;
    }

    GAME_DATA.player.potions--;
    this.state.usedHint = true;
    document.getElementById('potions-count').textContent = GAME_DATA.player.potions;

    const hintEl = document.getElementById('question-hint');
    if (hintEl) {
      hintEl.classList.add('show');
    }

    this.showToast('使用了一瓶提示药水', 'info');
  },

  // ---- 使用药水（回复HP） ----
  usePotion() {
    const stage = GAME_DATA.chapters[this.state.currentChapter - 1]?.stages[this.state.currentStage];
    if (!stage || stage.type !== 'battle') {
      this.showToast('只有在Boss战中才能使用治疗药水', 'info');
      return;
    }

    if (GAME_DATA.player.potions <= 0) {
      this.showToast('没有药水了！', 'error');
      return;
    }

    if (this.state.playerHp >= this.state.playerMaxHp) {
      this.showToast('生命值已满！', 'info');
      return;
    }

    GAME_DATA.player.potions--;
    const healAmount = 30;
    this.state.playerHp = Math.min(this.state.playerMaxHp, this.state.playerHp + healAmount);

    document.getElementById('potions-count').textContent = GAME_DATA.player.potions;
    const hpFill = document.getElementById('player-hp-fill');
    const hpPercent = (this.state.playerHp / this.state.playerMaxHp) * 100;
    hpFill.style.width = `${hpPercent}%`;
    hpFill.className = `player-hp-fill ${hpPercent < 30 ? 'low' : ''}`;
    document.getElementById('player-hp-text').textContent = `${this.state.playerHp} / ${this.state.playerMaxHp}`;

    this.showDamageNumber('player', `+${healAmount}`, true);
    this.showToast(`恢复了 ${healAmount} 点生命值！`, 'success');
  },

  // ---- 游戏结束（战斗中死亡） ----
  gameOver() {
    this.showScreen('result');
    const container = document.getElementById('result-content');
    container.innerHTML = `
      <div class="result-card">
        <div class="result-icon">💀</div>
        <div class="result-title">挑战失败</div>
        <div class="result-subtitle">不要灰心，再试一次吧！</div>
        <div class="result-stats">
          <div class="result-stat">
            <div class="stat-value">${this.state.correctCount}</div>
            <div class="stat-label">答对</div>
          </div>
          <div class="result-stat">
            <div class="stat-value">${this.state.wrongCount}</div>
            <div class="stat-label">答错</div>
          </div>
        </div>
        <div class="result-buttons">
          <button class="result-btn primary" onclick="Game.startStage(${this.state.currentChapter}, ${this.state.currentStage})">重新挑战</button>
          <button class="result-btn secondary" onclick="Game.showScreen('chapter'); Game.renderChapterScreen();">返回章节</button>
        </div>
      </div>
    `;
  },

  // ---- 完成关卡 ----
  finishStage() {
    const chapterNum = this.state.currentChapter;
    const stageIndex = this.state.currentStage;
    const chapter = GAME_DATA.chapters[chapterNum - 1];
    const stage = chapter.stages[stageIndex];
    const total = stage.questions.length;
    const correct = this.state.correctCount;

    // 计算星级
    const accuracy = correct / total;
    let stars = 1;
    if (accuracy >= 0.6) stars = 2;
    if (accuracy >= 0.9 && !this.state.usedHint) stars = 3;

    // 计算经验值和金币
    const expGain = Math.floor(20 + accuracy * 30 + (stage.type === 'battle' ? 20 : 0));
    const goldGain = Math.floor(10 + accuracy * 20 + (stage.type === 'battle' ? 15 : 0));

    // 保存关卡完成状态
    const stageKey = `${chapterNum}-${stageIndex}`;
    const prevStars = GAME_DATA.player.completedStages[stageKey]?.stars || 0;
    GAME_DATA.player.completedStages[stageKey] = {
      completed: true,
      stars: Math.max(prevStars, stars),
      correct,
      total
    };

    // 更新玩家数据
    GAME_DATA.player.exp += expGain;
    GAME_DATA.player.gold += goldGain;

    // 升级检查
    while (GAME_DATA.player.exp >= GAME_DATA.player.maxExp) {
      GAME_DATA.player.exp -= GAME_DATA.player.maxExp;
      GAME_DATA.player.level++;
      GAME_DATA.player.maxExp = Math.floor(GAME_DATA.player.maxExp * 1.3);
      GAME_DATA.player.maxHp += 10;
      GAME_DATA.player.hp = GAME_DATA.player.maxHp;
      GAME_DATA.player.potions += 1;
    }

    // 更新总星数
    GAME_DATA.player.totalStars = Object.values(GAME_DATA.player.completedStages)
      .reduce((sum, s) => sum + (s.stars || 0), 0);

    // 解锁下一章
    if (stageIndex === chapter.stages.length - 1 && chapterNum < GAME_DATA.chapters.length) {
      GAME_DATA.player.currentChapter = Math.max(GAME_DATA.player.currentChapter, chapterNum + 1);
    }

    // 检查成就
    this.checkAchievements(chapterNum, stars);

    // 保存进度
    this.saveProgress();

    // 显示结果
    this.showScreen('result');
    const isLastStage = stageIndex === chapter.stages.length - 1;
    const isLastChapter = chapterNum === GAME_DATA.chapters.length;

    const container = document.getElementById('result-content');
    container.innerHTML = `
      <div class="result-card">
        <div class="result-icon">${stage.type === 'battle' ? '🎉' : '✨'}</div>
        <div class="result-title">${stage.type === 'battle' ? 'Boss击败！' : '关卡通过！'}</div>
        <div class="result-subtitle">${stage.title}</div>
        <div class="result-stars">
          ${[1,2,3].map(s => `<span class="star ${s <= stars ? 'earned' : ''}">⭐</span>`).join('')}
        </div>
        <div class="result-stats">
          <div class="result-stat">
            <div class="stat-value">${correct}/${total}</div>
            <div class="stat-label">正确率</div>
          </div>
          <div class="result-stat">
            <div class="stat-value">+${expGain}</div>
            <div class="stat-label">经验值</div>
          </div>
          <div class="result-stat">
            <div class="stat-value">+${goldGain}</div>
            <div class="stat-label">金币</div>
          </div>
        </div>
        <div class="result-exp-text">Lv.${GAME_DATA.player.level} - ${GAME_DATA.player.exp}/${GAME_DATA.player.maxExp} EXP</div>
        <div class="result-exp-bar">
          <div class="result-exp-fill" style="width: ${(GAME_DATA.player.exp / GAME_DATA.player.maxExp) * 100}%"></div>
        </div>
        <div class="result-buttons">
          ${isLastStage && !isLastChapter ? `
            <button class="result-btn primary" onclick="Game.state.currentChapter = ${chapterNum + 1}; Game.showScreen('chapter'); Game.renderChapterScreen();">
              进入第${chapterNum + 1}章 →
            </button>
          ` : ''}
          ${isLastChapter && isLastStage ? `
            <button class="result-btn primary" onclick="Game.showScreen('main'); Game.renderMainScreen();">
              🏆 恭喜通关！返回主页
            </button>
          ` : `
            <button class="result-btn primary" onclick="Game.startStage(${chapterNum}, ${stageIndex})">
              再玩一次
            </button>
          `}
          <button class="result-btn secondary" onclick="Game.showScreen('chapter'); Game.renderChapterScreen();">
            返回章节列表
          </button>
        </div>
      </div>
    `;
  },

  // ---- 成就检查 ----
  checkAchievements(chapterNum, stars) {
    const p = GAME_DATA.player;
    const newAchievements = [];

    const check = (id) => {
      if (!p.achievements.includes(id)) {
        p.achievements.push(id);
        const ach = GAME_DATA.achievements.find(a => a.id === id);
        if (ach) newAchievements.push(ach);
      }
    };

    check('first_win');
    check(`chapter${chapterNum}`);
    if (!this.state.usedHint) check('no_hint');
    if (stars === 3) check('perfect');
    if (chapterNum === 10) check('chapter10');

    // 全星检查
    const allStages = GAME_DATA.chapters.flatMap((ch, ci) =>
      ch.stages.map((_, si) => `${ci + 1}-${si}`)
    );
    const allThreeStars = allStages.every(key => p.completedStages[key]?.stars === 3);
    if (allThreeStars) check('all_stars');

    // 显示新成就
    newAchievements.forEach((ach, i) => {
      setTimeout(() => {
        this.showToast(`🏅 成就解锁：${ach.emoji} ${ach.name}`, 'success');
      }, 1000 * (i + 1));
    });
  },

  // ---- 弹窗 ----
  showModal(type) {
    const overlay = document.getElementById(`${type}-modal`);
    if (!overlay) return;

    if (type === 'achievement') {
      this.renderAchievements();
    } else if (type === 'shop') {
      this.renderShop();
    } else if (type === 'settings') {
      this.renderSettings();
    }

    overlay.classList.add('active');
  },

  renderAchievements() {
    const container = document.getElementById('achievement-list');
    if (!container) return;

    container.innerHTML = '';
    GAME_DATA.achievements.forEach(ach => {
      const unlocked = GAME_DATA.player.achievements.includes(ach.id);
      const item = document.createElement('div');
      item.className = `achievement-item ${unlocked ? '' : 'locked'}`;
      item.innerHTML = `
        <div class="achievement-emoji">${ach.emoji}</div>
        <div class="achievement-info">
          <div class="achievement-name">${ach.name}</div>
          <div class="achievement-desc">${ach.desc}</div>
        </div>
        ${unlocked ? '<span>✅</span>' : '<span>🔒</span>'}
      `;
      container.appendChild(item);
    });
  },

  renderShop() {
    const container = document.getElementById('shop-list');
    if (!container) return;

    container.innerHTML = '';
    GAME_DATA.shop.forEach(item => {
      const el = document.createElement('div');
      el.className = 'shop-item';
      el.innerHTML = `
        <div class="shop-emoji">${item.emoji}</div>
        <div class="shop-info">
          <div class="shop-name">${item.name}</div>
          <div class="shop-desc">${item.desc}</div>
        </div>
        <div class="shop-price">💰 ${item.cost}</div>
      `;
      el.addEventListener('click', () => this.buyItem(item));
      container.appendChild(el);
    });
  },

  buyItem(item) {
    if (GAME_DATA.player.gold < item.cost) {
      this.showToast('金币不足！', 'error');
      return;
    }

    GAME_DATA.player.gold -= item.cost;

    if (item.id === 'hint_potion') {
      GAME_DATA.player.potions++;
      this.showToast(`购买了 ${item.name}！`, 'success');
    } else if (item.id === 'heal_potion') {
      GAME_DATA.player.hp = Math.min(GAME_DATA.player.maxHp, GAME_DATA.player.hp + 50);
      this.showToast(`恢复了 50 点生命值！`, 'success');
    } else if (item.id === 'shield') {
      this.state.shieldActive = true;
      this.showToast(`获得了护盾保护！`, 'success');
    }

    this.saveProgress();
    this.renderShop();
    this.renderMainScreen();
  },

  renderSettings() {
    // 设置页面内容
  },

  // ---- 通知提示 ----
  showToast(message, type = 'info') {
    // 移除旧的toast
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    this.dom.container.appendChild(toast);

    setTimeout(() => toast.remove(), 2500);
  },

  // ---- 辅助方法 ----
  isChapterCompleted(chapterNum) {
    const chapter = GAME_DATA.chapters[chapterNum - 1];
    return chapter.stages.every((_, i) => GAME_DATA.player.completedStages[`${chapterNum}-${i}`]);
  },

  getChapterStars(chapterNum) {
    const chapter = GAME_DATA.chapters[chapterNum - 1];
    let total = 0;
    chapter.stages.forEach((_, i) => {
      total += GAME_DATA.player.completedStages[`${chapterNum}-${i}`]?.stars || 0;
    });
    return total;
  },

  getCompletedStagesInChapter(chapterNum) {
    const chapter = GAME_DATA.chapters[chapterNum - 1];
    let count = 0;
    chapter.stages.forEach((_, i) => {
      if (GAME_DATA.player.completedStages[`${chapterNum}-${i}`]) count++;
    });
    return count;
  }
};

// 启动游戏
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
