const bcrypt = require("bcryptjs");

const password = "admin123";
const hash = "$2b$10$656dWL7vu98Fc2eDSgC/ael7EmI10Sfy0SpSq1nverx04crtixA7K";

bcrypt.compare(password, hash, (err, result) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Password matches:", result);
  }
});
