(() => {
  window.BirthdayTransitions = window.BirthdayTransitions || {};
  window.BirthdayTransitions.page1ToPage2 = function () {
    if (window.BirthdayStory?.isTransitioning()) return;
    window.BirthdayStory?.beginTransition();
    document.querySelector('.story-screen')?.classList.add('story-leave');
    const t=document.createElement('div');t.className='hand-journey';t.innerHTML='<div class="hand-copy waiting-copy">I was waiting for you… 🫴🏻<small>come a little closer</small></div><div class="waiting-hand">🫴🏻</div><div class="hand-copy reach-copy">A little closer… ❤️</div><div class="reaching-hand">🫲🏻</div><div class="connected-hands">🫱🏻‍🫲🏻</div><div class="hand-copy hold-copy">There you are. ❤️</div><div class="hand-copy pull-copy">Come with me… ✨</div>';document.body.appendChild(t);requestAnimationFrame(()=>t.classList.add('start'));setTimeout(()=>t.classList.add('reach'),1050);setTimeout(()=>t.classList.add('hold'),2750);setTimeout(()=>t.classList.add('pull'),3900);setTimeout(()=>{t.classList.add('exit');setTimeout(()=>{t.remove();window.BirthdayStory?.advanceTo(1)},650)},5050);
  };
})();
