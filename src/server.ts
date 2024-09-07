import app from "@/app";

function run() {
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
}

run();