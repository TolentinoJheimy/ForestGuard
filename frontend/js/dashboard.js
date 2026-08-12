
/* =========================================================
   FORESTGUARD
   DASHBOARD.JS
========================================================= */


/* =========================================================
   NAVEGACIÓN DEL DASHBOARD
========================================================= */

const menuItems = document.querySelectorAll(".menu-item");
const views = document.querySelectorAll(".view");

menuItems.forEach(function (item) {

    item.addEventListener("click", function (event) {

        event.preventDefault();

        const selectedView = this.dataset.view;

        if (!selectedView) return;

        /* Quitar activo del menú */

        menuItems.forEach(function (menu) {
            menu.classList.remove("active");
        });

        /* Activar menú seleccionado */

        this.classList.add("active");

        /* Ocultar todas las vistas */

        views.forEach(function (view) {
            view.classList.remove("active");
        });

        /* Mostrar vista seleccionada */

        const target = document.getElementById(
            `view-${selectedView}`
        );

        if (target) {
            target.classList.add("active");
        }

        /* Cambiar título */

        updatePageTitle(selectedView);

        /* Actualizar mapas */

        handleMapView(selectedView);

    });

});


/* =========================================================
   TÍTULO DEL HEADER
========================================================= */

function updatePageTitle(view) {

    const title = document.querySelector(".page-title h1");
    const category = document.querySelector(".page-title span");

    const titles = {

        dashboard: {
            category: "MONITOREO",
            title: "Dashboard"
        },

        zonas: {
            category: "MONITOREO GEOGRÁFICO",
            title: "Zonas"
        },

        alertas: {
            category: "SEGURIDAD",
            title: "Alertas"
        },

        sensores: {
            category: "INTERNET OF THINGS",
            title: "Sensores"
        },

        historial: {
            category: "DATOS",
            title: "Historial"
        },

        configuracion: {
            category: "SISTEMA",
            title: "Configuración"
        }

    };

    if (titles[view]) {

        category.textContent =
            titles[view].category;

        title.textContent =
            titles[view].title;

    }

}


/* =========================================================
   ENLACES "VER TODAS"
========================================================= */

const viewLinks = document.querySelectorAll("[data-view]");

viewLinks.forEach(function (link) {

    if (link.classList.contains("menu-item")) {
        return;
    }

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const selectedView = this.dataset.view;

        if (!selectedView) return;

        /* Activar menú correspondiente */

        menuItems.forEach(function (menu) {
            menu.classList.remove("active");
        });

        const matchingMenu = document.querySelector(
            `.menu-item[data-view="${selectedView}"]`
        );

        if (matchingMenu) {
            matchingMenu.classList.add("active");
        }

        /* Ocultar vistas */

        views.forEach(function (view) {
            view.classList.remove("active");
        });

        /* Mostrar vista */

        const target = document.getElementById(
            `view-${selectedView}`
        );

        if (target) {
            target.classList.add("active");
        }

        /* Actualizar título */

        updatePageTitle(selectedView);

        /* Actualizar mapas */

        handleMapView(selectedView);

    });

});


/* =========================================================
   DATOS SIMULADOS
========================================================= */

const forestGuardData = {

    temperature: 24.8,

    humidity: 42,

    smoke: 18,

    risk: "BAJO"

};


const temperatureElement =
    document.getElementById("temperature");

const humidityElement =
    document.getElementById("humidity");

const smokeElement =
    document.getElementById("smoke");

const riskElement =
    document.getElementById("risk");

const lastUpdateElement =
    document.getElementById("lastUpdate");


/* =========================================================
   ACTUALIZAR DASHBOARD
========================================================= */

function updateDashboard() {

    if (temperatureElement) {

        temperatureElement.textContent =
            forestGuardData.temperature.toFixed(1);

    }


    if (humidityElement) {

        humidityElement.textContent =
            Math.round(
                forestGuardData.humidity
            );

    }


    if (smokeElement) {

        smokeElement.textContent =
            Math.round(
                forestGuardData.smoke
            );

    }


    if (riskElement) {

        riskElement.textContent =
            forestGuardData.risk;

    }


    updateRiskVisual();

    updateLastUpdate();

}


/* =========================================================
   HORA
========================================================= */

function updateLastUpdate() {

    if (!lastUpdateElement) return;

    const now = new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");

    lastUpdateElement.textContent =
        `${hours}:${minutes}:${seconds}`;

}


/* =========================================================
   RIESGO
========================================================= */

function determineRisk() {

    const temperature =
        forestGuardData.temperature;

    const humidity =
        forestGuardData.humidity;

    const smoke =
        forestGuardData.smoke;


    /*
        Valores actualmente simulados.
        Más adelante serán reemplazados
        por datos provenientes de Flask/SQL.
    */

    if (
        temperature >= 35 ||
        humidity <= 20 ||
        smoke >= 100
    ) {

        forestGuardData.risk =
            "ALTO";

    }

    else if (
        temperature >= 30 ||
        humidity <= 30 ||
        smoke >= 60
    ) {

        forestGuardData.risk =
            "MEDIO";

    }

    else {

        forestGuardData.risk =
            "BAJO";

    }

}


/* =========================================================
   COLOR DEL RIESGO
========================================================= */

function updateRiskVisual() {

    if (!riskElement) return;

    const indicator =
        document.querySelector(
            ".risk-indicator"
        );

    if (!indicator) return;


    if (
        forestGuardData.risk === "ALTO"
    ) {

        indicator.style.background =
            "#dc3d3d";

        indicator.style.boxShadow =
            "0 0 0 5px rgba(220,61,61,0.10)";

        riskElement.style.color =
            "#dc3d3d";

    }


    else if (
        forestGuardData.risk === "MEDIO"
    ) {

        indicator.style.background =
            "#e5a500";

        indicator.style.boxShadow =
            "0 0 0 5px rgba(229,165,0,0.10)";

        riskElement.style.color =
            "#e5a500";

    }


    else {

        indicator.style.background =
            "#159447";

        indicator.style.boxShadow =
            "0 0 0 5px rgba(21,148,71,0.10)";

        riskElement.style.color =
            "#159447";

    }

}


/* =========================================================
   SIMULACIÓN DE SENSORES
========================================================= */

function simulateSensorData() {

    forestGuardData.temperature +=
        (Math.random() - 0.5) * 0.5;


    forestGuardData.humidity +=
        (Math.random() - 0.5) * 1.5;


    forestGuardData.smoke +=
        (Math.random() - 0.5) * 2;


    forestGuardData.temperature =
        Math.max(
            0,
            forestGuardData.temperature
        );


    forestGuardData.humidity =
        Math.min(
            100,
            Math.max(
                0,
                forestGuardData.humidity
            )
        );


    forestGuardData.smoke =
        Math.max(
            0,
            forestGuardData.smoke
        );


    determineRisk();

    updateDashboard();

}


/* =========================================================
   FORESTGUARD - LEAFLET
========================================================= */

let dashboardMap = null;
let zonesMap = null;


/* =========================================================
   ESTACIONES
========================================================= */

const forestguardStations = [

    {
        nombre: "Zona Norte",
        estacion: "ForestGuard-01",
        lat: -33.0472,
        lng: -71.6127,
        temperatura: "24.8 °C",
        humedad: "42 %",
        humo: "18 ppm",
        riesgo: "BAJO",
        nivel: "low"
    },

    {
        nombre: "Zona Centro",
        estacion: "ForestGuard-02",
        lat: -33.4489,
        lng: -70.6693,
        temperatura: "31.2 °C",
        humedad: "29 %",
        humo: "44 ppm",
        riesgo: "MEDIO",
        nivel: "medium"
    },

    {
        nombre: "Zona Sur",
        estacion: "ForestGuard-03",
        lat: -37.4713,
        lng: -72.3517,
        temperatura: "27.1 °C",
        humedad: "36 %",
        humo: "68 ppm",
        riesgo: "ALTO",
        nivel: "high"
    }

];


/* =========================================================
   ICONOS FORESTGUARD
========================================================= */

function createForestGuardIcon(nivel) {

    let iconClass = "marker-low";

    if (nivel === "medium") {
        iconClass = "marker-medium";
    }

    if (nivel === "high") {
        iconClass = "marker-high";
    }

    return L.divIcon({

        className: "forestguard-marker",

        html: `
            <div class="forestguard-marker-content ${iconClass}">
                <i class="fa-solid fa-tree"></i>
            </div>
        `,

        iconSize: [38, 38],

        iconAnchor: [19, 19],

        popupAnchor: [0, -19]

    });

}


/* =========================================================
   POPUP DE ESTACIÓN
========================================================= */

function createPopup(station) {

    let riskClass = "risk-low";

    if (station.nivel === "medium") {
        riskClass = "risk-medium";
    }

    if (station.nivel === "high") {
        riskClass = "risk-high";
    }


    return `

        <div class="forestguard-popup">

            <h3>
                <i class="fa-solid fa-location-dot"></i>
                ${station.nombre}
            </h3>

            <p>
                <strong>Estación:</strong>
                ${station.estacion}
            </p>

            <p>
                <strong>Temperatura:</strong>
                ${station.temperatura}
            </p>

            <p>
                <strong>Humedad:</strong>
                ${station.humedad}
            </p>

            <p>
                <strong>Humo:</strong>
                ${station.humo}
            </p>

            <p>
                <strong>Riesgo:</strong>

                <span class="${riskClass}">
                    ${station.riesgo}
                </span>

            </p>

        </div>

    `;

}


/* =========================================================
   AGREGAR ESTACIONES AL MAPA
========================================================= */

function addStations(map) {

    forestguardStations.forEach(function (station) {

        L.marker(

            [
                station.lat,
                station.lng
            ],

            {
                icon:
                    createForestGuardIcon(
                        station.nivel
                    )
            }

        )

        .addTo(map)

        .bindPopup(
            createPopup(station)
        );

    });

}


/* =========================================================
   LEYENDA
========================================================= */

function addLegend(map) {

    const legend =
        L.control({
            position: "bottomright"
        });


    legend.onAdd = function () {

        const div =
            L.DomUtil.create(
                "div",
                "map-legend"
            );


        div.innerHTML = `

            <div class="map-legend-title">
                Nivel de riesgo
            </div>

            <div class="legend-item">

                <span class="legend-dot legend-low"></span>

                Bajo

            </div>

            <div class="legend-item">

                <span class="legend-dot legend-medium"></span>

                Medio

            </div>

            <div class="legend-item">

                <span class="legend-dot legend-high"></span>

                Alto

            </div>

        `;

        return div;

    };


    legend.addTo(map);

}


/* =========================================================
   MAPA DEL DASHBOARD
========================================================= */

function initializeDashboardMap() {

    const mapElement =
        document.getElementById(
            "dashboardMap"
        );


    if (
        !mapElement ||
        dashboardMap
    ) {
        return;
    }


    dashboardMap =
        L.map("dashboardMap").setView(

            [
                -34.5,
                -71.0
            ],

            5

        );


    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"

        }

    ).addTo(
        dashboardMap
    );


    addStations(
        dashboardMap
    );

}


/* =========================================================
   MAPA DE ZONAS
========================================================= */

function initializeZonesMap() {

    const mapElement =
        document.getElementById(
            "zonesMap"
        );


    if (
        !mapElement ||
        zonesMap
    ) {
        return;
    }


    zonesMap =
        L.map("zonesMap").setView(

            [
                -34.5,
                -71.0
            ],

            6

        );


    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom: 19,

            attribution:
                "&copy; OpenStreetMap contributors"

        }

    ).addTo(
        zonesMap
    );


    addStations(
        zonesMap
    );


    addLegend(
        zonesMap
    );

}


/* =========================================================
   CONTROL DE MAPAS SEGÚN LA VISTA
========================================================= */

function handleMapView(view) {

    /*
        Dashboard
    */

    if (view === "dashboard") {

        setTimeout(function () {

            initializeDashboardMap();

            if (dashboardMap) {

                dashboardMap.invalidateSize();

            }

        }, 100);

    }


    /*
        Zonas
    */

    if (view === "zonas") {

        setTimeout(function () {

            initializeZonesMap();

            if (zonesMap) {

                zonesMap.invalidateSize();

            }

        }, 100);

    }

}


/* =========================================================
   INICIAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateDashboard();

        initializeDashboardMap();

        console.log(
            "ForestGuard Dashboard iniciado correctamente."
        );

    }
);


/* =========================================================
   ACTUALIZACIÓN DE DATOS
========================================================= */

setInterval(
    simulateSensorData,
    5000
);

