function init() {
  am4core.useTheme(am4themes_animated);

  var chart = am4core.create("chartdiv", am4maps.MapChart);
  chart.dragGrip.disabled = true;
  chart.seriesContainer.inert = false;
  chart.hiddenState.properties.opacity = 0; // this creates initial fade-in 

  chart.geodata = am4geodata_mexicoLow;
  chart.projection = new am4maps.projections.Miller();

  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
  var polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}:  \n \t {value.value.formatNumber('#')}/12";
  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: am4core.color("#ffffff"),
    max: am4core.color("#FEC23B")
  });
  polygonSeries.useGeodata = true;

  //disable zoom
  chart.chartContainer.wheelable = false;
  chart.seriesContainer.events.disableType("doublehit");
  chart.chartContainer.background.events.disableType("doublehit");
  // add heat legend 
  var heatLegend = chart.chartContainer.createChild(am4maps.HeatLegend);
  heatLegend.valign = "bottom";
  heatLegend.align = "center";
  heatLegend.width = am4core.percent(75);
  heatLegend.series = polygonSeries;
  heatLegend.orientation = "horizontal";
  heatLegend.padding(20, 20, 20, 20);
  heatLegend.valueAxis.renderer.labels.template.fontSize = 10;
  heatLegend.valueAxis.renderer.minGridDistance = 40;


  polygonSeries.mapPolygons.template.events.on("over", event => {
    handleHover(event.target);
  });

  polygonSeries.mapPolygons.template.events.on("hit", event => {
    let estad_name = event.target.dataItem._dataContext.name;
    select_estado(estad_name);
    handleHover(event.target);
  });

  function handleHover(mapPolygon) {
    if (!isNaN(mapPolygon.dataItem.value)) {
      heatLegend.valueAxis.showTooltipAt(mapPolygon.dataItem.value);
    } else {
      heatLegend.valueAxis.hideTooltip();
    }
  }

  polygonSeries.mapPolygons.template.strokeOpacity = 0.4;
  polygonSeries.mapPolygons.template.events.on("out", event => {
    heatLegend.valueAxis.hideTooltip();
  });
  // data 
  polygonSeries.data = [
    {
      id: "MX-ZAC",
      value: 4
    },
    {
      id: "MX-YUC",
      value: 7
    },
    {
      id: "MX-VER",
      value: 10
    },
    {
      id: "MX-TLA",
      value: 7
    },
    {
      id: "MX-TAM",
      value: 8
    },
    {
      id: "MX-TAB",
      value: 3
    },
    {
      id: "MX-SON",
      value: 6
    },
    {
      id: "MX-SIN",
      value: 9
    },
    {
      id: "MX-SLP",
      value: 5
    },
    {
      id: "MX-ROO",
      value: 3
    },
    {
      id: "MX-QUE",
      value: 6
    },
    {
      id: "MX-PUE",
      value: 3
    },
    {
      id: "MX-OAX",
      value: 2
    },
    {
      id: "MX-NLE",
      value: 9
    },
    {
      id: "MX-NAY",
      value: 2
    },
    {
      id: "MX-MOR",
      value: 3
    },
    {
      id: "MX-MIC",
      value: 6
    },
    {
      id: "MX-MEX",
      value: 4
    },
    {
      id: "MX-JAL",
      value: 10
    },
    {
      id: "MX-HID",
      value: 3
    },
    {
      id: "MX-GRO",
      value: 5
    },
    {
      id: "MX-GUA",
      value: 9
    },
    {
      id: "MX-DUR",
      value: 7
    },
    {
      id: "MX-CMX",
      value: 2
    },
    {
      id: "MX-COL",
      value: 7
    },
    {
      id: "MX-COA",
      value: 9
    },
    {
      id: "MX-CHH",
      value: 7
    },
    {
      id: "MX-CHP",
      value: 1
    },
    {
      id: "MX-CAM",
      value: 10
    },
    {
      id: "MX-BCS",
      value: 2
    },
    {
      id: "MX-BCN",
      value: 3
    },
    {
      id: "MX-AGU",
      value: 8
    }
  ];

}

init();