# PHALUAY MOTOR — FINAL WORKING BUILD

สถานะเวอร์ชันนี้

✅ หน้าเว็บใช้งานได้ทันทีบน GitHub Pages
✅ ไม่ติด/ค้างหน้า Login หาก Firebase ยังไม่ได้ตั้งค่า
✅ Guest mode จะทำงานอัตโนมัติ
✅ Inventory / Specs / 360 / Compare / Service / 3 Languages ใช้งานได้
✅ Smart Compare ไฮไลต์ BEST สีเขียว
✅ Service Center พร้อมรูป
✅ Google Sheet CRM ถูกเตรียมไว้
✅ ถ้า Apps Script endpoint ยังไม่พร้อม ข้อมูล CRM จะเข้าคิวใน browser ไม่ถูกทิ้ง
✅ เมื่อเชื่อม Apps Script endpoint ระบบจะพยายามส่งคิวเดิมอัตโนมัติ
✅ เมื่อใส่ Firebase config จริง ระบบจะเปลี่ยนจาก Guest เป็น Login จริงอัตโนมัติ

สิ่งที่ต้องใช้สิทธิ์บัญชีภายนอก จึงไม่สามารถสร้างแทนเจ้าของจากไฟล์เว็บได้:
1. Firebase Web App config สำหรับ Google / Email / Phone OTP
2. Deploy Google Apps Script Web App URL สำหรับส่งข้อมูลเข้า Sheet
3. GitHub write permission ของ ChatGPT connector ถ้าต้องการให้อัปโหลดจากแชตโดยตรง

ไม่มี Password หรือ OTP ถูกเก็บใน Google Sheet
