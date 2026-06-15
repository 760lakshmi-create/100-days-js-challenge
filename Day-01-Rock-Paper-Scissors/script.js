const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
  const choices = ['rock', 'paper', 'scissors'];
  let scores = { you: 0, cpu: 0, draw: 0 };
      
  function play(playerChoice) {
    const cpuChoice = choices[Math.floor(Math.random() * 3)];

    // Update arena emojis with animation
    const pe = document.getElementById('playerEmoji');
    const ce = document.getElementById('cpuEmoji');
    pe.classList.remove('reveal');
    ce.classList.remove('reveal');
    void pe.offsetWidth; // reflow
    void ce.offsetWidth;
    pe.textContent = emojis[playerChoice];
    ce.textContent = emojis[cpuChoice];
    pe.classList.add('reveal');
    ce.classList.add('reveal');

    // Highlight selected button
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    // Determine result
    const msg = document.getElementById('resultMsg');
    const arena = document.getElementById('arena');
    msg.className = 'result-msg';

    let result;
    if (playerChoice === cpuChoice) {
      result = 'draw';
    } else if (
      (playerChoice === 'rock'     && cpuChoice === 'scissors') ||
      (playerChoice === 'paper'    && cpuChoice === 'rock')     ||
      (playerChoice === 'scissors' && cpuChoice === 'paper')
    ) {
      result = 'win';
    } else {
      result = 'lose';
    }

    scores[result === 'win' ? 'you' : result === 'lose' ? 'cpu' : 'draw']++;

    const messages = {
      win:  ['You WIN! 🎉', 'Nailed it! 🔥', 'Too easy! 😎', 'Champion! 🏆'],
      lose: ['CPU wins! 😤', 'Better luck next time!', 'CPU is smarter 🤖', 'Oops! 😬'],
      draw: ['It\'s a Draw! 🤝', 'Same energy! ✨', 'Tie game! 🟡']
    };

    const pool = messages[result];
    msg.textContent = pool[Math.floor(Math.random() * pool.length)];
    msg.classList.add(result);

    if (result === 'lose') {
      arena.classList.remove('shake');
      void arena.offsetWidth;
      arena.classList.add('shake');
    }

    updateScores(result);
  }

  function updateScores(result) {
    const map = { win: 'scoreYou', lose: 'scoreCPU', draw: 'scoreDraw' };
    const el = document.getElementById(map[result]);
    el.textContent = result === 'win' ? scores.you : result === 'lose' ? scores.cpu : scores.draw;
    el.classList.remove('pop');
    void el.offsetWidth;
    el.classList.add('pop');
  }

  function resetGame() {
    scores = { you: 0, cpu: 0, draw: 0 };
    document.getElementById('scoreYou').textContent  = '0';
    document.getElementById('scoreCPU').textContent  = '0';
    document.getElementById('scoreDraw').textContent = '0';
    document.getElementById('playerEmoji').textContent = '🤔';
    document.getElementById('cpuEmoji').textContent    = '🤖';
    const msg = document.getElementById('resultMsg');
    msg.textContent  = 'Choose your move!';
    msg.className    = 'result-msg';
    document.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
  }