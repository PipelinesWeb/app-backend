const { Router } = require("express");
const router = Router();
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pw-app-backend-default-rtdb.firebaseio.com/", // URL de tu base de datos en tiempo real
});

const db = admin.database();

router.post("/registrar", async (req, res) => {
  try {
    const { nombre, cantidad } = req.body;

    const materialesRef = db.ref("materiales"); // Referencia a la ubicación de la colección "materiales"
    const nuevoMaterialRef = materialesRef.push(); // Generar una nueva clave para el nuevo material
    const nuevoMaterialKey = nuevoMaterialRef.key;

    const nuevoMaterial = {
      nombre: nombre,
      cantidad: cantidad,
    };

    await nuevoMaterialRef.set(nuevoMaterial);
    console.log("Material registrado con ID:", nuevoMaterialKey);

    res.status(200).json({ message: "Material registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el material:", error);
    res.status(500).json({ error: "Error al registrar el material" });
  }
});

module.exports = router;