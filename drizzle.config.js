/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:aIK9lCHPgQF2@ep-patient-bonus-a5wu2w90.us-east-2.aws.neon.tech/meetAiDatabase?sslmode=require",
  },
};
