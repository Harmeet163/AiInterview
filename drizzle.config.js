/** @type { import ("drizzle-kit").Config} */
export default{
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials:{
        url: 'postgresql://TalentPulse_owner:X52nSjKkVqvh@ep-icy-butterfly-a5dqiw9w.us-east-2.aws.neon.tech/TalentPulse?sslmode=require'
    }
}