(function(){
var d=document,de=d.documentElement;de.classList.add('js');
function $(s,r){return (r||d).querySelector(s)}function $$(s,r){return Array.prototype.slice.call((r||d).querySelectorAll(s))}
// menu
var bg=$('.burger'),nv=$('#nav');
if(bg&&nv){bg.addEventListener('click',function(){var o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)});}
// language selector (details works without JS; this adds Esc / outside-click close)
var ls=$('[data-ls]');
if(ls){
  d.addEventListener('click',function(e){if(ls.open&&!ls.contains(e.target))ls.open=false});
  ls.addEventListener('keydown',function(e){if(e.key==='Escape'&&ls.open){ls.open=false;$('summary',ls).focus()}});
  ls.addEventListener('focusout',function(e){if(ls.open&&e.relatedTarget&&!ls.contains(e.relatedTarget))ls.open=false});
}
// remember a manual language choice (read by the edge middleware on '/')
$$('.ls-l a[hreflang], footer a[hreflang]').forEach(function(a){a.addEventListener('click',function(){
  var h=(a.getAttribute('hreflang')||'').toLowerCase(),l=h==='de-at'?'at':h.slice(0,2);
  if(/^(hr|en|de|at|it|sl|cs)$/.test(l))d.cookie='vr_lang='+l+'; path=/; max-age=31536000; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');
})});
// date min + linkage
function today(){var t=new Date();t.setMinutes(t.getMinutes()-t.getTimezoneOffset());return t.toISOString().slice(0,10)}
function addDay(s,n){var x=new Date(s+'T00:00:00');x.setDate(x.getDate()+n);x.setMinutes(x.getMinutes()-x.getTimezoneOffset());return x.toISOString().slice(0,10)}
$$('input[type=date][name=in]').forEach(function(i){
  var o=$('input[type=date][name=out]',i.form);i.min=today();if(o)o.min=today();
  i.addEventListener('change',function(){if(!i.value||!o)return;o.min=addDay(i.value,1);if(!o.value||o.value<=i.value)o.value=addDay(i.value,7)});
});
// click-to-load map
$$('[data-map]').forEach(function(b){b.addEventListener('click',function(){var m=b.parentNode,f=d.createElement('iframe');f.src=m.getAttribute('data-src');f.loading='lazy';f.title='Google Maps';f.setAttribute('referrerpolicy','no-referrer-when-downgrade');m.insertBefore(f,b);b.remove()})});
// gallery filter
var fb=$$('.filters button');
fb.forEach(function(b){b.addEventListener('click',function(){var f=b.getAttribute('data-f');fb.forEach(function(x){x.setAttribute('aria-pressed',x===b)});$$('.gal .gi').forEach(function(g){g.hidden=!(f==='all'||g.getAttribute('data-sec')===f)})})});
// lightbox
var lb=$('#lb');
if(lb&&lb.showModal){
  var li=$('img',lb),cnt=$('.cnt',lb),list=[],idx=0;
  function show(i){idx=(i+list.length)%list.length;var a=list[idx];li.src=a.href;li.alt=$('img',a).alt;cnt.textContent=(idx+1)+' / '+list.length+' · '+li.alt}
  d.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a.gi');
    if(a){e.preventDefault();var scope=a.closest('.gal,.bento')||d;list=$$('a.gi',scope).filter(function(x){return !x.hidden});show(list.indexOf(a));lb.showModal();return}
    var b=e.target.closest&&e.target.closest('[data-lb]');
    if(b){var k=b.getAttribute('data-lb');if(k==='x')lb.close();else show(idx+(k==='n'?1:-1))}
    else if(e.target===lb)lb.close();
  });
  d.addEventListener('keydown',function(e){if(!lb.open)return;if(e.key==='ArrowRight')show(idx+1);if(e.key==='ArrowLeft')show(idx-1)});
}
// price calendar + stay calculator
var pcd=$('#pc-data');
if(pcd){
  var C=JSON.parse(pcd.textContent),pbox=$('#pcalc'),pi=$('#pc-in'),po=$('#pc-out'),pres=$('#pc-res'),pcta=$('#pc-cta');
  var pfirst=C.data[0][0],plast=C.data[C.data.length-1][1];
  function pdt(s){return new Date(s+'T00:00:00Z')}
  function padd(s,n){var x=pdt(s);x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10)}
  function pfd(s,y){var o={day:'numeric',month:'short',timeZone:'UTC'};if(y)o.year='numeric';return pdt(s).toLocaleDateString(C.locale,o)}
  function pfn(n){return C.eur.replace('{n}',new Intl.NumberFormat(C.nloc).format(n))}
  function pprice(s){for(var i=0;i<C.data.length;i++)if(s>=C.data[i][0]&&s<=C.data[i][1])return C.data[i][2];return null}
  function pel(t,c,x){var e=d.createElement(t);if(c)e.className=c;e.textContent=x;return e}
  var BK={};(C.booked||[]).forEach(function(r){for(var s=r[0];s<=r[1];s=padd(s,1))BK[s]=1});
  function nfree(a,e){for(var s=a;s<e;s=padd(s,1))if(BK[s])return false;return true}
  function okSel(x){return !!x&&!BK[x.a]&&(!x.d||nfree(x.a,x.d))}
  var tdy=today();pi.min=tdy>pfirst?tdy:pfirst;pi.max=plast;po.max=padd(plast,1);
  var EMPTY=pres.innerHTML,SVG='http://www.w3.org/2000/svg';
  function cap1(x){return x.charAt(0).toLocaleUpperCase(C.locale)+x.slice(1)}
  function wdy(s){return cap1(pdt(s).toLocaleDateString(C.locale,{weekday:'long',timeZone:'UTC'}))+', '+pdt(s).getUTCFullYear()}
  function nn(n){return(n<5&&C.c_nn_few?C.c_nn_few:C.c_nn).replace('{n}',n)}
  function chip(l,s){var c=pel('div','pr-chip','');c.appendChild(pel('span','pr-l',l));c.appendChild(pel('b','pr-d',pfd(s)));c.appendChild(pel('span','pr-w',wdy(s)));return c}
  function warn(m){
    var w=pel('div','pr-warn','');var sv=d.createElementNS(SVG,'svg');sv.setAttribute('viewBox','0 0 24 24');sv.setAttribute('width','28');sv.setAttribute('height','28');sv.setAttribute('aria-hidden','true');sv.setAttribute('focusable','false');sv.setAttribute('class','pr-ic');
    var pa=d.createElementNS(SVG,'path');pa.setAttribute('d','M12 3.5L2.8 19.5h18.4L12 3.5zM12 10v4.5M12 17.2v.1');pa.setAttribute('fill','none');pa.setAttribute('stroke','currentColor');pa.setAttribute('stroke-width','2');pa.setAttribute('stroke-linecap','round');pa.setAttribute('stroke-linejoin','round');sv.appendChild(pa);
    w.appendChild(sv);var t=pel('div','pr-wt','');t.appendChild(pel('b','',C.r_warn_h));t.appendChild(pel('p','pc-err',m));w.appendChild(t);pres.appendChild(w)
  }
  function pcalc(){
    pres.textContent='';pcta.hidden=true;
    if(!pi.value||!po.value){pres.innerHTML=EMPTY;return}
    var rng=C.c_range.replace('{a}',C.first).replace('{b}',C.last).replace(/\.\./g,'.');
    if(po.value<=pi.value){warn(C.c_order);return}
    if(Math.round((pdt(po.value)-pdt(pi.value))/864e5)<C.minNights){warn(C.c_min);return}
    if(pi.value<pfirst||po.value>padd(plast,1)){warn(rng);return}
    if(!nfree(pi.value,po.value)){warn(C.c_booked);return}
    var g=[],tot=0,n=0;
    for(var s=pi.value;s<po.value;s=padd(s,1)){var p=pprice(s);if(p==null){pres.textContent='';warn(rng);return}
      var l=g[g.length-1];if(l&&l.p===p&&l.e===padd(s,-1))l.e=s,l.k++;else g.push({s:s,e:s,p:p,k:1});tot+=p;n++}
    var dr=pel('div','pr-dates','');dr.appendChild(chip(C.c_arr,pi.value));dr.appendChild(pel('span','pr-ar','→')).setAttribute('aria-hidden','true');dr.appendChild(chip(C.c_dep,po.value));
    dr.appendChild(pel('span','pr-n',nn(n)));pres.appendChild(dr);
    var tt=pel('p','pr-tot','');tt.appendChild(pel('span','pr-l',C.r_total));tt.appendChild(pel('b','pc-t',pfn(tot)));pres.appendChild(tt);
    var dep=Math.round(tot*0.3),rest=tot-dep,pay=d.createElement('ul');pay.className='pc-pay';
    [[C.r_dep,dep,'pr-t1'],[C.r_rest,rest,'pr-t2']].forEach(function(x){var li=pel('li','pr-tile '+x[2],'');li.appendChild(pel('span','pr-l',x[0]));li.appendChild(pel('b','',pfn(x[1])));pay.appendChild(li)});
    pres.appendChild(pay);
    var dt=d.createElement('details');dt.className='pr-det';dt.appendChild(pel('summary','',C.c_lines));
    var ul=d.createElement('ul');ul.className='pr-lines';
    g.forEach(function(x){ul.appendChild(pel('li','',(x.s===x.e?pfd(x.s):pfd(x.s)+' – '+pfd(x.e))+': '+x.k+' × '+pfn(x.p)+' = '+pfn(x.k*x.p)))});
    dt.appendChild(ul);pres.appendChild(dt);
    pcta.href=C.inq+'?in='+pi.value+'&out='+po.value;pcta.hidden=false;
  }
  var S={a:null,d:null},pvw=null,drag=null,sup=false,vm=0,fd=null,cal=$('#pcal'),ms=$('#pcal-ms'),ttl=$('#pcal-t'),bp=$('#pcal-p'),bn=$('#pcal-nx'),bx=$('#pcal-x');
  function calSync(){S.a=pi.value||null;S.d=po.value||null;if(S.a&&S.d&&S.d<=S.a)S.d=null;if(cal){paint();bx.hidden=!(S.a||S.d);if(S.a)showMonth(S.a)}}
  pi.addEventListener('change',function(){if(pi.value)po.min=padd(pi.value,1);pcalc();calSync()});po.addEventListener('change',function(){pcalc();calSync()});
  if(pbox)pbox.hidden=false;
  if(cal){
    var CM=[],PM={},y0=+pfirst.slice(0,4),m0=+pfirst.slice(5,7),y1=+plast.slice(0,4),m1=+plast.slice(5,7),mq=matchMedia('(min-width:900px)');
    for(var cy=y0,cm=m0;cy<y1||(cy===y1&&cm<=m1);){CM.push([cy,cm]);if(++cm>12){cm=1;cy++}}
    C.data.forEach(function(r){for(var s=r[0];s<=r[1];s=padd(s,1))PM[s]=r[2]});
    var L=C.locale,fMon=new Intl.DateTimeFormat(L,{month:'long',year:'numeric',timeZone:'UTC'}),fFull=new Intl.DateTimeFormat(L,{weekday:'long',day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}),
      fWd=new Intl.DateTimeFormat(L,{weekday:'short',timeZone:'UTC'}),fWl=new Intl.DateTimeFormat(L,{weekday:'long',timeZone:'UTC'});
    function cap(x){return x.charAt(0).toLocaleUpperCase(L)+x.slice(1)}
    function two(n){return n<10?'0'+n:''+n}
    function sea(p){return p<=C.lowMax?'low':p<=C.midMax?'mid':'high'}
    function nvis(){return mq.matches?2:1}
    function mon(y,m){
      var dim=new Date(Date.UTC(y,m,0)).getUTCDate(),off=(new Date(Date.UTC(y,m-1,1)).getUTCDay()+6)%7,nm=cap(fMon.format(Date.UTC(y,m-1,1)));
      var w=d.createElement('div');w.className='pcal-m';
      w.appendChild(pel('div','pcal-mt',nm));
      var g=d.createElement('div');g.className='pcal-g';g.setAttribute('role','grid');g.setAttribute('aria-label',nm);
      var hr=d.createElement('div');hr.className='pcal-r pcal-wd';hr.setAttribute('role','row');
      for(var i=0;i<7;i++){var t=Date.UTC(2024,0,1+i),c=pel('div','',fWd.format(t).replace(/\.$/,''));c.setAttribute('role','columnheader');c.setAttribute('abbr',fWl.format(t));hr.appendChild(c)}
      g.appendChild(hr);
      for(var r=0;r<6;r++){
        var row=d.createElement('div');row.className='pcal-r';row.setAttribute('role','row');
        for(var c2=0;c2<7;c2++){
          var n=r*7+c2-off+1,cell=d.createElement('div');cell.setAttribute('role','gridcell');
          if(n<1||n>dim){cell.className='pcd-e'}
          else{
            var ds=y+'-'+two(m)+'-'+two(n),p=PM[ds],b=d.createElement('button');b.type='button';b.tabIndex=-1;b.setAttribute('data-d',ds);
            b.appendChild(pel('span','pcd-n',''+n));
            if(BK[ds]){b.className='pcd pcd-bk';b._l=n+', '+fFull.format(Date.UTC(y,m-1,n))+', '+C.cal_booked}
            else if(p==null){b.className='pcd pcd-off';b.disabled=true;b._l=fFull.format(Date.UTC(y,m-1,n))}
            else{b.className='pcd s-'+sea(p);b.appendChild(d.createTextNode(' '));b.appendChild(pel('span','pcd-p',pfn(p)));b._l=n+' '+pfn(p)+' '+C.per_night+', '+fFull.format(Date.UTC(y,m-1,n))+', '+C[sea(p)]}
            b.setAttribute('aria-label',b._l);cell.appendChild(b)
          }
          row.appendChild(cell)
        }
        g.appendChild(row)
      }
      w.appendChild(g);return w
    }
    function setTab(){
      var bs=$$('.pcd:not(.pcd-off)',ms),t=null;bs.forEach(function(b){b.tabIndex=-1;if(b.getAttribute('data-d')===fd)t=b});
      if(!t)t=(S.a&&$('.pcd[data-d="'+S.a+'"]',ms))||bs[0];if(t)t.tabIndex=0
    }
    function render(){
      var n=nvis();if(vm>CM.length-n)vm=CM.length-n;if(vm<0)vm=0;
      ms.textContent='';var tt=[];
      for(var i=0;i<n;i++){var ym=CM[vm+i];ms.appendChild(mon(ym[0],ym[1]));tt.push(cap(fMon.format(Date.UTC(ym[0],ym[1]-1,1))))}
      ttl.textContent=tt.join(' – ');bp.disabled=vm<=0;bn.disabled=vm>=CM.length-n;
      paint();setTab()
    }
    function paint(sel){
      var a,e,pr=false;
      if(sel){a=sel.a;e=sel.d;pr=true}else if(S.a&&!S.d&&pvw&&pvw>S.a){a=S.a;e=pvw;pr=true}else{a=S.a;e=S.d}
      $$('.pcd',ms).forEach(function(b){
        var ds=b.getAttribute('data-d'),st='',lab=b._l;
        if(ds===a){st+=' is-a';lab+=', '+C.c_arr}
        if(e&&ds===e){st+=' is-d';lab+=', '+C.c_dep}
        if(a&&e&&ds>a&&ds<e)st+=' in';
        if(st&&pr)st+=' pvw';
        var base=b.className.replace(/ ?(is-a|is-d|in|pvw)\b/g,'').replace(/\s+$/,'');
        b.className=base+st;b.setAttribute('aria-label',lab);b.parentNode.setAttribute('aria-selected',st?'true':'false')
      })
    }
    function showMonth(ds){
      var k=-1,ym=ds.slice(0,7),n=nvis();for(var i=0;i<CM.length;i++)if(CM[i][0]+'-'+two(CM[i][1])===ym)k=i;
      if(k<0)return;if(k<vm||k>=vm+n){vm=k;render()}
    }
    function pick(ds){
      if(S.a&&!S.d&&ds>S.a&&nfree(S.a,ds))S.d=ds;
      else if(BK[ds]){pvw=null;paint();return}
      else{S.a=ds;S.d=null}
      pvw=null;commit()
    }
    function commit(){
      pi.value=S.a||'';po.value=S.d||'';if(S.a)po.min=padd(S.a,1);pcalc();paint();bx.hidden=!(S.a||S.d)
    }
    function dcell(e){var el=d.elementFromPoint(e.clientX,e.clientY),b=el&&el.closest&&el.closest('.pcd:not(.pcd-off)');return b?b.getAttribute('data-d'):null}
    function dsel(){return drag.c===drag.s?{a:drag.s,d:null}:{a:drag.c<drag.s?drag.c:drag.s,d:drag.c<drag.s?drag.s:drag.c}}
    function dmove(e){
      if(!drag||e.pointerId!==drag.id)return;var c=dcell(e);
      if(c&&c!==drag.c){drag.c=c;drag.moved=true}
      if(drag.moved)paint(dsel())
    }
    function dend(){d.removeEventListener('pointermove',dmove);d.removeEventListener('pointerup',dup);d.removeEventListener('pointercancel',dcan)}
    function dup(e){
      if(!drag||e.pointerId!==drag.id)return;dend();
      if(drag.moved){var s=dsel();sup=true;setTimeout(function(){sup=false},80);pvw=null;if(okSel(s)){S.a=s.a;S.d=s.d;fd=drag.c;commit();setTab()}else paint()}
      drag=null
    }
    function dcan(){dend();if(drag&&drag.moved)paint();drag=null}
    ms.addEventListener('pointerdown',function(e){
      var b=e.target.closest&&e.target.closest('.pcd:not(.pcd-off)');if(!b||(e.pointerType==='mouse'&&e.button!==0))return;
      var ds=b.getAttribute('data-d');drag={s:ds,c:ds,id:e.pointerId,moved:false};sup=false;
      d.addEventListener('pointermove',dmove);d.addEventListener('pointerup',dup);d.addEventListener('pointercancel',dcan)
    });
    ms.addEventListener('dragstart',function(e){e.preventDefault()});
    ms.addEventListener('click',function(e){
      var b=e.target.closest&&e.target.closest('.pcd:not(.pcd-off)');if(!b||sup)return;
      fd=b.getAttribute('data-d');pick(fd);setTab()
    });
    ms.addEventListener('pointerover',function(e){
      if(e.pointerType!=='mouse'||drag)return;var b=e.target.closest&&e.target.closest('.pcd:not(.pcd-off)');
      if(!b||!S.a||S.d)return;var ds=b.getAttribute('data-d');pvw=ds>S.a&&nfree(S.a,ds)?ds:null;paint()
    });
    ms.addEventListener('pointerleave',function(){if(pvw){pvw=null;paint()}});
    function addm(ds,k){var y=+ds.slice(0,4),m=+ds.slice(5,7),dd=+ds.slice(8,10),t=Date.UTC(y,m-1+k,1),dim=new Date(Date.UTC(new Date(t).getUTCFullYear(),new Date(t).getUTCMonth()+1,0)).getUTCDate();
      return new Date(t).getUTCFullYear()+'-'+two(new Date(t).getUTCMonth()+1)+'-'+two(Math.min(dd,dim))}
    ms.addEventListener('keydown',function(e){
      var b=e.target.closest&&e.target.closest('.pcd');if(!b)return;
      var ds=b.getAttribute('data-d'),wd=(pdt(ds).getUTCDay()+6)%7,nd=null;
      switch(e.key){case'ArrowLeft':nd=padd(ds,-1);break;case'ArrowRight':nd=padd(ds,1);break;case'ArrowUp':nd=padd(ds,-7);break;case'ArrowDown':nd=padd(ds,7);break;
        case'Home':nd=padd(ds,-wd);break;case'End':nd=padd(ds,6-wd);break;case'PageUp':nd=addm(ds,-1);break;case'PageDown':nd=addm(ds,1);break;
        case'Escape':if(pvw){pvw=null;paint()}return;default:return}
      e.preventDefault();if(nd<pfirst)nd=pfirst;if(nd>plast)nd=plast;fd=nd;showMonth(nd);setTab();
      var t=$('.pcd[data-d="'+nd+'"]',ms);if(t)t.focus()
    });
    bp.addEventListener('click',function(){vm--;render()});bn.addEventListener('click',function(){vm++;render()});
    bx.addEventListener('click',function(){S.a=S.d=null;pvw=null;commit();setTab()});
    (mq.addEventListener?mq.addEventListener('change',render):mq.addListener(render));
    render();calSync();
    if(!S.a){for(var f0=tdy>pfirst?tdy:pfirst;f0<=plast;f0=padd(f0,1))if(!BK[f0]){for(var k0=0;k0<CM.length;k0++)if(CM[k0][0]+'-'+two(CM[k0][1])===f0.slice(0,7)){vm=k0;render();break}break}}
  }
}
// contact form
var form=$('#upit-form'),i18n=$('#i18n');
if(form&&i18n){
  var T=JSON.parse(i18n.textContent),q=new URLSearchParams(location.search);
  [['in','f-in'],['out','f-out'],['a','f-a'],['c','f-c']].forEach(function(p){var v=q.get(p[0]),el=d.getElementById(p[1]);if(v&&el)el.value=v});
  function fmt(s){if(!s)return '';var p=s.split('-');return p[2]+'.'+p[1]+'.'+p[0]+'.'}
  function text(){
    var v=function(id){return (d.getElementById(id)||{}).value||''};
    var L=[T.mail_hello,''];
    if(v('f-in')||v('f-out'))L.push(T.mail_dates+': '+fmt(v('f-in'))+' – '+fmt(v('f-out')));
    L.push(T.mail_guests+': '+v('f-a')+' '+T.mail_adults+(Number(v('f-c'))>0?', '+v('f-c')+' '+T.mail_children:''));
    if(v('f-n'))L.push(T.mail_name+': '+v('f-n'));
    if(v('f-e'))L.push((T.mail_back||'Email')+': '+v('f-e'));
    if(v('f-p'))L.push(T.mail_tel+': '+v('f-p'));
    if(v('f-m'))L.push('',v('f-m'));
    L.push('',T.mail_end);
    return L.join('\n');
  }
  function upd(){
    var href='mailto:'+T.email+'?subject='+encodeURIComponent(T.mail_subj)+'&body='+encodeURIComponent(text());
    form.setAttribute('data-href',href);
    var w=d.getElementById('wa-send');if(w&&T.wa)w.setAttribute('data-href','https://wa.me/'+T.wa+'?text='+encodeURIComponent(text()));
  }
  form.addEventListener('input',upd);form.addEventListener('change',upd);upd();
  var avw=d.getElementById('av-warn');
  function avchk(){
    if(!avw||!T.booked)return;var a=(d.getElementById('f-in')||{}).value,e=(d.getElementById('f-out')||{}).value,bad=false;
    if(a)T.booked.forEach(function(r){if(e&&e>a?(a<=r[1]&&e>r[0]):(a>=r[0]&&a<=r[1]))bad=true});
    avw.textContent=bad?T.av_msg:'';avw.hidden=!bad
  }
  form.addEventListener('change',avchk);avchk();
  form.addEventListener('submit',function(e){e.preventDefault();upd();if(form.hasAttribute('data-ej'))return;location.href=form.getAttribute('data-href')});
  var cp=d.getElementById('copy');
  if(cp)cp.addEventListener('click',function(){var t=text(),st=d.getElementById('fstat');
    function ok(){st.textContent=T.copied}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,function(){});else{var ta=d.createElement('textarea');ta.value=t;d.body.appendChild(ta);ta.select();try{d.execCommand('copy');ok()}catch(x){}ta.remove()}});
  var wa=d.getElementById('wa-send');if(wa)wa.addEventListener('click',function(){upd();window.open(wa.getAttribute('data-href'),'_blank','noopener')});
}
})();

(function(){
  var tb=document.querySelector('.pt-tabs');if(!tb)return;
  var bs=[].slice.call(tb.querySelectorAll('[role=tab]')),ps=bs.map(function(b){return document.getElementById(b.getAttribute('aria-controls'))});
  function sel(i,f){bs.forEach(function(b,k){var on=k===i;b.setAttribute('aria-selected',on?'true':'false');b.tabIndex=on?0:-1;ps[k].hidden=!on});if(f)bs[i].focus()}
  bs.forEach(function(b,i){b.addEventListener('click',function(){sel(i)});b.addEventListener('keydown',function(e){var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(k){e.preventDefault();sel((i+k+bs.length)%bs.length,true)}})});
  tb.hidden=false;document.documentElement.classList.add('pt-js');sel(0);
})();
