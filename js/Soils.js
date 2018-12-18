
var map;
//var baseMapServiceLayer;
//var _thinkwhere = 'https://map.sepa.org.uk/proxy/thinkwhere.ashx';
//var bg_click;
var URLSearch = 'http://stir-app-orapp2/pls/r02d/ims_utils.genericsearch?app=2&q=';
//var searchRequest;
var _zoomBuffer = 50;
var soils1;
var soils2;
var soils3;
var soils4;
var soils5;
var soils6;
var soils7;
var soils8;
var soils9;
var soils10;
var soils11;
var soils12;
var soils13;
var soils14;
var soils15;
var soils16;
var soils17;
var soils18;
var soils19;
var soils20;
var soils21;
var _wiki = 27700;

var onClickHandler;
var onClickHandler2;

var _myarray7 = [];// QMUNIT Array
var _myarray;

require([
    "dojo/ready",
    "dojo/on",
    "dojo/_base/connect",
    "dojo/dom",
    "dijit/registry",
    "dojo/dom-construct",
    "dojo/parser",
    "dojo/_base/array",
    "esri/map",
    "esri/config",
    "esri/layers/layer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/dijit/Legend",
    "esri/dijit/LocateButton",
    "esri/tasks/IdentifyTask",
    "esri/tasks/IdentifyParameters",
    "esri/tasks/RelationshipQuery",
    "esri/tasks/QueryTask",
    "esri/dijit/Popup",
    "esri/InfoTemplate",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/form/HorizontalSlider",
    "esri/arcgis/utils",
    "esri/domUtils",
    "esri/layers/FeatureLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/dijit/PopupTemplate",
    "esri/dijit/OpacitySlider",
    "esri/layers/WMSLayer",
    "esri/layers/WMSLayerInfo",
    "esri/layers/GraphicsLayer",
    "esri/dijit/Scalebar",
    "esri/geometry/Point",
    "esri/geometry/Extent",
    "esri/dijit/HomeButton",
    "esri/graphic",
    "esri/Color",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "dojo/dom-attr",
    "dojo/dom-style",
    "dojo/query",
    "dojo/domReady!"
], function (ready, on, connect, dom, registry, domConstruct, parser, arrayUtils, Map, esriConfig, Layer, ArcGISDynamicMapServiceLayer, Legend, LocateButton, IdentifyTask, IdentifyParameters, RelationshipQuery, QueryTask, Popup, InfoTemplate, BorderContainer, ContentPane, HorizontalSlider, arcgisUtils, domUtils, FeatureLayer, ArcGISTiledMapServiceLayer, PopupTemplate, OpacitySlider, WMSLayer, WMSLayerInfo, GraphicsLayer, Scalebar, Point, Extent, HomeButton, Graphic, Color, SimpleFillSymbol, SimpleLineSymbol,
    PictureMarkerSymbol, SimpleMarkerSymbol, domAttr, domStyle, domquery) {


        //*************************** ESRI Confirguration ******************************************

        //esriConfig.defaults.io.alwaysUseProxy = false;
    esri.addProxyRule({
        urlPrefix: "https://map.sepa.org.uk/ArcGIS/rest/services/Secure",
        proxyUrl: "https://map.sepa.org.uk/proxy/proxy.ashx"
    });
    esri.addProxyRule({
        urlPrefix: "https://map.publicsectormapping.gov.scot",
        proxyUrl: "https://map.sepa.org.uk/proxy/proxy.ashx"
    });
        
        esri.addProxyRule({
            urlPrefix: "http://www.getmapping.com/wms/scotland/scotland.wmsx",
            proxyUrl: "https://map.sepa.org.uk/proxy/proxy.ashx"

        });

        var popup = new Popup({
            fillSymbol: new PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Basic/GreenStickpin.png", 50, 52).setOffset(0, 24)
        }, domConstruct.create("div"));

        //*********************************************************************************************
        //*************************************** Graphics ********************************************
        graphic_Search = new PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Basic/RedStickpin.png", 50, 52).setOffset(0, 24);
        graphic_Identify = new PictureMarkerSymbol("http://static.arcgis.com/images/Symbols/Basic/RedStickpin.png", 50, 52).setOffset(0, 24);


        //*********************************************************************************************
        //Initialise the Thinkwhere Maps
        initLayer();

        //**** Foundation stuff ********
        $(document).foundation();

        //resizeMapDiv();

        $(window).resize(function () {

        });

        function resizeMapDiv() {

            var myPageHeight = $('#wrapper_body').height();
            var myHeaderHeight = $('#header').height();
            var myMapHeight = myPageHeight - myHeaderHeight;

            $('#mapcontainer').height(myPageHeight);
            $('#mapDiv').height(myPageHeight);
            $('#toc_sepa').height(myPageHeight);
            $('#legend_sepa').height(myPageHeight);
            $('#about_sepa').height(myPageHeight);
            $('#help_sepa').height(myPageHeight);
            $('#search_results_sepa').height(myPageHeight);

            var myZoomControl = myHeaderHeight + 10;


            $('#toc_container').height(myPageHeight - 105);

            $('#Top_Search_Results').height(myPageHeight - 40);
            $('#Contents_Search_Results').height(myPageHeight / 2);

            $('#mapDiv_zoom_slider').css({ 'left': '95%', 'top': '70%' });
            $('#LocateButton').css('top', myZoomControl + 120);
            $('.esriScalebar').css({ 'right': '150px', 'bottom': '120px' });
            $('#example-menu').css('display');

        }

        //*************************** Initial Extent ***************************************************
        /*var initExtent = new Extent({ "xmin": -179362, "ymin": 509793, "xmax": 667306, "ymax": 980091, "spatialReference": { "wkid": 27700 } });*/
        var initExtent = new Extent({ "xmin": -195000, "ymin": 599000, "xmax": 667306, "ymax": 980091, "spatialReference": { "wkid": 27700 } });
        //*********************************************************************************************
        //*************************** Map Layers and loading spinner ***********************************

        initLayer();

        map = new Map("mapDiv", { extent: initExtent, logo: false, infoWindow: popup });

        map.on("load", function (evt) {
            autoRecenter(map);  //Recenters the map when window changes
            //resizeMapDiv();
            bgChecker();       //keeps an eye on the aerial photography background
            var legendDijit = new Legend({
                map: map
            },
                "legendDiv");
            legendDijit.startup();


        });
        map.on("zoom-end", bgChecker); //keeps an eye on the aerial photography background
        map.on("pan-end", bgChecker); //keeps an eye on the aerial photography background
    map.on("zoom-end", function (evt) {

            if (map.getScale() > 50000) {
                var basemapVisible = $("#basemapModal2");
                if (basemapVisible.is(':visible'))
                    $("#basemapModal2").hide();
               
                baseMapServiceLayerEuropa.setVisibility(true);
                baseMapServiceLayerAerial.setVisibility(false);
                
                //baseMapServiceLayerEuropa.setVisibility(false);
                //$("#basemapModal2").show();
            }
        });
        map.on("zoom-end", function (evt) {
            if (map.getScale() < 50000) {
                var basemapVisible = $("#basemapModal");
                if (basemapVisible.is(':visible'))
                    $("#basemapModal").hide();

                console.log(map.getScale());
                //$("#basemapModal2").show();
            }
        });

    

        $('.ui-home-button').click(function (event) {
            map.setExtent(initExtent);
            
        });

        //*************************** Aerial photography Layer ****************************************

        //var layer1 = new WMSLayerInfo({
        //    name: "ScotlandBest250mm",
        //    title: "Latest Available Digital Aerial Photograpy of Scotland"
        //});
        //var resourceInfo = {
        //    extent: new esri.geometry.Extent(0, 31.500000, 800000, 1250000, {
        //        wkid: 27700
        //    }),
        //    layerInfos: [layer1]
        //};

        //baseMapServiceLayerEuropaTwo = new WMSLayer("http://www.getmapping.com/wms/scotland/scotland.wmsx", {
        //    resourceInfo: resourceInfo,
        //    visibleLayers: ["ScotlandBest250mm"],
        //    id: "bg_Aerial",

        //    visible: false
        //});

        //map.addLayer(baseMapServiceLayerEuropaTwo);

    //*************************** Europe standard Layer ****************************************


    var layerInfo = new WMSLayerInfo({
        name: "viaEuropa_m0100",
        title: "viaEuropa_m0100"
    });

    _wiki = 27700;  //_wiki = 3857 Google

    var resourceInfo = {
        extent: new Extent(-9.497138, 49.766807, 3.632021, 61.577702, {
            wkid: _wiki
        }),
        layerInfos: layerInfo
    };

    baseMapServiceLayerEuropa = new WMSLayer("https://map.publicsectormapping.gov.scot/service", {
        resourceInfo: resourceInfo,
        visibleLayers: ["viaEuropa_m0100"]
    });

    map.addLayer(baseMapServiceLayerEuropa);

    //*********************************** Colour Europa map ***************************************

    var layerInfoTwo = new WMSLayerInfo({
        name: "viaEuropa_m0105",
        title: "viaEuropa_m0105"
    });

    _wiki = 27700;  //_wiki = 3857 Google

    var resourceInfoTwo = {
        extent: new Extent(-9.497138, 49.766807, 3.632021, 61.577702, {
            wkid: _wiki
        }),
        layerInfos: layerInfoTwo
    };

    baseMapServiceLayerEuropaColour = new WMSLayer("https://map.publicsectormapping.gov.scot/service", {
        resourceInfo: resourceInfoTwo,
        visibleLayers: ["viaEuropa_m0105"]
    });

    map.addLayer(baseMapServiceLayerEuropaColour);
    baseMapServiceLayerEuropaColour.hide();
        //*********************************** Greyscale Europa map ***************************************

    var layerInfoThree = new WMSLayerInfo({
        name: "viaEuropa_m0135",
        title: "viaEuropa_m0135"
    });

    _wiki = 27700;  //_wiki = 3857 Google

    var resourceInfoThree = {
        extent: new Extent(-9.497138, 49.766807, 3.632021, 61.577702, {
            wkid: _wiki
        }),
        layerInfos: layerInfoThree
    };

    baseMapServiceLayerEuropaGrey = new WMSLayer("https://map.publicsectormapping.gov.scot/service", {
        resourceInfo: resourceInfoThree,
        visibleLayers: ["viaEuropa_m0135"]
    });

    map.addLayer(baseMapServiceLayerEuropaGrey);
    baseMapServiceLayerEuropaGrey.hide();


        //**************************************************************************************
        //******************************** Aerial layer ****************************

    //*************************** Aerial photography Layer ****************************************

    var layer1 = new WMSLayerInfo({
        name: "ScotlandBest250mm",
        title: "Latest Available Digital Aerial Photograpy of Scotland"
    });
    var resourceInfoFour = {
        extent: new esri.geometry.Extent(0, 31.500000, 800000, 1250000, {
            wkid: 27700
        }),
        layerInfos: [layer1]
    };

    baseMapServiceLayerAerial = new WMSLayer("http://www.getmapping.com/wms/scotland/scotland.wmsx", {
        resourceInfo: resourceInfoFour,
        visibleLayers: ["ScotlandBest250mm"],
        id: "bg_Aerial",

        visible: false
    });

    map.addLayer(baseMapServiceLayerAerial);




        //**********************************************************************************************************
        //********************************* Check layer scale visibility - switch 1********************************************
        //initLayer2();

        var newExtent = new Extent({
            "xmin": -190000, "ymin": 590000, "xmax": 667306, "ymax": 980091, "spatialReference": { "wkid": 27700 }

        });
        $('.ui-aerial-button').click(function (event) {
            map.centerAndZoom(newExtent, 10);

        });

        var changeZoom = map.on('extent-change', zoomFunc);

        function zoomFunc(evt) {

            var extent = evt.extent,
                zoomed = evt.levelChange;
            

        };


        //**********************************************************************************************************
        //********************************* Check layer scale visibility - switch 1********************************************


        $('#switch1').click(function (event) {

            if (map.getScale() < 500000) {
                $("#pWork2").hide().fadeOut("slow").delay(4000).fadeOut();
            };
            var mapExtentChange = map.on("zoom-end", changeHandler);

            function changeHandler(evt) {
                if (map.getScale() < 5000) {

                    $("#pWork4").show().delay(4000).fadeOut("slow");

                } if (map.getScale() > 5001) {
                    $("#pWork4").hide().fadeOut();

                }

            };

        });

        //*********************************************************************************************
        //********************************* Check partial map layer********************************************


        $('#switch2').click(function (event) {

            if (map.getScale() > 2000000) {
                $("#pWork2").show("slow").fadeIn("slow").delay(4000).fadeOut();

            } if (map.getScale() < 2000000) {
                $("#pWork2").hide().fadeOut("slow").delay(4000).fadeOut();
            };
            var mapExtentChange = map.on("zoom-end", changeHandler);

            function changeHandler(evt) {
                //zoomed = evt.levelChange;
                if (map.getScale() > 2000000) {
                    //$("alert1").show();
                    $("#pWork2").show().delay(5000).fadeOut();

                } if (map.getScale() < 2000000) {
                    $("#pWork2").hide().fadeOut();
                };

            };

        });
		
		
        //*********************************************************************************************
        //******************************** Check basemap scale ****************************************


        $('#launch').click(function (event) {

            if (map.getScale() > 50000) {
                $("#basemapModal").show();
               

            } if (map.getScale() < 50000) {
                $("#basemapModal2").show();

            };

        });


        //*********************************************************************************************
        //********************************* Basemap toggle ********************************************

        $('#bg_standardMap').click(function () {
            
            //baseMapServiceLayer.show();
            baseMapServiceLayerEuropaColour.hide();
            baseMapServiceLayerEuropa.show();
            baseMapServiceLayerEuropaGrey.hide();
            baseMapServiceLayerAerial.hide();
        });
        $('#bg_standardMap2').click(function () {

           // baseMapServiceLayer.show();
            baseMapServiceLayerEuropaColour.hide();
            baseMapServiceLayerEuropa.show();
            baseMapServiceLayerEuropaGrey.hide();
            baseMapServiceLayerAerial.hide();
        });


    $('#bg_ColourMap').click(function () {
        baseMapServiceLayerEuropaColour.show();
        baseMapServiceLayerAerial.hide();
        baseMapServiceLayerEuropa.hide();
        baseMapServiceLayerEuropaGrey.hide();
    });

    $('#bg_ColourMap2').click(function () {
        baseMapServiceLayerEuropaColour.show();
        baseMapServiceLayerAerial.hide();
        baseMapServiceLayerEuropa.hide();
        baseMapServiceLayerEuropaGrey.hide();
    });


    $('#bg_greyscaleMap').click(function () {
        baseMapServiceLayerEuropaColour.hide();
        baseMapServiceLayerAerial.hide();
        baseMapServiceLayerEuropaGrey.show();
        baseMapServiceLayerEuropa.hide();
    });

    $('#bg_greyscaleMap2').click(function () {
        baseMapServiceLayerEuropaColour.hide();
        baseMapServiceLayerAerial.hide();
        baseMapServiceLayerEuropaGrey.show();
        baseMapServiceLayerEuropa.hide();
    });



        $('#bg_aerialMap').click(function () {
            if (map.getScale() < 50000) {
               
                baseMapServiceLayerAerial.show();
                baseMapServiceLayerEuropaColour.hide();
                baseMapServiceLayerEuropaGrey.hide();
                baseMapServiceLayerEuropa.hide();
                

            };
            $('#bg_aerialMap').click(function () {
                if (map.getScale() > 50000) {
                    baseMapServiceLayerAerial.hide();
                    baseMapServiceLayerEuropa.show();
                    $("#alert").show().fadeIn();

                }
            });

        });




        //**************************************************************************************
        //**************************************Add layers *************************************


        $("input[type='radio']").click(function () {
            popup.clearFeatures();

            soils1 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_Soils_250K_SSKIB/MapServer", {
                id: 'soils1',
                "opacity": 0.6,
                "loaded": true
            });
            soils1.setVisibleLayers([0, 1]);

            soils2 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_Soils_25K/MapServer", {
                id: 'soils2',
                "opacity": 0.6
            });
            soils2.setVisibleLayers([0]);

            soils3 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/GSSOIL_WRB/MapServer", {
                id: 'soils3',
                "opacity": 0.6
            });
            soils3.setVisibleLayers([0]);

            soils4 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_LCF_250K_OSGB/MapServer", {
                id: 'soils4',
                "opacity": 0.6

            });
            soils4.setVisibleLayers([0]);

            soils5 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_LCA250K_UKSO/MapServer", {
                id: 'soils5',
                "opacity": 0.6
            });
            soils5.setVisibleLayers([0]);

            soils6 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_LCA_50K_OSGB/MapServer", {
                id: 'soils6',
                "opacity": 0.6
            });
            soils6.setVisibleLayers([0]);

            soils7 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/GSSOIL_TOC/MapServer", {
                id: 'soils7',
                "opacity": 0.6
            });
            soils7.setVisibleLayers([0]);

            soils8 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/GSSOIL_AWC/MapServer", {
                id: 'soils8',
                "opacity": 0.6
            });
            soils8.setVisibleLayers([0]);

            soils9 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_NVZ_Soil_Texture_2016/MapServer", {
                id: 'soils9',
                "opacity": 0.6
            });
            soils9.setVisibleLayers([0]);

            soils10 = new ArcGISDynamicMapServiceLayer("http://cagmap.snh.gov.uk/arcgis/rest/services/snh_renewables/MapServer", {
                id: 'soils10',
                "opacity": 0.6
            });
            soils10.setVisibleLayers([2]);

            soils11 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_NSIS/MapServer", {
                id: 'soils11',
				"opacity": 0.6
            });
            soils11.setVisibleLayers([0]);

            soils12 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_NSIS_ParentMaterial/MapServer", {
                id: 'soils12',
				"opacity": 0.6
            });
            soils12.setVisibleLayers([0]);

            soils13 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_NSIS_Lead/MapServer", {
                id: 'soils13',
				"opacity": 0.6
            });
            soils13.setVisibleLayers([0]);

            soils14 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_NSIS_Zinc/MapServer", {
                id: 'soils14',
				"opacity": 0.6
            });
            soils14.setVisibleLayers([0]);

            soils15 = new ArcGISDynamicMapServiceLayer("http://cagmap.snh.gov.uk/arcgis/rest/services/snh_renewables/MapServer", {
                id: 'soils15',
				"opacity": 0.6
            });
            soils15.setVisibleLayers([0]);

            soils16 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_Soil_P_sorption_2018/MapServer", {
                id: 'soils16',
				"opacity": 0.6
            });
            soils16.setVisibleLayers([0]);

            soils17 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_SubsoilCompaction_Partial/MapServer", {
                id: 'soils17',
				"opacity": 0.6
            });
            soils17.setVisibleLayers([0]);

            soils18 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_TopsoilCompaction_Partial/MapServer", {
                id: 'soils18',
				"opacity": 0.6
            });
            soils18.setVisibleLayers([0]);

            soils19 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_SoilErosionRisk_Partial/MapServer", {
                id: 'soils19',
				"opacity": 0.6
            });
			testFunc();
			
			
		
			function testFunc(){
			  $("#switch19").click(function(){
				  
			if (map.getScale() > 100000) {
               soils19.setVisibility(false);
			   $("#pWork2").show().delay(5000).fadeOut();
          
            };

            if (map.getScale() < 100000) {
				//$("#switch19").trigger('click');
			   soils19.setVisibility(true);
			   
					};
					
			map.on("zoom-end", function(evt){
				$("#pWork2").show().delay(5000).fadeOut();
			if (map.getScale() < 100000){
				$("#pWork2").hide();
			
				
				$("#switch19").trigger("click");
			}
			if (map.getScale() > 100000){
				$("#pWork2").show().delay(5000).fadeOut();
				  soils19.setVisibility(false);
			}
				
			})		
					
           	})  
			
    	};
						
            soils19.setVisibleLayers([0]);

            soils20 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_SoilLeachingPotential_Partial/MapServer", {
                id: 'soils20'
            });
            soils20.setVisibleLayers([0]);

            soils21 = new ArcGISDynamicMapServiceLayer("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_RunoffRisk_Partial/MapServer", {
                id: 'soils21'
            });
            soils21.setVisibleLayers([0]);


            var myid = $(this).attr('id');

            var myval = $(this).val();

            var incidentLayer1 = map.getLayer("soils1");
            if (incidentLayer1) {
                map.removeLayer(incidentLayer1);
            }
            var incidentLayer2 = map.getLayer("soils2");
            if (incidentLayer2) {
                map.removeLayer(incidentLayer2);
            }
            var incidentLayer3 = map.getLayer("soils3");
            if (incidentLayer3) {
                map.removeLayer(incidentLayer3);
            }
            var incidentLayer4 = map.getLayer("soils4");
            if (incidentLayer4) {
                map.removeLayer(incidentLayer4);
            }
            var incidentLayer5 = map.getLayer("soils5");
            if (incidentLayer5) {
                map.removeLayer(incidentLayer5);
            }
            var incidentLayer6 = map.getLayer("soils6");
            if (incidentLayer6) {
                map.removeLayer(incidentLayer6);
            }
            var incidentLayer7 = map.getLayer("soils7");
            if (incidentLayer7) {
                map.removeLayer(incidentLayer7);
            }
            var incidentLayer8 = map.getLayer("soils8");
            if (incidentLayer8) {
                map.removeLayer(incidentLayer8);
            }
            var incidentLayer9 = map.getLayer("soils9");
            if (incidentLayer9) {
                map.removeLayer(incidentLayer9);
            }
            var incidentLayer10 = map.getLayer("soils10");
            if (incidentLayer10) {
                map.removeLayer(incidentLayer10);
            }
            var incidentLayer11 = map.getLayer("soils11");
            if (incidentLayer11) {
                map.removeLayer(incidentLayer11);
            }
            var incidentLayer12 = map.getLayer("soils12");
            if (incidentLayer12) {
                map.removeLayer(incidentLayer12);
            }
            var incidentLayer13 = map.getLayer("soils13");
            if (incidentLayer13) {
                map.removeLayer(incidentLayer13);
            }
            var incidentLayer14 = map.getLayer("soils14");
            if (incidentLayer14) {
                map.removeLayer(incidentLayer14);
            }
            var incidentLayer15 = map.getLayer("soils15");
            if (incidentLayer15) {
                map.removeLayer(incidentLayer15);
            }
            var incidentLayer16 = map.getLayer("soils16");
            if (incidentLayer16) {
                map.removeLayer(incidentLayer16);
            }
            var incidentLayer17 = map.getLayer("soils17");
            if (incidentLayer17) {
                map.removeLayer(incidentLayer17);
            }
            var incidentLayer18 = map.getLayer("soils18");
            if (incidentLayer18) {
                map.removeLayer(incidentLayer18);
            }
            var incidentLayer19 = map.getLayer("soils19");
            if (incidentLayer19) {
                map.removeLayer(incidentLayer19);
            }
            var incidentLayer20 = map.getLayer("soils20");
            if (incidentLayer20) {
                map.removeLayer(incidentLayer20);
            }
            var incidentLayer21 = map.getLayer("soils21");
            if (incidentLayer21) {
                map.removeLayer(incidentLayer21);
            }

            var mapUrl;
            switch (myid) {
                case 'switch1':
                    map.addLayer(soils1);
                    mapUrl = soils1.url;
                    dojo.connect(soils1, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });

                    break;
                case 'switch2':
                    map.addLayer(soils2);
                    mapUrl = soils2.url;
                    dojo.connect(soils2, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });

                    break;
                case 'switch3':
                    map.addLayer(soils3);
                    mapUrl = soils3.url;
                    dojo.connect(soils3, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch4':
                    map.addLayer(soils4);
                    mapUrl = soils4.url;
                    dojo.connect(soils4, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch5':
                    map.addLayer(soils5);
                    mapUrl = soils5.url;
                    dojo.connect(soils5, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch6':
                    map.addLayer(soils6);
                    mapUrl = soils6.url;
                    dojo.connect(soils6, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch7':
                    map.addLayer(soils7);
                    mapUrl = soils7.url;
                    dojo.connect(soils7, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch8':
                    map.addLayer(soils8);
                    mapUrl = soils8.url;
                    dojo.connect(soils8, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch9':
                    map.addLayer(soils9);
                    mapUrl = soils9.url;
                    dojo.connect(soils9, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch10':

                    map.addLayer(soils10);
                    mapUrl = soils10.url;
                    dojo.connect(soils10, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch11':
                    map.addLayer(soils11);
                    mapUrl = soils11.url;
                    dojo.connect(soils11, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch12':
                    map.addLayer(soils12);
                    mapUrl = soils12.url;
                    dojo.connect(soils12, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch13':
                    map.addLayer(soils13);
                    mapUrl = soils13.url;
                    dojo.connect(soils13, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch14':
                    map.addLayer(soils14);
                    mapUrl = soils14.url;
                    dojo.connect(soils14, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch15':
                    map.addLayer(soils15);
                    mapUrl = soils15.url;
                    dojo.connect(soils15, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch16':
                    map.addLayer(soils16);
                    mapUrl = soils16.url;
                    dojo.connect(soils16, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch17':
                    map.addLayer(soils17);
                    mapUrl = soils17.url;
                    dojo.connect(soils17, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch18':
                    map.addLayer(soils18);
                    mapUrl = soils18.url;
                    dojo.connect(soils18, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch19':
                    map.addLayer(soils19);
                    mapUrl = soils19.url;
                    dojo.connect(soils19, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch20':
                    map.addLayer(soils20);
                    mapUrl = soils20.url;
                    dojo.connect(soils20, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
                case 'switch21':
                    map.addLayer(soils21);
                    mapUrl = soils21.url;
                    dojo.connect(soils21, "onError", function (error) {
                        $("#pWork5").show().delay(5000).fadeOut();
                    });
                    break;
            }




            ////************************* Add legend ****************************

            on(dom.byId("previous"), "click", selectPrevious);
            on(dom.byId("next"), "click", selectNext);

            map.setMapCursor("pointer");
            map.infoWindow.set("popupWindow", false);
            initializeSidebar(map);

            if (onClickHandler) {
                onClickHandler.remove();

            }
            if (onClickHandler2) {
                onClickHandler2.remove();

            }


            if ((mapUrl == soils1.url) || (mapUrl == soils2.url) || (mapUrl == soils3.url) || (mapUrl == soils4.url) || (mapUrl == soils5.url) || (mapUrl == soils6.url) || (mapUrl == soils7.url) || (mapUrl == soils8.url) || (mapUrl == soils9.url) || (mapUrl == soils11.url) || (mapUrl == soils12.url) || (mapUrl == soils13.url) || (mapUrl == soils14.url) || (mapUrl == soils15.url) || (mapUrl == soils16.url) || (mapUrl == soils17.url) || (mapUrl == soils18.url) || (mapUrl == soils19.url) || (mapUrl == soils20.url) || (mapUrl == soils21.url)) {

                onClickHandler = map.on("click", executeIdentifyTask);

            } else {
                onClickHandler = map.on("click", function () { $("#pWork3").show().delay(5000).fadeOut() });

            };



            function executeIdentifyTask(event) {

                $("#idencontent_").empty();
                var popup = new Foundation.Reveal($('#exampleModal1'));
                popup.open();
                identifyTask = new IdentifyTask(mapUrl);
                IdentifyParams = new esri.tasks.IdentifyParameters();
                IdentifyParams.tolerance = 5;
                IdentifyParams.returnGeometry = false;
                IdentifyParams.layerIds = [0, 1, 2];
                IdentifyParams.layerOption = IdentifyParameters.LAYER_OPTION_VISIBLE;
                IdentifyParams.width = map.width;
                IdentifyParams.height = map.height;
                IdentifyParams.geometry = event.mapPoint;
                IdentifyParams.mapExtent = map.extent;

                //identifyTask.on("error", showError);
                //*****************************************************************
                //************************* Identify ******************************    
                var deferred = identifyTask
                    .execute(IdentifyParams)
                    .addCallback(function (response) {


                        if (response.length == 0) {
                            $("#idencontent_").html('No Results. Zoom in to identify the map layer.');
                        } else {

                            var docFragment = document.createDocumentFragment();



                            //*************************************************

                            if (mapUrl == soils1.url) {

                                $('#idencontent_').empty().append(_html);
                                $("#idpanel1").append(docFragment);

                                ////$('#idencontent_').remove();
                            }

                            if (mapUrl == soils1.url) {


                                //****************************************************************
                                var _myarray6 = [];
                                var _newObject6 = {};
                                ////var _myarray7 = [];
                                var _qmUnitID;
                                //
                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {
                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    switch (_fieldname) {
                                        case "Generalised Soil Type":
                                            _newObject6[_fieldname] = _fieldvalue;
                                            break;
                                        case "Major Soil Group":
                                            _newObject6[_fieldname] = _fieldvalue;
                                            break;
                                        case "Major Soil Subgroup":
                                            _newObject6[_fieldname] = _fieldvalue;
                                            break;
                                        case "Parent Material":
                                            _newObject6[_fieldname] = _fieldvalue;
                                            break;
                                        case "Soil Association":
                                            _newObject6[_fieldname] = _fieldvalue;
                                            break;
                                        case "Component Soils":
                                            _newObject6[_fieldname] = _fieldvalue;
                                            break;
                                        case "Land Form":
                                            _newObject6[_fieldname] = _fieldvalue;
                                            break;
                                        case "QMUNIT":
                                            _qmUnitID = _fieldvalue;
                                            break;
                                    }

                                }


                                _myarray6.push(_newObject6);


                                if (_myarray6.length == 0) {
                                    //no records
                                } else {

                                    $('#idencontent_').empty().append(_html);
                                    $("#idpanel1").empty().append(addTable(_myarray6));

                                    //*****************************************************************
                                    $("#idpanel2").append('Select available series: <select id="QM_Select_Series"></select></br>Select available landuse:<select id="QM_Select_Landuse"></select><div id="QM_Select_Result" class="column"></div>');
                                    QueryLayer_QM(_qmUnitID);
                                    //********************************************************************************



                                    $("#QM_Select_Series").unbind('change').change(function () {
                                        var _myval = $("#QM_Select_Series").val();
                                        if (_myval == 'none') {
                                            return false;
                                        } else {
                                            QueryLayer_LD(_myval);
                                        }



                                        //********************************************************************************
                                    });

                                    $("#QM_Select_Landuse").unbind('change').change(function () {
                                        var _myval = $("#QM_Select_Landuse").val();
                                        if (_myval == 'none') {
                                            return false;
                                        } else {

                                            var _myarray8 = [];
                                            $.each(_myarray7, function (index, value) {
                                                if (value.SSKIB_HORZ_ID == parseInt(_myval)) {

                                                    _myarray8.push(value);

                                                }
                                            })

                                            $("#QM_Select_Result").empty().append(addTable(_myarray8));
                                        }

                                    });


                                }


                                //****************************************************************
                                //}
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {

                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }
                            //******************************** End of map layer1 identify ********************************
                            //********************************************************************************************

                            //******************************** Start map layer16 identify *********************************


                            if (mapUrl == soils16.url) {

                                $('#idencontent_').empty().append(_html17);
                                $("#idpanel21").append(docFragment)
                                IdentifyParams.tolerance = 1;
                            }

                            //*************************************************
                            if (mapUrl == soils16.url) {

                                //****************************************************************
                                var _myarray23 = [];

                                var _newObject21 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];

                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "PSC category":
                                            _newObject21[_fieldname] = _fieldvalue;
                                            break;


                                    }

                                }


                                _myarray23.push(_newObject21);

                                var resultTableArray = resultSetToTablesimple(_myarray23);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment20 = document.createDocumentFragment();

                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment20.appendChild(ul);

                                    }

                                    //****************************************************************



                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html17);
                                    $("#idpanel21").append(docFragment20);

                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }


                            //**************************End soils16 identify ***********************************	
                            //********************Map layer17 iden start**************************************

                            if (mapUrl == soils17.url) {


                                $('#idencontent_').empty().append(_html18);
                                $("#idpanel22").append(docFragment)
                                IdentifyParams.tolerance = 5;
                            }

                            //*************************************************
                            if (mapUrl == soils17.url) {

                                //****************************************************************
                                var _myarray24 = [];

                                var _newObject22 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Subsoil compaction risk":
                                            _newObject22[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray24.push(_newObject22);

                                var resultTableArray = resultSetToTablesimple(_myarray24);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment21 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment21.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html18);
                                    $("#idpanel22").append(docFragment21);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 17 identify*******************************************************

                            //********************Map layer18 iden start**************************************

                            if (mapUrl == soils18.url) {


                                $('#idencontent_').empty().append(_html19);
                                $("#idpanel23").append(docFragment)
                                IdentifyParams.tolerance = 5;
                            }

                            //*************************************************
                            if (mapUrl == soils18.url) {

                                //****************************************************************
                                var _myarray25 = [];

                                var _newObject23 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Topsoil compaction risk":
                                            _newObject23[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray25.push(_newObject23);

                                var resultTableArray = resultSetToTablesimple(_myarray25);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment22 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment22.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html19);
                                    $("#idpanel23").append(docFragment22);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 18 identify*******************************************************
                            //********************Map layer19 iden start**************************************

                            if (mapUrl == soils19.url) {


                                $('#idencontent_').empty().append(_html20);
                                $("#idpanel24").append(docFragment)
                                IdentifyParams.tolerance = 5;
                            }

                            //*************************************************
                            if (mapUrl == soils19.url) {

                                //****************************************************************
                                var _myarray26 = [];

                                var _newObject24 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Erosion risk":
                                            _newObject24[_fieldname] = _fieldvalue;
                                            break;
											case "Class":
                                            _newObject24[_fieldname] = _fieldvalue;
                                            break;
                                    }

                                }
                                _myarray26.push(_newObject24);

                                var resultTableArray = resultSetToTablesimple(_myarray26);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment23 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment23.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html20);
                                    $("#idpanel24").append(docFragment23);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 19 identify*******************************************************


                            //********************Map layer20 iden start**************************************

                            if (mapUrl == soils20.url) {


                                $('#idencontent_').empty().append(_html21);
                                $("#idpanel25").append(docFragment)
                                IdentifyParams.tolerance = 5;
                            }

                            //*************************************************
                            if (mapUrl == soils20.url) {

                                //****************************************************************
                                var _myarray27 = [];

                                var _newObject25 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Soil leaching potential":
                                            _newObject25[_fieldname] = _fieldvalue;
                                            break;
											  case "Class":
                                            _newObject25[_fieldname] = _fieldvalue;
                                            break;
                                    }

                                }

                                _myarray27.push(_newObject25);

                                var resultTableArray = resultSetToTablesimple(_myarray27);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment24 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment24.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html21);
                                    $("#idpanel25").append(docFragment24);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 20 identify*******************************************************

                            //********************Map layer21 iden start**************************************

                            if (mapUrl == soils21.url) {


                                $('#idencontent_').empty().append(_html22);
                                $("#idpanel26").append(docFragment)
                                IdentifyParams.tolerance = 5;
                            }

                            //*************************************************
                            if (mapUrl == soils21.url) {

                                //****************************************************************
                                var _myarray28 = [];

                                var _newObject26 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Soil runoff risk":
                                            _newObject26[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray28.push(_newObject26);

                                var resultTableArray = resultSetToTablesimple(_myarray28);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment25 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment25.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html22);
                                    $("#idpanel26").append(docFragment25);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 21 identify*******************************************************








                            //********************Map soils2 test iden start**************************************

                            if (mapUrl == soils2.url) {

                                $('#idencontent_').empty().append(_html2);
                                $("#idpanel3").append(docFragment)

                            }

                            //*************************************************
                            if (mapUrl == soils2.url) {

                                //****************************************************************
                                var _myarray22 = [];

                                var _newObject20 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Generalised Soil Type":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Major Soil Group":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Major Soil Subgroup":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Soil Map Unit":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Soil Drainage":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Parent Material":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Soil Association":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Soil Phase Description":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Land form (Soil complexes only)":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Component soils (Soil complexes only)":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;
                                        case "Texture (Alluvial soils only)":
                                            _newObject20[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray22.push(_newObject20);

                                var resultTableArray = resultSetToTablesimple(_myarray22);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment19 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment19.appendChild(ul);

                                    }

                                    //****************************************************************



                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html2);
                                    $("#idpanel3").append(docFragment19);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of soils2 test identify******************************************************
                            //*******************************************************************************

                            //********************Map layer3 iden start**************************************

                            if (mapUrl == soils3.url) {


                                $('#idencontent_').empty().append(_html5);
                                $("#idpanel9").append(docFragment)
                                IdentifyParams.tolerance = 1;
                            }

                            //*************************************************
                            if (mapUrl == soils3.url) {

                                //****************************************************************
                                var _myarray10 = [];

                                var _newObject8 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "World Reference Base qualifier 1":
                                            _newObject8[_fieldname] = _fieldvalue;
                                            break;
                                        case "World Reference Base qualifier 2":
                                            _newObject8[_fieldname] = _fieldvalue;
                                            break;
                                        case "World Reference Base soil group":
                                            _newObject8[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray10.push(_newObject8);

                                var resultTableArray = resultSetToTablesimple(_myarray10);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment7 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment7.appendChild(ul);

                                    }

                                    //****************************************************************



                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html5);
                                    $("#idpanel9").append(docFragment7);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 3 identify******************************************************
                            //*******************************************************************************


                            //********************Map layer4 iden start**************************************

                            if (mapUrl == soils4.url) {


                                $('#idencontent_').empty().append(_html6);
                                $("#idpanel10").append(docFragment)
                                IdentifyParams.tolerance = 1;
                            }

                            //*************************************************
                            if (mapUrl == soils4.url) {

                                //****************************************************************
                                var _myarray11 = [];

                                var _newObject9 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Land capability for forestry class":
                                            _newObject9[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray11.push(_newObject9);

                                var resultTableArray = resultSetToTablesimple(_myarray11);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment8 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment8.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html6);
                                    $("#idpanel10").append(docFragment8);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }
                            //****End of map 4 identify*******************************************************
                            //********************************************************************************



                            //********************Map layer5 iden start**************************************

                            if (mapUrl == soils5.url) {


                                $('#idencontent_').empty().append(_html7);
                                $("#idpanel11").append(docFragment)
                                IdentifyParams.tolerance = 1;
                            }

                            //*************************************************
                            if (mapUrl == soils5.url) {

                                //****************************************************************
                                var _myarray12 = [];

                                var _newObject10 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Land capability for agriculture class":
                                            _newObject10[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray12.push(_newObject10);

                                var resultTableArray = resultSetToTablesimple(_myarray12);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment9 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment9.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html7);
                                    $("#idpanel11").append(docFragment9);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }




                            //****End of map 5 identify*******************************************************
                            //********************************************************************************


                            //********************Map layer6 iden start**************************************

                            if (mapUrl == soils6.url) {


                                $('#idencontent_').empty().append(_html8);
                                $("#idpanel12").append(docFragment)
                                IdentifyParams.tolerance = 1;
                            }

                            //*************************************************
                            if (mapUrl == soils6.url) {

                                //****************************************************************
                                var _myarray13 = [];

                                var _newObject11 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Land capability for agriculture class":
                                            _newObject11[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray13.push(_newObject11);

                                var resultTableArray = resultSetToTablesimple(_myarray13);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment10 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment10.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html8);
                                    $("#idpanel12").append(docFragment10);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }




                            //****End of map 6 identify*******************************************************
                            //********************************************************************************

                            //********************Map layer7 iden start**************************************

                            if (mapUrl == soils7.url) {


                                $('#idencontent_').empty().append(_html9);
                                $("#idpanel13").append(docFragment)
                                IdentifyParams.tolerance = 1;
                            }

                            //*************************************************
                            if (mapUrl == soils7.url) {

                                //****************************************************************
                                var _myarray14 = [];

                                var _newObject12 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Topsoil organic carbon concentration (%)":
                                            _newObject12[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray14.push(_newObject12);

                                var resultTableArray = resultSetToTablesimple(_myarray14);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment11 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment11.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html9);
                                    $("#idpanel13").append(docFragment11);

                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }




                            //****End of map 7 identify*******************************************************
                            //********************************************************************************




                            //********************Map layer8 iden start**************************************

                            if (mapUrl == soils8.url) {


                                $('#idencontent_').empty().append(_html10);
                                $("#idpanel14").append(docFragment)
                                IdentifyParams.tolerance = 1;
                            }

                            //*************************************************
                            if (mapUrl == soils8.url) {

                                //****************************************************************
                                var _myarray15 = [];

                                var _newObject13 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Available water capacity (mm)":
                                            _newObject13[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray15.push(_newObject13);

                                var resultTableArray = resultSetToTablesimple(_myarray15);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment12 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment12.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html10);
                                    $("#idpanel14").append(docFragment12);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }




                            //****End of map 8 identify*******************************************************
                            //********************************************************************************


                            //********************Map layer9 iden start**************************************

                            if (mapUrl == soils9.url) {


                                $('#idencontent_').empty().append(_html11);
                                $("#idpanel15").append(docFragment)
                                IdentifyParams.tolerance = 1;
                            }

                            //*************************************************
                            if (mapUrl == soils9.url) {

                                //****************************************************************
                                var _myarray16 = [];

                                var _newObject14 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "NVZ soil texture":
                                            _newObject14[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray16.push(_newObject14);

                                var resultTableArray = resultSetToTablesimple(_myarray16);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment13 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment13.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html11);
                                    $("#idpanel15").append(docFragment13);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 9 identify*******************************************************
                            //********************************************************************************




                            //********************Map layer12 iden start**************************************

                            if (mapUrl == soils12.url) {


                                $('#idencontent_').empty().append(_html13);
                                $("#idpanel17").append(docFragment)
                                IdentifyParams.tolerance = 5;
                            }

                            //*************************************************
                            if (mapUrl == soils12.url) {

                                //****************************************************************
                                var _myarray18 = [];

                                var _newObject16 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Parent material type":
                                            _newObject16[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray18.push(_newObject16);

                                var resultTableArray = resultSetToTablesimple(_myarray18);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment15 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment15.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html13);
                                    $("#idpanel17").append(docFragment15);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 12 identify*******************************************************
                            //********************************************************************************

                            //********************Map layer13 iden start**************************************

                            if (mapUrl == soils13.url) {


                                $('#idencontent_').empty().append(_html14);
                                $("#idpanel18").append(docFragment)
                                IdentifyParams.tolerance = 5;
                            }

                            //*************************************************
                            if (mapUrl == soils13.url) {

                                //****************************************************************
                                var _myarray19 = [];

                                var _newObject17 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Topsoil lead concentration (ppm)":
                                            _newObject17[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray19.push(_newObject17);

                                var resultTableArray = resultSetToTablesimple(_myarray19);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment16 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment16.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html14);
                                    $("#idpanel18").append(docFragment16);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 13 identify*******************************************************
                            //********************************************************************************

                            //********************Map layer14 iden start**************************************

                            if (mapUrl == soils14.url) {


                                $('#idencontent_').empty().append(_html15);
                                $("#idpanel19").append(docFragment)
                                IdentifyParams.tolerance = 5;
                            }

                            //*************************************************
                            if (mapUrl == soils14.url) {

                                //****************************************************************
                                var _myarray20 = [];

                                var _newObject18 = {};

                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Topsoil zinc concentration (ppm)":
                                            _newObject18[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray20.push(_newObject18);

                                var resultTableArray = resultSetToTablesimple(_myarray20);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment17 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment17.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html15);
                                    $("#idpanel19").append(docFragment17);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 14 identify*******************************************************
                            //********************************************************************************
                            /*    identifyTask = new IdentifyTask(mapUrl);
                               IdentifyParams = new esri.tasks.IdentifyParameters();
                               
                               IdentifyParams.returnGeometry = false;
                           //IdentifyParams.layers = visible;
                               IdentifyParams.layerIds = [2]; */
                            //********************Map layer10 iden start**************************************

                            if (mapUrl == soils10.url) {

                                $('#idencontent_').empty().append(_html3);

                               // $("#idpanel16").append(docFragment)
								$("#idpanel4").append(docFragment)

                            }

                            //*************************************************
                            if (mapUrl == soils10.url) {

                                //****************************************************************
                                var _myarray17 = [];

                                var _newObject15 = {};

                                var _myResults = response[2].feature.attributes;

                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "Carbon and Peatland class":
                                            _newObject15[_fieldname] = _fieldvalue;
                                            break;
                                        case "Vegetation component Peatland habitat category":
                                            _newObject15[_fieldname] = _fieldvalue;
                                            break;
                                        case "Soil component Soil carbon category":
                                            _newObject15[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }

                                _myarray17.push(_newObject15);

                                var resultTableArray = resultSetToTablesimple(_myarray17);

                                if (!resultTableArray) {
                                    //nothing
                                    alert("nothing");
                                } else {
                                    var docFragment14 = document.createDocumentFragment();

                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment14.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html3);
                                    //$("#idpanel16").append(docFragment14);
									$("#idpanel4").append(docFragment14)
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 10 identify*******************************************************
                            //********************************************************************************


                            //********************Map layer15 iden start**************************************

                            if (mapUrl == soils15.url) {


                                $('#idencontent_').empty().append(_html16);
                                $("#idpanel20").append(docFragment)
                                IdentifyParams.tolerance = 5;
                            }

                            //*************************************************
                            if (mapUrl == soils15.url) {

                                //****************************************************************
                                var _myarray21 = [];

                                var _newObject19 = {};

                                var _myResults = response[0].feature.attributes;

                                for (prop in _myResults) {
                                  
                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    //_newObject[_fieldname] = _fieldvalue;
                                    switch (_fieldname) {
                                        case "depth_cm":
                                            _newObject19[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }


                                _myarray21.push(_newObject19);

                                var resultTableArray = resultSetToTablesimple(_myarray21);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment18 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);
                                        //li.appendChild(cacheImage);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment18.appendChild(ul);

                                    }

                                    //****************************************************************


                                    //****************************************************************
                                    $('#idencontent_').empty().append(_html16);
                                    $("#idpanel20").append(docFragment18);
                                    //****************************************************************
                                }
                                //**********************************************************
                                var elem = new Foundation.Tabs($('#identify-tabs1'));
                                //**********************************************************


                                $('.layerHeading').unbind("click");
                                $('.layerHeading').click(function () {
                                    var _domEle = $(this);

                                    var _domElei_ul = $(this).parent().children("ul");
                                    _domElei_ul.toggle();

                                    var _domElei = $(this).parent().children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }
                                });

                                $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                                $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                    var _domEle = $(this);

                                    var _domElei = $(this).children("i");

                                    var _checkclass = _domElei.hasClass('fa-sort-desc');
                                    if (_checkclass) {
                                        _domElei.removeClass('fa-sort-desc');
                                        _domElei.addClass('fa-sort-up');
                                    } else {
                                        _domElei.removeClass('fa-sort-up');
                                        _domElei.addClass('fa-sort-desc');
                                    }

                                    $(this).parent().toggleClass('li1open', 'li1');

                                    $(this).parent().children(".ul2").toggle('fast');
                                    if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                    } else {
                                        $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                    }

                                });

                            }

                            //****End of map 15 identify*******************************************************
                            //********************************************************************************


                            //****Start of map 11 identify **************************************
                            //*******************************************************************

                            if (mapUrl == soils11.url) {

                                $('#idencontent_').empty().append(_html4);
                                $("#idpanel5").append(docFragment);

                            }
                            if (mapUrl == soils11.url) {

                                //****************************************************************
                                var _myarray = [];
                                var _myarray2 = [];
                                var _myarray3 = [];
                                var _myarray4 = [];
                                var _newObject = {};
                                var _newObject2 = {};
                                var _newObject3 = {};
                                var _newObject4 = {};


                                var _myResults = response[0].feature.attributes;
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    switch (_fieldname) {

                                        case "Site Name":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                        case "National Grid Reference":
                                            _newObject[_fieldname] = _fieldvalue;

                                            break;
                                        case "Site Number":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                        case "Altitude in metres":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                        case "Series Code":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                        case "Major soil group":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                        case "Major soil sub-group":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                        case "Gleying type":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                        case "Natural drainage of soil profile":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                        case "Vegetation":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                        case "Type of parent material":
                                            _newObject[_fieldname] = _fieldvalue;
                                            break;
                                    }
                                }
                                for (prop in _myResults) {

                                    var _fieldname = prop;
                                    var _fieldvalue = _myResults[prop];
                                    switch (_fieldname) {

                                        case "Slope at profile pit":
                                            _newObject2[_fieldname] = _fieldvalue;
                                            break;
                                        case "Shape of land surface crossing profile pit":
                                            _newObject2[_fieldname] = _fieldvalue;

                                            break;
                                        case "Slope type":
                                            _newObject2[_fieldname] = _fieldvalue;
                                            break;
                                        case "Field assessment of LCA class":
                                            _newObject2[_fieldname] = _fieldvalue;
                                            break;
                                        case "Aspect on compass rose":
                                            _newObject2[_fieldname] = _fieldvalue;
                                            break;
                                        case "Evidence of flushing":
                                            _newObject2[_fieldname] = _fieldvalue;
                                            break;
                                        case "Observed site hydrology":
                                            _newObject2[_fieldname] = _fieldvalue;
                                            break;
                                        case "Rock outcrop class on land surface around profile pit":
                                            _newObject2[_fieldname] = _fieldvalue;
                                            break;
                                        case "Surface boulder class around profile pit":
                                            _newObject2[_fieldname] = _fieldvalue;
                                            break;
                                        case "Type of erosion":
                                            _newObject2[_fieldname] = _fieldvalue;
                                            break;

                                    }

                                }

                                var _object3_Array = [];
                                var _object3_Array_DD = [];
                                // 
                                $.each(response, function (index, value2) {

                                    _newObject3 = [];

                                    for (prop2 in value2.feature.attributes) {

                                        var _fieldname = prop2;
                                        var _fieldvalue = value2.feature.attributes[prop2];
                                        switch (_fieldname) {

                                            case "Horizon symbol":

                                                _newObject3[_fieldname] = _fieldvalue;
                                                _object3_Array_DD.push(_fieldvalue);
                                                break;
                                            case "Horizon position":
                                                _newObject3[_fieldname] = _fieldvalue;

                                                break;
                                            case "Horizon type":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Depth to the top of the horizon from the soil surface (cm)":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Depth to the bottom of the horizon from the soil surface (cm)":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "+ sign indicates that the base of the horizon continued below the pit base":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Munsell colour of soil matrix":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Munsell colour of ped face":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Munsell colour of dry soil in situ":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Primary Munsell colour of soil mottles":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Frequency class of primary mottles":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Size class of primary mottles":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Contrast between colour of primary mottles and colour of soil matrix":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Sharpness of the boundary between the primary mottles and the soil matrix.":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Nature of organic matter":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Presence of mineral material in organic horizons":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Field texture qualifier":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Superseded by humose and sand_grain fields. Will be dropped in Version 3.":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Field texture qualifier for sand grains.":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Field texture class":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "The degree of ped development of the primary ped type":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case " Size class of the primary ped type":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Shape class of the primary ped type":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "The degree of ped development of the secondary ped type":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Size class of the secondary ped type":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Shape class of the secondary ped type":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Field moisture state":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Consistence type when the field moisture state is wet":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Consistence type when the field moisture state is moist":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Consistence type when the field moisture state is dry":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Strength of induration":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Strength of cementation":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Frequency class of the primary roots":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Size class of the primary roots":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Type of the primary roots":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Frequency class of the secondary roots":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Size class of the secondary roots":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Type of the secondary roots":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Frequency class of primary stones":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Size class of the primary stones":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Shape class of the primary stones":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Lithology code of the primary stones":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Frequency class of the secondary stones":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Size class of the secondary stones":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Shape class of the secondary stones":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Lithology code of the secondary stones":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Thickness of the boundary between horizons.":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Irregularity of the boundary between horizons.":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Sample identifier":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Sample position numbered from top down":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Depth to the top of the sample from the soil surface":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;
                                            case "Depth to the bottom of the sample from the soil surface":
                                                _newObject3[_fieldname] = _fieldvalue;
                                                break;

                                        }
                                    }

                                    _object3_Array.push(_newObject3);


                                });


                                var _object4_Array = [];
                                var _object4_Array_DD = [];

                                $.each(response, function (index, value2) {

                                    _newObject4 = [];

                                    for (prop2 in value2.feature.attributes) {

                                        var _fieldname = prop2;
                                        var _fieldvalue = value2.feature.attributes[prop2];
                                        switch (_fieldname) {

                                            case "Percentage total carbon by wet combustion or CHN analyser":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;

                                            case "Percentage total nitrogen by CHN analyser":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Carbon to nitrogen ratio":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Percentage organic matter content":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Flag indicating whether silt and sand particle size is USDA or BSTC system":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Percentage sand, either USDA or BSTC":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Percentage silt, either USDA or BSTC":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Percentage sand according to the International particle size classification.":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Percentage silt according to the International particle size classification":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Percentage clay":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Texture class determined from the measured particle size data":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "pH in water":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "pH in 0.01M calcium chloride":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Exchangeable calcium (meq per 100g air-dried soil)":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Exchangeable magnesium (meq per 100g air-dried soil)":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Exchangeable sodium (meq per 100g air-dried soil)":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Exchangeable potassium (meq per 100g air-dried soil)":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Exchangeable hydrogen (meq per 100g air-dried soil)":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Sum of cations":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Percentage base saturation":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case " Total P2O5 [mg per 100g air-dry soil].":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Calcium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Sodium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Potassium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Magnesium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Copper extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Zinc extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Iron extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Manganese extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Aluminium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Phosphorus extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Nickel extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Cadmium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Chromium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Cobalt extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Lead extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Strontium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Molybdenum extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Titanium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Barium extracted by aqua-regia digestion [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Copper extracted by EDTA [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Zinc extracted by EDTA [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Manganese extracted by EDTA [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Nickel extracted by EDTA [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Cadmium extracted by EDTA [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Chromium extracted by EDTA [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Lead extracted by EDTA [ppm in air-dried soil]":
                                                _newObject4[_fieldname] = _fieldvalue;
                                                break;
                                            case "Horizon symbol":

                                                _newObject4[_fieldname] = _fieldvalue;
                                                _object4_Array_DD.push(_fieldvalue);
                                                break;
                                        }

                                    }
                                    _object4_Array.push(_newObject4);
                                    _newObject4 = [];
                                });
                            }

                            _myarray.push(_newObject);

                            _myarray2.push(_newObject2);
                            _myarray3.push(_newObject3);
                            _myarray4.push(_newObject4);

                            var resultTableArray = resultSetToTablesimple(_myarray);
                            if (!resultTableArray) {
                                //nothing
                            } else {
                                var docFragment = document.createDocumentFragment();
                                for (prop in resultTableArray) {
                                    ul = document.createElement('ul');
                                    ul.id = '';
                                    ul.className = "no-bullet";

                                    li = document.createElement('li');
                                    li.id = '';
                                    li.className = "layerHeading_li";

                                    cacheImage = document.createElement('i');
                                    cacheImage.className = "TreeNode fa-sort-desc";
                                    cacheImage.title = "Click to open group";
                                    var att = document.createAttribute("aria-hidden");
                                    att.value = "true";
                                    cacheImage.setAttributeNode(att);

                                    span = document.createElement('a');
                                    span.appendChild(document.createTextNode(''));
                                    span.title = "Click to open/close group";
                                    span.href = "#";
                                    span.className = "layerHeading"
                                    li.appendChild(span);

                                    li.appendChild(resultTableArray[prop]);

                                    ul.appendChild(li);
                                    docFragment.appendChild(ul);

                                }

                                //****************************************************************
                                var resultTableArray = resultSetToTablesimple(_myarray2);
                                if (!resultTableArray) {
                                    //nothing
                                } else {
                                    var docFragment2 = document.createDocumentFragment();
                                    for (prop in resultTableArray) {
                                        ul = document.createElement('ul');
                                        ul.id = '';
                                        ul.className = "no-bullet";

                                        li = document.createElement('li');
                                        li.id = '';
                                        li.className = "layerHeading_li";

                                        cacheImage = document.createElement('i');
                                        cacheImage.className = "TreeNode fa-sort-desc";
                                        cacheImage.title = "Click to open group";
                                        var att = document.createAttribute("aria-hidden");
                                        att.value = "true";
                                        cacheImage.setAttributeNode(att);

                                        span = document.createElement('a');
                                        span.appendChild(document.createTextNode(''));
                                        span.title = "Click to open/close group";
                                        span.href = "#";
                                        span.className = "layerHeading"
                                        li.appendChild(span);

                                        li.appendChild(resultTableArray[prop]);

                                        ul.appendChild(li);
                                        docFragment2.appendChild(ul);

                                    }
                                }
                                $.each(_object3_Array, function (index, value) {

                                });



                                //****************************************************************
                                $('#idencontent_').empty().append(_html4);

                                $("#idpanel5").append(docFragment);
                                $("#idpanel6").append(docFragment2);

                                $("#idpanel7").append('<select id="HD_Select"></select><div id="HD_Select_Result" class="column"></div> ');
                                $.each(_object3_Array_DD, function (index, value) {

                                    $("#HD_Select").append('<option value="' + index + '">Horizon Symbol ' + value + '</option>');
                                });
                                var _HDArray = [];
                                _HDArray.push(_object3_Array[0]);
                                //********************************************************************************

                                $("#HD_Select_Result").empty().append(addTable(_HDArray));

                                $("#HD_Select").unbind('change').change(function () {
                                    var _myval = $("#HD_Select").val();
                                    if (_myval == 'none') {
                                        return false;
                                    } else {
                                        _myval = parseInt(_myval);
                                    }

                                    var _HDArray = [];
                                    _HDArray.push(_object3_Array[_myval]);
                                    //********************************************************************************

                                    $("#HD_Select_Result").empty().append(addTable(_HDArray));


                                    //********************************************************************************
                                });


                                $("#idpanel8").append('<select id="CP_Select"></select><div id="CP_Select_Result" class="column"></div> ');
                                $.each(_object4_Array_DD, function (index, value) {

                                    $("#CP_Select").append('<option value="' + index + '">Horizon Symbol ' + value + '</option>');
                                });
                                var _CPArray = [];
                                _CPArray.push(_object4_Array[0]);
                                //********************************************************************************

                                $("#CP_Select_Result").empty().append(addTable(_CPArray));

                                $("#CP_Select").unbind('change').change(function () {
                                    var _myval = $("#CP_Select").val();
                                    if (_myval == 'none') {
                                        return false;
                                    } else {
                                        _myval = parseInt(_myval);
                                    }

                                    var _CPArray = [];
                                    _CPArray.push(_object4_Array[_myval]);
                                    //********************************************************************************

                                    $("#CP_Select_Result").empty().append(addTable(_CPArray));


                                    //********************************************************************************
                                });



                                //****************************************************************
                            }
                            //**********************************************************
                            var elem = new Foundation.Tabs($('#identify-tabs1'));
                            //**********************************************************


                            $('.layerHeading').unbind("click");
                            $('.layerHeading').click(function () {
                                var _domEle = $(this);

                                var _domElei_ul = $(this).parent().children("ul");
                                _domElei_ul.toggle();

                                var _domElei = $(this).parent().children("i");

                                var _checkclass = _domElei.hasClass('fa-sort-desc');
                                if (_checkclass) {
                                    _domElei.removeClass('fa-sort-desc');
                                    _domElei.addClass('fa-sort-up');
                                } else {
                                    _domElei.removeClass('fa-sort-up');
                                    _domElei.addClass('fa-sort-desc');
                                }
                            });

                            $('.hdiv,.hdivopen,.hdiv1').unbind("click");
                            $('.hdiv,.hdivopen,.hdiv1').click(function () {


                                var _domEle = $(this);

                                var _domElei = $(this).children("i");

                                var _checkclass = _domElei.hasClass('fa-sort-desc');
                                if (_checkclass) {
                                    _domElei.removeClass('fa-sort-desc');
                                    _domElei.addClass('fa-sort-up');
                                } else {
                                    _domElei.removeClass('fa-sort-up');
                                    _domElei.addClass('fa-sort-desc');
                                }

                                $(this).parent().toggleClass('li1open', 'li1');

                                $(this).parent().children(".ul2").toggle('fast');
                                if ($(this).children("img").attr("src") == './Aquaculturemap/images/close.bmp') {
                                    $(this).children("img").attr("src", './Aquaculturemap/images/expand.bmp');
                                } else {
                                    $(this).children("img").attr("src", './Aquaculturemap/images/close.bmp');
                                }

                            });
                            //**********************************************************

                        }
                    });
                //************************************ Identify layer11 end *********************
                //*****************************************************************

                //*************************************************


            }

            //******************************** initialize sidebar guff *************************
            //*****************************************************************************************************

            function initializeSidebar(map) {
                var popup = map.infoWindow;


                //when the selection changes update the side panel to display the popup info for the
                //currently selected feature.
                connect.connect(popup, "onSelectionChange", function () {
                    displayPopupContent(popup.getSelectedFeature());
                });

                //when the selection is cleared remove the popup content from the side panel.
                connect.connect(popup, "onClearFeatures", function () {

                    $("#leftPane").html();

                    domUtils.hide(dom.byId("pager"));
                });

                //When features are associated with the  map's info window update the sidebar with the new content.
                connect.connect(popup, "onSetFeatures", function () {

                    displayPopupContent(popup.getSelectedFeature());


                    //enable navigation if more than one feature is selected
                    //popup.features.length > 1 ? domUtils.show(dom.byId("pager")) : domUtils.hide(dom.byId("pager"));
                });
            }


            function selectPrevious() {
                map.infoWindow.selectPrevious();
            }

            function selectNext() {
                map.infoWindow.selectNext();
            }


            function checkLayerLoaded() {
                if (loaded == true) {
                    alert("loaded")
                };


            };


        });

        ////*******************************************************************
        ////*********************** Add opacity slider ************************

        var slider = new dijit.form.HorizontalSlider({
			
            name: "slider",
            value: 6,
            minimum: 0,
            maximum: 10,
            intermediateChanges: true,
            showButtons: true,
            style: "width:300px;",
            onChange: function (value) {
			
                soils1.setOpacity(value / 10);
                soils2.setOpacity(value / 10);
                soils3.setOpacity(value / 10);
                soils4.setOpacity(value / 10);
                soils5.setOpacity(value / 10);
                soils6.setOpacity(value / 10);
                soils7.setOpacity(value / 10);
                soils8.setOpacity(value / 10);
                soils9.setOpacity(value / 10);
                soils10.setOpacity(value / 10);
                soils11.setOpacity(value / 10);
                soils12.setOpacity(value / 10);
                soils13.setOpacity(value / 10);
                soils14.setOpacity(value / 10);
                soils15.setOpacity(value / 10);
                soils16.setOpacity(value / 10);
                soils17.setOpacity(value / 10);
                soils18.setOpacity(value / 10);
                soils19.setOpacity(value / 10);
                soils20.setOpacity(value / 10);
                soils21.setOpacity(value / 10);
				

                //dom.byId("opval").innerHTML = value;
            }
        }, "ui-slider");

        dojo.ready(slider);


        //*********************************************************************************************
        //*************************** Add Home Button and Scale bar ***********************************
        //Home Button
        var home = new HomeButton({
            map: map
        }, "HomeButton");
        home.startup();

        //Aerial Button

        var aerialZoom = new Extent({
            map: map
        }, "HomeButton");
        home.startup();

        ////Scale Bar
        var scalebar = new Scalebar({
            attachTo: "bottom-right",
            map: map,
            scalebarUnit: 'dual'
        });
        //Locate button

        var geoLocate = new LocateButton({
            map: map
        }, "LocateButton");
        geoLocate.startup();



        //***** Back to the top ******
        //****************************
        // hide #back-top first
        if ($('#back-to-top').length) {
            var scrollTrigger = 100, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
            backToTop();
            $(window).on('scroll', function () {
                backToTop();
            });
            $('#back-to-top').on('click', function (e) {
                e.preventDefault();
                $('#search_results_sepa').animate({
                    scrollTop: 0
                }, 700);
            });
        }

        //*********************************************************************************************
        //*************************** Loading Icon *************************************************

        var loading = dom.byId("loadingImg");
        on(map, "update-start", showLoading);
        on(map, "update-end", hideLoading);
        function showLoading() {
            esri.show(loading);
        }
        function hideLoading() {
            esri.hide(loading);
        }


        var dojoConfig = {
            packages: [
                { name: 'libs', location: location.pathname.replace(/\/[^/]+$/, "") + '/libs' }
            ],
            aliases: [
                ['jquery', 'libs/jquery']
            ]
        }

        var $myLink = $('a.myLink');



        //************************************************************************************************
        //*********************************************************************************************
        // Recenter the map when the window changes size
        function autoRecenter(map) {
            var resizeDelay = 100;
            on(map, 'load', function (map) {
                on(window, 'resize', map, map.resize);
            });
            on(map, 'resize', function (extent, width, height) {
                map.__resizeCenter = map.extent.getCenter();
                setTimeout(function () {
                    map.centerAt(map.__resizeCenter);
                }, resizeDelay);
            });
        }

        //*********************************************************************************************

        // Recenter the map when the window changes size
        function bgChecker() {
            resizeMapDiv();
            if (map.getScale() < 50000) {

                if (dojo.attr("bg_Selector", "title") == 'Aerial Background') {
                    domStyle.set('bg_Selector', {
                        background: "url(img/aerial_photo.jpg)",
                        'background-size': 'contain'

                    });
                }

                //if (bg_click) {
                //    bg_click.remove();
                //}
                var node = dom.byId("bg_Selector");
                bg_click = on(node, "click", function (evt) {
                    if (domAttr.get("bg_Selector", "title") == 'Aerial Background') {

                        domStyle.set('bg_Selector', {
                            background: "url(img/Standard_Thinkwhere.png)",
                            'background-size': 'contain'
                        });

                        domAttr.set('bg_Selector', {
                            title: "Colour Background"
                        });
                        baseMapServiceLayerAerial.setVisibility(true);
                        baseMapServiceLayerEuropa.setVisibility(true);
                        baseMapServiceLayer.setVisibility(false);

                    } else {

                        domStyle.set('bg_Selector', {
                            background: "url(img/aerial_photo.jpg)",
                            'background-size': 'contain'
                        });

                        domAttr.set('bg_Selector', {
                            title: "Aerial Background"
                        });
                        baseMapServiceLayerAerial.setVisibility(false);
                        baseMapServiceLayerEuropa.setVisibility(false);
                        baseMapServiceLayer.setVisibility(true);
                    }
                });



            } else {

                if (domAttr.get("bg_Selector", "title") == 'Aerial Background') {
                    domStyle.set('bg_Selector', {
                        background: "url(img/Aerial_Photography_na.png)",
                        'background-size': 'contain'
                    });

                    domAttr.set('bg_Selector', {
                        title: "Aerial Background"
                    });

                } else {

                    domStyle.set('bg_Selector', {
                        background: "url(img/Aerial_Photography_na.png)",
                        'background-size': 'contain'
                    });

                    domAttr.set('bg_Selector', {
                        title: "Aerial Background"
                    });
                    baseMapServiceLayerEuropa.setVisibility(false);
                    baseMapServiceLayer.setVisibility(true);
                }
            }
        }
        checkquerystring();
        //changeUrl();
    });

//*********************************************************************************************
//Chech Querystring


function checkquerystring() {
    var layerid = getParameterByName('layer');
    if (layerid) {


        var _id = $("#switch" + layerid).attr("id");

        if ((_id == "switch1") || (_id == "switch2") || (_id == "switch3")) {

            $("#jellybean1").trigger('click');

        }
        if ((_id == "switch4") || (_id == "switch5") || (_id == "switch6")) {

            $("#jellybean2").trigger('click');
        };
        if ((_id == "switch7") || (_id == "switch8") || (_id == "switch9") || (_id == "switch10") || (_id == "switch16")) {
            $("#jellybean3").trigger('click');
        };
        if ((_id == "switch11") || (_id == "switch12") || (_id == "switch13") || (_id == "switch14") || (_id == "switch15")) {
            $("#jellybean4").trigger('click');

        };
        if ((_id == "switch17") || (_id == "switch18") || (_id == "switch19") || (_id == "switch20") || (_id == "switch21")) {
            $("#jellybean5").trigger('click');

        };

        $("#switch" + layerid).trigger('click').prop('checked', true);

    }

}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


/*function initLayer() {
    dojo.declare("my.ThinkWhereStandard", esri.layers.TiledMapServiceLayer, {
        constructor: function () {
            this.spatialReference = new esri.SpatialReference({ wkid: 27700 });
            this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-49743770.85697311, -33016566.845420867, 50443770.85697311, 34766566.84542087, this.spatialReference));
            this.id = 'bg';
            this.opacity = 1.0;
            this.tileInfo = new esri.layers.TileInfo({
                "rows": 256,
                "cols": 256,
                "dpi": 96,
                "format": "image/png",
                "origin": {
                    "x": 0,
                    "y": 1300000
                },
                "spatialReference": {
                    "wkid": 27700
                },
                "lods": [
                                         { "level": 0, "resolution": 1000.0000000004, "scale": 3571428.571429 },
                                         { "level": 1, "resolution": 499.99999999880004, "scale": 1785714.285714 },
                                         { "level": 2, "resolution": 200.00000000008, "scale": 714285.714286 },
                                         { "level": 3, "resolution": 100.00000000004, "scale": 357142.857143 },
                                         { "level": 4, "resolution": 49.999999999879996, "scale": 178571.428571 },
                                         { "level": 5, "resolution": 24.999999999996, "scale": 89285.714286 },
                                         { "level": 6, "resolution": 10.000000000004, "scale": 35714.285714 },
                                         { "level": 7, "resolution": 4.999999999988, "scale": 17857.142857 },
                                         { "level": 8, "resolution": 2.4999999999996, "scale": 9448.818897636284 },
                                         { "level": 9, "resolution": 1.2699999999987999, "scale": 4535.714286 },
                                         { "level": 10, "resolution": 0.49999999999879996, "scale": 1785.714286 },
                                         { "level": 11, "resolution": 0.20000000000008, "scale": 714.285714 }
                ]
            });
            this.loaded = true;
            this.onLoad(this);
        },

        getTileUrl: function (level, row, col) {
            return _thinkwhere + "?https://api.themapcloud.com/maps/wmts/os_licensed_background_colour/uk_bng_largescale/" + level + "/" + col + "/" + row + "." + "png";
        }
    });
}*/


//Check postcode

function checkPostCode(toCheck) {
    // Permitted letters depend upon their position in the postcode.
    var alpha1 = "[abcdefghijklmnoprstuwyz]";                       // Character 1
    var alpha2 = "[abcdefghklmnopqrstuvwxy]";                       // Character 2
    var alpha3 = "[abcdefghjkstuw]";                                // Character 3
    var alpha4 = "[abehmnprvwxy]";                                  // Character 4
    var alpha5 = "[abdefghjlnpqrstuwxyz]";                          // Character 5
    // Array holds the regular expressions for the valid postcodes
    var pcexp = new Array();
    // Expression for postcodes: AN NAA, ANN NAA, AAN NAA, and AANN NAA
    pcexp.push(new RegExp("^(" + alpha1 + "{1}" + alpha2 + "?[0-9]{1,2})(\\s*)([0-9]{1}" + alpha5 + "{2})$", "i"));
    // Expression for postcodes: ANA NAA
    pcexp.push(new RegExp("^(" + alpha1 + "{1}[0-9]{1}" + alpha3 + "{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$", "i"));
    // Expression for postcodes: AANA  NAA
    pcexp.push(new RegExp("^(" + alpha1 + "{1}" + alpha2 + "?[0-9]{1}" + alpha4 + "{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$", "i"));
    // Exception for the special postcode GIR 0AA
    pcexp.push(/^(GIR)(\s*)(0AA)$/i);
    // Standard BFPO numbers
    pcexp.push(/^(bfpo)(\s*)([0-9]{1,4})$/i);
    // Load up the string to check
    var postCode = toCheck;
    // Assume postcode entered is not valid
    var valid = false;
    // Check the string against the types of post codes
    for (var i = 0; i < pcexp.length; i++) {
        if (pcexp[i].test(postCode)) {
            // The post code is valid - split the post code into component parts
            pcexp[i].exec(postCode);
            // Copy it back into the original string, converting it to uppercase and
            // inserting a space between the inward and outward codes
            postCode = RegExp.$1.toUpperCase() + " " + RegExp.$3.toUpperCase();
            // Load new postcode back into the form element
            valid = true;
            // Remember that we have found that the code is valid and break from loop
            break;
        }
    }
    // Return with either the reformatted valid postcode or the original invalid 
    // postcode
    if (valid) { return postCode; } else return false;
}


