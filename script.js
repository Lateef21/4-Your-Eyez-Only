const yesBtn = document.getElementById('yes-button');
    const noBtn = document.getElementById('no-button');
    const message = document.getElementById('message');
    const confettiContainer = document.getElementById('confetti');
    const modeToggle = document.getElementById('modeToggle');
    const shareBtn = document.getElementById('share');
    const parkourGif = document.getElementById('parkour');
    const yesGif = document.getElementById('yes-gif');
    const bgMusic = document.getElementById('bg-music');

    let yesBtnScale = 1;
    const noMessages = [
      "No",
      "You starting with no is crazy, I can't lie.",
      "Are you really sure??",
      "Are you really really sure???",
      "Think again?",
      "Don't believe in second chances?",
      "Maybe we can talk about it?",
      "Ok, let's just start over.."
    ];
    let noClickCount = 0;

    // Start music on first click anywhere
    document.addEventListener('click', function startMusic() {
      bgMusic.play().catch(err => console.log('Autoplay blocked until interaction.'));
      document.removeEventListener('click', startMusic);
    });

    modeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark', modeToggle.checked);
    });

    noBtn.addEventListener('mouseover', () => {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
      yesBtnScale += 0.1;
      yesBtn.style.transform = `scale(${yesBtnScale})`;
    });

    noBtn.addEventListener('click', () => {
      noClickCount++;
      if (noClickCount < noMessages.length) {
        noBtn.textContent = noMessages[noClickCount];
      } else {
        noBtn.textContent = noMessages[noMessages.length - 1];
      }
      showParkourGif();
    });

    yesBtn.addEventListener('click', () => {
      message.classList.add('show');
      launchConfetti();
      showYesGif();
    });

    function showParkourGif() {
      parkourGif.style.display = 'block';
      setTimeout(() => {
        parkourGif.style.display = 'none';
      }, 2500);
    }

    function showYesGif() {
      yesGif.style.display = 'block';
      setTimeout(() => {
        yesGif.style.display = 'none';
      }, 2500);
    }

    function launchConfetti() {
      confettiContainer.innerHTML = '';
      for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.style.position = 'absolute';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = `${Math.random() * 100}%`;
        piece.style.width = '8px';
        piece.style.height = '8px';
        piece.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        piece.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiContainer.appendChild(piece);
      }
    }

    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: 'Will you be my Valentine?',
          text: 'Check this cute Valentine’s page 💘',
          url: window.location.href
        });
      } else {
        alert('Sharing not supported on this browser.');
      }
    });