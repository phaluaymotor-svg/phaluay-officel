# PHALUAY MOTOR — Google Sheets CRM

Google Sheet created:
https://docs.google.com/spreadsheets/d/1h5MWnaDPt-MI4C_ovXKToSptBgTKO3cDlzGv5inAXIg/edit

Tabs: Customers, Leads, Bookings, Service.

## One-time Apps Script deployment
1. Open https://script.google.com and create a new project.
2. Copy all code from `google-apps-script.gs` into Code.gs.
3. Deploy > New deployment > Web app.
4. Execute as: Me. Access: Anyone.
5. Copy the URL ending `/exec`.
6. Paste it into `sheet-config.js` as `endpoint`.
7. Upload updated files to GitHub Pages.

## Authentication
Google Sheets is CRM storage only. Do NOT store passwords or OTPs in Sheets.
Google Login, Email/Password, Phone OTP and Reset Password remain handled by Firebase Authentication in the background. The old setup-required page has been removed; end users never see a Firebase setup screen.
