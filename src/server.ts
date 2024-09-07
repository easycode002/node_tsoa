import app from "@/app";
import configs from "@/config";

function run() {
  app.listen(configs.port, () => {
    console.log(`Server is running on http://localhost:${configs.port}`);
  });
}

run();
