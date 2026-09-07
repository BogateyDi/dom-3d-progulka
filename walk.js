const canvas=document.getElementById('c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
const scene=new THREE.Scene();
scene.background=new THREE.Color('#9eb6c9');
scene.fog=new THREE.Fog('#9eb6c9',26,58);
const camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.08,80);
const clock=new THREE.Clock();
const PW=20,PD=15,W=.2,H=2.62,B=.32,HW=8.56,HD=7.66,HX=7.35,HZ=6.05;
const IX=HX+W,IZ=HZ+W;
const rooms={bath:{x:0,z:0,w:1.7,d:3.02,n:'Ванная'},hall:{x:1.7,z:0,w:3.57,d:3.02,n:'Холл'},kit:{x:5.27,z:0,w:2.75,d:3.02,n:'Кухня'},b1:{x:0,z:3.02,w:3.72,d:4.04,n:'Спальня 1'},b2:{x:3.72,z:3.02,w:4.44,d:4.04,n:'Спальня 2'}};
const solids=[];
const add=(x,z,w,d)=>solids.push({a:x,b:x+w,c:z,d:z+d});
const C={w:0xf3f1ec,pl:0x5b5d61,rf:0x2a2c2f,wd:0x6b4a2e,bl:0x1a1c1f,mt:0x111214,gl:0xcfe6f4,wo:0x8a6238,wl:0xc4a078,gr:0x4f8a45,gv:0x9aa0a6,st:0xe8e6e1,pv:0x6d7178,dk:0xb0895a,th:0x1f5a32,td:0x163f24,fn:0x6e747c,gp:0x3a3d42,so:0x6a5a48,ce:0xf7f5f1,car:0x8a9096};
function M(c,r=.7,m=.05){return new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m})}
function box(w,h,d,mat,x,y,z,sh=true){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);mesh.position.set(x,y,z);mesh.castShadow=sh;mesh.receiveShadow=true;scene.add(mesh);return mesh}
function wall(x,z,w,d,h=H){box(w,h,d,M(C.w,.82),x+w/2,B+h/2,z+d/2);add(x,z,w,d)}
const ground=new THREE.Mesh(new THREE.PlaneGeometry(70,70),M(C.so,.95));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);
const lawn=new THREE.Mesh(new THREE.PlaneGeometry(PW-.2,PD-.2),M(C.gr,.95));lawn.rotation.x=-Math.PI/2;lawn.position.set(PW/2,.01,PD/2);lawn.receiveShadow=true;scene.add(lawn);
box(5.6,.04,5.35,M(C.gv,.92),2.95,.03,2.82);
box(1.15,.03,4.55,M(C.pv,.75),6.12,.025,4.62,false);
box(4.2,.03,1.15,M(C.pv,.75),8.8,.025,5.12,false);
const terr={w:4.2,d:3,x:HX+3.35,z:HZ-3};
box(terr.w,.08,terr.d,M(C.dk,.7),terr.x+terr.w/2,.08,terr.z+terr.d/2);
box(PW-5.7,1.7,.04,M(C.fn,.6,.18),12.85,.85,.02,false);
box(PW,1.7,.04,M(C.fn,.6,.18),PW/2,.85,PD-.02,false);
box(.04,1.7,PD,M(C.fn,.6,.18),.02,.85,PD/2,false);
box(.04,1.7,PD,M(C.fn,.6,.18),PW-.02,.85,PD/2,false);
add(-.1,-.1,PW+.2,.16);add(-.1,PD-.06,PW+.2,.16);add(-.1,-.1,.16,PD+.2);add(PW-.06,-.1,.16,PD+.2);
function thuja(x,z,h=2.2){const t=new THREE.Mesh(new THREE.CylinderGeometry(.05,.07,.3,8),M(C.wo));t.position.set(x,.15,z);scene.add(t);for(let i=0;i<4;i++){const k=1-i*.18;const c=new THREE.Mesh(new THREE.ConeGeometry(.28*k,h/4+.25,8),M(i%2?C.td:C.th,.85));c.position.set(x,.55+i*(h/4)*.72,z);c.castShadow=true;scene.add(c);}}
for(let x=.5;x<PW-.3;x+=.9){if(x>5.7)thuja(x,.48);thuja(x,PD-.42);}
for(let z=1.1;z<PD-.4;z+=.9){thuja(.42,z);if(z>5.6)thuja(PW-.42,z);}
const car=new THREE.Group();
(function(){const body=new THREE.Mesh(new THREE.BoxGeometry(4.2,.55,1.75),M(C.car,.35,.4));body.position.y=.55;car.add(body);const cab=new THREE.Mesh(new THREE.BoxGeometry(2.2,.42,1.65),M(0x8aa8b8,.2,.1));cab.position.set(-.15,1.02,0);car.add(cab);})();
car.position.set(2.7,0,2.55);car.rotation.y=Math.PI/2;scene.add(car);add(1.6,1.6,2.2,4.2);
wall(HX,HZ,1.85,W);wall(HX+2.75,HZ,.55,W);wall(HX+4.25,HZ,1.55,W);wall(HX+6.7,HZ,HW-6.7,W);
wall(HX,HZ+HD-W,1.6,W);wall(HX+2.55,HZ+HD-W,1.5,W);wall(HX+5.1,HZ+HD-W,HW-5.1,W);
wall(HX,HZ+W,W,1.3);wall(HX,HZ+2.55,W,2.3);wall(HX,HZ+5.6,W,HD-5.6-W);
wall(HX+HW-W,HZ+W,W,2.35);wall(HX+HW-W,HZ+3.55,W,HD-3.55-W);
box(.9,1.15,.06,M(C.gl,.08),HX+2.25,B+1.35,HZ+.08);
box(1.05,1.2,.06,M(C.gl,.08),HX+6.15,B+1.35,HZ+.08);
box(.92,2.05,.06,M(C.bl,.4,.25),HX+3.78,B+1.02,HZ+.04);
box(HW+.04,B,HD+.04,M(C.pl,.7),HX+HW/2,B/2,HZ+HD/2,false);
box(HW+.35,.16,HD+.35,M(C.rf,.55,.15),HX+HW/2,B+H+.18,HZ+HD/2);
wall(IX,IZ+3.02-.12,.85,.12);wall(IX+1.75,IZ+3.02-.12,1.85,.12);wall(IX+3.72+1.15,IZ+3.02-.12,rooms.b2.w-1.15,.12);
wall(IX+1.7-.12,IZ,.12,.55);wall(IX+1.7-.12,IZ+1.45,.12,3.02-1.45);
wall(IX+1.7+3.57-.12,IZ,.12,.55);wall(IX+1.7+3.57-.12,IZ+1.45,.12,3.02-1.45);
wall(IX+3.72-.12,IZ+3.02,.12,.5);wall(IX+3.72-.12,IZ+3.02+1.4,.12,4.04-1.4);
function fl(r,col){box(r.w-.02,.04,r.d-.02,M(col,.5),IX+r.x+r.w/2,B+.02,IZ+r.z+r.d/2,false)}
fl(rooms.hall,C.wd);fl(rooms.kit,C.wd);fl(rooms.b1,C.wd);fl(rooms.b2,C.wd);fl(rooms.bath,0xe8e4dc);
box(HW-W*2,.04,HD-W*2,M(C.ce,.9),HX+HW/2,B+H-.03,HZ+HD/2,false);
function canopy(x0,z0,x1){const z=z0;for(let x=x0;x<=x1+.01;x+=2.15)box(.05,2.28,.05,M(C.mt,.35,.55),x,1.14,z);box(x1-x0+.1,.04,1.05,M(C.mt,.35,.55),(x0+x1)/2,2.52,z);box(x1-x0,.03,.98,M(C.gl,.08),(x0+x1)/2,2.47,z);}
canopy(HX-.15,HZ-1.05,HX+HW+.15);canopy(HX-.15,HZ+HD+1.05,HX+HW+.15);
[[terr.x+.15,terr.z+.15],[terr.x+terr.w-.15,terr.z+.15],[terr.x+.15,terr.z+terr.d-.15],[terr.x+terr.w-.15,terr.z+terr.d-.15]].forEach(([x,z])=>box(.07,2.42,.07,M(C.mt),x,1.21,z));
box(terr.w+.15,.05,terr.d+.15,M(C.mt),terr.x+terr.w/2,2.46,terr.z+terr.d/2);
box(terr.w,.03,terr.d,M(C.gl,.08),terr.x+terr.w/2,2.42,terr.z+terr.d/2);
function furn(r,kind){const x=IX+r.x,z=IZ+r.z;if(kind==='hall'){box(.35,.72,1.05,M(C.bl),x+.32,B+.36,z+r.d/2);box(1.35,.08,.38,M(C.wl),x+r.w*.55,B+.42,z+.38);add(x+.1,z+r.d/2-.55,.45,1.1);}if(kind==='kit'){box(r.w-.25,.88,.58,M(C.w),x+r.w/2,B+.46,z+.38);box(r.w-.25,.04,.6,M(C.bl),x+r.w/2,B+.9,z+.38);add(x+.15,z+.08,r.w-.3,.62);}if(kind==='bed'){box(1.66,.42,2.05,M(C.wl),x+1.05,B+.28,z+r.d/2);box(1.6,.18,2,M(C.gp),x+1.05,B+.55,z+r.d/2);box(.58,2.15,1.85,M(C.wo),x+r.w-.32,B+1.08,z+r.d-1.05);add(x+.2,z+r.d/2-1.05,1.7,2.1);}if(kind==='bath'){box(1.55,.52,.68,M(0xece8e2,.32),x+r.w/2,B+.28,z+.42);add(x+.05,z+.08,1.6,.72);}}
furn(rooms.hall,'hall');furn(rooms.kit,'kit');furn(rooms.b1,'bed');furn(rooms.b2,'bed');furn(rooms.bath,'bath');
scene.add(new THREE.HemisphereLight(0xd7e6f5,0x5a4a38,.72));
const sun=new THREE.DirectionalLight(0xfff3d6,1.45);sun.position.set(-12,18,8);sun.castShadow=true;scene.add(sun);
const player={x:3.2,y:1.62,z:3.4,yaw:Math.PI-.4,pitch:-.06,sp:3.2,run:5.3,r:.22};
let mode='orbit',dragging=false,locked=false;const keys={};
const orbit={th:.7,ph:.95,r:17,tx:HX+HW/2,tz:HZ+HD/2};
function hit(x,z){if(x<.25||z<.25||x>PW-.25||z>PD-.25)return true;for(const s of solids)if(x+player.r>s.a&&x-player.r<s.b&&z+player.r>s.c&&z-player.r<s.d)return true;return false;}
function move(dx,dz){const nx=player.x+dx,nz=player.z+dz;if(!hit(nx,player.z))player.x=nx;if(!hit(player.x,nz))player.z=nz;}
function look(dx,dy){if(mode==='walk'){player.yaw-=dx*.0024;player.pitch=Math.max(-1.2,Math.min(1.2,player.pitch-dy*.0022));}else{orbit.th+=dx*.005;orbit.ph=Math.max(.25,Math.min(1.35,orbit.ph-dy*.004));}}
function cam(){if(mode==='walk'){camera.position.set(player.x,player.y,player.z);camera.rotation.order='YXZ';camera.rotation.y=player.yaw;camera.rotation.x=player.pitch;}else{camera.position.set(orbit.tx+Math.cos(orbit.th)*Math.sin(orbit.ph)*orbit.r,Math.cos(orbit.ph)*orbit.r+2,orbit.tz+Math.sin(orbit.th)*Math.sin(orbit.ph)*orbit.r);camera.lookAt(orbit.tx,1.2,orbit.tz);}}
canvas.addEventListener('mousedown',e=>{if(e.button===0)dragging=true});
addEventListener('mouseup',()=>dragging=false);
addEventListener('mousemove',e=>{if(dragging||locked)look(e.movementX,e.movementY)});
canvas.addEventListener('click',()=>{if(mode==='walk')canvas.requestPointerLock&&canvas.requestPointerLock()});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===canvas});
addEventListener('keydown',e=>keys[e.code]=true);
addEventListener('keyup',e=>keys[e.code]=false);
addEventListener('wheel',e=>{if(mode==='orbit')orbit.r=Math.max(6,Math.min(28,orbit.r+e.deltaY*.01))},{passive:true});
canvas.addEventListener('touchstart',e=>{e.preventDefault();dragging=true;window._tx=e.touches[0].clientX;window._ty=e.touches[0].clientY},{passive:false});
canvas.addEventListener('touchend',()=>dragging=false);
canvas.addEventListener('touchmove',e=>{e.preventDefault();const t=e.touches[0];look(t.clientX-window._tx,t.clientY-window._ty);window._tx=t.clientX;window._ty=t.clientY},{passive:false});
function setMode(m){mode=m;walk.classList.toggle('on',m==='walk');orbitBtn.classList.toggle('on',m==='orbit')}
const walk=document.getElementById('walk'),orbitBtn=document.getElementById('orbit');
walk.onclick=()=>setMode('walk');
orbitBtn.onclick=()=>setMode('orbit');
document.getElementById('in').onclick=()=>{setMode('walk');player.x=IX+rooms.hall.x+1.6;player.z=IZ+rooms.hall.z+1.4;player.yaw=0};
document.getElementById('yard').onclick=()=>{setMode('walk');player.x=3.2;player.z=3.4;player.yaw=Math.PI-.4};
[['fwd','KeyW'],['back','KeyS'],['left','KeyA'],['right','KeyD']].forEach(([id,code])=>{const el=document.getElementById(id);const on=()=>keys[code]=true,off=()=>keys[code]=false;el.addEventListener('mousedown',on);el.addEventListener('mouseup',off);el.addEventListener('mouseleave',off);el.addEventListener('touchstart',e=>{e.preventDefault();on()},{passive:false});el.addEventListener('touchend',off)});
function zone(){for(const r of Object.values(rooms)){if(player.x>IX+r.x&&player.x<IX+r.x+r.w&&player.z>IZ+r.z&&player.z<IZ+r.z+r.d)return r.n}if(player.x>HX&&player.x<HX+HW&&player.z>HZ&&player.z<HZ+HD)return 'Дом';if(player.x<6&&player.z<6)return 'Парковка';return 'Участок'}
setMode('orbit');
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
(function loop(){const dt=Math.min(.033,clock.getDelta());if(mode==='walk'){const sp=(keys.ShiftLeft||keys.ShiftRight)?player.run:player.sp;let dx=0,dz=0;if(keys.KeyW||keys.ArrowUp){dx-=Math.sin(player.yaw)*sp*dt;dz-=Math.cos(player.yaw)*sp*dt}if(keys.KeyS||keys.ArrowDown){dx+=Math.sin(player.yaw)*sp*dt;dz+=Math.cos(player.yaw)*sp*dt}if(keys.KeyA||keys.ArrowLeft){dx-=Math.cos(player.yaw)*sp*dt;dz+=Math.sin(player.yaw)*sp*dt}if(keys.KeyD||keys.ArrowRight){dx+=Math.cos(player.yaw)*sp*dt;dz-=Math.sin(player.yaw)*sp*dt}if(dx||dz)move(dx,dz);}else orbit.th+=dt*.08;document.getElementById('hint').textContent=zone();cam();renderer.render(scene,camera);requestAnimationFrame(loop)})();
