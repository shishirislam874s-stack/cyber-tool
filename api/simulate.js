
const modules = {
  wa: "WhatsApp Channel Report Simulator",
  ban: "WhatsApp Ban Status Demo",
  threads: "Threads Report Simulator",
  instagram: "Instagram Report Simulator",
  facebook: "Facebook Report Simulator",
  ddos: "DDoS Traffic Visualization",
  ip: "IP Analysis Demo",
  scan: "Website Security Scan Demo"
};

const steps = [
  { progress: 10, message: "Initializing local simulation..." },
  { progress: 25, message: "Loading demonstration module..." },
  { progress: 40, message: "Preparing virtual analysis..." },
  { progress: 55, message: "Generating sample events..." },
  { progress: 70, message: "Processing simulated results..." },
  { progress: 85, message: "Finalizing demonstration..." },
  { progress: 100, message: "Demo process completed." }
];

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { tool, target } = req.body || {};

  if (!modules[tool]) {
    return res.status(400).json({
      error: "Invalid simulation module"
    });
  }

  if (
    typeof target !== "string" ||
    target.trim().length < 2 ||
    target.length > 300
  ) {
    return res.status(400).json({
      error: "Invalid demo target"
    });
  }

  return res.status(200).json({
    module: modules[tool],
    simulation: true,
    steps,
    result: "DEMO COMPLETED — No real-world action was performed."
  });
};
