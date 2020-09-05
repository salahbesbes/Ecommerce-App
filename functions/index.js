const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const adminAuth = admin.auth();
// const adminDB = admin.database();
// const adminStore = admin.storage();
// this function is gona execute from the backend not front
// --> we are gonna be able to call this function from the front end
// thnx to onCall method
// data : data we send from the frontEnd
// context : information we get from the server side
exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (admin:true)
  // we use return cause we want to return some thing to the frontend
  // we return the promise itself to do that
  console.log("context0", context);
  return adminAuth
    .getUserByEmail(data.email)
    .then(user => {
      console.log("context then 1", context);

      return adminAuth.setCustomUserClaims(user.uid, { admin: true });
    })
    .then(then => {
      console.log("context 2", context);

      console.log("then is called", then);
      return { message: `success! ${data.email} has been made an admin` };
    })
    .catch(error => console.log("error", error));
});
