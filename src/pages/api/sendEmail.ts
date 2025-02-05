import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export async function POST({ request }: { request: Request }): Promise<Response> {
  try {
    // 🔍 Verifica si el cuerpo de la solicitud es realmente JSON
    const textBody = await request.text(); // Lee el cuerpo como texto
    console.log("Cuerpo recibido:", textBody);

    if (!textBody) {
      return new Response(
        JSON.stringify({ success: false, error: "Cuerpo de la solicitud vacío" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { name, subject, email, message } = JSON.parse(textBody); // Parsea JSON manualmente

    // Validación de campos
    if (!name || !subject || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Faltan datos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Envío del correo
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.EMAIL_USER}>`,
      to: "josemanuelrc.contact@gmail.com",
      subject: subject || "Nuevo mensaje desde tu portfolio",
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
