/** PHALUAY MOTOR — Google Sheets CRM Web App
 * Paste this into script.google.com, deploy as Web App, execute as yourself,
 * and set access to Anyone. Then paste the /exec URL into sheet-config.js.
 */
const SPREADSHEET_ID = '1h5MWnaDPt-MI4C_ovXKToSptBgTKO3cDlzGv5inAXIg';

function doGet(){
  return ContentService.createTextOutput(JSON.stringify({ok:true,service:'PHALUAY MOTOR CRM'})).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  try{
    const body=JSON.parse((e&&e.postData&&e.postData.contents)||'{}');
    const type=String(body.type||'').toLowerCase();
    const p=body.payload||{};
    const ss=SpreadsheetApp.openById(SPREADSHEET_ID);
    if(type==='customer') appendCustomer_(ss,p,body);
    else if(type==='lead') appendLead_(ss,p,body);
    else if(type==='booking') appendBooking_(ss,p,body);
    else if(type==='service') appendService_(ss,p,body);
    else throw new Error('Unknown type');
    return json_({ok:true});
  }catch(err){ return json_({ok:false,error:String(err)}); }
}

function json_(v){return ContentService.createTextOutput(JSON.stringify(v)).setMimeType(ContentService.MimeType.JSON)}
function now_(){return new Date()}
function safe_(v){return v==null?'':String(v).slice(0,2000)}

function appendCustomer_(ss,p,b){
  const sh=ss.getSheetByName('Customers');
  const uid=safe_(p.uid);
  if(uid){
    const vals=sh.getDataRange().getValues();
    for(let r=1;r<vals.length;r++) if(String(vals[r][0])===uid){
      sh.getRange(r+1,1,1,11).setValues([[uid,safe_(p.name),safe_(p.email),safe_(p.phone),safe_(p.provider),safe_(p.emailVerified),safe_(p.signupDate),now_(),safe_(p.interestedModel),safe_(p.status||'Active'),safe_(p.notes)]]); return;
    }
  }
  sh.appendRow([uid,safe_(p.name),safe_(p.email),safe_(p.phone),safe_(p.provider),safe_(p.emailVerified),safe_(p.signupDate),now_(),safe_(p.interestedModel),safe_(p.status||'Active'),safe_(p.notes)]);
}
function appendLead_(ss,p,b){ss.getSheetByName('Leads').appendRow([Utilities.getUuid(),now_(),safe_(p.name),safe_(p.email),safe_(p.phone),safe_(p.model),safe_(p.intent),safe_(p.note),safe_(b.source||'Website'),'New','', '']);}
function appendBooking_(ss,p,b){ss.getSheetByName('Bookings').appendRow([Utilities.getUuid(),now_(),safe_(p.name),safe_(p.email),safe_(p.phone),safe_(p.vehicle||p.model),safe_(p.variant),safe_(p.color),safe_(p.bookingType||p.intent),safe_(p.appointmentDate),'New',safe_(p.notes||p.note)]);}
function appendService_(ss,p,b){ss.getSheetByName('Service').appendRow([Utilities.getUuid(),now_(),safe_(p.name),safe_(p.email),safe_(p.phone),safe_(p.vehicle||p.model),safe_(p.serviceType||p.intent),safe_(p.symptoms||p.note),safe_(p.appointmentDate),'New','',safe_(p.notes)]);}
