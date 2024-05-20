var admin = require("../src/config/firebaseAdmin");

// admin
//   .auth()
//   .setCustomUserClaims("u5nUtcCynLVEGYzUvoA8aYh39R82", { role: "admin" })
//   .then(() => {
//     console.log("Success");
//   });

admin
  .auth()
  .getUser("u5nUtcCynLVEGYzUvoA8aYh39R82")
  .then((userRecord) => {
    console.log(userRecord);
    const { role } = userRecord.customClaims;
    console.log(role);
  })
  .catch((error) => {
    console.log(error);
  });
