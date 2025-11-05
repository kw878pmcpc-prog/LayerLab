{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // LayerLab by PerfumePeter\
\
const sampleFragrances = [\
  \{ name: "Amber Horizon", brand: "Aether Co", notes: \{ top:["vanilla"], heart:["amber"], base:["woody","resinous"]\}\},\
  \{ name: "Citrus Veil", brand: "Solaire", notes: \{ top:["citrus","green"], heart:["white floral"], base:["musky"]\}\},\
  \{ name: "Velvet Smoke", brand: "NoirWorks", notes: \{ top:["spicy"], heart:["smoky"], base:["amber","woody"]\}\},\
  \{ name: "Ocean Muse", brand: "BlueNote", notes: \{ top:["aquatic","green"], heart:["aromatic"], base:["musky"]\}\},\
  \{ name: "Rose Ember", brand: "Lumine", notes: \{ top:["floral"], heart:["spicy"], base:["amber","sweet"]\}\},\
];\
\
let library = JSON.parse(localStorage.getItem("layerlab_lib") || "[]");\
if (library.length === 0) library = sampleFragrances;\
\
function saveLibrary() \{\
  localStorage.setItem("layerlab_lib", JSON.stringify(library));\
\}\
\
function renderLibrary() \{\
  const div = document.getElementById("library");\
  div.innerHTML = "";\
  library.forEach((f,i)=>\{\
    const el = document.createElement("div");\
    el.className="fragrance";\
    el.innerHTML = `<strong>$\{f.name\}</strong> ($\{f.brand\})<br>\
    Top: $\{f.notes.top.join(", ")\}<br>\
    Heart: $\{f.notes.heart.join(", ")\}<br>\
    Base: $\{f.notes.base.join(", ")\}`;\
    div.appendChild(el);\
  \});\
\}\
renderLibrary();\
\
document.getElementById("addBtn").onclick = ()=>\{\
  const f = \{\
    name: document.getElementById("fName").value || "Untitled",\
    brand: document.getElementById("fBrand").value || "",\
    notes: \{\
      top: document.getElementById("fTop").value.split(",").map(s=>s.trim()).filter(Boolean),\
      heart: document.getElementById("fHeart").value.split(",").map(s=>s.trim()).filter(Boolean),\
      base: document.getElementById("fBase").value.split(",").map(s=>s.trim()).filter(Boolean),\
    \}\
  \};\
  library.push(f);\
  saveLibrary();\
  renderLibrary();\
  alert("Added!");\
\};\
\
// --- Simple pairing logic ---\
function sharedNotes(a,b)\{\
  const allA = [...a.top,...a.heart,...a.base];\
  const allB = [...b.top,...b.heart,...b.base];\
  return allA.filter(x=>allB.includes(x));\
\}\
\
function randomPair()\{\
  if (library.length<2) return alert("Add at least 2 fragrances!");\
  const i = Math.floor(Math.random()*library.length);\
  let j=i;\
  while(j===i) j = Math.floor(Math.random()*library.length);\
  const A=library[i], B=library[j];\
  const shared = sharedNotes(A.notes,B.notes);\
  const resultDiv=document.getElementById("results");\
  resultDiv.innerHTML = `\
  <div class="result">\
    <strong>$\{A.name\}</strong> + <strong>$\{B.name\}</strong><br>\
    $\{shared.length>0 ? "Shared notes: "+shared.join(", ") : "Contrasting but complementary!"\}\
  </div>`;\
\}\
\
document.getElementById("randomBtn").onclick = randomPair;}