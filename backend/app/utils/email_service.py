import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()
EMAIL_USER = os.getenv("EMAIL_USER")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def send_account_email(receiver_email, trainee_name, trainee_email, password):
    msg = EmailMessage()

    msg["Subject"] = "Task Allotment System Credentials"
    msg["From"] = SENDER_EMAIL
    msg["To"] = receiver_email

    msg.set_content(
        f"""
Hello {trainee_name},

Here are your credentials for the Task Allotment System:

Email: {trainee_email}
Password: {password}

Regards,
Task Management Team
"""
    )

    try:
        with smtplib.SMTP("smtp-relay.brevo.com", 587) as smtp:
            smtp.starttls()
            smtp.login(EMAIL_USER, EMAIL_PASS)
            smtp.send_message(msg)

        print("✅ Email sent successfully!")

    except Exception as e:
        print("❌ Email Error:", e)