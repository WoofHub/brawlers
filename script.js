import brawlers from './brawlers.json' assert { type: "json" };
const brawlersArr = Object.values(brawlers);
const totalBrawlerLength = brawlersArr.length;

const brawlersByRarity = organiseByProperty("rarity");
const rarityLength = Object.keys(brawlersByRarity).length;

const brawlersByYear = organiseByProperty("year");
const yearLength = Object.keys(brawlersByYear).length;

const wrapper = document.querySelector(".wrapper");

let panels;

let isCollapsed = false;

document.getElementById("collapse-button").addEventListener("click", collapsePanels);
document.getElementById("rarity-button").addEventListener("click", sortByRarity);
document.getElementById("release-date-button").addEventListener("click", sortByReleaseDate);
document.getElementById("switch-info-button").addEventListener("click", switchInfo);
document.getElementById("split-by-rarity-button").addEventListener("click", function() { sortByProperty(brawlersByRarity, rarityLength) });
document.getElementById("split-by-year-button").addEventListener("click", function() { sortByProperty(brawlersByYear, yearLength) });

function collapsePanels(e) {
    isCollapsed  = !isCollapsed;

    if (isCollapsed) {
        e.currentTarget.textContent = "Uncollapse";
        panels.forEach(panel => { panel.classList.add("collapsed") });
    }
    else {
        e.currentTarget.textContent = "Collapse";
        panels.forEach(panel => { panel.classList.remove("collapsed") });
    }
}

function checkCollapsed() {
    if (isCollapsed) return true;
    else return false;
}

function switchInfo() {
    for (let i = 0; i < totalBrawlerLength; i++) {
        const panel = panels[i];

        const mainInfo = panel.querySelector(".main-info");
        const statsInfo = panel.querySelector(".stats-info");

        mainInfo.classList.toggle("invisible");
        statsInfo.classList.toggle("invisible");
    }
}

function sortByRarity() {
    wrapper.innerHTML = "";
    wrapper.classList.remove("column");

    const rarityBrawlers = Object.values(brawlersByRarity);

    for (let i = 0; i < rarityLength; i++) {
        const rarityArr = rarityBrawlers[i];
        createPanels(rarityArr, rarityArr.length, wrapper);
    }
}

function sortByReleaseDate() {
    wrapper.innerHTML = "";
    wrapper.classList.remove("column");
    createPanels(brawlersArr, totalBrawlerLength, wrapper);
}

function createPanels(arr, length, parent) {
    for (let i = 0; i < length; i++) {
        const brawler = arr[i];
        
        parent.innerHTML += `
        <div class="info-panel ${checkCollapsed() ? "collapsed" : ""}">
            <div class="info-panel-splash">
                <div class="splash-bg ${brawler.rarity.toLowerCase().replace(" ", "_")}_bg"></div>
                <div class="item-img-div">
                    <img class="item-img" style="scale:${brawler.scale};left:${brawler.left}px;top:${brawler.top}px" src="${brawler.model}"/>
                </div>
                <div class="splash-linear-gradient"></div>
                <h2 class="item-header-name">${brawler.name}</h2>
            </div>
            <div class="info-panel-body">
                <div class="main-info">
                    <p>${brawler.description}</p>
                </div>

                <div class="stats-info invisible">
                    <div class="info-stack">
                        <img src="https://brawltime.ninja/assets/static/attack-icon.Eof0I1EL.png">
                        <p>${brawler.attack}</p>
                    </div>
                    <div class="info-stack">
                        <img src="https://brawltime.ninja/assets/static/super-icon.oFgQwNLH.png">
                        <p>${brawler.super}</p>
                    </div>
                    <div class="info-stack">
                        <img src="https://png.pngtree.com/png-clipart/20230405/original/pngtree-green-medical-shield-protection-png-image_9026879.png">
                        <p>${brawler.health}</p>
                    </div>
                </div>
            </div>
            
        </div>
        `;
    }

    panels = wrapper.querySelectorAll(".info-panel");
}

function organiseByProperty(property) {
    const obj = {};

    for (let i = 0; i < totalBrawlerLength; i++) {
        const brawler = brawlersArr[i];

        if (!obj[brawler[property]]) obj[brawler[property]] = [];

        obj[brawler[property]].push(brawler);
    }

    return obj;
}

function sortByProperty(brawlersByProperty, propertyLength) {
    wrapper.innerHTML = "";
    wrapper.classList.add("column");

    const keys = Object.keys(brawlersByProperty);

    for (let i = 0; i < propertyLength; i++) {
        const key = keys[i];

        const categoryHolder = document.createElement("div");
        categoryHolder.classList.add("category-holder");
        wrapper.append(categoryHolder);

        const categoryName = document.createElement("h1");
        categoryName.classList.add("category-name");
        categoryName.textContent = key;
        categoryHolder.append(categoryName);

        const brawlersHolder = document.createElement("div");
        brawlersHolder.classList.add("brawlers-holder");
        categoryHolder.append(brawlersHolder);

        const propertyBrawlers = brawlersByProperty[key];
        const brawlersLength = propertyBrawlers.length;

        createPanels(propertyBrawlers, brawlersLength, brawlersHolder);
    }
}

sortByProperty(brawlersByYear, yearLength);

//createPanels(brawlersArr, totalBrawlerLength, wrapper);