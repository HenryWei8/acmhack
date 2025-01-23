<script lang="ts">
  import me from "$lib/me.gif";
  import logo from "$lib/logo.png";
  let open = false;
  const toggleopen = () => {
    open = !open;
  };
</script>

<div class="body">
  <div
    id="popup"
    class="popup"
    style="display:{open ? 'flex' : 'none'}"
    on:click={toggleopen}
  >
    <div class="popup-content">
      <span id="closePopup" class="close">&times;</span>
      <p>Fully Functional Popup!</p>
    </div>
  </div>

  <a href="/backend" id="backend-link">
    <img src={logo} alt="Logo" class="logo" />
  </a>
  <h1 class="rainbow-cascade">
    <span style="--i: 0">F</span>
    <span style="--i: 1">R</span>
    <span style="--i: 2">O</span>
    <span style="--i: 3">N</span>
    <span style="--i: 4">T</span>
    <span style="--i: 5">E</span>
    <span style="--i: 6">N</span>
    <span style="--i: 7">D</span>
  </h1>

  <div class="container">
    <div>
      <div class="box-title">Fully Functioning Button!</div>
      <div class="box">
        <button on:click={toggleopen} id="popupButton">Button</button>
      </div>
    </div>
    <div>
      <div class="box-title">Fully Functioning Hyperlink!!</div>
      <div class="box">
        <a
          href="https://www.linkedin.com/in/henry-wei-184b00217/"
          target="_blank">https://www.linkedin.com/in/henry-wei-184b00217/</a
        >
      </div>
    </div>
    <div>
      <div class="box-title">Embedded GIF!!!</div>
      <div class="box">
        <img src={me} alt="A cool GIF" />
      </div>
    </div>
  </div>
</div>

<style>
  .body {
    margin: 0;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #e6f7ff;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 30px;
    text-align: center;
    color: #333;
  }

  .box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  #backend-link {
    position: fixed;
    top: 10px;
    left: 10px;
    font-size: 14px;
    text-decoration: none;
    color: #007bff;
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

  #backend-link:hover {
    text-decoration: underline;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
  }

  .box {
    width: 400px;
    height: 300px;
    background-color: #ffffff;
    border: 2px solid #cccccc;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
  }

  .box-title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #007bff;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
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

  .close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    cursor: pointer;
  }

  .rainbow-cascade {
    margin-bottom: 70px;
    display: inline-block;
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
  }

  .rainbow-cascade span {
    display: inline-block;
    animation: rainbow-cascade 3s infinite;
    animation-delay: calc(var(--i) * 0.2s);
  }

  @keyframes rainbow-cascade {
    0% {
      color: red;
    }
    16% {
      color: orange;
    }
    32% {
      color: yellow;
    }
    48% {
      color: green;
    }
    64% {
      color: blue;
    }
    80% {
      color: indigo;
    }
    100% {
      color: violet;
    }
  }
</style>
