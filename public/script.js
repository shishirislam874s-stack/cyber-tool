
const tools = {
  wa: "WhatsApp Reporter",
  ban: "WhatsApp Ban Checker",
  threads: "Threads Reporter",
  instagram: "Instagram Reporter",
  facebook: "Facebook Reporter",
  ddos: "DDoS Traffic Visualizer",
  ip: "IP Lookup",
  scan: "Website Security Scanner"
};

let selected = "wa";
let total = 0;
let running = false;

const terminal = document.getElementById("terminal");
const progress = document.getElementById("progress");
const percent = document.getElementById("percent");
const result = document.getElementById("result");
const start = document.getElementById("start");

function log(message, type = "muted") {
  const line = document.createElement("p");
  line.className = type;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

document.querySelectorAll(".tool").forEach(button => {
  button.addEventListener("click", () => {
    if (running) return;

    document.querySelectorAll(".tool")
      .forEach(item => item.classList.remove("active"));

    button.classList.add("active");
    selected = button.dataset.tool;

    document.getElementById("selected").textContent =
      tools[selected];

    result.textContent = "READY FOR SIMULATION";
    log(`Module selected: ${tools[selected]}`, "green");
  });
});

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

start.addEventListener("click", async () => {
  if (running) return;

  const target = document.getElementById("target").value.trim();

  if (!target) {
    result.textContent = "PLEASE ENTER A DEMO TARGET";
    log("Input required before starting.", "red");
    return;
  }

  running = true;
  start.disabled = true;
  start.textContent = "SIMULATION RUNNING...";

  progress.style.width = "0%";
  percent.textContent = "0%";
  result.textContent = "SIMULATION STARTED";

  document.getElementById("active").textContent = "1";

  log("--------------------------------");
  log(`Initializing ${tools[selected]}`, "green");
  log(`Demo target: ${target}`);
  log("Real network access: DISABLED", "red");

  try {
    const response = await fetch("/api/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool: selected,
        target
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Simulation unavailable");
    }

    for (const step of data.steps) {
      await wait(650);

      progress.style.width = step.progress + "%";
      percent.textContent = step.progress + "%";

      log(step.message, step.progress === 100 ? "green" : "muted");
    }

    result.textContent = data.result;
    result.style.color = "#00e89b";

    total++;
    document.getElementById("total").textContent = total;

    log("Simulation completed successfully.", "green");

  } catch (error) {
    result.textContent = "SIMULATION ERROR";
    result.style.color = "#ff304d";
    log(error.message, "red");
  } finally {
    running = false;
    start.disabled = false;
    start.innerHTML = "<span>ϟ</span> INITIALIZE SIMULATION";
    document.getElementById("active").textContent = "0";
  }
});

document.getElementById("clear").addEventListener("click", () => {
  terminal.replaceChildren();
  log("Terminal cleared.");
  log("Local simulation environment ready.", "green");
});
