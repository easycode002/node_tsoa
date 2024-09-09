import app from "@/app";
import connectToMongoDB from "@/database/connection";
import configs from "@/config";

async function run() {
  try {
    await connectToMongoDB();

    app.listen(configs.port, () => {
      console.log(`Server runnint on http://localhost:3000`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
