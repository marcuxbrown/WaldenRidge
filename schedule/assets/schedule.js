/* Schedule a Call — Walden Ridge
   Calendar picker + form submission to Apps Script
   Loaded with defer — DOM is ready when this runs.
*/

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxpqCxmIbQQGecvCclMtg6RZK-gPHLSGFeYh1-5xa3Qz72Ag8-vtT0cT6BspglWETTEeA/exec";
const form = document.getElementById('wr-schedule');
const statusEl = document.getElementById('status');
const mailto = document.getElementById('mailto-fallback');

const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

const calTitle = document.getElementById('cal-title');
const calGrid = document.getElementById('cal-grid');
const btnPrev = document.getElementById('cal-prev');
const btnNext = document.getElementById('cal-next');
const timeGrid = document.getElementById('time-grid');
const slotDate = document.getElementById('slot_date');
const slotTime = document.getElementById('slot_time');

const TZ = 'America/New_York';
const START_HOUR = 8;
const END_HOUR = 17;
const SLOT_MIN = 15;

function setStatus(msg, kind){
  statusEl.textContent = msg || '';
  statusEl.classList.remove('status-ok','status-bad');
  if(kind==='ok') statusEl.classList.add('status-ok');
  if(kind==='bad') statusEl.classList.add('status-bad');
}

function fmtMonthTitle(d){
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function ymd(d){
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function isWeekday(d){
  const day = d.getDay();
  return day >= 1 && day <= 5;
}

function buildSlots(){
  const out=[];
  for(let h=START_HOUR; h<END_HOUR; h++){
    for(let min=0; min<60; min+=SLOT_MIN){
      const hh = String(h).padStart(2,'0');
      const mm = String(min).padStart(2,'0');
      out.push(`${hh}:${mm}`);
    }
  }
  return out;
}

const SLOTS = buildSlots();

function clearActive(container){
  container.querySelectorAll('[data-active="true"]').forEach(el => el.dataset.active = 'false');
}

function renderTimes(){
  timeGrid.innerHTML='';
  SLOTS.forEach(t => {
    const b=document.createElement('button');
    b.type='button';
    b.textContent=t;
    b.className='btn btn-secondary';
    b.style.borderRadius='12px';
    b.style.padding='12px 12px';
    b.style.justifyContent='center';
    b.dataset.value=t;
    b.dataset.active='false';
    b.addEventListener('click', () => {
      clearActive(timeGrid);
      b.dataset.active='true';
      slotTime.value=t;
      updateMailto();
    });
    timeGrid.appendChild(b);
  });
}

function renderCalendar(view){
  calTitle.textContent = fmtMonthTitle(view);
  calGrid.innerHTML='';

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const startDow = first.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth()+1, 0).getDate();

  for(let i=0;i<startDow;i++){
    const blank=document.createElement('div');
    calGrid.appendChild(blank);
  }

  const today = new Date();
  today.setHours(0,0,0,0);

  for(let day=1; day<=daysInMonth; day++){
    const d=new Date(view.getFullYear(), view.getMonth(), day);
    d.setHours(0,0,0,0);

    const b=document.createElement('button');
    b.type='button';
    b.textContent=String(day);
    b.style.border='1px solid var(--line-soft)';
    b.style.background='rgba(255,255,255,0.5)';
    b.style.borderRadius='999px';
    b.style.height='48px';
    b.style.width='48px';
    b.style.margin='0 auto';
    b.style.display='inline-flex';
    b.style.alignItems='center';
    b.style.justifyContent='center';
    b.style.cursor='pointer';

    const selectable = isWeekday(d) && d >= today;
    if(!selectable){
      b.style.opacity='0.35';
      b.style.cursor='not-allowed';
      b.disabled=true;
    }

    b.dataset.value=ymd(d);
    b.dataset.active='false';

    b.addEventListener('click', () => {
      clearActive(calGrid);
      b.dataset.active='true';
      slotDate.value=b.dataset.value;
      updateMailto();
    });

    calGrid.appendChild(b);
  }

  calGrid.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if(btn.disabled) return;
      btn.style.borderColor='rgba(0,0,0,0.25)';
    });
    btn.addEventListener('mouseleave', () => {
      if(btn.dataset.active==='true') return;
      btn.style.borderColor='var(--line-soft)';
    });
  });
}

function applyActiveStyles(){
  calGrid.querySelectorAll('button').forEach(btn => {
    if(btn.dataset.active==='true'){
      btn.style.background='rgba(29, 62, 47, 0.10)';
      btn.style.borderColor='rgba(29, 62, 47, 0.35)';
    } else {
      btn.style.background='rgba(255,255,255,0.5)';
      btn.style.borderColor='var(--line-soft)';
    }
  });
  timeGrid.querySelectorAll('button').forEach(btn => {
    if(btn.dataset.active==='true'){
      btn.style.background='rgba(29, 62, 47, 0.10)';
      btn.style.borderColor='rgba(29, 62, 47, 0.35)';
    } else {
      btn.style.background='transparent';
      btn.style.borderColor='var(--line-soft)';
    }
  });
}

let view = new Date();
view = new Date(view.getFullYear(), view.getMonth(), 1);

btnPrev.addEventListener('click', () => {
  view = new Date(view.getFullYear(), view.getMonth()-1, 1);
  renderCalendar(view);
  applyActiveStyles();
});
btnNext.addEventListener('click', () => {
  view = new Date(view.getFullYear(), view.getMonth()+1, 1);
  renderCalendar(view);
  applyActiveStyles();
});

function collect(){
  const fd = new FormData(form);
  return Object.fromEntries(fd.entries());
}

function buildMailto(d){
  const subject = 'Walden Ridge | Initial Consultation';
  const when = (d.slot_date && d.slot_time) ? `${d.slot_date} ${d.slot_time} ET` : '';
  const body = [
    'Call request',
    '',
    `Name: ${d.name||''}`,
    `Email: ${d.email||''}`,
    `Phone: ${d.phone||''}`,
    `Property: ${d.property||''}`,
    when ? '' : '',
    when ? `Requested slot (ET): ${when}` : 'Requested slot (ET):',
    '',
    d.notes ? `Notes: ${d.notes}` : ''
  ].filter(Boolean).join('\n');
  return `mailto:workwithus@waldenridgeco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function updateMailto(){
  const d = collect();
  mailto.href = buildMailto(d);
  applyActiveStyles();
}

form.addEventListener('input', updateMailto);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if(submitBtn && submitBtn.disabled) return;
  // Honeypot check
  const hp = form.querySelector('[name="website"]');
  if(hp && hp.value) return;

  const d = collect();

  if(!d.name || !d.email || !d.slot_date || !d.slot_time){
    setStatus('Please select a date and time, and fill required fields.', 'bad');
    return;
  }
  if(submitBtn) submitBtn.disabled = true;

  if(!WEB_APP_URL || WEB_APP_URL.includes('__APPS_SCRIPT_WEBAPP_URL__')){
    setStatus('Scheduling endpoint not configured yet. Use "Email instead".', 'bad');
    return;
  }

  try{
    setStatus('Submitting\u2026', null);
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'schedule_request', ...d, tz: TZ, duration_min: 15 })
    });
    const txt = await res.text();
    let j; try{ j = JSON.parse(txt); } catch { j = { ok:false, raw:txt }; }
    if(!res.ok || !j.ok){
      setStatus(j.error || 'Submit failed.', 'bad');
      return;
    }
    setStatus('Request received. We will confirm shortly.', 'ok');
    form.reset();
    slotDate.value='';
    slotTime.value='';
    renderCalendar(view);
    renderTimes();
    updateMailto();
  }catch(err){
    setStatus('Network error. Use "Email instead".', 'bad');
  }finally{
    if(submitBtn) submitBtn.disabled = false;
  }
});

// init
renderCalendar(view);
renderTimes();
updateMailto();
