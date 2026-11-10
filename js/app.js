/* ByRuby12 — catálogo, editor local, interacciones y exportación. */

'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const DEFAULT_SITE_SETTINGS={hoursDays:'Lunes a viernes',hoursTime:'10:00–18:00',cvUrl:'assets/docs/CV%20TOMAS%2020262027%20NEW.pdf',portfolioUrl:'https://byruby12.github.io/Portfolio-Tomas/',faqTheme:'sand',typeface:'editorial',socials:{youtube:'https://www.youtube.com/@ByRuby12',instagram:'https://instagram.com/ByRuby12',x:'https://twitter.com/byruby12',twitch:'https://twitch.com/byruby12_tv',tiktok:'http://vm.tiktok.com/byruby12',discord:'https://discord.gg/yV68Vz78tA',github:'https://github.com/ByRuby12',paypal:'https://www.paypal.me/ByRuby12'}};
let catalog=JSON.parse($('#catalog-data').textContent), activeFilter='Todos', searchTerm='', selectedId=null, imageIndex=0, editId=null, audioContext=null, audioOn=false, toastTimer, db=null;
function ensureSiteSettings(){const saved=catalog.siteSettings&&typeof catalog.siteSettings==='object'&&!Array.isArray(catalog.siteSettings)?catalog.siteSettings:{};const socials=saved.socials&&typeof saved.socials==='object'&&!Array.isArray(saved.socials)?saved.socials:{};catalog.siteSettings={...DEFAULT_SITE_SETTINGS,...saved,socials:{...DEFAULT_SITE_SETTINGS.socials,...socials}}}
ensureSiteSettings();
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)');
const SHOWCASE = [
  ['web-profesional','Web profesional','Una primera impresión que cuenta.'],
  ['tienda-online','Tienda online','De la visita al siguiente pedido.'],
  ['pack-creador','Pack Creador','Tu identidad, en todo tu universo.'],
  ['publicidad','Tu marca, a lo grande','Ideas que también salen a la calle.'],
  ['carta-digital','Carta digital','Tu local, al alcance de una pantalla.'],
  ['promociones','Diseño de promociones','Haz que tu próxima oferta destaque.'],
  ['contactos','Contactos para tu negocio','Oportunidades organizadas para trabajar con claridad.','svg'],
  ['mantenimiento','Mantenimiento web','Una web cuidada, actualizada y lista para seguir creciendo.','svg'],
  ['carteles','Carteles, flyers y cartas','Piezas gráficas pensadas para destacar.','svg'],
  ['retoque','Retoque y edición','Una nueva mirada para tus fotografías.','svg']
];
const SERVICE_IMAGES={
  ecommerce:[
    'assets/imagenes/web-ecommerce/01-Tu tienda online, completa y a medida-1.png',
    'assets/imagenes/web-ecommerce/02-Todo para tu tienda en una web-2.png',
    'assets/imagenes/web-ecommerce/03-Tú tienes el control-3.png',
    'assets/imagenes/web-ecommerce/04-Web responsive y textos legales editables-4.png',
    'assets/imagenes/web-ecommerce/05-Tu tienda. Tu código. Tu crecimiento-5.png',
    'assets/imagenes/web-ecommerce/06-Precios claros para tu tienda online-6.png'
  ],
  'web-profesional':[
    'assets/imagenes/web-cero/01_Portada.png',
    'assets/imagenes/web-cero/02_Como_funciona.png',
    'assets/imagenes/web-cero/03_Ejemplos.png',
    'assets/imagenes/web-cero/04_Precios_y_apoyo.png'
  ],
  'pack-creador':[
    'assets/imagenes/pack-creador/01-Pack completo de diseño para Twitch-1.png',
    'assets/imagenes/pack-creador/02-Hazte reconocible con banners y paneles-2.png',
    'assets/imagenes/pack-creador/03-Stickers y portadas con personalidad.png',
    'assets/imagenes/pack-creador/04-Fondos y miniaturas con tu estilo-3.png',
    'assets/imagenes/pack-creador/05-Pack digital de 50 €-6.png',
    'assets/imagenes/pack-creador/06-Pack completo de diseño por 50€-5.png'
  ],
  contactos:[
    'assets/imagenes/contactos-negocios/01_Portada.png',
    'assets/imagenes/contactos-negocios/02_Como_funciona.png',
    'assets/imagenes/contactos-negocios/03_Sectores.png',
    'assets/imagenes/contactos-negocios/04_Datos_y_precio.png'
  ],
  mantenimiento:[
    'assets/imagenes/mantenimiento-web/01_Portada.png',
    'assets/imagenes/mantenimiento-web/02_Como_funciona.png',
    'assets/imagenes/mantenimiento-web/03_Que_incluye.png',
    'assets/imagenes/mantenimiento-web/04_Cuatro_horas.png',
    'assets/imagenes/mantenimiento-web/05_Precios_y_condiciones.png'
  ],
  universal:[
    'assets/imagenes/universal-works/01_Portada.png',
    'assets/imagenes/universal-works/02_Como_funciona.png',
    'assets/imagenes/universal-works/03_Ejemplos.png',
    'assets/imagenes/universal-works/04_Precios_y_mantenimiento.png'
  ],
  carteles:[
    'assets/imagenes/carteles-flyer/01_Portada.png',
    'assets/imagenes/carteles-flyer/02_Como_funciona.png',
    'assets/imagenes/carteles-flyer/03_Promociones.png',
    'assets/imagenes/carteles-flyer/04_Eventos.png',
    'assets/imagenes/carteles-flyer/05_Cartas.png',
    'assets/imagenes/carteles-flyer/06_pack.png'
  ],
  'local-digital':[
    'assets/imagenes/digitalizacion-negocio/01_Portada.png',
    'assets/imagenes/digitalizacion-negocio/02_Clientes.png',
    'assets/imagenes/digitalizacion-negocio/03_Puesta_en_marcha.png',
    'assets/imagenes/digitalizacion-negocio/04_Ejemplos.png',
    'assets/imagenes/digitalizacion-negocio/05_Extras.png',
    'assets/imagenes/digitalizacion-negocio/06_Planes.png'
  ],
  retoque:[
    'assets/imagenes/retoque-digital/01_Portada.png',
    'assets/imagenes/retoque-digital/02_Como_funciona.png',
    'assets/imagenes/retoque-digital/03_Recuerdos.png',
    'assets/imagenes/retoque-digital/04_Retratos.png',
    'assets/imagenes/retoque-digital/05_Productos.png',
    'assets/imagenes/retoque-digital/06_Transformaciones.png',
    'assets/imagenes/retoque-digital/07_Formatos.png',
    'assets/imagenes/retoque-digital/08_Precios_y_packs.png'
  ],
  publicidad:[
    'assets/imagenes/marca-grande/01-Tu marca, a lo grande-1.png',
    'assets/imagenes/marca-grande/02-Que te vean desde lejos-2.png',
    'assets/imagenes/marca-grande/03-Tu negocio, en la calle-3.png',
    'assets/imagenes/marca-grande/04-Muchas formas de destacar-4.png',
    'assets/imagenes/marca-grande/05-De tu idea al PDF-5.png',
    'assets/imagenes/marca-grande/06-Elige tu pack de diseño publicitario-6.png'
  ]
};
const SOURCE=document.documentElement.outerHTML;
const safeImage=s=>typeof s==='string'&&(/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(s)||/^assets\/(?:[a-z0-9_-]+\/)*[^/\\?#]+\.(?:webp|png|jpe?g)$/i.test(s));
function applyDefaultServiceImages(){
  catalog.services.forEach(service=>{
    const images=SERVICE_IMAGES[service.id];
    if(images&&(!Array.isArray(service.images)||service.images.length===0))service.images=[...images];
  });
}
function serviceCover(service){
  const defaultCover=SERVICE_IMAGES[service.id]?.[0];
  return defaultCover&&service.images?.[0]===defaultCover
    ?'assets/imagenes/vistas/portada-'+service.id+'.jpg'
    :service.images?.[0];
}
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n};
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),4000)}
function sound(type='click'){if(!audioOn)return;try{audioContext??=new(window.AudioContext||window.webkitAudioContext)();audioContext.resume();const now=audioContext.currentTime;[type==='open'?440:660,type==='open'?660:880].forEach((f,i)=>{const o=audioContext.createOscillator(),g=audioContext.createGain();o.type='sine';o.frequency.setValueAtTime(f,now+i*.035);g.gain.setValueAtTime(0,now+i*.035);g.gain.linearRampToValueAtTime(.025,now+i*.035+.005);g.gain.exponentialRampToValueAtTime(.0001,now+i*.035+.11);o.connect(g);g.connect(audioContext.destination);o.start(now+i*.035);o.stop(now+i*.035+.12)})}catch{}}
$('#sound').onclick=()=>{audioOn=!audioOn;$('#sound').setAttribute('aria-pressed',audioOn);$('#sound').setAttribute('aria-label',audioOn?'Desactivar sonidos de interfaz':'Activar sonidos de interfaz');$('#sound').title=audioOn?'Desactivar sonido':'Activar sonido';if(audioOn)sound('open');toast(audioOn?'Sonidos activados':'Sonidos desactivados')};
document.addEventListener('click',e=>{if(e.target.closest('button,a')&&!e.target.closest('#sound'))sound()});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('shown');observer.unobserve(e.target)}}),{threshold:.08});
function watch(){ $$('.reveal:not(.shown)').forEach(n=>observer.observe(n)) }
function normalizeSearch(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function render(){
  const grid=$('#services');
  grid.replaceChildren();
  catalog.services
    .filter(service=>service.visible!==false
      &&(activeFilter==='Todos'||service.category===activeFilter)
      &&(!searchTerm||normalizeSearch(service.title+' '+service.category+' '+service.desc+' '+service.bullets.join(' ')).includes(searchTerm)))
    .forEach(service=>{
      const card=el('article','service reveal');
      const button=el('button','service-link');
      button.setAttribute('aria-label','Ver detalles de '+service.title);
      button.style.display='contents';
      const visual=el('div','visual');
      const cover=serviceCover(service);
      if(service.images?.length&&safeImage(cover)){
        const image=el('img');
        image.src=cover;
        image.alt='Portada: '+service.title;
        image.loading='lazy';
        image.decoding='async';
        image.fetchPriority='low';
        visual.append(image);
      }else{
        visual.classList.add('fallback');
        visual.append(el('span','art-icon',service.icon||'✳'),el('span','art-lines'));
      }
      visual.append(el('span','chip',service.tag||service.category));
      const content=el('div','card-content');
      const meta=el('div','card-meta');
      meta.append(el('span','',service.category),el('span','',String(catalog.services.indexOf(service)+1).padStart(2,'0')));
      const bottom=el('div','card-bottom');
      bottom.append(el('span','price',service.price),el('span','round','↗'));
      content.append(meta,el('h3','',service.title),el('p','',service.desc),bottom);
      button.append(visual,content);
      button.onclick=()=>openService(service.id);
      card.append(button);
      grid.append(card);
    });
  const count=grid.children.length;
  $('#service-count').textContent=count+' servicio'+(count===1?'':'s');
  if(!count)grid.append(el('p','empty-state','No hay coincidencias. Prueba otra búsqueda o categoría.'));
  const select=$('#interest');
  const old=select.value;
  select.replaceChildren(new Option('Tengo una idea, vamos a hablar',''));
  catalog.services.filter(service=>service.visible!==false).forEach(service=>select.add(new Option(service.title,service.title)));
  select.value=old;
  $('#contact-email').textContent=catalog.email;
  updateMail();
  watch();
}
function updateMail(){
  const service=$('#interest').value;
  const link=$('#contact-mail');
  link.firstChild.textContent=service?'Enviar consulta · '+service:'Enviar consulta';
  link.setAttribute('aria-label',service?'Enviar consulta sobre '+service:'Enviar consulta para contar tu idea');
  $('#contact-subject').value='Nueva consulta web · '+(service||'ByRuby12');
}
const contactForm=$('#contact-form');
contactForm.addEventListener('input',updateMail);
contactForm.addEventListener('change',updateMail);
const contactStatus=$('#contact-status');
const contactGmailFallback=$('#contact-gmail-fallback');
contactForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const submit=$('#contact-mail');
  submit.disabled=true;
  submit.setAttribute('aria-busy','true');
  contactGmailFallback.hidden=true;
  contactStatus.classList.remove('error','success');
  contactStatus.textContent='Enviando tu consulta…';
  const data=Object.fromEntries(new FormData(contactForm).entries());
  data._subject='Nueva consulta web · '+(data.service||'ByRuby12');
  data._replyto=data.email;
  data._template='table';
  const body=[
    'Hola Tomás,',
    '',
    'Me gustaría hablar contigo sobre un proyecto.',
    '',
    'Servicio: '+String(data.service||'Tengo una idea, vamos a hablar'),
    'Nombre: '+String(data.name||''),
    'Mi correo: '+String(data.email||''),
    '',
    'Mi idea:',
    String(data.message||'')
  ].join('\n');
  const gmailParams=new URLSearchParams({
    view:'cm',
    fs:'1',
    to:catalog.email,
    su:String(data._subject),
    body
  });
  contactGmailFallback.href='https://mail.google.com/mail/?'+gmailParams.toString();
  try{
    const response=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(catalog.email),{
      method:'POST',
      headers:{'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify(data)
    });
    const result=await response.json();
    if(!response.ok||String(result.success)!=='true'){
      const message=String(result.message||'');
      if(/activat|confirm/i.test(message))throw Error('FormSubmit indica que falta confirmar la activación del formulario desde el correo que te enviaron.');
      throw Error(message||'FormSubmit no pudo aceptar la consulta. Inténtalo otra vez.');
    }
    contactForm.reset();
    updateMail();
    contactGmailFallback.hidden=true;
    contactStatus.classList.add('success');
    contactStatus.textContent='¡Consulta enviada! Gracias; te responderé en cuanto pueda.';
  }catch(error){
    console.error('No se pudo enviar la consulta de contacto:',error);
    contactStatus.classList.add('error');
    contactStatus.textContent=(error instanceof TypeError
      ?'No se pudo conectar con FormSubmit. Comprueba tu conexión e inténtalo de nuevo.'
      :error.message||'No se pudo enviar la consulta.')+' Si vuelve a fallar, puedes preparar el mensaje en Gmail:';
    contactGmailFallback.hidden=false;
  }finally{
    submit.disabled=false;
    submit.removeAttribute('aria-busy');
    updateMail();
  }
});
$$('[data-filter]').forEach(b=>b.onclick=()=>{activeFilter=b.dataset.filter;$$('[data-filter]').forEach(n=>{n.classList.toggle('active',n===b);n.setAttribute('aria-pressed',n===b)});if(document.startViewTransition&&!reduceMotion.matches){document.startViewTransition(()=>render())}else{render()}});
function openService(id){selectedId=id;imageIndex=0;const s=catalog.services.find(s=>s.id===id);$('#detail-title').textContent=s.title;$('#detail-category').textContent=s.category;$('#detail-desc').textContent=s.desc;$('#detail-price').textContent=s.price;$('#detail-note').textContent=s.note;$('#detail-bullets').replaceChildren(...s.bullets.map(t=>el('li','',t)));$('#detail-contact').href='#contacto';updateDetailImage();$('#detail').showModal();sound('open')}
$('#detail-contact').addEventListener('click',event=>{
  event.preventDefault();
  const service=catalog.services.find(item=>item.id===selectedId);
  if(service)$('#interest').value=service.title;
  updateMail();
  $('#detail').close();
  $('#contacto').scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth'});
  $('#contact-name').focus({preventScroll:true});
});
function updateDetailImage(){const s=catalog.services.find(s=>s.id===selectedId),imgs=s.images.filter(safeImage);$('#detail-img').hidden=!imgs.length;$('#detail-img').parentElement.classList.toggle('no-image',!imgs.length);$('#detail-img').src=imgs[imageIndex]||'';$('#detail-img').alt=s.title+' · Imagen '+(imageIndex+1);$('#detail-count').textContent=imgs.length?`${imageIndex+1} / ${imgs.length}`:'Muestras próximamente';$('#detail-prev').disabled=imgs.length<2;$('#detail-next').disabled=imgs.length<2}
function slide(n){const s=catalog.services.find(s=>s.id===selectedId);if(s.images.length){imageIndex=(imageIndex+n+s.images.length)%s.images.length;updateDetailImage()}}$('#detail-prev').onclick=()=>slide(-1);$('#detail-next').onclick=()=>slide(1);
function updateShowcaseControls(){
  const gallery=$('#gallery'),cards=[...gallery.children];
  if(!cards.length)return;
  const bounds=gallery.getBoundingClientRect();
  const first=Math.max(0,cards.findIndex(card=>card.getBoundingClientRect().right>bounds.left+2));
  const last=cards.reduce((index,card,current)=>card.getBoundingClientRect().left<bounds.right-2?current:index,-1);
  $('#gallery-prev').disabled=gallery.scrollLeft<=5;
  $('#gallery-next').disabled=gallery.scrollLeft+gallery.clientWidth>=gallery.scrollWidth-2;
  $('#gallery-status').textContent=String(first+1).padStart(2,'0')+'–'+String(Math.max(first+1,last+1)).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
}
function moveShowcase(direction){
  const gallery=$('#gallery'),cards=[...gallery.children],left=gallery.getBoundingClientRect().left;
  const next=direction>0?cards.find(card=>card.getBoundingClientRect().left>left+3):[...cards].reverse().find(card=>card.getBoundingClientRect().left<left-3);
  if(next)gallery.scrollTo({left:gallery.scrollLeft+next.getBoundingClientRect().left-left,behavior:reduceMotion.matches?'auto':'smooth'});
}
$('#gallery-prev').onclick=()=>moveShowcase(-1);
$('#gallery-next').onclick=()=>moveShowcase(1);
$('#gallery').addEventListener('scroll',updateShowcaseControls,{passive:true});
window.addEventListener('resize',updateShowcaseControls,{passive:true});
$$('[data-close]').forEach(b=>b.onclick=()=>$('#'+b.dataset.close).close());$$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));document.addEventListener('keydown',e=>{if($('#detail').open){if(e.key==='ArrowRight')slide(1);if(e.key==='ArrowLeft')slide(-1)}});
async function initDB(){try{db=await new Promise((res,rej)=>{const req=indexedDB.open('byruby12-catalog-v1',1);req.onupgradeneeded=()=>req.result.createObjectStore('catalog');req.onsuccess=()=>res(req.result);req.onerror=()=>rej(req.error)});const saved=await new Promise((res,rej)=>{const q=db.transaction('catalog').objectStore('catalog').get('current');q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)});if(saved&&saved.updated>catalog.updated){validateCatalog(saved);catalog=migrateMedia(saved)}}catch(e){$('#admin-status').textContent='Almacenamiento local no disponible. Descarga la web o una copia JSON para conservar los cambios.'}applyDefaultServiceImages();ensureSiteSettings();loadSiteSettingsEditor();render();applySiteSettings()}
async function save(){applySiteSettings();catalog.updated=Date.now();if(!db){toast('Descarga una copia para conservar los cambios');return}try{await new Promise((res,rej)=>{const t=db.transaction('catalog','readwrite');t.objectStore('catalog').put(catalog,'current');t.oncomplete=res;t.onerror=()=>rej(t.error)});$('#admin-status').textContent='Guardado en este navegador · '+new Date().toLocaleTimeString('es-ES');}catch{toast('No se pudo guardar localmente. Descarga una copia ahora.')}}
function editorList(){const list=$('#editor-list');list.replaceChildren();catalog.services.forEach(s=>{const b=el('button',s.id===editId?'active':'',s.title);b.onclick=()=>loadEditor(s.id);list.append(b)})}
function loadEditor(id){editId=id;const s=catalog.services.find(s=>s.id===id);const f=$('#editor-form');['title','category','price','tag','desc','note'].forEach(k=>f.elements[k].value=s[k]||'');f.elements.bullets.value=s.bullets.join('\n');f.elements.visible.checked=s.visible!==false;editorList();editorImages()}
function applySiteSettings(){
  ensureSiteSettings();
  const settings=catalog.siteSettings,email=catalog.email;
  document.documentElement.dataset.typeface=settings.typeface;
  document.documentElement.dataset.faqTheme=settings.faqTheme;
  const mailto='mailto:'+email+'?subject='+encodeURIComponent('Hablemos de mi proyecto')+'&body='+encodeURIComponent('Hola Tomás,\n\nMe gustaría contarte mi idea.\n\n');
  const contact=$('#contact-email');
  contact.textContent=email;
  contact.href='mailto:'+email;
  $('[data-site-email]').href=mailto;
  $('[data-site-email] .footer-email-copy small').textContent=email;
  $$('[data-site-hours-days]').forEach(node=>node.textContent=settings.hoursDays);
  $$('[data-site-hours-time]').forEach(node=>node.textContent=settings.hoursTime);
  $('[data-site-cv]').href=settings.cvUrl;
  $('[data-site-portfolio]').href=settings.portfolioUrl;
  Object.entries(settings.socials).forEach(([name,url])=>{const link=$(`[data-site-social="${name}"]`);if(link)link.href=url});
}
function loadSiteSettingsEditor(){
  const form=$('.admin-settings-form');
  if(!form)return;
  form.elements.email.value=catalog.email;
  Object.entries(catalog.siteSettings).forEach(([name,value])=>{if(typeof value==='string'&&form.elements[name])form.elements[name].value=value});
  Object.entries(catalog.siteSettings.socials).forEach(([name,value])=>{if(form.elements['social-'+name])form.elements['social-'+name].value=value});
}
function addSiteSettingsEditor(){
  const details=el('details','admin-settings'),summary=el('summary','', 'Ajustes de la web');
  const intro=el('p','admin-settings-intro','Actualiza los datos del pie y el aspecto general. Al guardar se conservan en este navegador; expórtalos para incorporarlos al HTML.');
  const form=el('form','admin-settings-form');
  const addField=(title,name,value,type='text',maxLength=100)=>{
    const label=el('label','field',title),input=el('input');
    input.name=name;input.type=type;input.value=value;input.maxLength=maxLength;input.required=true;
    label.append(input);form.append(label);
  };
  addField('Email de contacto','email',catalog.email,'email',120);
  addField('Días de atención','hoursDays',catalog.siteSettings.hoursDays,'text',60);
  addField('Horario','hoursTime',catalog.siteSettings.hoursTime,'text',50);
  addField('Enlace al CV (PDF)','cvUrl',catalog.siteSettings.cvUrl,'text',240);
  addField('Enlace al portfolio','portfolioUrl',catalog.siteSettings.portfolioUrl,'url',240);
  const socialTitles={youtube:'YouTube',instagram:'Instagram',x:'X / Twitter',twitch:'Twitch',tiktok:'TikTok',discord:'Discord',github:'GitHub',paypal:'PayPal'};
  Object.entries(socialTitles).forEach(([name,title])=>addField('Enlace · '+title,'social-'+name,catalog.siteSettings.socials[name],'url',240));
  const faqLabel=el('label','field','Fondo de preguntas frecuentes'),faqTheme=el('select');
  faqTheme.name='faqTheme';[['sand','Arena'],['lavender','Lavanda'],['ice','Azul suave']].forEach(([value,label])=>faqTheme.add(new Option(label,value)));
  faqTheme.value=catalog.siteSettings.faqTheme;faqLabel.append(faqTheme);form.append(faqLabel);
  const fontLabel=el('label','field','Tipografía'),typeface=el('select');
  typeface.name='typeface';[['editorial','Editorial · títulos con carácter'],['clean','Limpia · sistema']].forEach(([value,label])=>typeface.add(new Option(label,value)));
  typeface.value=catalog.siteSettings.typeface;fontLabel.append(typeface);form.append(fontLabel);
  const submit=el('button','btn','Guardar ajustes ✓');submit.type='submit';form.append(submit);
  form.onsubmit=async event=>{
    event.preventDefault();
    const data=new FormData(form),cvUrl=String(data.get('cvUrl')).trim(),portfolioUrl=String(data.get('portfolioUrl')).trim();
    const validCv=validCvLink(cvUrl);
    const socials=Object.keys(socialTitles).reduce((result,name)=>{result[name]=String(data.get('social-'+name)).trim();return result},{});
    if(!validCv||!validWebLink(portfolioUrl)||Object.values(socials).some(url=>!validWebLink(url))){toast('Revisa los enlaces: usa URLs HTTP o HTTPS válidas y un CV PDF.');return}
    catalog.email=String(data.get('email')).trim();
    catalog.siteSettings={hoursDays:String(data.get('hoursDays')).trim(),hoursTime:String(data.get('hoursTime')).trim(),cvUrl,portfolioUrl,faqTheme:String(data.get('faqTheme')),typeface:String(data.get('typeface')),socials};
    applySiteSettings();await save();toast('Ajustes guardados. Expórtalos para publicar los cambios.');
  };
  details.append(summary,intro,form);
  $('#editor .modal-body').insertBefore(details,$('#editor .editor-grid'));
  loadSiteSettingsEditor();
}
addSiteSettingsEditor();
function editorImages(){const c=$('#editor-images');c.replaceChildren();const s=catalog.services.find(s=>s.id===editId);s.images.forEach((src,i)=>{const item=el('div','image-edit'),im=el('img');im.src=src;im.alt='Imagen '+(i+1);const up=el('button','',i===0?'Portada':'← Portada');up.disabled=i===0;up.onclick=async()=>{s.images.splice(i,1);s.images.unshift(src);await save();editorImages();render()};const del=el('button','','Quitar');del.onclick=async()=>{s.images.splice(i,1);await save();editorImages();render()};item.append(im,up,del);c.append(item)})}
$('#editor-form').onsubmit=async e=>{e.preventDefault();const s=catalog.services.find(s=>s.id===editId),f=e.target;['title','price','tag','desc','note','category'].forEach(k=>s[k]=f.elements[k].value.trim());s.bullets=f.elements.bullets.value.split('\n').map(x=>x.trim()).filter(Boolean);s.visible=f.elements.visible.checked;await save();render();editorList();toast('Ficha guardada')};
async function readImage(file){if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Utiliza JPG, PNG o WebP.');if(file.size>20*1024*1024)throw Error('La imagen supera los 20 MB.');const bitmap=await createImageBitmap(file);if(bitmap.width*bitmap.height>80000000){bitmap.close();throw Error('Imagen demasiado grande. Exporta una versión más pequeña.')}const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();return canvas.toDataURL('image/webp',.88)}
$('#image-upload').onchange=async e=>{const s=catalog.services.find(s=>s.id===editId);try{toast('Optimizando imágenes…');for(const file of e.target.files){s.images.push(await readImage(file))}await save();editorImages();render();toast('Imágenes añadidas')}catch(err){toast(err.message)}e.target.value=''};
$('#add-service').onclick=async()=>{const id='servicio-'+Date.now();catalog.services.push({id,title:'Nuevo servicio',category:'Diseño y marca',price:'Consultar',tag:'Nuevo',desc:'Describe aquí tu nuevo servicio.',bullets:[],note:'Alcance y plazo a confirmar.',images:[],visible:false,icon:'✳'});await save();loadEditor(id);render();toast('Nueva ficha creada. Activa «Mostrar» cuando esté lista.')};
function download(name,content,type){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([content],{type}));a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000)}
function serialized(){return JSON.stringify(catalog).replace(/</g,'\\u003c')}
function exportHTML(){const d=new DOMParser().parseFromString('<!doctype html>'+SOURCE,'text/html');d.querySelector('#catalog-data').textContent=serialized();d.querySelectorAll('dialog').forEach(x=>x.removeAttribute('open'));return '<!doctype html>\n'+d.documentElement.outerHTML}
$('#export-site').onclick=()=>{download('index.html',exportHTML(),'text/html;charset=utf-8');toast('index.html exportado. Conserva CSS, JS y assets junto a él.')};$('#export-data').onclick=()=>download('byruby12-catalogo.json',JSON.stringify(catalog,null,2),'application/json');
function validWebLink(value){try{return ['http:','https:'].includes(new URL(value).protocol)}catch{return false}}
function validCvLink(value){if(/^assets\/docs\/[A-Za-z0-9_%.-]+\.pdf$/i.test(value))return true;try{const url=new URL(value);return url.protocol==='https:'&&url.pathname.toLowerCase().endsWith('.pdf')}catch{return false}}
function validateCatalog(c){
  if(!c||c.version!==1||!Array.isArray(c.services)||!c.services.length||c.services.length>100||typeof c.email!=='string'||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email))throw Error('Copia de catálogo no válida.');
  if(c.siteSettings){
    const settings=c.siteSettings;
    if(typeof settings!=='object'||Array.isArray(settings)||['hoursDays','hoursTime','cvUrl','portfolioUrl','faqTheme','typeface'].some(k=>typeof settings[k]!=='string')||!['sand','lavender','ice'].includes(settings.faqTheme)||!['editorial','clean'].includes(settings.typeface)||!validCvLink(settings.cvUrl)||!validWebLink(settings.portfolioUrl))throw Error('Ajustes de la web no válidos.');
    if(settings.socials&&(typeof settings.socials!=='object'||Array.isArray(settings.socials)||Object.keys(settings.socials).some(key=>!Object.hasOwn(DEFAULT_SITE_SETTINGS.socials,key))||Object.values(settings.socials).some(url=>typeof url!=='string'||!validWebLink(url))))throw Error('Enlaces de redes no válidos.');
  }
  const ids=new Set();
  for(const s of c.services){if(!s||typeof s.id!=='string'||ids.has(s.id))throw Error('Identificadores no válidos');ids.add(s.id);for(const k of ['title','category','price','tag','desc','note'])if(typeof s[k]!=='string')throw Error('Ficha incompleta');if(!['Web y tecnología','Diseño y marca','Datos y negocio'].includes(s.category)||!Array.isArray(s.bullets)||s.bullets.some(x=>typeof x!=='string')||!Array.isArray(s.images)||s.images.some(x=>!safeImage(x)))throw Error('Formato de ficha no válido.')}
}
$('#import-data').onclick=()=>$('#import-file').click();$('#import-file').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>80*1024*1024)throw Error('La copia supera los 80 MB.');const c=JSON.parse(await f.text());validateCatalog(c);if(!confirm('¿Sustituir el catálogo actual por esta copia? Descarga antes una copia si quieres conservarlo.'))return;catalog=migrateMedia(c);await save();loadEditor(catalog.services[0].id);render();toast('Copia importada')}catch(err){toast(err.message)}e.target.value=''};


/* ── Motion, navegación y accesibilidad ──────────────────────── */
$('#service-search').addEventListener('input',e=>{searchTerm=normalizeSearch(e.target.value.trim());render()});
const menu=$('#mobile-menu'),mobileNav=$('#mobile-nav');
menu.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')!=='true';
  menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');menu.textContent=open?'✕':'☰';mobileNav.hidden=!open;
});
$$('#mobile-nav a').forEach(a=>a.addEventListener('click',()=>{mobileNav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');menu.textContent='☰'}));
$('#back-top').onclick=()=>window.scrollTo({top:0,behavior:reduceMotion.matches?'instant':'smooth'});
let scrollPending=false;
function updateScroll(){
  scrollPending=false;const y=window.scrollY||0;
  $('header').classList.toggle('scrolled',y>35);$('#back-top').classList.toggle('visible',y>650);
}
window.addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateScroll)}},{passive:true});
window.addEventListener('resize',updateScroll,{passive:true});

document.addEventListener('click',e=>{
  const b=e.target.closest('.btn');if(!b||reduceMotion.matches)return;
  const r=b.getBoundingClientRect(),n=el('span','ripple');n.setAttribute('aria-hidden','true');n.style.left=(e.clientX-r.left-15)+'px';n.style.top=(e.clientY-r.top-15)+'px';b.append(n);setTimeout(()=>n.remove(),750);
});

/* Apertura de diálogos con animación progresiva, sin interferir con Escape. */
for(const id of ['detail','lightbox','editor']){
  const d=$('#'+id),nativeShow=d.showModal.bind(d);
  d.showModal=()=>{nativeShow();if(!reduceMotion.matches&&d.animate)d.animate([{opacity:0,transform:'translateY(20px) scale(.97)'},{opacity:1,transform:'translateY(0) scale(1)'}],{duration:320,easing:'cubic-bezier(.16,1,.3,1)'})};
}
/* Partículas ligeras, limitadas al hero y suspendidas fuera de pantalla. */
function startParticles(){
  const canvas=$('#particles'),context=canvas.getContext('2d');
  if(!context||reduceMotion.matches||!finePointer.matches)return;
  let w=0,h=0,raf=0,visible=true,last=0;
  const points=Array.from({length:28},()=>({x:Math.random(),y:Math.random(),r:.4+Math.random()*1.4,v:.00002+Math.random()*.00004,a:.1+Math.random()*.5}));
  function resize(){const dpr=Math.min(window.devicePixelRatio||1,1.5);w=window.innerWidth;h=850;canvas.width=w*dpr;canvas.height=h*dpr;context.setTransform(dpr,0,0,dpr,0,0)}
  function stop(){cancelAnimationFrame(raf);raf=0}
  function paint(time){raf=0;if(!visible||document.hidden||reduceMotion.matches)return;const dt=Math.min(35,time-last||16);last=time;context.clearRect(0,0,w,h);points.forEach(p=>{p.y-=p.v*dt;if(p.y<0){p.y=1;p.x=Math.random()}context.fillStyle=`rgba(255,142,58,${p.a})`;context.beginPath();context.arc(p.x*w,p.y*h,p.r,0,Math.PI*2);context.fill()});raf=requestAnimationFrame(paint)}
  function resume(){if(!raf&&!document.hidden&&visible&&!reduceMotion.matches)raf=requestAnimationFrame(paint)}
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)resume();else stop()});io.observe(canvas);
  document.addEventListener('visibilitychange',()=>document.hidden?stop():resume());
  reduceMotion.addEventListener('change',()=>reduceMotion.matches?stop():resume());
  window.addEventListener('resize',resize,{passive:true});resize();resume();
}
function initAmbientMotion(){
  const targets=$$('.hero,.ticker'),visible=new Set();
  const update=()=>targets.forEach(target=>target.classList.toggle('motion-paused',document.hidden||!visible.has(target)));
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>entry.isIntersecting?visible.add(entry.target):visible.delete(entry.target));
    update();
  },{rootMargin:'80px 0px'});
  targets.forEach(target=>observer.observe(target));
  document.addEventListener('visibilitychange',update);
}
$('#year').textContent=new Date().getFullYear();
watch();renderShowcase();initDB().then(()=>{if(new URLSearchParams(location.search).get('admin')==='1'){loadEditor(catalog.services[0].id);$('#editor').showModal()}});updateScroll();startParticles();initAmbientMotion();


/* Galería editorial independiente de las imágenes del catálogo. */

function renderShowcase() {
  const gallery = $('#gallery');
  gallery.style.scrollBehavior='auto';
  gallery.scrollLeft=0;
  gallery.style.scrollBehavior='';
  gallery.replaceChildren();
  SHOWCASE.forEach(([id,title,description,extension='webp'], index) => {
    const src = 'assets/showcase/' + id + '.' + extension;
    const button = el('button','gallery-shot');
    button.setAttribute('aria-label', 'Ampliar ejemplo ilustrativo: ' + title);
    button.dataset.cursor = 'VER';
    const image = el('img');image.src=src;image.alt=description;image.loading='lazy';image.width=1280;image.height=720;
    const caption=el('div','showcase-caption');
    caption.append(el('small','',String(index+1).padStart(2,'0')+' / EXPLORA'),el('h3','',title),el('p','',description),el('b','showcase-arrow','↗'));
    button.append(image,caption);
    button.onclick=()=>{$('#lightbox-title').textContent='Ejemplo ilustrativo · '+title;$('#lightbox-img').src=src;$('#lightbox-img').alt=description;$('#lightbox').showModal()};
    gallery.append(button);
  });
  requestAnimationFrame(updateShowcaseControls);
}
function migrateMedia(data) {
  if(data.mediaLayoutVersion !== 3) {
    data.services.forEach(service=>service.images=(service.images||[]).filter(src=>!src.startsWith('assets/services/')));
    data.mediaLayoutVersion=3;
  }
  return data;
}

/* Agrupa los efectos del puntero para actualizar el DOM como máximo una vez por frame. */
function initPointerEffects() {
  const cursor=$('#ruby-cursor');
  if(!cursor)return;
  let frame=0,lastEvent=null,lastTarget=null,lastCaption='';
  function hide(){
    if(frame)cancelAnimationFrame(frame);
    frame=0;lastEvent=null;
    cursor.classList.remove('visible');
    document.documentElement.classList.remove('custom-cursor');
  }
  function updatePointer(){
    frame=0;
    const event=lastEvent;
    if(!event||!finePointer.matches||reduceMotion.matches||event.pointerType==='touch'){
      hide();
      return;
    }
    if(event.target.closest('dialog,input,textarea,select,[contenteditable="true"]')){
      hide();
      return;
    }
    cursor.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0)`;
    cursor.classList.add('visible');
    document.documentElement.classList.add('custom-cursor');
    const target=event.target.closest('a,button,summary');
    const caption=target?.dataset.cursor||'↗';
    if(target!==lastTarget){
      cursor.classList.toggle('is-link',!!target);
      lastTarget=target;
    }
    if(caption!==lastCaption){
      cursor.querySelector('.cursor-caption').textContent=caption;
      lastCaption=caption;
    }
  }
  document.addEventListener('pointermove',event=>{
    lastEvent=event;
    if(!frame)frame=requestAnimationFrame(updatePointer);
  },{passive:true});
  document.addEventListener('pointerdown',()=>cursor.classList.add('is-down'));
  document.addEventListener('pointerup',()=>cursor.classList.remove('is-down'));
  document.addEventListener('pointerout',event=>{if(!event.relatedTarget)hide()});
  window.addEventListener('blur',hide);
  reduceMotion.addEventListener('change',()=>{if(reduceMotion.matches)hide()});
  finePointer.addEventListener('change',()=>{if(!finePointer.matches)hide()});
}
initPointerEffects();
