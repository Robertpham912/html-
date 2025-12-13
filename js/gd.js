window.addEventListener("DOMContentLoaded", () => {

  const canvas = document.getElementById("gd");
  if (!canvas) {
    console.error("❌ Không tìm thấy canvas #gd");
    return;
  }

  const ctx = canvas.getContext("2d");

  let player = {
    x: 40,
    y: 120,
    size: 18,
    vy: 0,
    jump() {
      if (this.y >= 120) this.vy = -6;
    }
  };

  let gravity = 0.4;
  let obstacles = [];
  let speed = 2;
  let frame = 0;
  let dead = false;

  function spawnObstacle() {
    obstacles.push({
      x: canvas.width,
      y: 120,
      w: 20,
      h: 20
    });
  }

  function resetGD() {
    obstacles = [];
    frame = 0;
    speed = 2;
    dead = false;
    player.y = 120;
    player.vy = 0;
    loop();
  }

  function collide(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.size > b.x &&
      a.y < b.y + b.h &&
      a.y + a.size > b.y
    );
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ground
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 140, canvas.width, 40);

    // player
    player.vy += gravity;
    player.y += player.vy;
    if (player.y > 120) {
      player.y = 120;
      player.vy = 0;
    }
    ctx.fillStyle = "#00eaff";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // obstacles
    ctx.fillStyle = "#ff3b3b";
    obstacles.forEach(o => {
      o.x -= speed;
      ctx.fillRect(o.x, o.y, o.w, o.h);
      if (collide(player, o)) dead = true;
    });

    obstacles = obstacles.filter(o => o.x + o.w > 0);

    frame++;
    if (frame % 90 === 0) spawnObstacle();

    if (!dead) {
      requestAnimationFrame(loop);
    } else {
      ctx.fillStyle = "#fff";
      ctx.font = "14px sans-serif";
      ctx.fillText("💥 GAME OVER – Click để chơi lại", 40, 90);
    }
  }

  canvas.addEventListener("click", () => {
    if (dead) resetGD();
    else player.jump();
  });

  document.addEventListener("keydown", e => {
    if (e.code === "Space") player.jump();
  });

  loop();
});
