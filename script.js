let monsters=[];

fetch("monsters.json")
.then(r=>r.json())
.then(data=>{
monsters=data;
populateFilters();
display();
});

function populateFilters(){
const continents=[...new Set(monsters.map(m=>m.continent))];
const countries=[...new Set(monsters.map(m=>m.country))];

const continentSelect=document.getElementById("continentFilter");
continents.forEach(c=>{
let o=document.createElement("option");
o.value=c;o.textContent=c;
continentSelect.appendChild(o);
});

const countrySelect=document.getElementById("countryFilter");
countries.sort().forEach(c=>{
let o=document.createElement("option");
o.value=c;o.textContent=c;
countrySelect.appendChild(o);
});
}

function display(){
const search=document.getElementById("search").value.toLowerCase();
const continent=document.getElementById("continentFilter").value;
const country=document.getElementById("countryFilter").value;
const list=document.getElementById("list");
list.innerHTML="";

monsters.filter(m=>
(continent===""||m.continent===continent)&&
(country===""||m.country===country)&&
m.name.toLowerCase().includes(search)
).forEach(m=>{
let div=document.createElement("div");
div.className="item";
div.textContent=m.name+" ("+m.country+")";
div.onclick=()=>show(m);
list.appendChild(div);
});
}

function show(m){
document.getElementById("details").innerHTML=`
<h2>${m.name}</h2>
<img src="${m.image}" alt="${m.name}">
<p><strong>Pays:</strong> ${m.country}</p>
<p>${m.bio}</p>
`;
}

document.getElementById("search").addEventListener("input",display);
document.getElementById("continentFilter").addEventListener("change",display);
document.getElementById("countryFilter").addEventListener("change",display);
