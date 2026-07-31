async function loadJSON(p){const r=await fetch(p+"?v="+Date.now());if(!r.ok)throw new Error(p);return r.json()}function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}async function renderEvents(id,limit){const e=document.getElementById(id);if(!e)return;try{let d=await loadJSON('/content/events.json'),a=limit?d.events.slice(0,limit):d.events;e.innerHTML=a.map(x=>`<article class="card"><img src="${esc(x.image)}" alt=""><div class="card-body"><span class="status">${esc(x.status)}</span><h3>${esc(x.title)}</h3><p><strong>${esc(x.date)}</strong><br>${esc(x.description)}</p><a class="btn btn-main" target="_blank" href="${esc(x.form_url)}">申込みはこちら</a></div></article>`).join('')}catch(_){e.innerHTML='<p>イベント情報を読み込めませんでした。</p>'}}async function renderReports(id,limit){const e=document.getElementById(id);if(!e)return;try{let d=await loadJSON('/content/reports.json'),a=limit?d.reports.slice(0,limit):d.reports;e.innerHTML=a.map(x=>`<article class="card"><img src="${esc(x.image)}" alt=""><div class="card-body"><span class="status">${esc(x.date)}</span><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><a target="_blank" href="${esc(x.link||'#')}">詳しく見る →</a></div></article>`).join('')}catch(_){e.innerHTML='<p>活動報告を読み込めませんでした。</p>'}}async function renderGallery(id){const e=document.getElementById(id);if(!e)return;try{let d=await loadJSON('/content/gallery.json');e.innerHTML=d.photos.map(x=>`<img src="${esc(x.image)}" alt="${esc(x.caption)}">`).join('')}catch(_){e.innerHTML='<p>写真を読み込めませんでした。</p>'}}
async function renderSiteSettings(){
  try{
    const d=await loadJSON("/site.json");
    document.querySelectorAll("[data-site='hero_title']").forEach(el=>el.textContent=d.hero_title||"");
    document.querySelectorAll("[data-site='hero_text']").forEach(el=>el.textContent=d.hero_text||"");
    document.querySelectorAll("[data-site='email']").forEach(el=>{el.textContent=d.email||"";el.href="mailto:"+(d.email||"");});
    document.querySelectorAll("[data-site='line_url']").forEach(el=>el.href=d.line_url||"#");
    document.querySelectorAll("[data-site='instagram_url']").forEach(el=>el.href=d.instagram_url||"#");
    document.querySelectorAll("[data-site='form_url']").forEach(el=>el.href=d.form_url||"#");
  }catch(e){}
}
async function renderVolunteer(){
  const el=document.getElementById("volunteer-content"); if(!el)return;
  try{
    const d=await loadJSON("/volunteer.json");
    el.innerHTML=`<p>${esc(d.lead||"")}</p><div class="list">${
      (d.groups||[]).map(x=>`<div class="list-item"><h3>${esc(x.name)}</h3><p>${esc(x.description)}</p></div>`).join("")
    }</div><div class="actions"><a class="btn btn-main" data-site="form_url" target="_blank" rel="noopener">参加フォーム</a><a class="btn btn-sub" data-site="line_url" target="_blank" rel="noopener">公式LINEで相談</a></div>`;
    renderSiteSettings();
  }catch(e){el.innerHTML="<p>募集内容を読み込めませんでした。</p>";}
}
document.addEventListener("DOMContentLoaded",renderSiteSettings);
