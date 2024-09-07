import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

// Define type for load content from .env file
type Config = {
  env: string;
  port: number;
  mongodbUrl: string;
};

// Function to load and validate env variable
function loadConfig(): Config {
  // Determine the env and set the appropriate .env file
  const env = process.env.NODE_ENV || "development";
  const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
  console.log(`Loading env from: ${envPath}`);

  dotenv.config({ path: envPath });

  // Define a schema for env varaible
  const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required(),
  })
    .unknown()
    .required();

  // Validate the env varaible
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongodbUrl: envVars.MONGODB_URL,
  };
}

// Export the load configs from env
const configs = loadConfig();
export default configs;
