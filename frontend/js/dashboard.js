/* =========================================================
   NAVEGACIÓN DEL DASHBOARD
========================================================= */

const menuItems = document.querySelectorAll(".menu-item");
const views = document.querySelectorAll(".view");


/* =========================================================
   TÍTULOS DEL HEADER
========================================================= */

const pageTitles = {

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
    },

    media: {
        category: "VIDEO",
        title: "Media"
    }

};


/* =========================================================
   CAMBIAR TÍTULO DEL HEADER
========================================================= */

function updatePageTitle(viewName) {

    const pageTitle = document.querySelector(".page-title");

    if (!pageTitle) {
        console.error("No se encontró .page-title");
        return;
    }

    const categoryElement = pageTitle.querySelector("span");
    const titleElement = pageTitle.querySelector("h1");

    if (!categoryElement || !titleElement) {
        console.error("No se encontró el span o h1 del header");
        return;
    }

    const page = pageTitles[viewName];

    if (!page) {
        console.warn("No existe título para:", viewName);
        return;
    }

    categoryElement.textContent = page.category;
    titleElement.textContent = page.title;

    console.log(
        "HEADER ACTUALIZADO:",
        page.category,
        "-",
        page.title
    );

}

/* =========================================================
   CAMBIAR DE VISTA
========================================================= */

function changeView(viewName) {

    if (!viewName) return;


    console.log("CAMBIANDO VISTA A:", viewName);


    /* -----------------------------------------
       MENÚ
    ----------------------------------------- */

    menuItems.forEach(function (item) {

        item.classList.remove("active");

    });


    const selectedMenu = document.querySelector(
        `.menu-item[data-view="${viewName}"]`
    );


    if (selectedMenu) {

        selectedMenu.classList.add("active");

    }


    /* -----------------------------------------
       VISTAS
    ----------------------------------------- */

    views.forEach(function (view) {

        view.classList.remove("active");

    });


    const selectedView = document.getElementById(
        `view-${viewName}`
    );


    if (selectedView) {

        selectedView.classList.add("active");

    } else {

        console.error(
            `No existe la vista: view-${viewName}`
        );

        return;

    }


    /* -----------------------------------------
       HEADER
    ----------------------------------------- */

    updatePageTitle(viewName);


    /* -----------------------------------------
       MAPAS
    ----------------------------------------- */

    if (typeof handleMapView === "function") {

        handleMapView(viewName);

    }

}

/* =========================================================
   CLICK EN MENÚ
========================================================= */

menuItems.forEach(function (item) {

    item.addEventListener("click", function (event) {

        event.preventDefault();

        const viewName = this.dataset.view;

        changeView(viewName);

    });

});


/* =========================================================
   LINKS INTERNOS
   Ej: "Ver todas"
========================================================= */

document.querySelectorAll("[data-view]").forEach(function (link) {

    if (link.classList.contains("menu-item")) {
        return;
    }

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const viewName = this.dataset.view;

        changeView(viewName);

    });

});

/* =========================================================
   SENSORES
========================================================= */

const forestGuardSensors = [

    {
        id: "ForestGuard-01",
        zona: "Zona Norte",
        online: true
    },

    {
        id: "ForestGuard-02",
        zona: "Zona Centro",
        online: true
    },

    {
        id: "ForestGuard-03",
        zona: "Zona Sur",
        online: true
    }

];


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

const sensorConnectionStatus =
    document.getElementById("sensorConnectionStatus");


/* =========================================================
   ESTADO DE SENSORES
========================================================= */

function updateSensorConnectionStatus() {

    if (!sensorConnectionStatus) return;

    const totalSensors =
        forestGuardSensors.length;

    const connectedSensors =
        forestGuardSensors.filter(
            sensor => sensor.online
        ).length;

    sensorConnectionStatus.textContent =
        `${connectedSensors}/${totalSensors} sensores conectados`;

}


/* =========================================================
   DATOS FORESTGUARD
========================================================= */

const forestGuardData = {

    temperature: 24.1,

    humidity: 58,

    smoke: 12,

    risk: "BAJO",

    stations: [

        {
            name: "Zona Norte",
            location: "Coquimbo",
            temperature: 23,
            humidity: 61,
            smoke: 8,
            risk: "BAJO"
        },

        {
            name: "Zona Centro",
            location: "O'Higgins",
            temperature: 27,
            humidity: 48,
            smoke: 18,
            risk: "MEDIO"
        },

        {
            name: "Zona Sur",
            location: "Araucanía",
            temperature: 21,
            humidity: 68,
            smoke: 5,
            risk: "BAJO"
        }

    ]

};


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

    updateSensorConnectionStatus();

}


/* =========================================================
   HORA DE ACTUALIZACIÓN
========================================================= */

function updateLastUpdate() {

    if (!lastUpdateElement) return;

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");

    lastUpdateElement.textContent =
        `${hours}:${minutes}:${seconds}`;

}


/* =========================================================
   CALCULAR RIESGO
========================================================= */

function determineRisk() {

    const temperature =
        forestGuardData.temperature;

    const humidity =
        forestGuardData.humidity;

    const smoke =
        forestGuardData.smoke;


    if (
        temperature >= 35 ||
        humidity <= 20 ||
        smoke >= 100
    ) {

        forestGuardData.risk = "ALTO";

    }

    else if (
        temperature >= 30 ||
        humidity <= 30 ||
        smoke >= 60
    ) {

        forestGuardData.risk = "MEDIO";

    }

    else {

        forestGuardData.risk = "BAJO";

    }

}


/* =========================================================
   COLOR DEL RIESGO
========================================================= */

function updateRiskVisual() {

    if (!riskElement) return;

    const indicator =
        document.querySelector(".risk-indicator");

    if (!indicator) return;


    if (forestGuardData.risk === "ALTO") {

        indicator.style.background = "#dc3d3d";

        indicator.style.boxShadow =
            "0 0 0 5px rgba(220,61,61,0.10)";

        riskElement.style.color = "#dc3d3d";

    }

    else if (forestGuardData.risk === "MEDIO") {

        indicator.style.background = "#e5a500";

        indicator.style.boxShadow =
            "0 0 0 5px rgba(229,165,0,0.10)";

        riskElement.style.color = "#e5a500";

    }

    else {

        indicator.style.background = "#159447";

        indicator.style.boxShadow =
            "0 0 0 5px rgba(21,148,71,0.10)";

        riskElement.style.color = "#159447";

    }

}


/* =========================================================
   SIMULACIÓN DE SENSORES
========================================================= */

function simulateSensorData() {

    /*
     * Variaciones pequeñas para que
     * los datos parezcan mediciones reales.
     */

    forestGuardData.temperature +=
        (Math.random() - 0.5) * 1.2;


    forestGuardData.humidity +=
        (Math.random() - 0.5) * 3;


    forestGuardData.smoke +=
        (Math.random() - 0.5) * 5;


    /*
     * Límites
     */

    forestGuardData.temperature =
        Math.max(
            15,
            Math.min(
                40,
                forestGuardData.temperature
            )
        );


    forestGuardData.humidity =
        Math.max(
            15,
            Math.min(
                90,
                forestGuardData.humidity
            )
        );


    forestGuardData.smoke =
        Math.max(
            0,
            Math.min(
                120,
                forestGuardData.smoke
            )
        );


    /*
     * Calcular riesgo
     */

    determineRisk();


    /*
     * Actualizar tarjetas
     */

    updateDashboard();


    /*
     * Agregar nueva medición
     * al gráfico
     */

    addSensorHistory();


    /*
     * Revisar alertas
     */

    checkRiskAlert();

}


/* =========================================================
   LEAFLET
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
   POPUP
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
   AGREGAR ESTACIONES
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
   MAPA DASHBOARD
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
   MAPA ZONAS
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
   CONTROL DE MAPAS
========================================================= */

function handleMapView(view) {

    if (view === "dashboard") {

        setTimeout(function () {

            initializeDashboardMap();

            if (dashboardMap) {
                dashboardMap.invalidateSize();
            }

        }, 100);

    }


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
   GRÁFICO
========================================================= */

let environmentChart = null;

let sensorHistory = [];

let alertHistory = [];

let previousRisk =
    forestGuardData.risk;

let selectedChartPeriod = 24;


/* =========================================================
   GENERAR HISTORIAL INICIAL
========================================================= */

function generateInitialHistory() {

    sensorHistory = [];

    let temperature = 23.5;

    let humidity = 58;


    /*
     * Creamos 12 mediciones iniciales.
     * Cada punto representa 5 segundos.
     */

    for (let i = 0; i < 12; i++) {

        temperature +=
            (Math.random() - 0.5) * 1.5;

        humidity +=
            (Math.random() - 0.5) * 4;


        temperature =
            Math.max(
                18,
                Math.min(
                    32,
                    temperature
                )
            );


        humidity =
            Math.max(
                30,
                Math.min(
                    80,
                    humidity
                )
            );


        const date =
            new Date(
                Date.now() -
                ((11 - i) * 5000)
            );


        sensorHistory.push({

            label:
                formatTime(date),

            temperature:
                Number(
                    temperature.toFixed(1)
                ),

            humidity:
                Math.round(humidity)

        });

    }

}


/* =========================================================
   FORMATO DE HORA
========================================================= */

function formatTime(date) {

    const hours =
        String(
            date.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            date.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            date.getSeconds()
        ).padStart(2, "0");


    return `${hours}:${minutes}:${seconds}`;

}


/* =========================================================
   AGREGAR MEDICIÓN
========================================================= */

function addSensorHistory() {

    if (!environmentChart) return;


    const now =
        new Date();


    /*
     * NUEVA MARCA
     */

    sensorHistory.push({

        label:
            formatTime(now),

        temperature:
            Number(
                forestGuardData.temperature.toFixed(1)
            ),

        humidity:
            Math.round(
                forestGuardData.humidity
            )

    });


    /*
     * Mantener solamente
     * las últimas 24 mediciones.
     */

    if (sensorHistory.length > 24) {

        sensorHistory.shift();

    }


    updateChartPeriod();

}


/* =========================================================
   FILTRO DEL GRÁFICO
========================================================= */

function updateChartPeriod() {

    if (!environmentChart) return;


    let points =
        Number(
            selectedChartPeriod
        );


    if (
        !points ||
        points < 1
    ) {

        points = 24;

    }


    const visibleHistory =
        sensorHistory.slice(
            -points
        );


    environmentChart.data.labels =
        visibleHistory.map(
            item => item.label
        );


    environmentChart.data.datasets[0].data =
        visibleHistory.map(
            item => item.temperature
        );


    environmentChart.data.datasets[1].data =
        visibleHistory.map(
            item => item.humidity
        );


    environmentChart.update("none");

}


/* =========================================================
   CREAR GRÁFICO
========================================================= */

function initializeEnvironmentChart() {

    const canvas =
        document.getElementById(
            "environmentChart"
        );


    if (!canvas) return;


    const ctx =
        canvas.getContext("2d");


    environmentChart =
        new Chart(

            ctx,

            {

                type: "line",


                data: {

                    labels:
                        sensorHistory.map(
                            item => item.label
                        ),


                    datasets: [

                        {

                            label:
                                "Temperatura (°C)",

                            data:
                                sensorHistory.map(
                                    item =>
                                        item.temperature
                                ),

                            borderColor:
                                "#16833d",

                            backgroundColor:
                                "rgba(22, 131, 61, 0.10)",

                            borderWidth:
                                2,

                            tension:
                                0.35,

                            fill:
                                true,

                            pointRadius:
                                4,

                            pointHoverRadius:
                                6

                        },


                        {

                            label:
                                "Humedad (%)",

                            data:
                                sensorHistory.map(
                                    item =>
                                        item.humidity
                                ),

                            borderColor:
                                "#2985c7",

                            backgroundColor:
                                "transparent",

                            borderWidth:
                                2,

                            tension:
                                0.35,

                            fill:
                                false,

                            pointRadius:
                                4,

                            pointHoverRadius:
                                6

                        }

                    ]

                },


                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,


                    interaction: {

                        mode:
                            "index",

                        intersect:
                            false

                    },


                    plugins: {

                        legend: {

                            position:
                                "top",

                            align:
                                "end",

                            labels: {

                                usePointStyle:
                                    true,

                                boxWidth:
                                    8,

                                font: {

                                    family:
                                        "Poppins",

                                    size:
                                        10

                                }

                            }

                        },


                        tooltip: {

                            backgroundColor:
                                "#062b16",

                            titleFont: {

                                family:
                                    "Poppins"

                            },

                            bodyFont: {

                                family:
                                    "Poppins"

                            },

                            padding:
                                10,

                            cornerRadius:
                                8

                        }

                    },


                    scales: {

                        x: {

                            grid: {

                                display:
                                    false

                            },

                            ticks: {

                                color:
                                    "#9aa69f",

                                font: {

                                    family:
                                        "Poppins",

                                    size:
                                        9

                                },

                                maxRotation:
                                    0,

                                autoSkip:
                                    true,

                                maxTicksLimit:
                                    8

                            }

                        },


                        y: {

                            beginAtZero:
                                false,

                            suggestedMin:
                                15,

                            suggestedMax:
                                70,

                            grid: {

                                color:
                                    "#e5ebe7"

                            },

                            ticks: {

                                color:
                                    "#9aa69f",

                                font: {

                                    family:
                                        "Poppins",

                                    size:
                                        9

                                }

                            }

                        }

                    }

                }

            }

        );


    updateChartPeriod();

}


/* =========================================================
   SELECTOR DEL GRÁFICO
========================================================= */

function initializeChartPeriod() {

    const chartPeriod =
        document.getElementById(
            "chartPeriod"
        );


    if (!chartPeriod) return;


    /*
     * IMPORTANTE:
     * Le ponemos valores reales
     * a las opciones del HTML.
     */

    chartPeriod.options[0].value = "24";
    chartPeriod.options[1].value = "24";
    chartPeriod.options[2].value = "24";


    chartPeriod.addEventListener(

        "change",

        function () {

            selectedChartPeriod =
                Number(
                    this.value
                );

            updateChartPeriod();

        }

    );

}


/* =========================================================
   ALERTAS
========================================================= */

function addRiskAlertToHistory(risk) {

    const now =
        new Date();


    const alert = {

        risk:
            risk,

        time:
            formatTime(now),

        temperature:
            forestGuardData.temperature,

        humidity:
            forestGuardData.humidity,

        smoke:
            forestGuardData.smoke

    };


    alertHistory.unshift(
        alert
    );


    if (
        alertHistory.length > 5
    ) {

        alertHistory.pop();

    }


    renderAlertHistory();

}


/* =========================================================
   MOSTRAR HISTORIAL DE ALERTAS
========================================================= */

function renderAlertHistory() {

    const container =
        document.querySelector(
            ".alerts-list"
        );


    if (!container) return;


    container.innerHTML = "";


    alertHistory.forEach(function (alert) {

        const item =
            document.createElement(
                "div"
            );


        const isHigh =
            alert.risk === "ALTO";


        item.className =
            `alert-item ${isHigh
                ? "danger"
                : "warning"
            }`;


        item.innerHTML = `

            <div class="alert-icon">

                <i class="fa-solid ${isHigh
                ? "fa-triangle-exclamation"
                : "fa-circle-exclamation"
            }"></i>

            </div>


            <div class="alert-info">

                <strong>
                    Riesgo ${alert.risk}
                </strong>

                <span>
                    Temperatura:
                    ${alert.temperature.toFixed(1)}°C
                    · Humedad:
                    ${Math.round(alert.humidity)}%
                    · Humo:
                    ${Math.round(alert.smoke)} ppm
                </span>

                <small>
                    ${alert.time}
                </small>

            </div>


            <div class="alert-status ${isHigh
                ? "danger"
                : "warning"
            }">

                ${isHigh
                ? "CRÍTICO"
                : "PRECAUCIÓN"
            }

            </div>

        `;


        container.appendChild(
            item
        );

    });

}


/* =========================================================
   DETECTAR CAMBIO DE RIESGO
========================================================= */

function checkRiskAlert() {

    const currentRisk =
        forestGuardData.risk;


    if (
        currentRisk ===
        previousRisk
    ) {

        return;

    }


    if (

        currentRisk === "MEDIO" ||
        currentRisk === "ALTO"

    ) {

        showRiskAlert(
            currentRisk
        );

        addRiskAlertToHistory(
            currentRisk
        );

    }


    previousRisk =
        currentRisk;

}


/* =========================================================
   ALERTA VISUAL
========================================================= */

function showRiskAlert(risk) {

    const alertBox =
        document.createElement(
            "div"
        );


    alertBox.className =
        "forestguard-alert " +
        risk.toLowerCase();


    const icon =
        risk === "ALTO"
            ? "fa-triangle-exclamation"
            : "fa-circle-exclamation";


    const title =
        risk === "ALTO"
            ? "¡Riesgo alto detectado!"
            : "Riesgo medio detectado";


    alertBox.innerHTML = `

        <div class="forestguard-alert-icon">

            <i class="fa-solid ${icon}"></i>

        </div>


        <div class="forestguard-alert-content">

            <strong>
                ${title}
            </strong>

            <span>
                ForestGuard detectó condiciones
                ambientales que requieren atención.
            </span>

        </div>


        <button
            onclick="this.parentElement.remove()"
        >

            <i class="fa-solid fa-xmark"></i>

        </button>

    `;


    document.body.appendChild(
        alertBox
    );


    setTimeout(function () {

        if (alertBox.parentElement) {

            alertBox.remove();

        }

    }, 6000);

}


/* =========================================================
   INICIAR DASHBOARD
========================================================= */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        /*
         * Primero generamos
         * el historial inicial.
         */

        generateInitialHistory();


        /*
         * Creamos el gráfico
         */

        initializeEnvironmentChart();


        /*
         * Selector
         */

        initializeChartPeriod();


        /*
         * Dashboard
         */

        updateDashboard();


        /*
         * Mapa
         */

        initializeDashboardMap();


        console.log(
            "ForestGuard Dashboard iniciado correctamente."
        );

    }

);


/* =========================================================
   ACTUALIZACIÓN CADA 5 SEGUNDOS
========================================================= */

setInterval(

    function () {

        simulateSensorData();

    },

    5000

);