window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gd");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let player = { x: 40, y: 120, s: 18, vy: 0 };
  let gravity = 0.4;
  let obstacles = [];
  let frame = 0;
  let dead = false;

  function spawn() {
    obstacles.push({ x: 320, y: 120, w: 20, h: 20 });
  }

  function collide(a, b) {
    return (
      a.x < b.x + b.w &&
      a.x + a.s > b.x &&
      a.y < b.y + b.h &&
      a.y + a.s > b.y
    );
  }

  function reset() {
    obstacles = [];
    frame = 0;
    dead = false;
    player.y = 120;
    player.vy = 0;
    loop();
  }

  function loop() {
    ctx.clearRect(0, 0, 320, 180);

    // ground
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 140, 320, 40);

    // player
    player.vy += gravity;
    player.y += player.vy;
    if (player.y > 120) {
      player.y = 120;
      player.vy = 0;
    }
    ctx.fillStyle = "#00eaff";
    ctx.fillRect(player.x, player.y, player.s, player.s);

    // obstacles
    ctx.fillStyle = "#ff3b3b";
    obstacles.forEach(o => {
      o.x -= 2;
      ctx.fillRect(o.x, o.y, o.w, o.h);
      if (collide(player, o)) dead = true;
    });
    obstacles = obstacles.filter(o => o.x + o.w > 0);

    frame++;
    if (frame % 90 === 0) spawn();

    if (!dead) {
      requestAnimationFrame(loop);
    } else {
      ctx.fillStyle = "#fff";
      ctx.font = "14px Arial";
      ctx.fillText("💥 GAME OVER – Click để chơi lại", 40, 90);
    }
  }

  canvas.addEventListener("click", () => {
    if (dead) reset();
    else player.vy = -6;
  });

  document.addEventListener("keydown", e => {
    if (e.code === "Space") player.vy = -6;
  });

  loop();
});
