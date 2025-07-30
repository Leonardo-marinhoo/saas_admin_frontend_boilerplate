const os = require("os");
const fs = require("fs");
const path = require("path");

const interfaces = os.networkInterfaces();
let localIP = null;

for (const name of Object.keys(interfaces)) {
  for (const iface of interfaces[name]) {
    if (iface.family === "IPv4" && !iface.internal) {
      localIP = iface.address;
      break;
    }
  }
  if (localIP) break;
}

if (localIP) {
  const envPath = path.join(__dirname, ".env");
  const envContent = `VITE_API_BASE_URL=http://${localIP}:8000/api\n`;

  fs.writeFileSync(envPath, envContent);
  console.log(`✅ VITE_API_BASE_URL set to http://${localIP}:8000`);
} else {
  console.error("❌ Não foi possível encontrar o IP da rede local.");
  process.exit(1);
}
