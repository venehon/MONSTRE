let monsters = [];

fetch("monsters.json")
.then(res => res.json())
.then(data => {
    monsters = data;
    displayList();
});

function displayList() {
    const list = document.getElementById("monsterList");
    const search = document.getElementById("search").value.toLowerCase();
    const continent = document.getElementById("continentFilter").value;
    list.innerHTML = "";

    monsters
    .filter(m =>
        (continent === "" || m.continent === continent) &&
        m.name.toLowerCase().includes(search)
    )
    .forEach(monster => {
        const div = document.createElement("div");
        div.className = "monster-item";
        div.textContent = monster.name + " (" + monster.country + ")";
        div.onclick = () => showDetails(monster);
        list.appendChild(div);
    });
}

function showDetails(monster) {
    document.getElementById("monsterDetails").innerHTML = `
        <h2>${monster.name}</h2>
        <p><strong>Pays :</strong> ${monster.country}</p>
        <p><strong>Continent :</strong> ${monster.continent}</p>
        <p><strong>Culture :</strong> ${monster.culture}</p>
        <p><strong>Période :</strong> ${monster.period}</p>
        <p>${monster.biography}</p>
        <h3>Pouvoirs</h3>
        <ul>${monster.powers.map(p=>"<li>"+p+"</li>").join("")}</ul>
        <h3>Faiblesses</h3>
        <ul>${monster.weaknesses.map(w=>"<li>"+w+"</li>").join("")}</ul>
    `;
}

document.getElementById("search").addEventListener("input", displayList);
document.getElementById("continentFilter").addEventListener("change", displayList);
