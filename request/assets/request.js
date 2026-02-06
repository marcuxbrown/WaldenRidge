/* Request Proposal (public)
   - Emails proposal PDF via Apps Script
   - Opens PDF in a new tab on submit (best-effort; pop-up blockers may apply)
*/

const WEB_APP_URL = "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLid0fOtSJeP8f1JCOVvlffevjbZ9pEyhyNUsP1H2oEF3tIbBTa3EzudrHjO55dD_2tv8h9kKhA1dxIKSeWXg6SRQmLVyd4aW9s8Lh0Ijc70-EymMsaa-B0Nj36fopg2BmIfApm8cEHJ498EM4mB_mTc0BhgzPub7ez-md4-L8Po3M3BKYD8gLyRe4bMFU7jqSxH-iYip-aDnUryrkqrYXtXZ8TTZTECjivdpLX0BzKofS8VBSayYqyZq6tRxBun-PGqu1hTk6ob_OKXgCHUGX7N3rUXWT5PVW0Fd123&lib=M2amxi56kUsxTNRame4gT5vEb409dptCx";
const PROPOSAL_PDF_URL = "https://waldenridge.pages.dev/assets/downloads/Walden%20Ridge%20-%20Proposal%20Sheet.pdf";

const form = document.getElementById('wr-request');
const statusEl = document.getElementById('request-status');
const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

function setStatus(msg, kind){
  if (statusEl) {
    statusEl.textContent = msg || '';
    statusEl.classList.remove('status-ok','status-bad');
    if(kind==='ok') statusEl.classList.add('status-ok');
    if(kind==='bad') statusEl.classList.add('status-bad');
  }
  if (submitBtn) {
    if (!msg) submitBtn.textContent = 'Email me the proposal';
    else submitBtn.textContent = msg;
  }
}

function collect(){
  const fd = new FormData(form);
  return {
    kind: 'proposal_request',
    name: (fd.get('name') || '').toString().trim(),
    company: (fd.get('company') || '').toString().trim(),
    email: (fd.get('email') || '').toString().trim(),
    role: (fd.get('role') || '').toString().trim(),
    notes: (fd.get('notes') || '').toString().trim(),
    pdf_url: PROPOSAL_PDF_URL
  };
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const d = collect();
  if(!d.name || !d.company || !d.email || !d.role){
    setStatus('Please fill required fields.', 'bad');
    return;
  }

  // Open the PDF in a new tab immediately (must be within user gesture)
  // This is independent of whether the email request succeeds.
  let pdfWin = null;
  try { pdfWin = window.open(PROPOSAL_PDF_URL, '_blank', 'noopener'); } catch {}

  try {
    setStatus('Sending...', null);

    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(d),
      redirect: 'follow'
    });

    const txt = await res.text();
    let j; try{ j = JSON.parse(txt); } catch { j = { ok:false, raw:txt }; }

    if(!res.ok || !j.ok){
      setStatus(j.error || 'Request failed. Please email us instead.', 'bad');
      if(pdfWin) pdfWin.close();
      return;
    }

    // If pop-up was blocked, open PDF now as fallback
    if(!pdfWin){
      window.open(PROPOSAL_PDF_URL, '_blank', 'noopener');
    }

    setStatus('Sent. Check your inbox.', 'ok');

    // Optional: redirect to thanks page
    setTimeout(() => { window.location.href = './thanks.html'; }, 600);

  } catch (err) {
    setStatus('Network error. Please email us instead.', 'bad');
    if(pdfWin) pdfWin.close();
  }
});
