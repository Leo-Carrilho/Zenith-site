import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Método não permitido");
  }

  const { nome, email, mensagem } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"${nome}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Contato de ${nome}`,
      text: mensagem,
      replyTo: email
    });

    return res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Erro ao enviar");
  }
}