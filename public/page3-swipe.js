(() => {
  const STYLE = `
    .page3-next-leaf.page3-swipe-ready{
      width:min(260px,68vw)!important;height:58px!important;border-radius:999px!important;
      display:flex!important;align-items:center!important;justify-content:flex-start!important;
      padding:0 10px!important;gap:10px!important;position:relative!important;overflow:hidden!important;
      background:linear-gradient(90deg,rgba(255,190,218,.16),rgba(27,17,35,.94))!important;
      border:1px solid rgba(255,213,229,.34)!important;box-shadow:0 12px 35px rgba(0,0,0,.45),0 0 30px rgba(255,111,187,.14)!important;
      transform:scale(1)!important;opacity:1!important;pointer-events:auto!important;animation:none!important;
      touch-action:none!important;
    }
    .page3-swipe-ready .swipe-track{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;}
    .page3-swipe-ready .swipe-label{font-size:.68rem;letter-spacing:.11em;text-transform:uppercase;color:#ffd7e5;opacity:.9;white-space:nowrap;transition:opacity .2s ease;}
    .page3-swipe-ready .swipe-handle{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;flex:0 0 42px;background:radial-gradient(circle at 35% 30%,rgba(255,202,224,.3),rgba(27,17,35,.98) 68%);border:1px solid rgba(255,213,229,.48);box-shadow:0 5px 18px rgba(0,0,0,.35),0 0 18px rgba(255,111,187,.18);z-index:2;transform:translateX(0);transition:transform .08s linear;}
    .page3-swipe-ready .swipe-handle span{font-size:1.15rem;line-height:1;}
    .page3-swipe-ready .swipe-arrow{position:absolute;right:13px;font-size:1.05rem;color:#ffd1e2;opacity:.75;animation:page3SwipeHint 1.6s ease-in-out infinite;}
    .page3-swipe-ready .swipe-small{position:absolute;bottom:4px;left:50%;transform:translateX(-50%);font-size:.48rem;letter-spacing:.12em;color:#f3cad9;opacity:.55;white-space:nowrap;text-transform:uppercase;}
    .page3-swipe-ready.swiping .swipe-label{opacity:.25}.page3-swipe-ready.swiping .swipe-arrow{opacity:0}
    .page3-swipe-ready.swipe-complete{pointer-events:none!important;}
    @keyframes page3SwipeHint{0%,100%{transform:translateX(0);opacity:.5}50%{transform:translateX(6px);opacity:1}}
    @media(max-width:420px){.page3-next-leaf.page3-swipe-ready{width:min(235px,64vw)!important}.page3-swipe-ready .swipe-label{font-size:.6rem}}
  `;
  const style=document.createElement('style');style.textContent=STYLE;document.head.appendChild(style);

  let lastButton=null;
  function enhance(){
    const btn=document.querySelector('#nextMemory');
    if(!btn || btn===lastButton)return;
    lastButton=btn;
    btn.classList.add('page3-swipe-ready');
    btn.innerHTML='<span class="swipe-handle"><span>🍃</span></span><span class="swipe-track"><b class="swipe-label">Swipe to the next memory</b></span><i class="swipe-arrow">→</i><small class="swipe-small">or tap the leaf</small>';
    let startX=0,startY=0,dragging=false,moved=false;
    const onStart=e=>{
      const p=e.touches?e.touches[0]:e; startX=p.clientX;startY=p.clientY;dragging=true;moved=false;btn.classList.add('swiping');
    };
    const onMove=e=>{
      if(!dragging)return;
      const p=e.touches?e.touches[0]:e; const dx=Math.min(0,p.clientX-startX); const dy=p.clientY-startY;
      if(Math.abs(dx)>8)moved=true;
      if(Math.abs(dx)>Math.abs(dy) && dx<0){e.preventDefault?.(); const max=btn.clientWidth-62; const amount=Math.min(max,Math.abs(dx)); btn.querySelector('.swipe-handle').style.transform=`translateX(${amount}px)`;}
    };
    const onEnd=e=>{
      if(!dragging)return; dragging=false;btn.classList.remove('swiping');
      const p=e.changedTouches?e.changedTouches[0]:e; const dx=p.clientX-startX; const dy=p.clientY-startY;
      btn.querySelector('.swipe-handle').style.transform='translateX(0)';
      if(dx<-55 && Math.abs(dx)>Math.abs(dy)){btn.classList.add('swipe-complete');setTimeout(()=>btn.click(),90);}
    };
    btn.addEventListener('touchstart',onStart,{passive:true});btn.addEventListener('touchmove',onMove,{passive:false});btn.addEventListener('touchend',onEnd,{passive:true});
    btn.addEventListener('pointerdown',onStart);btn.addEventListener('pointermove',onMove);btn.addEventListener('pointerup',onEnd);
  }
  new MutationObserver(enhance).observe(document.body,{childList:true,subtree:true});
  enhance();
})();
