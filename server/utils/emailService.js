// server/utils/emailService.js
// ============================================================
//  Smart Food Donation — Email Notification Service
//  Uses: Nodemailer + Gmail App Password
// ============================================================

const nodemailer = require("nodemailer");

// ── Transporter Setup ──────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // tumhara Gmail
    pass: process.env.EMAIL_PASS,  // Gmail App Password (16 digit)
  },
});

// ── Verify Connection on Startup ───────────────────────────
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email service error:", error.message);
  } else {
    console.log("✅ Email service ready");
  }
});

// ── HTML Email Template Helper ─────────────────────────────
const buildEmailHTML = ({ title, subtitle, bodyText, statusColor, statusLabel, foodName, quantity, location, mapLink, footerNote }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:20px;overflow:hidden;
                      box-shadow:0 8px 30px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#ff6b2b,#ffb347);
                       padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:26px;font-weight:800;
                         letter-spacing:-0.5px;">🍲 Food Donation</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">
                Smart Food Donation & Distribution System
              </p>
            </td>
          </tr>

          <!-- Status Badge -->
          <tr>
            <td style="padding:32px 40px 0;text-align:center;">
              <span style="display:inline-block;padding:8px 20px;
                           background:${statusColor}20;color:${statusColor};
                           border-radius:99px;font-size:13px;font-weight:700;
                           letter-spacing:0.05em;text-transform:uppercase;
                           border:1.5px solid ${statusColor}40;">
                ${statusLabel}
              </span>
              <h2 style="margin:16px 0 8px;font-size:22px;font-weight:700;
                         color:#1a1a2e;letter-spacing:-0.3px;">${title}</h2>
              <p style="margin:0;color:#6b7280;font-size:15px;line-height:1.7;">
                ${subtitle}
              </p>
            </td>
          </tr>

          <!-- Donation Details Card -->
          <tr>
            <td style="padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="background:#fdfaf6;border:1px solid rgba(0,0,0,0.07);
                            border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:11px;font-weight:700;
                               color:#9ca3af;letter-spacing:0.1em;text-transform:uppercase;">
                      Donation Details
                    </p>
                    ${foodName ? `
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#6b7280;width:110px;">🍱 Food</td>
                        <td style="padding:6px 0;font-size:14px;font-weight:600;color:#1a1a2e;">${foodName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#6b7280;">📦 Quantity</td>
                        <td style="padding:6px 0;font-size:14px;font-weight:600;color:#1a1a2e;">${quantity}</td>
                      </tr>
                      ${location ? `
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#6b7280;">📍 Location</td>
                        <td style="padding:6px 0;font-size:14px;font-weight:600;color:#1a1a2e;">${location}</td>
                      </tr>` : ''}
                    </table>
                    ` : ''}
                    ${bodyText ? `<p style="margin:12px 0 0;font-size:14px;color:#6b7280;line-height:1.7;">${bodyText}</p>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Map Link Button -->
          ${mapLink ? `
          <tr>
            <td style="padding:0 40px 24px;text-align:center;">
              <a href="${mapLink}" target="_blank"
                 style="display:inline-block;padding:12px 28px;
                        background:linear-gradient(135deg,#ff6b2b,#ffb347);
                        color:#fff;text-decoration:none;border-radius:99px;
                        font-size:14px;font-weight:700;
                        box-shadow:0 4px 14px rgba(255,107,43,0.35);">
                📍 View on Google Maps
              </a>
            </td>
          </tr>` : ''}

          <!-- Footer Note -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.7;">
                ${footerNote || 'Thank you for being part of our mission to reduce food waste.'}
              </p>
            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td style="background:#fdfaf6;padding:20px 40px;
                       text-align:center;border-top:1px solid rgba(0,0,0,0.06);">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                🍲 Smart Food Donation System &nbsp;|&nbsp;
                Making every meal count
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ══════════════════════════════════════════════════════════════
//  EMAIL FUNCTIONS
// ══════════════════════════════════════════════════════════════

/**
 * 1️⃣  Donor ne donation add kiya → Donor ko confirmation
 */
const sendDonationConfirmation = async ({ donorEmail, donorName, foodName, quantity, location, mapLink }) => {
  try {
    await transporter.sendMail({
      from: `"🍲 Food Donation System" <${process.env.EMAIL_USER}>`,
      to: donorEmail,
      subject: `✅ Donation Received — ${foodName}`,
      html: buildEmailHTML({
        title: "Donation Received!",
        subtitle: `Hi ${donorName}, your donation has been submitted successfully and is now under review by our NGO partners.`,
        statusColor: "#f39c12",
        statusLabel: "⏳ Pending Review",
        foodName,
        quantity,
        location,
        mapLink,
        footerNote: "We will notify you once your donation is approved. Thank you for your generosity! 🙏",
      }),
    });
    console.log(`📧 Confirmation sent to donor: ${donorEmail}`);
  } catch (err) {
    console.error("❌ sendDonationConfirmation error:", err.message);
  }
};

/**
 * 2️⃣  NGO ne approve kiya → Donor ko approval email
 */
const sendApprovalEmail = async ({ donorEmail, donorName, foodName, quantity, location, mapLink }) => {
  try {
    await transporter.sendMail({
      from: `"🍲 Food Donation System" <${process.env.EMAIL_USER}>`,
      to: donorEmail,
      subject: `🟢 Donation Approved — ${foodName}`,
      html: buildEmailHTML({
        title: "Your Donation is Approved!",
        subtitle: `Great news, ${donorName}! Your donation has been verified and approved by our NGO team. A volunteer will be assigned soon for pickup.`,
        statusColor: "#2ecc71",
        statusLabel: "✅ Approved",
        foodName,
        quantity,
        location,
        mapLink,
        footerNote: "Our volunteer will contact you for pickup. Please keep the food ready. Thank you! 🙏",
      }),
    });
    console.log(`📧 Approval email sent to: ${donorEmail}`);
  } catch (err) {
    console.error("❌ sendApprovalEmail error:", err.message);
  }
};

/**
 * 3️⃣  Volunteer ne deliver kiya → Donor ko delivery confirmation
 */
const sendDeliveryEmail = async ({ donorEmail, donorName, foodName, quantity, location }) => {
  try {
    await transporter.sendMail({
      from: `"🍲 Food Donation System" <${process.env.EMAIL_USER}>`,
      to: donorEmail,
      subject: `🚚 Food Delivered Successfully — ${foodName}`,
      html: buildEmailHTML({
        title: "Food Delivered! 🎉",
        subtitle: `Amazing, ${donorName}! Your donation of ${foodName} has been successfully delivered to those in need.`,
        statusColor: "#3498db",
        statusLabel: "🚚 Delivered",
        foodName,
        quantity,
        location,
        mapLink: null,
        footerNote: "You made a real difference today. Every meal matters — thank you from the bottom of our hearts! ❤️",
      }),
    });
    console.log(`📧 Delivery email sent to: ${donorEmail}`);
  } catch (err) {
    console.error("❌ sendDeliveryEmail error:", err.message);
  }
};

/**
 * 4️⃣  New donation added → NGO users ko alert
 */
const sendNGOAlert = async ({ ngoEmails, foodName, quantity, location, mapLink, donorName }) => {
  try {
    if (!ngoEmails || ngoEmails.length === 0) return;

    await transporter.sendMail({
      from: `"🍲 Food Donation System" <${process.env.EMAIL_USER}>`,
      to: ngoEmails.join(","),
      subject: `🔔 New Donation Available — ${foodName}`,
      html: buildEmailHTML({
        title: "New Donation Alert!",
        subtitle: `A new donation has been submitted by <strong>${donorName}</strong> and is waiting for your approval.`,
        statusColor: "#f39c12",
        statusLabel: "⏳ Needs Approval",
        foodName,
        quantity,
        location,
        mapLink,
        footerNote: "Please log in to your NGO dashboard to review and approve this donation.",
      }),
    });
    console.log(`📧 NGO alert sent to ${ngoEmails.length} NGO(s)`);
  } catch (err) {
    console.error("❌ sendNGOAlert error:", err.message);
  }
};

/**
 * 5️⃣  Welcome email on registration
 */
const sendWelcomeEmail = async ({ email, name, role }) => {
  const roleMessages = {
    donor:     { icon: "🍱", desc: "Start donating surplus food and help reduce waste!" },
    ngo:       { icon: "🏢", desc: "Review and approve food donations in your area." },
    volunteer: { icon: "🚚", desc: "Pick up and deliver approved donations to those in need." },
    admin:     { icon: "📊", desc: "Manage and monitor the entire donation system." },
  };

  const rm = roleMessages[role] || { icon: "👋", desc: "Welcome aboard!" };

  try {
    await transporter.sendMail({
      from: `"🍲 Food Donation System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `👋 Welcome to Food Donation System, ${name}!`,
      html: buildEmailHTML({
        title: `Welcome, ${name}! ${rm.icon}`,
        subtitle: `You've successfully registered as a <strong>${role}</strong>. ${rm.desc}`,
        statusColor: "#ff6b2b",
        statusLabel: `${rm.icon} ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        foodName: null,
        quantity: null,
        location: null,
        mapLink: null,
        bodyText: "Log in to your dashboard and start making a difference today.",
        footerNote: "Welcome to our community! Together we can reduce food waste and feed more lives. 🌍",
      }),
    });
    console.log(`📧 Welcome email sent to: ${email}`);
  } catch (err) {
    console.error("❌ sendWelcomeEmail error:", err.message);
  }
};

module.exports = {
  sendDonationConfirmation,
  sendApprovalEmail,
  sendDeliveryEmail,
  sendNGOAlert,
  sendWelcomeEmail,
};
