let monsters=[];

fetch("monsters.json")
.then(r=>r.json())
.then(data=>{
monsters=data;
populateCountries();
display();
});

function populateCountries(){
const select=document.getElementById("countryFilter");
[...new Set(monsters.map(m=>m.country))].sort().forEach(c=>{
let o=document.createElement("option");
o.textContent=c;
select.appendChild(o);
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
<p><strong>Pays:</strong> ${m.country}</p>
<p><strong>Culture:</strong> ${m.culture}</p>
<p><strong>Période:</strong> ${m.period}</p>
<p>${m.biography}</p>
<h3>Pouvoirs</h3>
<ul>${m.powers.map(p=>"<li>"+p+"</li>").join("")}</ul>
<h3>Faiblesses</h3>
<ul>${m.weaknesses.map(w=>"<li>"+w+"</li>").join("")}</ul>
`;
}

document.getElementById("search").addEventListener("input",display);
document.getElementById("continentFilter").addEventListener("change",display);
document.getElementById("countryFilter").addEventListener("change",display);
