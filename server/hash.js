const bcrypt = require("bcryptjs");

const hash = bcrypt.hashSync("admin123", 10);
console.log(hash);
// $2b$10$1NRh9Mib0GC9x.1SoMxDjeDHZFIm7SkwNaxVcUk.HW4m8/6DZUdY2