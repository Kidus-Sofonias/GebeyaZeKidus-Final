import { axiosInstance } from "../Api/axios";

export const sendEmail = async ({ to, subject, message }) => {
  try {
    await axiosInstance.post("/email/send", {
      to,
      subject,
      message,
    });
    //console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
