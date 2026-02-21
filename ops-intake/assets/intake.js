/* Walden Ridge Ops Intake (free interim)
   - Client-side photo compression
   - POST JSON to Apps Script Web App

   Configure WEB_APP_URL after you deploy Apps Script.
*/

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxpqCxmIbQQGecvCclMtg6RZK-gPHLSGFeYh1-5xa3Qz72Ag8-vtT0cT6BspglWETTEeA/exec";

const MAX_PHOTOS = 3;
const MAX_EDGE = 1600;
const MAX_BYTES = Math.floor(1.5 * 1024 * 1024);

const form = document.getElementById('wr-intake');
const photosInput = document.getElementById('photos');
const previews = document.getElementById('photo-previews');
const photoStatus = document.getElementById('photo-status');
const submitStatus = document.getElementById('submit-status');
const emailProposalBtn = document.getElementById('email-proposal');

let lastSuccess = null; // { data, pdfUrl, folderUrl }

let compressedPhotos = []; // {name, type, dataUrl}

function setStatus(el, msg, kind){
  el.textContent = msg || '';
  el.classList.remove('status-ok','status-bad');
  if(kind==='ok') el.classList.add('status-ok');
  if(kind==='bad') el.classList.add('status-bad');
}

function readFileAsDataURL(file){
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

async function fileToImageBitmap(file){
  const blobUrl = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = blobUrl;
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
    });
    return img;
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

function canvasToDataURL(canvas, quality){
  return canvas.toDataURL('image/jpeg', quality);
}

function dataUrlBytes(dataUrl){
  // base64 length approximation
  const base64 = dataUrl.split(',')[1] || '';
  return Math.floor(base64.length * 0.75);
}

async function compressImage(file){
  const img = await fileToImageBitmap(file);
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const scale = Math.min(1, MAX_EDGE / Math.max(w,h));
  const tw = Math.max(1, Math.round(w * scale));
  const th = Math.max(1, Math.round(h * scale));

  const canvas = document.createElement('canvas');
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.drawImage(img, 0, 0, tw, th);

  // try descending quality until under MAX_BYTES
  let q = 0.82;
  let dataUrl = canvasToDataURL(canvas, q);
  while(dataUrlBytes(dataUrl) > MAX_BYTES && q > 0.5){
    q = Math.max(0.5, q - 0.08);
    dataUrl = canvasToDataURL(canvas, q);
  }

  return {
    name: (file.name || 'photo').replace(/\s+/g,'_'),
    type: 'image/jpeg',
    dataUrl
  };
}

function collectFormData(){
  const fd = new FormData(form);

  const scopes = [];
  for (const el of form.querySelectorAll('input[name="scope"]')) {
    if (el.checked) scopes.push(el.value);
  }

  return {
    property: (fd.get('property') || '').toString().trim(),
    brand: (fd.get('brand') || '').toString().trim(),
    city: (fd.get('city') || '').toString().trim(),
    state: (fd.get('state') || '').toString().trim(),
    owner_entity: (fd.get('owner_entity') || '').toString().trim(),
    management_company: (fd.get('management_company') || '').toString().trim(),

    contact_name: (fd.get('contact_name') || '').toString().trim(),
    contact_role: (fd.get('contact_role') || '').toString().trim(),
    contact_email: (fd.get('contact_email') || '').toString().trim(),
    contact_phone: (fd.get('contact_phone') || '').toString().trim(),

    renovation_type: (fd.get('renovation_type') || '').toString().trim(),
    occupancy_status: (fd.get('occupancy_status') || '').toString().trim(),
    phasing: (fd.get('phasing') || '').toString().trim(),
    quiet_hours: (fd.get('quiet_hours') || '').toString().trim(),

    casegoods: (fd.get('casegoods') || '').toString().trim(),
    casegoods_notes: (fd.get('casegoods_notes') || '').toString().trim(),
    ffe: (fd.get('ffe') || '').toString().trim(),
    ffe_notes: (fd.get('ffe_notes') || '').toString().trim(),
    mep: (fd.get('mep') || '').toString().trim(),
    mep_notes: (fd.get('mep_notes') || '').toString().trim(),
    owner_items: (fd.get('owner_items') || '').toString().trim(),
    owner_items_notes: (fd.get('owner_items_notes') || '').toString().trim(),

    key_risks: (fd.get('key_risks') || '').toString().trim(),
    open_questions: (fd.get('open_questions') || '').toString().trim(),

    follow_up: (fd.get('follow_up') || '').toString().trim(),
    step_one: (fd.get('step_one') || '').toString().trim(),
    step_two: (fd.get('step_two') || '').toString().trim(),
    step_three: (fd.get('step_three') || '').toString().trim(),

    notes: (fd.get('notes') || '').toString().trim(),
    scope: scopes
  };
}

function validateRequired(data){
  const required = ['property','brand','city','state','owner_entity','contact_name','contact_role','renovation_type','occupancy_status'];
  const missing = required.filter(k => !data[k]);
  return missing;
}

function renderPreviews(){
  previews.innerHTML = '';
  for(const p of compressedPhotos){
    const img = document.createElement('img');
    img.src = p.dataUrl;
    img.alt = p.name;
    previews.appendChild(img);
  }
}

photosInput?.addEventListener('change', async () => {
  try {
    setStatus(photoStatus, '', null);
    compressedPhotos = [];
    previews.innerHTML = '';

    const files = Array.from(photosInput.files || []);
    if(!files.length) return;

    const picked = files.slice(0, MAX_PHOTOS);
    if(files.length > MAX_PHOTOS){
      setStatus(photoStatus, `Only the first ${MAX_PHOTOS} photo(s) will be used.`, 'bad');
    }

    setStatus(photoStatus, 'Compressing photos…', null);

    for(const f of picked){
      const c = await compressImage(f);
      compressedPhotos.push(c);
    }

    renderPreviews();
    setStatus(photoStatus, `${compressedPhotos.length} photo(s) ready.`, 'ok');
  } catch (e){
    console.error(e);
    setStatus(photoStatus, 'Photo processing failed. Try fewer photos or smaller images.', 'bad');
  }
});

function buildEmailDraft_(){
  if(!lastSuccess) return null;
  const d = lastSuccess.data || {};
  const subject = `Lead Call Intake — ${d.property || 'Property'} (${d.city || ''}${d.state ? ', ' + d.state : ''})`;
  const lines = [];
  lines.push('Walden Ridge — Lead Call Intake');
  lines.push('');
  lines.push(`Property: ${d.property || ''}`);
  lines.push(`Brand/Flag: ${d.brand || ''}`);
  lines.push(`Location: ${d.city || ''}${d.state ? ', ' + d.state : ''}`);
  lines.push(`Owner entity: ${d.owner_entity || ''}`);
  if(d.management_company) lines.push(`Management company: ${d.management_company}`);
  lines.push('');
  lines.push(`Contact: ${d.contact_name || ''}${d.contact_role ? ' · ' + d.contact_role : ''}`);
  if(d.contact_email) lines.push(`Email: ${d.contact_email}`);
  if(d.contact_phone) lines.push(`Phone: ${d.contact_phone}`);
  lines.push('');
  lines.push(`Renovation type: ${d.renovation_type || ''}`);
  lines.push(`Occupancy: ${d.occupancy_status || ''}`);
  if(Array.isArray(d.scope) && d.scope.length) lines.push(`Scope: ${d.scope.join(', ')}`);
  if(d.phasing) lines.push(`Phasing: ${d.phasing}`);
  if(d.quiet_hours) lines.push(`Quiet hours: ${d.quiet_hours}`);
  lines.push('');
  if(lastSuccess.pdfUrl) lines.push(`PDF: ${lastSuccess.pdfUrl}`);
  if(lastSuccess.folderUrl) lines.push(`Drive folder: ${lastSuccess.folderUrl}`);
  return { subject, body: lines.join('\n') };
}

emailProposalBtn?.addEventListener('click', () => {
  const draft = buildEmailDraft_();
  if(!draft){
    setStatus(submitStatus, 'No saved intake to email yet.', 'bad');
    return;
  }
  const mailto = `mailto:workwithus@waldenridgeco.com?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  window.location.href = mailto;
});

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  setStatus(submitStatus, '', null);

  // Honeypot check
  const hp = form.querySelector('[name="website"]');
  if (hp && hp.value) return;

  const data = collectFormData();
  const missing = validateRequired(data);
  if(missing.length){
    setStatus(submitStatus, `Missing required fields: ${missing.join(', ')}`, 'bad');
    return;
  }

  if(!WEB_APP_URL || WEB_APP_URL.includes('__APPS_SCRIPT_WEBAPP_URL__')){
    setStatus(submitStatus, 'Apps Script URL not configured yet.', 'bad');
    return;
  }

  const payload = {
    kind: 'intake_submit',
    ...data,
    photos: compressedPhotos,
    client: {
      userAgent: navigator.userAgent,
      ts: new Date().toISOString()
    }
  };

  try {
    setStatus(submitStatus, 'Submitting…', null);

    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { ok:false, raw:text }; }

    if(!res.ok || !json.ok){
      const msg = json.error || `Submit failed (${res.status})`;
      setStatus(submitStatus, msg, 'bad');
      return;
    }

    // Stash last success so we can generate an email draft
    lastSuccess = { data, pdfUrl: json.pdfUrl || '', folderUrl: json.folderUrl || '' };

    if(emailProposalBtn){
      emailProposalBtn.style.display = 'inline-flex';
    }

    setStatus(submitStatus, 'Saved. Opening PDF…', 'ok');
    if(json.pdfUrl){
      window.open(json.pdfUrl, '_blank', 'noopener,noreferrer');
    }

    // Do NOT auto-reset; user may want to click "Email proposal" next.

  } catch (err){
    console.error(err);
    setStatus(submitStatus, 'Network error submitting intake. Try again.', 'bad');
  }
});
