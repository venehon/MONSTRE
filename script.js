let monsters=[];

fetch("monsters.json")
.then(r=>r.json())
.then(data=>{monsters=data;display();});

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
div.onclick=()=>show(m);
list.appendChild(div);
});
}

function show(m){
document.getElementById("details").innerHTML=`
<h2>${m.name}</h2>
<img src="${m.image}" alt="${m.name}">
<p><strong>Pays:</strong> ${m.country}</p>
<p>${m.biography}</p>
`;
}

document.getElementById("search").addEventListener("input",display);
document.getElementById("continentFilter").addEventListener("change",display);
