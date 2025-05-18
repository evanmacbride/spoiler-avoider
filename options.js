async function saveOptions(e) {
  e.preventDefault();
  await browser.storage.sync.set({
    redactWords: document.querySelector("#redactWords").value
  });
}

async function restoreOptions() {
  let res = await browser.storage.sync.get("redactWords");
  document.querySelector("#redactWords").value = res.redactWords || "";
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
