export async function sendOtpEmail(to: string,name: string, otp: string, apiKey: string) {
  try {
    const response = await fetch("https://api.sendinblue.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey
      },
      body: JSON.stringify({
        sender: { email: "anshukaushik4700@gmail.com", name: "Mindspace" },
        to: [{ email: to }],
        subject: "Your Mindspace OTP",
        htmlContent: `
        <h2>Mindspace Verification</h2>
        <p>Hello ${name},</p>
        <p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>
        <p>Thanks for using Mindspace 💛</p>
      `
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(JSON.stringify(err));
    }

    console.log("OTP email sent successfully");
  } catch (err) {
    console.error("Error sending OTP email:", err);
  }
}
