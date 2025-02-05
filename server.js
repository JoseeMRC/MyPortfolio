import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { handler as ssrHandler } from "./dist/server/entry.mjs"; // Importa Astro SSR

dotenv.config();

const app = express();
app.use(express.json());

// Servir archivos estáticos de Astro
app.use(express.static("dist/client"));

// Ruta para enviar correos
app.post("/api/sendEmail", async (req, res) => {
  const { name, subject, email, message } = req.body;

  if (!name || !subject || !email || !message) {
    return res.status(400).json({ success: false, error: "Faltan datos" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: "josemanuelrc.contact@gmail.com",
      subject,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ success: false, error: "Error al enviar mensaje" });
  }
});

// ⚠️ Importante: Manejar todas las rutas con Astro SSR
app.use("*", ssrHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
