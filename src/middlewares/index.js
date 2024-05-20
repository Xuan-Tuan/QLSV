var admin = require("../config/firebaseAdmin");

const addLecturer = async (req, res, next) => {
  try {
    const { email, password, role, name, address, phoneNumber } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    await admin
      .firestore()
      .collection("authentication")
      .doc(userRecord.uid)
      .set({
        email,
        password,
        role,
      });

    await admin.firestore().collection("lecturer").doc(userRecord.uid).set({
      name,
      address,
      phoneNumber,
    });

    res.status(200);
    res.json(userRecord);
  } catch (error) {
    next(error);
  }
};

const addParent = async (req, res, next) => {
  try {
    const { email, password, role, name, address, phoneNumber } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    await admin
      .firestore()
      .collection("authentication")
      .doc(userRecord.uid)
      .set({
        email,
        password,
        role,
      });

    await admin.firestore().collection("parent").doc(userRecord.uid).set({
      name,
      address,
      phoneNumber,
    });

    res.status(200);
    res.json(userRecord);
  } catch (error) {
    next(error);
  }
};

const addStudent = async (req, res, next) => {
  try {
    const { email, password, role, name, parentID, address, phoneNumber } =
      req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    await admin
      .firestore()
      .collection("authentication")
      .doc(userRecord.uid)
      .set({
        email,
        password,
        role,
      });

    await admin.firestore().collection("student").doc(userRecord.uid).set({
      name,
      parentID,
      address,
      phoneNumber,
    });

    res.status(200);
    res.json(userRecord);
  } catch (error) {
    next(error);
  }
};

module.exports = { addLecturer, addParent, addStudent };
