<script lang="ts">
  import logo from "$lib/logo.png";

  let { data } = $props();
  let user = $state(data.user);
  let users = data.users;

  let sortedUsers: {
    count: number;
    id: string;
    user: string;
  }[] = $state(users.sort((a, b) => b.count - a.count));

  let interval: number;

  function sortUsers() {
    if (user) {
      sortedUsers = [...users, user].sort((a, b) => b.count - a.count);
    } else {
      sortedUsers = [...users].sort((a, b) => b.count - a.count);
    }
  }

  async function postUserCount() {
    if (user) {
      const updated = await fetch("/api/updateCount", {
        method: "POST",
        body: JSON.stringify({
          count: user.count,
        }),
      });
    }
  }

  function startTimer() {
    if (!interval) {
      interval = setInterval(async () => {
        if (user) user.count++;
        sortUsers();
        await postUserCount();
      }, 1000);
    }
  }

  $effect(() => {
    if (user && !interval) {
      sortedUsers = [...users, user];
      startTimer();
    }
  });
</script>

<div class="app">
  <a href="/" id="frontend-link">
    <img src={logo} alt="Logo" class="logo" />
  </a>

  {#if user}
    <div class="main-content">
      <div class="user-card">
        <h2>Welcome, {user.user}!</h2>
        <p>Time Wasted: <span class="highlight">{user.count}</span></p>
      </div>

      <div class="leaderboard-card">
        <h2>Leaderboard</h2>
        <ul>
          {#each sortedUsers as sortedUser, index}
            <li>
              <span class="rank">#{index + 1}</span>
              <span class="username">{sortedUser.user}</span>
              <span class="score">{sortedUser.count}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {:else}
    <div id="popup" class="popup" style="display:flex;">
      <div class="popup-content">
        <form method="POST" action="/api/createCount">
          <label for="username">Username</label>
          <input name="username" />
          <button type="submit">Start</button>
        </form>
      </div>
    </div>
  {/if}
</div>

<style>
  .app {
    background: #f0f4f8;
    font-family: "Inter", sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
  }

  .logo {
    width: 100px;
    height: auto;
    transition:
      transform 0.3s ease,
      filter 0.3s ease;
  }

  .logo:hover {
    transform: scale(1.1);
    filter: brightness(1.2);
  }

  .main-content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 125px;
  }

  .user-card {
    flex: 1;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .user-card h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .user-card p {
    font-size: 1.2rem;
  }

  .highlight {
    color: #007bff;
    font-weight: bold;
  }

  /* Leaderboard Card */
  .leaderboard-card {
    flex: 2;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .leaderboard-card h2 {
    font-size: 1.5rem;
    border-bottom: 2px solid #007bff;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .leaderboard-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .leaderboard-card li {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    align-items: center;
  }

  .leaderboard-card li:nth-child(1) .rank {
    color: gold;
  }

  .leaderboard-card li:nth-child(2) .rank {
    color: silver;
  }

  .leaderboard-card li:nth-child(3) .rank {
    color: #cd7f32;
  }

  .rank {
    font-weight: bold;
    font-size: 1.2rem;
    width: 50px;
  }

  .username {
    flex: 1;
    text-align: left;
    font-weight: 500;
  }

  .score {
    font-weight: bold;
    font-size: 1.2rem;
    color: #28a745;
  }
  .popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
  }

  .popup-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    width: 300px;
  }
</style>
