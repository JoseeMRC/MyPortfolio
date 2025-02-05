import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(express.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
