/* ===== এখানে নিজের তথ্য বদলাও ===== */
const CONFIG={
  photos:[],                        // ছবির তালিকা, যেমন ["photos/1.jpg","photos/2.jpg"]
  fireworks:20,                     // আতশবাজির সংখ্যা
  introSongs:["audio front.mp3"],   // হাগ/No চাপার দৃশ্যের গান, যেমন ["song1.mp3"]
  mainSongs:["audio back 1", "audio back 4","audio back 3","audio back 2"],    // No-র পরে মূল জন্মদিনের সাইটের গান, যেমন ["song2.mp3","song3.mp3"]
  name:"প্রিয়তমা",                 // স্ত্রীর নাম
  from:"তোমার ভালোবাসার মানুষ",      // তোমার নাম
  birthday:"2027-01-01",            // পরের জন্মদিনের তারিখ (YYYY-MM-DD)
  lines:["আজ তোমার বিশেষ দিন।","তুমি আমার জীবনের সবচেয়ে সুন্দর উপহার।","প্রতিটি দিন তোমার সাথে রঙিন। ❤️"],
  reasons:[
    ["😊","তোমার হাসি আমার সব ক্লান্তি দূর করে"],
    ["🤝","তুমি সবসময় আমার পাশে থাকো"],
    ["🍲","তোমার হাতের রান্না সেরা"],
    ["🌸","তোমার মায়া ভরা মনটা"],
    ["🏠","তুমি আমার বাড়িটাকে ঘর বানিয়েছ"],
    ["✨","তুমি যেমন, ঠিক তেমনই আমার প্রিয়"]
  ],
  letterLines:[                      // চিঠির লাইন, একটার পর একটা টাইপ হবে। {name} = স্ত্রীর নাম
    "প্রিয় {name},",
    "জন্মদিনের অনেক অনেক শুভেচ্ছা।",
    "তুমি আমার জীবনে আসার পর থেকে সবকিছু আরও সুন্দর হয়েছে।",
    "তোমার ভালোবাসা, ধৈর্য আর যত্ন আমাকে প্রতিদিন নতুন করে বাঁচতে শেখায়।",
    "আল্লাহ তোমাকে সুস্থ, সুখী ও হাসিখুশি রাখুন।",
    "আমি প্রতিটি জন্মে তোমাকেই চাই। ❤️"
  ]
};
/* ================================== */
const $=s=>document.querySelector(s);
$('#title').textContent="শুভ জন্মদিন, "+CONFIG.name;
$('#sign').style.opacity=0;$('#sign').style.transition='opacity .8s';
$('#sign').textContent="— "+CONFIG.from;

// typing effect
(function(){const t=$('#typed');let l=0,c=0,del=false;
function tick(){const s=CONFIG.lines[l];t.textContent=s.slice(0,c);
if(!del&&c<s.length){c++;setTimeout(tick,70)}
else if(!del){del=true;setTimeout(tick,1600)}
else if(c>0){c--;setTimeout(tick,30)}
else{del=false;l=(l+1)%CONFIG.lines.length;setTimeout(tick,300)}}
tick()})();

// countdown to next birthday
function cd(){const el=$('#counter');let d=new Date(CONFIG.birthday+"T00:00:00");const n=new Date();
if(isNaN(d)){el.innerHTML="";return}
while(d<n)d.setFullYear(d.getFullYear()+1);
const x=d-n,v=[Math.floor(x/864e5),Math.floor(x/36e5)%24,Math.floor(x/6e4)%60,Math.floor(x/1e3)%60],lb=["দিন","ঘণ্টা","মিনিট","সেকেন্ড"];
el.innerHTML=v.map((a,i)=>`<div><b>${a}</b><span>${lb[i]}</span></div>`).join("")}


// floating hearts
setInterval(()=>{const h=document.createElement('div');h.className='heart';
h.textContent=['❤️','💖','💕','🌸','✨'][Math.floor(Math.random()*5)];
h.style.left=Math.random()*100+'vw';h.style.fontSize=(14+Math.random()*22)+'px';
h.style.animationDuration=(6+Math.random()*6)+'s';$('#hearts').appendChild(h);
setTimeout(()=>h.remove(),12000)},500);

// reasons
$('#reasons').innerHTML=CONFIG.reasons.map(r=>`<div class="flip"><div><div class="face front">${r[0]}</div><div class="face back">${r[1]}</div></div></div>`).join("");
document.querySelectorAll('.flip').forEach(f=>f.onclick=()=>f.classList.toggle('on'));

// letter
let letterRun=0;
function typeLetter(){
  const box=$('#letterText'),run=++letterRun;box.innerHTML='';$('#sign').style.opacity=0;let li=0;
  function nextLine(){
    if(run!==letterRun)return;
    if(li>=CONFIG.letterLines.length){$('#sign').style.opacity=1;return}
    const p=document.createElement('p');p.style.margin='0 0 10px';box.appendChild(p);
    const txt=CONFIG.letterLines[li].replace('{name}',CONFIG.name);
    const g=window.Intl&&Intl.Segmenter?[...new Intl.Segmenter('bn',{granularity:'grapheme'}).segment(txt)].map(x=>x.segment):Array.from(txt);
    let c=0;
    (function ch(){
      if(run!==letterRun)return;
      p.textContent=g.slice(0,c).join('')+(c<g.length?'▌':'');
      if(c++<g.length)setTimeout(ch,60);else{li++;setTimeout(nextLine,800)}
    })();
  }
  nextLine()}
$('#env').onclick=()=>{const e=$('#env'),open=e.classList.toggle('open');
  if(open){burst();typeLetter()}else{letterRun++}};

// confetti
const cv=$('#confetti'),cx=cv.getContext('2d');let P=[],run=false;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener('resize',size);
function burst(){const cols=['#e8436e','#f5b942','#7ec8ff','#9be37d','#ff9bb3','#c79bff'];
for(let i=0;i<160;i++)P.push({x:innerWidth/2,y:innerHeight/3,vx:(Math.random()-.5)*16,vy:Math.random()*-14-3,s:5+Math.random()*7,c:cols[i%6],r:Math.random()*6,vr:(Math.random()-.5)*.4,life:140+Math.random()*60});
if(!run){run=true;loop()}}
function loop(){cx.clearRect(0,0,cv.width,cv.height);
P=P.filter(p=>p.life-->0);
P.forEach(p=>{p.vy+=.3;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);cx.restore()});
if(P.length)requestAnimationFrame(loop);else run=false}
$('#party').onclick=()=>{burst();setTimeout(burst,400);launchFW(2);go(0)};

// cake
function blow(){const c=$('#cake');if(c.classList.contains('out')){c.classList.remove('out');return}c.classList.add('out');burst()}
$('#blow').onclick=blow;$('#cake').onclick=blow;

// gallery
const g=$('#gallery');
g.innerHTML=(CONFIG.photos&&CONFIG.photos.length)?CONFIG.photos.map(u=>`<div class="ph"><img src="${u}" loading="lazy" alt=""></div>`).join(""):['🌹','💑','🎁','🌅','🍰','💍'].map(e=>`<div class="ph">${e}</div>`).join("");
$('#file').onchange=e=>{[...e.target.files].forEach(f=>{const d=document.createElement('div');d.className='ph';
const i=document.createElement('img');i.src=URL.createObjectURL(f);d.appendChild(i);g.prepend(d)})};

// ===== ফুলের তোড়া (স্লো মোশন) =====
function buildBouquet(){
  const F=[['r',170,70,1.25,'#e0245e','#ff7aa5'],['r',118,100,1.1,'#d7263d','#ff7b7b'],['r',222,100,1.1,'#f29a1f','#ffd36a'],['l',170,128,1,'#ff5fa2','#ffc2dc'],
    ['d',70,152,1],['d',270,152,1],['r',120,158,1.05,'#7b3fe4','#b88cff'],['r',220,158,1.05,'#ff7a2f','#ffb06a'],
    ['l',82,204,.95,'#ff7eb6','#ffd0e5'],['l',258,204,.95,'#ffb02e','#fff0b0'],['d',170,188,1],['d',128,208,.9],['r',212,208,.95,'#e0245e','#ff7aa5']];
  let df='',st='',lf='',fl='',fi='';
  F.forEach((f,i)=>{const [t,x,y,sc,c1,c2]=f;
    st+=`<path class="st" pathLength="1" style="--i:${i}" d="M170 365 Q${(170+x)/2} ${(365+y)/2+30} ${x} ${y+10*sc}"/>`;
    let p='';
    if(t==='r'){df+=`<radialGradient id="g${i}" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="${c2}"/><stop offset="1" stop-color="${c1}"/></radialGradient>`;
      for(let k=0;k<5;k++)p+=`<ellipse cx="0" cy="-14" rx="10" ry="11" transform="rotate(${k*72})" fill="url(#g${i})" stroke="rgba(0,0,0,.12)"/>`;
      p+=`<circle r="14" fill="url(#g${i})"/><path d="M-10 -3 Q-1 -15 11 -4 Q13 9 0 11 Q-9 9 -7 1 Q-3 -7 5 -3 Q7 3 0 5" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1.5" stroke-linecap="round"/><path d="M-6 -9 Q3 -13 8 -7" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.6" stroke-linecap="round"/>`}
    else if(t==='d'){for(let k=0;k<14;k++)p+=`<ellipse cx="0" cy="-17" rx="4.2" ry="12" transform="rotate(${k*25.7})" fill="#fff" stroke="#e3dbe0" stroke-width=".6"/>`;
      p+=`<circle r="8" fill="#ffc928"/><circle r="4" fill="#e59400"/>`}
    else{df+=`<linearGradient id="g${i}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
      for(let k=0;k<6;k++)p+=`<path d="M0 0 Q-11 -18 0 -32 Q11 -18 0 0Z" transform="rotate(${k*60})" fill="url(#g${i})" stroke="rgba(0,0,0,.15)" stroke-width=".8"/>`;
      p+=`<path d="M0 0 L-4 -12 M0 0 L0 -14 M0 0 L4 -12" stroke="#8a4a00" stroke-width="1.2"/><circle cx="-4" cy="-12" r="2" fill="#8a4a00"/><circle cy="-14" r="2" fill="#8a4a00"/><circle cx="4" cy="-12" r="2" fill="#8a4a00"/>`}
    fl+=`<g transform="translate(${x} ${y}) scale(${sc})"><g class="fl" style="--i:${i}">${p}</g></g>`});
  [[46,200],[294,200],[40,118],[300,116],[100,58],[240,58],[150,28],[196,34],[60,92],[285,88]].forEach((q,i)=>{
    st+=`<path class="st th" pathLength="1" style="--i:${i}" d="M170 365 Q${(170+q[0])/2} ${(365+q[1])/2+30} ${q[0]} ${q[1]}"/>`;
    fi+=`<g transform="translate(${q[0]} ${q[1]})"><g class="fi" style="--i:${i}"><circle cx="-4" cy="-3" r="3.6" fill="#fff"/><circle cx="4" cy="-4" r="3.6" fill="#fff"/><circle cx="0" cy="3" r="3.6" fill="#fff"/><circle cx="-5" cy="4" r="2.6" fill="${i%2?'#d9c2ff':'#ffd0e0'}"/><circle cx="6" cy="2" r="2.6" fill="${i%2?'#ffd0e0':'#d9c2ff'}"/></g></g>`});
  [[100,254,-55],[240,254,55],[72,242,-78],[268,242,78],[140,246,-28],[200,246,28]].forEach(l=>{
    lf+=`<g transform="translate(${l[0]} ${l[1]}) rotate(${l[2]})"><g class="lf"><path d="M0 0 Q-16 -30 0 -58 Q16 -30 0 0Z" fill="#3fa65a" stroke="#2c7d41" stroke-width="1"/><path d="M0 0 V-50 M0 -18 L-7 -26 M0 -30 L7 -38 M0 -18 L7 -26" stroke="#2c7d41" stroke-width="1" fill="none"/></g></g>`});
  let lace='';for(let x=84;x<=256;x+=14)lace+=`<circle cx="${x}" cy="${251+Math.sin((x-84)/172*Math.PI)*10}" r="6.5" fill="#fff"/>`;
  let tw='';[[24,60],[318,70],[30,250],[312,230],[170,6],[110,20],[236,18]].forEach((q,i)=>{
    tw+=`<g transform="translate(${q[0]} ${q[1]})"><path class="tw" style="--i:${i}" d="M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3Z" fill="#ffd34d"/></g>`});
  $('#bouquet').innerHTML=`<svg viewBox="0 0 340 420" aria-hidden="true"><defs>${df}<linearGradient id="wp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb3c9"/><stop offset="1" stop-color="#ff5c8a"/></linearGradient><linearGradient id="wi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#ffd9e6"/></linearGradient><linearGradient id="rb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4d6d"/><stop offset="1" stop-color="#b3123c"/></linearGradient></defs>${st}${lf}${fi}${fl}<g class="wrap"><path d="M66 250 L170 408 L274 250 Q170 280 66 250Z" fill="url(#wp)"/><path d="M104 258 L170 408 L236 258 Q170 276 104 258Z" fill="url(#wi)"/><path d="M104 258 L170 408 M236 258 L170 408 M135 266 L170 408 M205 266 L170 408" stroke="#ff8fb0" stroke-width="1.2" opacity=".6" fill="none"/>${lace}</g><g transform="translate(170 292)"><g class="bow"><path d="M-6 6 L-26 52 L-12 46 L-6 60Z M6 6 L26 52 L12 46 L6 60Z" fill="url(#rb)"/><ellipse cx="-24" cy="0" rx="24" ry="12" transform="rotate(-18 -24 0)" fill="url(#rb)"/><ellipse cx="24" cy="0" rx="24" ry="12" transform="rotate(18 24 0)" fill="url(#rb)"/><circle r="8" fill="#8f0e30"/><circle cx="-3" cy="-3" r="2.5" fill="#fff" opacity=".6"/></g></g>${tw}</svg>`}
buildBouquet();

function buildCake(){
  const dr=(x,y,w,fill,n)=>{let o=`<rect x="${x}" y="${y}" width="${w}" height="12" rx="6" fill="${fill}"/>`;
    for(let i=0;i<n;i++){const dx=x+10+i*((w-33)/(n-1)),h=10+((i*7)%4)*7;o+=`<rect x="${dx}" y="${y+4}" width="13" height="${h+8}" rx="6.5" fill="${fill}"/>`}return o};
  let sp='';[[70,250,'#ff5c8a'],[100,290,'#ffd34d'],[140,255,'#7ec8ff'],[185,292,'#9be37d'],[225,252,'#c79bff'],[255,288,'#ff8a3d'],[205,268,'#ffffff'],[120,272,'#ff5c8a'],[245,268,'#ffd34d']].forEach((d,i)=>{
    sp+=`<rect x="${d[0]}" y="${d[1]}" width="9" height="3.5" rx="1.7" fill="${d[2]}" transform="rotate(${i*37} ${d[0]} ${d[1]})"/>`});
  let bd='';for(let x=56;x<=264;x+=18)bd+=`<circle cx="${x}" cy="310" r="6" fill="#fff4f8"/>`;
  for(let x=92;x<=228;x+=17)bd+=`<circle cx="${x}" cy="222" r="5" fill="#ffd9e6"/>`;
  let cd='';[130,160,190].forEach((x,i)=>{
    cd+=`<rect x="${x-4}" y="52" width="8" height="38" rx="2" fill="${['#7ec8ff','#ff9bb3','#ffe08a'][i]}"/><path d="M${x-4} 62 l8 -5 M${x-4} 74 l8 -5 M${x-4} 86 l8 -5" stroke="#fff" stroke-width="2" opacity=".7"/><g class="hc-flame" style="animation-delay:${i*.07}s"><path d="M${x} 24 Q${x+8} 38 ${x} 50 Q${x-8} 38 ${x} 24Z" fill="#ffb43a"/><path d="M${x} 33 Q${x+4} 42 ${x} 49 Q${x-4} 42 ${x} 33Z" fill="#fff3a0"/></g>`});
  let ch='';[145,175].forEach(x=>{ch+=`<path d="M${x} 84 Q${x+4} 70 ${x+10} 66" stroke="#3f9b4f" stroke-width="2" fill="none"/><circle cx="${x}" cy="90" r="8" fill="#d6143a"/><circle cx="${x-3}" cy="87" r="2.4" fill="#fff" opacity=".7"/>`});
  let sr='';[[36,40],[290,60],[22,150],[300,160],[62,12],[262,16],[40,260],[285,250]].forEach((q,i)=>{
    sr+=`<g transform="translate(${q[0]} ${q[1]})"><path class="hc-tw" style="animation-delay:${i*.25}s" d="M0 -9 L2.5 -2.5 L9 0 L2.5 2.5 L0 9 L-2.5 2.5 L-9 0 L-2.5 -2.5Z" fill="#ffd34d"/></g>`});
  $('#herocake').innerHTML=`<svg viewBox="0 0 320 345" aria-hidden="true"><defs><linearGradient id="cC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9b6a4a"/><stop offset="1" stop-color="#4d2a18"/></linearGradient><linearGradient id="cP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffa6c1"/><stop offset="1" stop-color="#ff5c8a"/></linearGradient><linearGradient id="cW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#ffe0ec"/></linearGradient><radialGradient id="cL" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#cfc6d0"/></radialGradient></defs>${sr}<ellipse cx="160" cy="320" rx="152" ry="17" fill="#d8d0da"/><ellipse cx="160" cy="316" rx="148" ry="14" fill="url(#cL)"/><rect x="40" y="222" width="240" height="92" rx="14" fill="url(#cC)"/>${dr(40,222,240,'#fff8fb',9)}${sp}<text x="160" y="284" text-anchor="middle" font-family="Hind Siliguri,sans-serif" font-weight="700" font-size="22" fill="#ffd34d" stroke="#7a4a00" stroke-width=".6">শুভ জন্মদিন</text>${bd}<rect x="78" y="152" width="164" height="72" rx="12" fill="url(#cP)"/>${dr(78,152,164,'#fff',7)}<rect x="108" y="94" width="104" height="60" rx="11" fill="url(#cW)"/>${dr(108,94,104,'#ff9fbd',5)}${ch}${cd}</svg>`}
buildCake();

// ===== আতশবাজি + গভীর শব্দ =====
const fw=document.createElement('canvas');fw.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:45';document.body.appendChild(fw);
const fx=fw.getContext('2d');let RK=[],FP=[],fwRun=false,fctx=null;
function fwSize(){fw.width=innerWidth;fw.height=innerHeight}fwSize();addEventListener('resize',fwSize);
function actx2(){if(!fctx){try{fctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(fctx&&fctx.state==='suspended')fctx.resume();return fctx}
function noise(c,sec,pow){const len=Math.floor(c.sampleRate*sec),b=c.createBuffer(1,len,c.sampleRate),d=b.getChannelData(0);
  for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,pow);const n=c.createBufferSource();n.buffer=b;return n}
function boom(){const c=actx2();if(!c)return;const t=c.currentTime;
  const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(120,t);o.frequency.exponentialRampToValueAtTime(30,t+.7);
  g.gain.setValueAtTime(.9,t);g.gain.exponentialRampToValueAtTime(.001,t+1.4);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+1.5);
  const n=noise(c,1.2,3),lp=c.createBiquadFilter(),ng=c.createGain();lp.type='lowpass';lp.frequency.value=700;ng.gain.value=.8;
  n.connect(lp);lp.connect(ng);ng.connect(c.destination);n.start(t);
  const k=noise(c,.9,2),hp=c.createBiquadFilter(),kg=c.createGain();hp.type='highpass';hp.frequency.value=3000;kg.gain.value=.12;
  k.connect(hp);hp.connect(kg);kg.connect(c.destination);k.start(t+.05)}
function whoosh(){const c=actx2();if(!c)return;const t=c.currentTime,n=noise(c,.9,.6),bp=c.createBiquadFilter(),g=c.createGain();
  bp.type='bandpass';bp.frequency.setValueAtTime(300,t);bp.frequency.exponentialRampToValueAtTime(1800,t+.8);g.gain.value=.12;
  n.connect(bp);bp.connect(g);g.connect(c.destination);n.start(t)}
function launchOne(){RK.push({x:innerWidth*(.12+Math.random()*.76),y:innerHeight,vy:-(9+Math.random()*3),ty:innerHeight*(.1+Math.random()*.32),h:Math.floor(Math.random()*360),k:Math.floor(Math.random()*4)});
  whoosh();if(!fwRun){fwRun=true;fwLoop()}}
function launchFW(n){let t=0;for(let i=0;i<n;i++){t+=(i>=n-5&&n>=10)?110:(380+Math.random()*180);setTimeout(launchOne,t)}return t}
function explode(r){boom();const N=r.k===3?70:100;
  for(let i=0;i<N;i++){const a=Math.PI*2*i/N;let vx,vy,life=90+Math.random()*40;
    if(r.k===1){vx=Math.cos(a)*4.5;vy=Math.sin(a)*4.5}
    else if(r.k===2){vx=16*Math.pow(Math.sin(a),3)*.27;vy=-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))*.27}
    else{const sp=1.5+Math.random()*4.5,b=Math.random()*7;vx=Math.cos(b)*sp;vy=Math.sin(b)*sp;if(r.k===3)life=150+Math.random()*40}
    FP.push({x:r.x,y:r.y,vx,vy,life,max:life,h:(r.h+Math.random()*50)%360,l:Math.random()<.2?90:60})}}
function fwLoop(){
  fx.globalCompositeOperation='destination-out';fx.fillStyle='rgba(0,0,0,.2)';fx.fillRect(0,0,fw.width,fw.height);fx.globalCompositeOperation='source-over';
  RK=RK.filter(r=>{r.y+=r.vy;r.vy*=.985;fx.fillStyle='hsl('+r.h+',100%,65%)';fx.fillRect(r.x-1.5,r.y,3,12);
    if(r.y<=r.ty||r.vy>-2){explode(r);return false}return true});
  FP=FP.filter(p=>{p.vy+=.045;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.life--;
    fx.globalAlpha=Math.max(p.life/p.max,0);fx.fillStyle='hsl('+p.h+',100%,'+p.l+'%)';fx.beginPath();fx.arc(p.x,p.y,2.4,0,7);fx.fill();return p.life>0});
  fx.globalAlpha=1;
  if(RK.length||FP.length)requestAnimationFrame(fwLoop);else{fx.clearRect(0,0,fw.width,fw.height);fwRun=false}}
function showCake(){const c=$('#herocake'),st=$('#stage');st.classList.add('up');
  setTimeout(()=>{c.classList.add('show');st.scrollIntoView({behavior:'smooth',block:'center'})},900);
  setTimeout(burst,5500);setTimeout(burst,7000)}
function startBouquet(){$('#bouquet').classList.add('grow');
  setTimeout(()=>{const end=launchFW(CONFIG.fireworks||20);setTimeout(showCake,Math.max(end-2000,0))},10500)}

// ===== এক এক করে উইন্ডো =====
const steps=[...document.querySelectorAll('main section')],hero=document.querySelector('header.hero');
function go(i){
  hero.classList.toggle('hidden',i>=0);
  steps.forEach((el,k)=>el.classList.toggle('active',k===i));
  window.scrollTo(0,0)}
steps.forEach((sec,i)=>{
  if(sec.dataset.final)return;
  const nav=document.createElement('div');nav.className='nav';
  if(i>0){const b=document.createElement('button');b.className='btn ghost';b.textContent='⬅ Back';b.onclick=()=>go(i-1);nav.appendChild(b)}
  const t=document.createElement('small');t.textContent=(i+1)+' / '+steps.length;nav.appendChild(t);
  const n=document.createElement('button');n.className='btn';
  if(i<steps.length-1){n.textContent='Next ➜';n.onclick=()=>{go(i+1);burst()}}
  else{n.textContent='🔁 আবার শুরু';n.onclick=()=>go(-1)}
  nav.appendChild(n);sec.appendChild(nav)});
// ===== Happy Endings: সাইট থেকে বেরিয়ে যাওয়া =====
$('#endBtn').onclick=()=>{
  try{stopSong()}catch(e){}
  const o=document.createElement('div');o.id='bye';
  o.innerHTML='<div><div style="font-size:3rem">❤️</div><div class="script" style="font-size:clamp(2rem,8vw,3.5rem)">Happy Endings</div><p>ধন্যবাদ, এবার আসি…</p></div>';
  document.body.appendChild(o);requestAnimationFrame(()=>requestAnimationFrame(()=>o.classList.add('on')));
  setTimeout(()=>{try{window.close()}catch(e){}},2600)};
// theme
const root=document.documentElement;
$('#theme').onclick=()=>{const dark=root.dataset.theme==='dark'||(!root.dataset.theme&&matchMedia('(prefers-color-scheme: dark)').matches);
root.dataset.theme=dark?'light':'dark';$('#theme').textContent=dark?'🌙':'☀️'};
// ===== intro: Yes পালায়, No ক্লিক করা যায় =====
(function(){
const intro=$('#intro'),yes=$('#yes'),no=$('#no');
document.body.style.overflow='hidden';
let moved=false;
const spacer=document.createElement('span');spacer.style.cssText='display:inline-block;width:96px;height:1px';
function dodge(){
  if(!moved){moved=true;yes.parentNode.insertBefore(spacer,yes);yes.style.position='fixed';yes.style.zIndex='101'}
  const w=yes.offsetWidth,h=yes.offsetHeight,nb=no.getBoundingClientRect();
  let x,y,t=0;
  do{x=Math.random()*(innerWidth-w-20)+10;y=Math.random()*(innerHeight-h-20)+10;t++}
  while(t<30&&Math.abs(x-nb.left)<w+40&&Math.abs(y-nb.top)<h+40);
  yes.style.left=x+'px';yes.style.top=y+'px';
}
['mouseenter','pointerdown','touchstart','focus','click'].forEach(ev=>yes.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();dodge();yes.blur()},{passive:false}));
document.addEventListener('pointermove',e=>{
  if(intro.classList.contains('gone'))return;
  const r=yes.getBoundingClientRect();
  const d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2));
  if(d<110)dodge();
});
// ---- গান (শুধু নিজের বাছাই করা ফাইল) ----
let songEl=null,playing=false;
let playlist=[],idx=0,scene='intro';
const lists={intro:(CONFIG.introSongs||[]).slice(),main:(CONFIG.mainSongs||[]).slice()},names={intro:'',main:''};
function dbOpen(){return new Promise((res,rej)=>{const r=indexedDB.open('bdaySongs',1);r.onupgradeneeded=()=>r.result.createObjectStore('s');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function saveSong(f,k){try{const d=await dbOpen();d.transaction('s','readwrite').objectStore('s').put(f,k)}catch(e){}}
async function loadSong(k){try{const d=await dbOpen();return await new Promise(res=>{const q=d.transaction('s').objectStore('s').get(k);q.onsuccess=()=>res(q.result);q.onerror=()=>res(null)})}catch(e){return null}}
function prep(){const l=lists[scene];if(songEl)songEl.pause();songEl=null;if(!l.length)return;
  idx=0;playlist=l;songEl=new Audio(l[0]);
  songEl.onended=()=>{idx=(idx+1)%playlist.length;songEl.src=playlist[idx];songEl.play().catch(()=>{})};
  $('#pickName').textContent='🎶 '+(names[scene]||'গান ঠিক করা আছে')}
function setSong(f){if(!f)return;saveSong(f,scene);lists[scene]=[URL.createObjectURL(f)];names[scene]=f.name;prep();
  startSong()}
function toMain(){scene='main';if(lists.main.length)prep();startSong()}
let tapped=false;
['pointerdown','touchstart','keydown'].forEach(ev=>document.addEventListener(ev,e=>{
  if(tapped||scene!=='intro')return;if(e.target.closest&&e.target.closest('.music'))return;
  tapped=true;if(!playing)startSong()},true));
function startSong(){if(!songEl)return;playing=true;$('#music').textContent='🔊';songEl.play().catch(()=>{})}
function stopSong(){playing=false;$('#music').textContent='🔇';if(songEl)songEl.pause()}
$('#music').textContent='🔇';
$('#music').onclick=()=>playing?stopSong():startSong();
$('#songFile').onchange=e=>setSong(e.target.files[0]);
$('#songFile2').onchange=e=>setSong(e.target.files[0]);
prep();
['intro','main'].forEach(k=>loadSong(k).then(f=>{const cfg=k==='intro'?CONFIG.introSongs:CONFIG.mainSongs;if(f&&!(cfg&&cfg.length)){lists[k]=[URL.createObjectURL(f)];names[k]=f.name;if(scene===k)prep()}}));
function showPair(){intro.classList.add('pair');document.querySelectorAll('#intro .pick').forEach(x=>x.style.display='none');
  const d=$('#dolls');['hb','hg'].forEach(c=>{const i=document.createElement('i');i.className='harm '+c;d.appendChild(i)});
  setTimeout(()=>{intro.classList.add('hug');burst();$('#introMsg').textContent='তোমাকে কখনো ছেড়ে যাব না 🤗❤️'},2000)}
no.onclick=()=>{
  $('#mouth').setAttribute('d','M40 62 Q50 76 60 62');
  $('#tear').style.display='none';
  $('#introMsg').textContent='জানতাম! তুমি আমাকে কখনো ভুলবে না ❤️';
  yes.style.display='none';no.style.display='none';spacer.remove();toMain();showPair();
  burst();
  setTimeout(()=>{intro.classList.add('gone');document.body.style.overflow='';burst();startBouquet()},7500);
};
})();
