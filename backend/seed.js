const mongoose = require("mongoose");
const Lead = require("./models/lead");

mongoose.connect("mongodb://localhost:27017/lead_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function seed() {
  try {
    const ownerId = new mongoose.Types.ObjectId("68cc3761767809c2f017fe5f");

  
    await Lead.deleteMany({ owner: ownerId });

    const leads = [];
    for (let i = 1; i <= 100; i++) {
      leads.push({
        name: `User${i}`,
        email: `test${i}@mail.com`, 
        phone: `12345678${i}`,
        company: `Company${i}`,
        city: "CityX",
        state: "StateY",
        source: "web",
        status: "new",
        score: Math.floor(Math.random() * 100),
        lead_value: Math.floor(Math.random() * 10000),
        last_activity_at: new Date(),
        is_qualified: i % 2 === 0,
        owner: ownerId
      });
    }

    await Lead.insertMany(leads, { ordered: false });
    console.log("✅ Seeded 100 leads for user:", ownerId);
  } catch (err) {
    console.error("❌ Seed failed:", err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
