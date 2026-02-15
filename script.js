let monsters=[];

// Chargement base locale
fetch("monsters.json")
.then(r=>r.json())
.then(data=>{
monsters=data;
display();
});

function display(){
const search=document.getElementById("search").value.toLowerCase();
const continent=document.getElementById("continentFilter").value;
const list=document.getElementById("list");
list.innerHTML="";

monsters.filter(m=>
(continent===""||m.continent===continent)&&
m.name.toLowerCase().includes(search)
).forEach(m=>{
let div=document.createElement("div");
div.className="item";
div.textContent=m.name+" ("+m.country+")";
div.onclick=()=>loadDetails(m);
list.appendChild(div);
});
}

// 🔥 Enrichissement Wikidata Live
async function loadDetails(monster){
const details=document.getElementById("details");
details.innerHTML="<p>Chargement des données Wikidata...</p>";

try{
const response=await fetch(
"https://www.wikidata.org/w/api.php?action=wbsearchentities&search="
+encodeURIComponent(monster.name)+
"&language=fr&format=json&origin=*"
);

const data=await response.json();

if(data.search && data.search.length>0){
const entityId=data.search[0].id;

const entityData=await fetch(
"https://www.wikidata.org/wiki/Special:EntityData/"+entityId+".json"
);
const entityJson=await entityData.json();
const entity=entityJson.entities[entityId];

let description = entity.descriptions?.fr?.value || "Description indisponible.";
let image = entity.claims?.P18?.[0]?.mainsnak?.datavalue?.value;

let imageUrl = image
? "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(image)
: "";

details.innerHTML=`
<h2>${monster.name}</h2>
<p><strong>Pays :</strong> ${monster.country}</p>
<p><strong>Description Wikidata :</strong> ${description}</p>
${imageUrl ? "<img src='"+imageUrl+"'/>":""}
`;
}else{
fallback(monster);
}
}catch(e){
fallback(monster);
}
}

// 🛟 Fallback local si API échoue
function fallback(monster){
document.getElementById("details").innerHTML=`
<h2>${monster.name}</h2>
<p><strong>Pays :</strong> ${monster.country}</p>
<p>Données locales uniquement. (API indisponible)</p>
`;
}

document.getElementById("search").addEventListener("input",display);
document.getElementById("continentFilter").addEventListener("change",display);
