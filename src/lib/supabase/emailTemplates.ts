export const emailTemplates = [
  {
    name: "welcome",
    label: "Welcome Email",
    subject: "Welcome to Our Platform!",
    content: `
        <h1>Welcome to Our Platform!</h1>
        <p>Dear [User],</p>
        <p>We're thrilled to have you on board. Here are a few things you can do to get started:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Explore our features</li>
          <li>Connect with other users</li>
        </ul>
        <p>If you have any questions, don't hesitate to reach out to our support team.</p>
        <p>Best regards,<br>[Your Name]</p>
      `,
  },
  {
    name: "waitlist",
    label: "Waitlist Confirmation",
    subject: "You're on the Waitlist!",
    content: `
        <h1>You're on the Waitlist!</h1>
        <p>Dear [User],</p>
        <p>Thank you for your interest in our platform. We've added you to our waitlist and will notify you as soon as a spot becomes available.</p>
        <p>While you wait, you can:</p>
        <ul>
          <li>Follow us on social media for updates</li>
          <li>Check out our blog for the latest news</li>
          <li>Refer friends to move up the waitlist</li>
        </ul>
        <p>We appreciate your patience and look forward to welcoming you soon!</p>
        <p>Best regards,<br>[Your Name]</p>
      `,
  },
  {
    name: "payment-reminder",
    label: "Payment Reminder",
    subject: "Your Payment is Due",
    content: `
        <h1>Payment Reminder</h1>
        <p>Dear [User],</p>
        <p>This is a friendly reminder that your payment of [Amount] is due on [Due Date].</p>
        <p>To make your payment, please:</p>
        <ol>
          <li>Log in to your account</li>
          <li>Go to the Billing section</li>
          <li>Select your preferred payment method</li>
          <li>Complete the transaction</li>
        </ol>
        <p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
        <p>Thank you for your prompt attention to this matter.</p>
        <p>Best regards,<br>[Your Name]</p>
      `,
  },
  {
    name: "payment-confirmation",
    label: "Payment Confirmation",
    subject: "Payment Received - Thank You!",
    content: `
        <h1>Payment Confirmation</h1>
        <p>Dear [User],</p>
        <p>We've received your payment of [Amount] on [Date]. Thank you for your prompt payment!</p>
        <p>Here's a summary of your transaction:</p>
        <ul>
          <li>Amount: [Amount]</li>
          <li>Date: [Date]</li>
          <li>Transaction ID: [Transaction ID]</li>
        </ul>
        <p>Your account has been updated to reflect this payment. If you have any questions, please contact our support team.</p>
        <p>We appreciate your business!</p>
        <p>Best regards,<br>[Your Name]</p>
      `,
  },
  {
    name: "login-alert",
    label: "Login Alert",
    subject: "New Login Detected",
    content: `
        <h1>New Login Alert</h1>
        <p>Dear [User],</p>
        <p>We detected a new login to your account on [Date] at [Time].</p>
        <p>Login details:</p>
        <ul>
          <li>Device: [Device Type]</li>
          <li>Location: [City, Country]</li>
          <li>IP Address: [IP Address]</li>
        </ul>
        <p>If this was you, no further action is needed. If you don't recognize this activity, please:</p>
        <ol>
          <li>Change your password immediately</li>
          <li>Enable two-factor authentication</li>
          <li>Contact our support team</li>
        </ol>
        <p>We take your account security seriously. Stay safe!</p>
        <p>Best regards,<br>[Your Name]</p>
      `,
  },
  {
    name: "scheduler",
    label: "Scheduler Email",
    subject: "Your Upcoming Appointment",
    content: `
        <h1>Your Upcoming Appointment</h1>
        <p>Dear [User],</p>
        <p>This is a reminder of your upcoming appointment:</p>
        <ul>
          <li>Date: [Appointment Date]</li>
          <li>Time: [Appointment Time]</li>
          <li>Location: [Location or Platform]</li>
        </ul>
        <p>Please make sure to:</p>
        <ul>
          <li>Arrive 5 minutes early</li>
          <li>Bring any necessary documents</li>
          <li>Prepare any questions you may have</li>
        </ul>
        <p>If you need to reschedule or cancel, please do so at least 24 hours in advance.</p>
        <p>We look forward to meeting with you!</p>
        <p>Best regards,<br>[Your Name]</p>
      `,
  },
];
