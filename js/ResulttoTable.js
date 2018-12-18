function QueryLayer_QM(_qmUnitID) {
    var _results;
    //debugger;
    var queryTask = new esri.tasks.QueryTask("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_Soils_250K_SSKIB/MapServer/2");

    var query = new esri.tasks.Query();
    query.returnGeometry = false;
    query.outFields = ["*"];
    query.where = 'MAP_UNIT_QM = ' + parseInt(_qmUnitID);

    var deferred = queryTask
           .execute(query)
           .addCallback(function (response) {
               //debugger;
               $("#QM_Select_Series").empty();
               var _count = 0;
               $.each(response.features, function (index, value) {
                   if (_count == 0) {
                       QueryLayer_LD(value.attributes.SERIES_CODE);
                   }
                   //debugger;
                   $("#QM_Select_Series").append('<option value="' + value.attributes.SERIES_CODE + '">' + value.attributes.SeriesText + '</option>');
                   _count++;
               });
           });
}
function QueryLayer_LD(_seriescode) {
    var _results;
    //debugger;
    var queryTask = new esri.tasks.QueryTask("http://druid.hutton.ac.uk/arcgis/rest/services/Hutton_Soils_250K_SSKIB/MapServer/3");

    var query = new esri.tasks.Query();
    query.returnGeometry = false;
    query.outFields = ["*"];
    query.where = "SERIES_CODE = '" + _seriescode + "'";

    var deferred = queryTask
           .execute(query)
           .addCallback(function (response) {
              // debugger;

               _myarray7 = [];
               $("#QM_Select_Landuse").empty();
               $.each(response.features, function (index, value) {
                  // debugger;
                   var _newObjectQM = {};
                   for (prop in value.attributes) {
                       var _fieldname = prop;
                       var _fieldvalue = value.attributes[prop];
                        for (prop2 in response.fieldAliases) {
                            var _fieldname2 = prop2;
                            var _fieldvalue2 = response.fieldAliases[prop2];
                            if (_fieldname == _fieldname2) {
                                _fieldname;
                                _fieldname2;
                                _fieldvalue;
                                _fieldvalue2;
                                //debugger;
                                _newObjectQM[_fieldvalue2] = _fieldvalue;
                            }
                        }
                        _myarray7.push(_newObjectQM);
                   }
                   var _myarray_8 = [];
                   _myarray_8.push(_myarray7[0]);

                   $("#QM_Select_Result").empty().append(addTable(_myarray_8));
                   
                   
                   $("#QM_Select_Landuse").append('<option value="' + value.attributes.SSKIB_HORZ_ID + '">' + value.attributes.LAND_USE + ' (Depth ' + value.attributes.HorizDepth + ')</option>');
               });
           });
}
function addTable(_HDArray) {

    //debugger;
    var resultTableArray = resultSetToTablesimple(_HDArray);
    //debugger;
    if (!resultTableArray) {
        return null;
    } else {

        //var checkArray = resultTableArray.

        var docFragment3 = document.createDocumentFragment();
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

            //li.appendChild(document.createTextNode(layerTitle));
            li.appendChild(resultTableArray[prop]);

            ul.appendChild(li);
            docFragment3.appendChild(ul);
            return docFragment3;
        }
    }
    var resultTableArray = resultSetToTablesimple(_CPArray);
    //debugger;
    if (!resultTableArray) {
        return null;
    } else {

        //var checkArray = resultTableArray.

        var docFragment4 = document.createDocumentFragment();
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

            //li.appendChild(document.createTextNode(layerTitle));
            li.appendChild(resultTableArray[prop]);

            ul.appendChild(li);
            docFragment4.appendChild(ul);
            return docFragment4;
        }
    }

}
function resultSetToTablesimple(resultSet) {
    //debugger;
    var result;
    var Licence_Number = '';
    var Location_Code = '';

 // var featureLayerId, feature;
        var resultTableArray = new Array(); // Array to store tables in. One Table for each layer that has identify results.

    if (resultSet.length > 0) {

      
        // Create table elements, these will be cloned later
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        var ul2 = document.createElement('ul');
        var li2 = document.createElement('li');
        var hdiv = document.createElement('a');
        var hdiv1 = document.createElement('a');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var th = document.createElement('th');
        var tble = document.createElement('table');
        var tHead, tHeadRow, tHeadCell, tBody, tRow, tCell, tCell2, tHead1, tHeadRow1, tHeadCell1, tBody1, tRow1, tCell1; // Reused when creating each table.
    }
    else {
        // No Data
        return null;
    }
    for (var i = 0, il = resultSet.length; i < il; i++) {
        result = resultSet[i];
        if (resultTableArray['layer' + i] === undefined) {
            resultTableArray['layer' + i] = document.createElement('ul');
            resultTableArray['layer' + i].className = "ul1";
            li = resultTableArray['layer' + i].appendChild(document.createElement('li'));
            li.className = "li1";
            tble = li.appendChild(document.createElement('table'));
            tble.className = "tble";
            tble.cellPadding = "0px";
            tble.cellSpacing = "0px";
            //debugger;

            tBody = tble.appendChild(document.createElement('tbody'));
            for (var attribute in resultSet[i]) {
                tRow = tBody.appendChild(tr.cloneNode(true));
                tRow.id = "Result_" + i;
                tRow.className = "trow";
                tCell = tRow.appendChild(td.cloneNode(true));
                tCell.className = "fieldname";
                tCell.appendChild(document.createTextNode(attribute));
                tCell2 = tRow.appendChild(td.cloneNode(true));
                tCell2.className = "fieldresult";
                tCell2.appendChild(document.createTextNode(result[attribute]));
            }
            //debugger;
            //result.layerName
        } else {
            li = resultTableArray['layer' + i].appendChild(document.createElement('li'));
            li.className = "li1";
            tble = li.appendChild(document.createElement('table'));
            tble.className = "tble";
            tble.cellPadding = "0px";
            tble.cellSpacing = "0px";

            tBody = tble.appendChild(document.createElement('tbody'));
            for (var attribute in resultSet[i]) {
                tRow = tBody.appendChild(tr.cloneNode(true));
                tRow.id = "Result_" + i;
                tRow.className = "trow";
                tCell = tRow.appendChild(td.cloneNode(true));
                tCell.className = "fieldname";
                tCell.appendChild(document.createTextNode(attribute));
                tCell2 = tRow.appendChild(td.cloneNode(true));
                tCell2.className = "fieldresult";
                tCell2.appendChild(document.createTextNode(result[attribute]));
            }
        }
    }
        return resultTableArray;
    
}
function resultSetToTable(resultSet, that) {
    //debugger;
    // Receives result array (featureSet) from an Identify Task/Query Task/Find Task and 
    // returns an array of tables for each layer in the result.
    // TODO : Validate input resultSet object.
    // collection of objects with feature property, containing attributes.
    var result;
    var Licence_Number = '';
    var Location_Code = '';
    if (resultSet.length > 0) {

        var featureLayerId, feature;
        var resultTableArray = new Array(); // Array to store tables in. One Table for each layer that has identify results.

        // Create table elements, these will be cloned later
        var ul = document.createElement('ul');
        var li = document.createElement('li');
        var ul2 = document.createElement('ul');
        var li2 = document.createElement('li');
        var hdiv = document.createElement('a');
        var hdiv1 = document.createElement('a');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var th = document.createElement('th');
        var tble = document.createElement('table');
        var tHead, tHeadRow, tHeadCell, tBody, tRow, tCell, tCell2, tHead1, tHeadRow1, tHeadCell1, tBody1, tRow1, tCell1; // Reused when creating each table.
    }
    else {
        // No Data
        return null;
    }

    for (var i = 0, il = resultSet.length; i < il; i++) {
        //debugger;
        result = resultSet[i];
        if (resultTableArray[result.layerId] === undefined) {
            resultTableArray[result.layerId] = document.createElement('ul');
            resultTableArray[result.layerId].className = "ul1";
            li = resultTableArray[result.layerId].appendChild(document.createElement('li'));
            li.className = "li1";
           
            hdiv = li.appendChild(document.createElement('a'));
            //hdiv1 = hdiv.appendChild(document.createElement('img'));
            //hdiv1.src = "./Aquaculturemap/img/expand.bmp";
            //hdiv1.className = "hdiv1";
            cacheImage = document.createElement('i');
            cacheImage.className = "TreeNode1 fa fa-angle-double-down";
            cacheImage.title = "Click to open group";
            var att = document.createAttribute("aria-hidden");
            att.value = "true";
            cacheImage.setAttributeNode(att);
            hdiv.appendChild(cacheImage);
            var _fieldname = result.displayFieldName;
            for (var attribute in result.feature.attributes) {
                var field_value = result.feature.attributes[attribute];
                if (result.value == field_value) {
                    _fieldname = attribute;
                }
            }
            
            //hdiv.appendChild(document.createTextNode(_fieldname + ': ' + result.value));
            hdiv.appendChild(document.createTextNode(result.value));
            hdiv.className = "hdiv";
            
            ul2 = li.appendChild(document.createElement('ul'));
            ul2.className = "ul2";
            li2 = ul2.appendChild(document.createElement('li'));
            li2.className = "li2";
            tble = li2.appendChild(document.createElement('table'));
            tble.className = "tble";
            tble.cellPadding = "0px";
            tble.cellSpacing = "0px";
            //debugger;
            // create table body.
            tBody = tble.appendChild(document.createElement('tbody'));
            
            for (var attribute in result.feature.attributes) {
                
                if (attribute.toUpperCase() === 'OBJECT ID' || attribute.toUpperCase() === 'OBJECTID' || attribute.toUpperCase() === 'SHAPE_POINT' || attribute.toUpperCase() === 'SHAPE' || attribute.toUpperCase() === 'SHAPE_LENGTH' || attribute.toUpperCase() === 'SHAPE_AREA' || attribute.toUpperCase() === 'SHAPE_POLYGON' || attribute.toUpperCase() === 'SHAPE_POLYGON_LENGTH' || attribute.toUpperCase() === 'SHAPE_POLYGON_AREA') {
                    //Do Nothing 
                } else {
                    if (attribute.toUpperCase() === 'LICENCE NUMBER' || attribute.toUpperCase() === 'LICENCE_NUMBER') {
                        Licence_Number = result.feature.attributes[attribute];
                        
                        var str = Licence_Number;
                        var res = str.replace(/\//g, "£");
                        Licence_Number = res;

                        tRow = tBody.appendChild(tr.cloneNode(true));
                        //tRow.id = "Result_" + i;

                        tRow.className = "trow";
                        tCell = tRow.appendChild(td.cloneNode(true));
                        tCell.className = "fieldname";
                        tCell.appendChild(document.createTextNode(attribute));
                        tCell2 = tRow.appendChild(td.cloneNode(true));
                        tCell2.className = "fieldresult";

                        var hdiv_zoom = tCell2.appendChild(document.createElement('a'));
                        //hdiv_zoom.appendChild(document.createTextNode(result.value));
                        hdiv_zoom.className = "button zoomtobutton";

                        //hdiv_zoom.id = "Result_" + i;
                        var att = document.createAttribute("data-licencenumber");
                        att.value = Licence_Number;
                        hdiv_zoom.setAttributeNode(att);

                        cacheImage = document.createElement('i');
                        cacheImage.className = "fa fa-filter";
                        cacheImage.title = "Zoom to this location";
                        var att = document.createAttribute("aria-hidden");
                        att.value = "true";
                        cacheImage.setAttributeNode(att);
                        hdiv_zoom.appendChild(cacheImage);
                        hdiv_zoom.title = "Zoom to this location";
                        hdiv_zoom.onclick = jQuery.proxy(function (evt) {
                            var targ;
                            if (!evt)
                                var evt = window.event;
                            if (evt.target)
                                targ = evt.target;
                            else
                                if (evt.srcElement)
                                    targ = evt.srcElement;
                            if (targ.nodeType == 3) // defeat Safari bug
                                targ = targ.parentNode;

                            var resultID;
                            var _checkclass = $(targ).hasClass('fa-filter');
                            if (_checkclass) {
                                resultID = $(targ).parent().attr('data-licencenumber'); // Get parent tr ID.
                            } else {
                                resultID = $(targ).attr('data-licencenumber'); // Get parent tr ID.
                            }
                            //debugger;
                            var _str = resultID;
                            var _res = _str.replace(/£/g, "/");
                            var _drillLicenceNumber = _res;
                            $('#txtFilter').val(_drillLicenceNumber);
                            $('#btnFilter').trigger('click');
                            //getLicenceDetails(resultID);
                        }, this);


                    }
                    if (attribute.toUpperCase() === 'LOCATION CODE' || attribute.toUpperCase() === 'LOCATION_CODE') {
                        Location_Code = result.feature.attributes[attribute];
                        var str = Location_Code;
                        var res = str.replace(/\//g, "£");
                        Location_Code = res;

                        tRow = tBody.appendChild(tr.cloneNode(true));
                        tRow.id = "Result_" + i;
                        tRow.className = "trow";
                        tCell = tRow.appendChild(td.cloneNode(true));
                        tCell.className = "fieldname";
                        tCell.appendChild(document.createTextNode(attribute));
                        tCell2 = tRow.appendChild(td.cloneNode(true));
                        tCell2.className = "fieldresult";

                        //Attach Zoom Button
                        if (result.feature.geometry && that) {
                            var hdiv_zoom = tCell2.appendChild(document.createElement('a'));
                            //hdiv_zoom.appendChild(document.createTextNode(result.value));
                            hdiv_zoom.className = "button zoomtobutton";

                            hdiv_zoom.id = "Result_" + i;
                            cacheImage = document.createElement('i');
                            cacheImage.className = "fa fa-search-plus";
                            cacheImage.title = "Zoom to this location";
                            var att = document.createAttribute("aria-hidden");
                            att.value = "true";
                            cacheImage.setAttributeNode(att);
                            hdiv_zoom.appendChild(cacheImage);
                            hdiv_zoom.title = "Zoom to this location";
                            hdiv_zoom.onclick = jQuery.proxy(function (evt) {
                                var targ;
                                if (!evt)
                                    var evt = window.event;
                                if (evt.target)
                                    targ = evt.target;
                                else
                                    if (evt.srcElement)
                                        targ = evt.srcElement;
                                if (targ.nodeType == 3) // defeat Safari bug
                                    targ = targ.parentNode;

                                var resultID;
                                var _checkclass = $(targ).hasClass('fa-search-plus');
                                if (_checkclass) {
                                    resultID = $(targ).parent().attr('id').split('_')[1]; // Get parent tr ID.
                                } else {
                                    resultID = $(targ).attr('id').split('_')[1]; // Get parent tr ID.
                                }
                                //zoomtoGeometry(resultSet[resultID].feature);
                                //alert('Zoom ' + resultID);
                                zoomtoGeometry(resultSet[resultID].feature);
                            }, this);
                        }
                        //******************
                    }

                    if (attribute.toUpperCase() === 'LOCATION CODE' || attribute.toUpperCase() === 'LOCATION_CODE' || attribute.toUpperCase() === 'LICENCE NUMBER' || attribute.toUpperCase() === 'LICENCE_NUMBER') {
                        // Do Nothing

                    } else {
                        tRow = tBody.appendChild(tr.cloneNode(true));
                        tRow.id = "Result_" + i;
                        tRow.className = "trow";
                        tCell = tRow.appendChild(td.cloneNode(true));
                        tCell.className = "fieldname";
                        tCell.appendChild(document.createTextNode(attribute));
                        tCell2 = tRow.appendChild(td.cloneNode(true));
                        tCell2.className = "fieldresult";
                    }

                    
                    

                    //tRow = tBody.appendChild(tr.cloneNode(true));
                    //tRow.id = "Result_" + i;
                    //tRow.className = "trow";
                    //tCell = tRow.appendChild(td.cloneNode(true));
                    //tCell.className = "fieldname";
                    //tCell.appendChild(document.createTextNode(attribute));
                    //tCell2 = tRow.appendChild(td.cloneNode(true));
                    //tCell2.className = "fieldresult";
                    //debugger;
                    //tCell2.appendChild(result.feature.attributes[attribute]);
                    //****************************************************************************************
                    var fieldValue = result.feature.attributes[attribute];
                    if ((fieldValue.indexOf("http://") == 0) || (fieldValue.indexOf(".jpg") > 0) || (fieldValue.indexOf(".png") > 0) || (fieldValue.indexOf(".gif") > 0)) {
                        tAnchorLic = document.createElement('a');
                        var myURL = result.feature.attributes[attribute];
                        if ((fieldValue.indexOf(".jpg") > 0) || (fieldValue.indexOf(".png") > 0) || (fieldValue.indexOf(".gif") > 0)) {
                            if (fieldValue.indexOf("http://") == 0) {
                                // Do Nothing - Contains a valid http://
                            } else {
                                myURL = 'file:///' + myURL;
                                myURL = myURL.replace(/\\/g, "/");
                            }
                        }
                        tAnchorLic.href = myURL;

                        tAnchorLic.appendChild(document.createTextNode('More Info'));
                        tCell2.appendChild(tAnchorLic);
                        tCell2.onclick = jQuery.proxy(function (evt) {
                            var targ;
                            if (!evt)
                                var evt = window.event;
                            if (evt.target)
                                targ = evt.target;
                            else
                                if (evt.srcElement)
                                    targ = evt.srcElement;
                            if (targ.nodeType == 3) // defeat Safari bug
                                targ = targ.parentNode;

                            //var resultID = $(targ).html(); // Get parent tr ID.
                            var resultID = $(targ).attr('href');
                            //$('#ImageViewerDivContents').empty().append('<img alt="" src="' + resultID + '" />')
                            window.open(resultID, "_blank", 'toolbar=yes,status=yes,resizable=yes,scrollbars=yes,width=680,height=580,top=15,left=15');
                            return false;

                        }, this);
                    } else {
                        tCell2.appendChild(document.createTextNode(result.feature.attributes[attribute]));
                    }
                    //****************************************************************************************
                    //tCell2.appendChild(document.createTextNode(result.feature.attributes[attribute]))
                }
            }
        } else {

            li = resultTableArray[result.layerId].appendChild(document.createElement('li'));
            li.className = "li1";

            hdiv = li.appendChild(document.createElement('a'));
            //hdiv1 = hdiv.appendChild(document.createElement('img'));
            //hdiv1.src = "./Aquaculturemap/img/expand.bmp";
            //hdiv1.className = "hdiv1";
            cacheImage = document.createElement('i');
            cacheImage.className = "TreeNode1 fa fa-angle-double-down";
            cacheImage.title = "Click to open group";
            var att = document.createAttribute("aria-hidden");
            att.value = "true";
            cacheImage.setAttributeNode(att);
            hdiv.appendChild(cacheImage);
            //debugger;
            //resultSet;
            //Attach Zoom Button
            //if (result.feature.geometry && that) {
            //    var hdiv_zoom = li.appendChild(document.createElement('a'));
            //    //hdiv_zoom.appendChild(document.createTextNode(result.value));
            //    hdiv_zoom.className = "button zoomtobutton";
                
            //    hdiv_zoom.id = "Result_" + i;
            //    cacheImage = document.createElement('i');
            //    cacheImage.className = "fa fa-search-plus";
            //    cacheImage.title = "Zoom to this location";
            //    var att = document.createAttribute("aria-hidden");
            //    att.value = "true";
            //    cacheImage.setAttributeNode(att);
            //    hdiv_zoom.appendChild(cacheImage);
            //    hdiv_zoom.title = "Zoom to this location";
            //    hdiv_zoom.onclick = jQuery.proxy(function (evt) {
            //        var targ;
            //        if (!evt)
            //            var evt = window.event;
            //        if (evt.target)
            //            targ = evt.target;
            //        else
            //            if (evt.srcElement)
            //                targ = evt.srcElement;
            //        if (targ.nodeType == 3) // defeat Safari bug
            //            targ = targ.parentNode;

            //        var resultID;
            //        var _checkclass = $(targ).hasClass('fa-search-plus');
            //        if (_checkclass) {
            //           resultID = $(targ).parent().attr('id').split('_')[1]; // Get parent tr ID.
            //        } else {
            //           resultID = $(targ).attr('id').split('_')[1]; // Get parent tr ID.
            //        }
            //        //zoomtoGeometry(resultSet[resultID].feature);
            //        //alert('Zoom ' + resultID);
            //        zoomtoGeometry(resultSet[resultID].feature);
            //    }, this);
            //}
            ////******************

            //debugger;
            var _fieldname = result.displayFieldName;
            for (var attribute in result.feature.attributes) {
                var field_value = result.feature.attributes[attribute];
                if (result.value == field_value) {
                    _fieldname = attribute;
                }
            }
            //hdiv.appendChild(document.createTextNode(_fieldname + ': ' + result.value));
            hdiv.appendChild(document.createTextNode(result.value));
            //hdiv.appendChild(document.createTextNode(result.displayFieldName + ': ' + result.value));
            hdiv.className = "hdiv";

            ul2 = li.appendChild(document.createElement('ul'));
            ul2.className = "ul2";
            li2 = ul2.appendChild(document.createElement('li'));
            li2.className = "li2";
            tble = li2.appendChild(document.createElement('table'));
            tble.className = "tble";
            tble.cellPadding = "0px";
            tble.cellSpacing = "0px";
            // create table body.
            tBody = tble.appendChild(document.createElement('tbody'));
            for (var attribute in result.feature.attributes) {
                if (attribute.toUpperCase() === 'OBJECT ID' || attribute.toUpperCase() === 'OBJECTID' || attribute.toUpperCase() === 'SHAPE_POINT' || attribute.toUpperCase() === 'SHAPE' || attribute.toUpperCase() === 'SHAPE_LENGTH' || attribute.toUpperCase() === 'SHAPE_AREA' || attribute.toUpperCase() === 'SHAPE_POLYGON' || attribute.toUpperCase() === 'SHAPE_POLYGON_LENGTH' || attribute.toUpperCase() === 'SHAPE_POLYGON_AREA') {
                    //Do Nothing 
                } else {
                    if (attribute.toUpperCase() === 'LICENCE NUMBER' || attribute.toUpperCase() === 'LICENCE_NUMBER') {
                        Licence_Number = result.feature.attributes[attribute];

                        var str = Licence_Number;
                        var res = str.replace(/\//g, "£");
                        Licence_Number = res;

                        tRow = tBody.appendChild(tr.cloneNode(true));
                        //tRow.id = "Result_" + i;

                        tRow.className = "trow";
                        tCell = tRow.appendChild(td.cloneNode(true));
                        tCell.className = "fieldname";
                        tCell.appendChild(document.createTextNode(attribute));
                        tCell2 = tRow.appendChild(td.cloneNode(true));
                        tCell2.className = "fieldresult";

                        var hdiv_zoom = tCell2.appendChild(document.createElement('a'));
                        //hdiv_zoom.appendChild(document.createTextNode(result.value));
                        hdiv_zoom.className = "button zoomtobutton";

                        //hdiv_zoom.id = "Result_" + i;
                        var att = document.createAttribute("data-licencenumber");
                        att.value = Licence_Number;
                        hdiv_zoom.setAttributeNode(att);

                        cacheImage = document.createElement('i');
                        cacheImage.className = "fa fa-filter";
                        cacheImage.title = "Zoom to this location";
                        var att = document.createAttribute("aria-hidden");
                        att.value = "true";
                        cacheImage.setAttributeNode(att);
                        hdiv_zoom.appendChild(cacheImage);
                        hdiv_zoom.title = "Zoom to this location";
                        hdiv_zoom.onclick = jQuery.proxy(function (evt) {
                            var targ;
                            if (!evt)
                                var evt = window.event;
                            if (evt.target)
                                targ = evt.target;
                            else
                                if (evt.srcElement)
                                    targ = evt.srcElement;
                            if (targ.nodeType == 3) // defeat Safari bug
                                targ = targ.parentNode;

                            var resultID;
                            var _checkclass = $(targ).hasClass('fa-filter');
                            if (_checkclass) {
                                resultID = $(targ).parent().attr('data-licencenumber'); // Get parent tr ID.
                            } else {
                                resultID = $(targ).attr('data-licencenumber'); // Get parent tr ID.
                            }
                            //debugger;
                            var _str = resultID;
                            var _res = _str.replace(/£/g, "/");
                            var _drillLicenceNumber = _res;
                            $('#txtFilter').val(_drillLicenceNumber);
                            $('#btnFilter').trigger('click');
                            //getLicenceDetails(resultID);
                        }, this);


                    }
                    if (attribute.toUpperCase() === 'LOCATION CODE' || attribute.toUpperCase() === 'LOCATION_CODE') {
                        Location_Code = result.feature.attributes[attribute];
                        var str = Location_Code;
                        var res = str.replace(/\//g, "£");
                        Location_Code = res;

                        tRow = tBody.appendChild(tr.cloneNode(true));
                        tRow.id = "Result_" + i;
                        tRow.className = "trow";
                        tCell = tRow.appendChild(td.cloneNode(true));
                        tCell.className = "fieldname";
                        tCell.appendChild(document.createTextNode(attribute));
                        tCell2 = tRow.appendChild(td.cloneNode(true));
                        tCell2.className = "fieldresult";

                        //Attach Zoom Button
                        if (result.feature.geometry && that) {
                            var hdiv_zoom = tCell2.appendChild(document.createElement('a'));
                            //hdiv_zoom.appendChild(document.createTextNode(result.value));
                            hdiv_zoom.className = "button zoomtobutton";

                            hdiv_zoom.id = "Result_" + i;
                            cacheImage = document.createElement('i');
                            cacheImage.className = "fa fa-search-plus";
                            cacheImage.title = "Zoom to this location";
                            var att = document.createAttribute("aria-hidden");
                            att.value = "true";
                            cacheImage.setAttributeNode(att);
                            hdiv_zoom.appendChild(cacheImage);
                            hdiv_zoom.title = "Zoom to this location";
                            hdiv_zoom.onclick = jQuery.proxy(function (evt) {
                                var targ;
                                if (!evt)
                                    var evt = window.event;
                                if (evt.target)
                                    targ = evt.target;
                                else
                                    if (evt.srcElement)
                                        targ = evt.srcElement;
                                if (targ.nodeType == 3) // defeat Safari bug
                                    targ = targ.parentNode;

                                var resultID;
                                var _checkclass = $(targ).hasClass('fa-search-plus');
                                if (_checkclass) {
                                    resultID = $(targ).parent().attr('id').split('_')[1]; // Get parent tr ID.
                                } else {
                                    resultID = $(targ).attr('id').split('_')[1]; // Get parent tr ID.
                                }
                                //zoomtoGeometry(resultSet[resultID].feature);
                                //alert('Zoom ' + resultID);
                                zoomtoGeometry(resultSet[resultID].feature);
                            }, this);
                        }
                        //******************
                    }

                    if (attribute.toUpperCase() === 'LOCATION CODE' || attribute.toUpperCase() === 'LOCATION_CODE' || attribute.toUpperCase() === 'LICENCE NUMBER' || attribute.toUpperCase() === 'LICENCE_NUMBER') {
                        // Do Nothing

                    } else {
                        tRow = tBody.appendChild(tr.cloneNode(true));
                        tRow.id = "Result_" + i;
                        tRow.className = "trow";
                        tCell = tRow.appendChild(td.cloneNode(true));
                        tCell.className = "fieldname";
                        tCell.appendChild(document.createTextNode(attribute));
                        tCell2 = tRow.appendChild(td.cloneNode(true));
                        tCell2.className = "fieldresult";
                    }
                    //****************************************************************************************
                    var fieldValue = result.feature.attributes[attribute];
                    if ((fieldValue.indexOf("http://") == 0) || (fieldValue.indexOf(".jpg") > 0) || (fieldValue.indexOf(".png") > 0) || (fieldValue.indexOf(".gif") > 0)) {
                        tAnchorLic = document.createElement('a');
                        var myURL = result.feature.attributes[attribute];
                        if ((fieldValue.indexOf(".jpg") > 0) || (fieldValue.indexOf(".png") > 0) || (fieldValue.indexOf(".gif") > 0)) {
                            if (fieldValue.indexOf("http://") == 0) {
                                // Do Nothing - Contains a valid http://
                            } else {
                                myURL = 'file:///' + myURL;
                                myURL = myURL.replace(/\\/g, "/");
                            }
                        }
                        tAnchorLic.href = myURL;

                        tAnchorLic.appendChild(document.createTextNode('More Info'));
                        tCell2.appendChild(tAnchorLic);
                        tCell2.onclick = jQuery.proxy(function (evt) {
                            var targ;
                            if (!evt)
                                var evt = window.event;
                            if (evt.target)
                                targ = evt.target;
                            else
                                if (evt.srcElement)
                                    targ = evt.srcElement;
                            if (targ.nodeType == 3) // defeat Safari bug
                                targ = targ.parentNode;

                            //var resultID = $(targ).html(); // Get parent tr ID.
                            var resultID = $(targ).attr('href');
                            window.open(resultID, "_blank", 'toolbar=yes,status=yes,resizable=yes,scrollbars=yes,width=680,height=580,top=15,left=15');
                            return false;

                        }, this);
                    } else {
                        tCell2.appendChild(document.createTextNode(result.feature.attributes[attribute]));
                    }
                    //****************************************************************************************
                    //tCell2.appendChild(document.createTextNode(result.feature.attributes[attribute]));
                }
            }
        }
        //Put in details regarding the drilldowns
        //tBody.appendChild(document.createTextNode('Hello Bob 2'));
        //<button id="" title="Map Contents" type="button" class="ui-button ui-settings-button button" style="" data-toggle="left_nav"><i class="fa fa-bars fa-lg"></i><span>Map Contents</span></button>
        //Licence_Number 
        //Location_Code 
        hdiv_con = document.createElement('div');
        hdiv_con.className = 'expanded row ';

        //******************************************************************
        //hdiv = document.createElement('a');
        ////hdiv.className = 'column small-6 medium-4 large-2 button';
        //hdiv.className = 'column small-12 button drilldownbtn';
        //hdiv.title = 'Compliance Drilldown';
        //hdiv.id = 'btnCompliance_' + Licence_Number + '_' + Location_Code;
        
        //cacheImage = document.createElement('i');
        //cacheImage.className = "fa fa-angle-double-down";
        //cacheImage.title = "Click to open group";
        //var att = document.createAttribute("aria-hidden");
        //att.value = "true";
        //cacheImage.setAttributeNode(att);
        //hdiv.appendChild(cacheImage);
        ////hdiv.appendChild(document.createTextNode('Compliance ' + Licence_Number + ' ' + Location_Code));
        //hdiv.appendChild(document.createTextNode('Compliance'));
        //hdiv_con.appendChild(hdiv);
        ////*******************
        //hdiv_result = document.createElement('div');
        //hdiv_result.className = 'small-12 column drilldowndiv';
        //hdiv_result.style = "width:100%;overflow:auto;";
        //hdiv_result.id = 'resCompliance_' + Licence_Number + '_' + Location_Code;
        ////hdiv_result.innerHTML = 'Hello Compliance';
        //hdiv_con.appendChild(hdiv_result);
        ////*******************
        ////******************************************************************
        //hdiv = document.createElement('a');
        ////hdiv.className = 'column small-6 medium-4 large-2 button';
        //hdiv.className = 'column small-12 button drilldownbtn';
        //hdiv.title = 'Conditions Drilldown';
        //hdiv.id = 'btnConditions_' + Licence_Number + '_' + Location_Code;
        
        //cacheImage = document.createElement('i');
        //cacheImage.className = "fa fa-angle-double-down";
        //cacheImage.title = "Click to open group";
        //var att = document.createAttribute("aria-hidden");
        //att.value = "true";
        //cacheImage.setAttributeNode(att);
        //hdiv.appendChild(cacheImage);
        ////hdiv.appendChild(document.createTextNode('Conditions ' + Licence_Number + ' ' + Location_Code));
        //hdiv.appendChild(document.createTextNode('Conditions'));
        //hdiv_con.appendChild(hdiv);
        ////*******************
        //hdiv_result = document.createElement('div');
        //hdiv_result.className = 'small-12 column drilldowndiv';
        //hdiv_result.style = "width:100%;overflow:auto;";
        //hdiv_result.id = 'resConditions_' + Licence_Number + '_' + Location_Code;
        ////hdiv_result.innerHTML = 'Hello Conditions';
        //hdiv_con.appendChild(hdiv_result);
        ////*******************
        ////******************************************************************
        //hdiv = document.createElement('a');
        ////hdiv.className = 'column small-6 medium-4 large-2 button';
        //hdiv.className = 'column small-12 button drilldownbtn';
        //hdiv.title = 'Limits Drilldown';
        //hdiv.id = 'btnLimits_' + Licence_Number + '_' + Location_Code;

        //cacheImage = document.createElement('i');
        //cacheImage.className = "fa fa-angle-double-down";
        //cacheImage.title = "Click to open group";
        //var att = document.createAttribute("aria-hidden");
        //att.value = "true";
        //cacheImage.setAttributeNode(att);
        //hdiv.appendChild(cacheImage);
        ////hdiv.appendChild(document.createTextNode('Limits ' + Licence_Number + ' ' + Location_Code));
        //hdiv.appendChild(document.createTextNode('Limits'));
        //hdiv_con.appendChild(hdiv);
        ////*******************
        //hdiv_result = document.createElement('div');
        //hdiv_result.className = 'small-12 column drilldowndiv';
        //hdiv_result.style = "width:100%;overflow:auto;";
        //hdiv_result.id = 'resLimits_' + Licence_Number + '_' + Location_Code;
        ////hdiv_result.innerHTML = 'Hello Limits';
        //hdiv_con.appendChild(hdiv_result);
        ////*******************
        ////******************************************************************
        //hdiv = document.createElement('a');
        ////hdiv.className = 'column small-6 medium-6 large-3 button';
        //hdiv.className = 'column small-12 button drilldownbtn';
        //hdiv.title = 'Activities Drilldown';
        //hdiv.id = 'btnActivities_' + Licence_Number + '_' + Location_Code;

        //cacheImage = document.createElement('i');
        //cacheImage.className = "fa fa-angle-double-down";
        //cacheImage.title = "Click to open group";
        //var att = document.createAttribute("aria-hidden");
        //att.value = "true";
        //cacheImage.setAttributeNode(att);
        //hdiv.appendChild(cacheImage);
        ////hdiv.appendChild(document.createTextNode('Activities ' + Licence_Number + ' ' + Location_Code));
        //hdiv.appendChild(document.createTextNode('Activities'));
        //hdiv_con.appendChild(hdiv);
        ////*******************
        //hdiv_result = document.createElement('div');
        //hdiv_result.className = 'small-12 column drilldowndiv';
        //hdiv_result.style = "width:100%;overflow:auto;";
        //hdiv_result.id = 'resActivities_' + Licence_Number + '_' + Location_Code;
        ////hdiv_result.innerHTML = 'Hello Activities';
        //hdiv_con.appendChild(hdiv_result);
        ////*******************
        ////******************************************************************
        //hdiv = document.createElement('a');
        ////hdiv.className = 'column small-12 medium-6 large-3 button';
        //hdiv.className = 'column small-12 button drilldownbtn';
        //hdiv.title = 'Previous Licence Drilldown';
        //hdiv.id = 'btnPrevLicences_' + Licence_Number + '_' + Location_Code;

        //cacheImage = document.createElement('i');
        //cacheImage.className = "fa fa-angle-double-down";
        //cacheImage.title = "Click to open group";
        //var att = document.createAttribute("aria-hidden");
        //att.value = "true";
        //cacheImage.setAttributeNode(att);
        //hdiv.appendChild(cacheImage);
        ////hdiv.appendChild(document.createTextNode('Previous Licences ' + Licence_Number + ' ' + Location_Code));
        //hdiv.appendChild(document.createTextNode('Previous Licences'));
        //hdiv_con.appendChild(hdiv);
        ////*******************
        //hdiv_result = document.createElement('div');
        //hdiv_result.className = 'small-12 column drilldowndiv';
        //hdiv_result.style = "width:100%;overflow:auto;";
        //hdiv_result.id = 'resPrevLicences_' + Licence_Number + '_' + Location_Code;
        ////hdiv_result.innerHTML = 'Hello Previous Licences';
        //hdiv_con.appendChild(hdiv_result);
        ////*******************
        ////******************************************************************
       
        //li2.appendChild(hdiv_con);
        result.layerName
    }

    return resultTableArray;
}

//**************************************************************************
function resultSetToTableH(resultSet, that) {
    // Receives result array (featureSet) from an Identify Task/Query Task/Find Task and 
    // returns an array of tables for each layer in the result.
    // TODO : Validate input resultSet object.
    // collection of objects with feature property, containing attributes.
    var result;
    if (resultSet.length > 0) {
        var featureLayerId, feature;
        var resultTableArray = new Array(); // Array to store tables in. One Table for each layer that has identify results.
        // Create table elements, these will be cloned later
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var th = document.createElement('th');

        var tHead, tHeadRow, tHeadCell, tBody, tRow, tCell; // Reused when creating each table.
    }
    else {
        // No Data
        return null;
    }
    var iCount = 0;
    // ;
    for (var i = 0, il = resultSet.length; i < il; i++) {
        // ;
        // Loop through each feature in the featureSet.
        result = resultSet[i];

        if (resultTableArray[result.layerId] === undefined) {
            // No table created for that layer

            // Create table object
            resultTableArray[result.layerId] = document.createElement('table');
            //resultTableArray[result.layerId].className = "ImmTS_Default";
            resultTableArray[result.layerId].className = "ImmTS_Default tablesorter";

            // write header to the table			
            tHead = resultTableArray[result.layerId].appendChild(document.createElement('thead'));
            tHeadRow = tHead.appendChild(tr.cloneNode(true));

            tHeadCell = tHeadRow.appendChild(th.cloneNode(true));
            tHeadCell.appendChild(document.createTextNode('link'));
            // Check for geometry
            //                if (result.feature.geometry && that) {
            //                    var geomHead = th.cloneNode(true);
            //                    geomHead.className = 'noexport noprevious';
            //                    tHeadCell = tHeadRow.appendChild(geomHead);
            //                    //tHeadCell.appendChild(document.createTextNode(""));
            //                }
            for (var attribute in result.feature.attributes) {
                //if (this.displayField(attribute)) {
                var strFieldChecker = attribute;
                if (strFieldChecker == 'OBJECTID' || strFieldChecker == 'Object ID' || strFieldChecker == 'SHAPE' || strFieldChecker == 'Shape') {
                    //Skip this field

                } else {
                    tHeadCell = tHeadRow.appendChild(th.cloneNode(true));
                    tHeadCell.appendChild(document.createTextNode(attribute));

                }
                //}

            }


            // create table body.
            tBody = resultTableArray[result.layerId].appendChild(document.createElement('tbody'));

            // Write row
            tRow = tBody.appendChild(tr.cloneNode(true));
            tRow.id = "Result_" + i;
            // Check for geometry

            //var myLayers = JSON.parse(ThemeHyperlinkList);
            // ;
            var paramvalues = '';
            var tAnchorLic; //hyperlink variable
            var tCell;
            var flag2 = [];
          
            resultSet;
            if (result.feature.geometry && that) {
                tCell = tRow.appendChild(td.cloneNode(true));
                tCell.className = "noexport noprevious";
                var tAnchor = document.createElement('a');
                var timg = document.createElement('img');
                timg.src = './img/Tools/Zoom_In.png';
                tAnchor.appendChild(timg);
                //tAnchor.appendChild(document.createTextNode("Zoom to"));
                tAnchor.title = "Zoom to this feature";
                tAnchor.className = "ZoomToLink";
                tCell.appendChild(tAnchor);
                tCell.onclick = jQuery.proxy(function (evt) {
                    var targ;
                    if (!evt)
                        var evt = window.event;
                    if (evt.target)
                        targ = evt.target;
                    else
                        if (evt.srcElement)
                            targ = evt.srcElement;
                    if (targ.nodeType == 3) // defeat Safari bug
                        targ = targ.parentNode;


                    var resultID = $(targ).closest('tr')[0].id.split('_')[1]; // Get parent tr ID.
                    zoomtoGeometry(resultSet[resultID].feature);
                    //alert('Zoom');
                }, this);
            }

            for (var attribute in result.feature.attributes) {
                if (attribute) {
                    var strFieldChecker = attribute;
                    if (strFieldChecker == 'OBJECTID' || strFieldChecker == 'Object ID' || strFieldChecker == 'SHAPE' || strFieldChecker == 'Shape') {
                        //Skip this field - we don't want to display this field
                    } else {
                        
                       
                            // Not in JSON Params - Make normal Text
                            tCell = tRow.appendChild(td.cloneNode(true));

                            // Search for Hyperlink in field
                            var fieldValue = result.feature.attributes[attribute];
                            // ;
                            if ((fieldValue.indexOf("http://") == 0) || (fieldValue.indexOf(".jpg") > 0) || (fieldValue.indexOf(".png") > 0) || (fieldValue.indexOf(".gif") > 0)) {
                                //return '<img src="' + url + '">' + '<br/>'
                                // ;
                                tAnchorLic = document.createElement('a');
                                var myURL = result.feature.attributes[attribute];
                                if ((fieldValue.indexOf(".jpg") > 0) || (fieldValue.indexOf(".png") > 0) || (fieldValue.indexOf(".gif") > 0)) {
                                    if (fieldValue.indexOf("http://") == 0) {
                                        // Do Nothing - Contains a valid http://
                                    } else {
                                        myURL = 'file:///' + myURL;
                                        myURL = myURL.replace(/\\/g, "/");
                                    }
                                }
                                tAnchorLic.href = myURL;
                                //tAnchorLic.href = result.feature.attributes[attribute];

                                tAnchorLic.appendChild(document.createTextNode('More Info'));
                                tCell.appendChild(tAnchorLic);
                                tCell.onclick = jQuery.proxy(function (evt) {
                                    var targ;
                                    if (!evt)
                                        var evt = window.event;
                                    if (evt.target)
                                        targ = evt.target;
                                    else
                                        if (evt.srcElement)
                                            targ = evt.srcElement;
                                    if (targ.nodeType == 3) // defeat Safari bug
                                        targ = targ.parentNode;

                                    //var resultID = $(targ).html(); // Get parent tr ID.
                                    var resultID = $(targ).attr('href');
                                    //$('#ImageViewerDivContents').empty().append('<img alt="" src="' + resultID + '" />')
                                    window.open(resultID, "_blank", 'toolbar=no,status=yes,resizable=yes,scrollbars=yes,width=680,height=580,top=15,left=15');
                                    return false;

                                }, this);
                            } else {
                                //return '<a href="' + url + '">' + url + '</a>' + '<br/>'
                                // ;
                                tCell.appendChild(document.createTextNode(result.feature.attributes[attribute]));
                            }


                            //*********************************
                            //tCell.appendChild(document.createTextNode(result.feature.attributes[attribute]));





                       
                    }
                }
            }
        }
        else {
            // Find table body within table element.
            tBody = resultTableArray[result.layerId].getElementsByTagName('tbody')[0];
            tRow = tBody.appendChild(tr.cloneNode(true));
            tRow.id = "Result_" + i;
            // Write row to table
            //var myLayers = JSON.parse(ThemeHyperlinkList);
            var paramvalues = '';
            var tAnchorLic; //hyperlink variable
            var tCell;
            var flag2 = [];
         
            // Geometry
            if (result.feature.geometry && that) {
                tCell = tRow.appendChild(td.cloneNode(true));
                tCell.className = 'noexport noprevious';
                var tAnchor = document.createElement('a');
                var timg = document.createElement('img');
                timg.src = './img/Tools/Zoom_In.png';
                tAnchor.appendChild(timg);
                // tAnchor.appendChild(document.createTextNode("Zoom to"));
                tAnchor.title = "Zoom to this feature";
                tCell.appendChild(tAnchor);
                tCell.onclick = jQuery.proxy(function (evt) {
                    var targ;
                    if (!evt)
                        var evt = window.event;
                    if (evt.target)
                        targ = evt.target;
                    else
                        if (evt.srcElement)
                            targ = evt.srcElement;
                    if (targ.nodeType == 3) // defeat Safari bug
                        targ = targ.parentNode;


                    var resultID = $(targ).closest('tr')[0].id.split('_')[1]; // Get parent tr ID.
                    zoomtoGeometry(resultSet[resultID].feature);
                }, this);
            }

            for (var attribute in result.feature.attributes) {
                if (attribute) {
                    var strFieldChecker = attribute;
                    if (strFieldChecker == 'OBJECTID' || strFieldChecker == 'Object ID' || strFieldChecker == 'SHAPE' || strFieldChecker == 'Shape') {
                        //Skip this field - we don't want to display this field
                    } else {
                        
                            // Not in JSON Params - Make normal Text
                            tCell = tRow.appendChild(td.cloneNode(true));
                            // ;
                            // Search for Hyperlink in field
                            var fieldValue = result.feature.attributes[attribute];
                            // ;
                            if ((fieldValue.indexOf("http://") == 0) || (fieldValue.indexOf(".jpg") > 0) || (fieldValue.indexOf(".png") > 0) || (fieldValue.indexOf(".gif") > 0)) {
                                //return '<img src="' + url + '">' + '<br/>'
                                // ;
                                tAnchorLic = document.createElement('a');
                                var myURL = result.feature.attributes[attribute];
                                if ((fieldValue.indexOf(".jpg") > 0) || (fieldValue.indexOf(".png") > 0) || (fieldValue.indexOf(".gif") > 0)) {
                                    if (fieldValue.indexOf("http://") == 0) {
                                        // Do Nothing - Contains a valid http://
                                    } else {
                                        myURL = 'file:///' + myURL;
                                        myURL = myURL.replace(/\\/g, "/");
                                    }
                                }
                                tAnchorLic.href = myURL;
                                //tAnchorLic.href = result.feature.attributes[attribute];

                                tAnchorLic.appendChild(document.createTextNode('More Info'));
                                tCell.appendChild(tAnchorLic);
                                tCell.onclick = jQuery.proxy(function (evt) {
                                    var targ;
                                    if (!evt)
                                        var evt = window.event;
                                    if (evt.target)
                                        targ = evt.target;
                                    else
                                        if (evt.srcElement)
                                            targ = evt.srcElement;
                                    if (targ.nodeType == 3) // defeat Safari bug
                                        targ = targ.parentNode;

                                    //var resultID = $(targ).html(); // Get parent tr ID.
                                    var resultID = $(targ).attr('href');
                                    //$('#ImageViewerDivContents').empty().append('<img alt="" src="' + resultID + '" />')
                                    window.open(resultID, "_blank", 'toolbar=no,status=yes,resizable=yes,scrollbars=yes,width=680,height=580,top=15,left=15');
                                    return false;

                                }, this);
                            } else {
                                //return '<a href="' + url + '">' + url + '</a>' + '<br/>'
                                // ;
                                tCell.appendChild(document.createTextNode(result.feature.attributes[attribute]));
                            }


                            //*********************************


                            //tCell.appendChild(document.createTextNode(result.feature.attributes[attribute]));



                        
                    }
                }
            }
        }
    }

    // Add an export to each table footer.
    for (var prop in resultTableArray) {
        // Count number of columns (look for th elements)
        var colCount = $('th', resultTableArray[prop]).size();
        // resultTableArray[prop].appendChild(this._getExportFooter(colCount));
    }
    // ;
    return resultTableArray;

}
//**************************************************************************
function zoomtoGeometry(graphic, graphicLayerName) {
    var resultGraphic = graphic;
    var buffDist = 100;


    if (resultGraphic.geometry.type == 'polygon') {

        graphicExtent = resultGraphic.geometry.getExtent();
        graphicExtent.xmin -= buffDist;
        graphicExtent.ymin -= buffDist;
        graphicExtent.xmax += buffDist;
        graphicExtent.ymax += buffDist;
        var graphic = new esri.Graphic(resultGraphic.geometry, graphic_result_polygon_selected);
        gl_Query_results_selected.clear();
        gl_Query_results_selected.add(graphic);

    }
    if (resultGraphic.geometry.type == 'polyline') {
        graphicExtent = resultGraphic.geometry.getExtent();
        graphicExtent.xmin -= buffDist;
        graphicExtent.ymin -= buffDist;
        graphicExtent.xmax += buffDist;
        graphicExtent.ymax += buffDist;
        var graphic = new esri.Graphic(resultGraphic.geometry, graphic_result_line_selected);
        gl_Query_results_selected.clear();
        gl_Query_results_selected.add(graphic);
    }

    if (resultGraphic.geometry.type == 'line') {
        //;
    }

    if (resultGraphic.geometry.type == 'multipoint') {

        graphicExtent = resultGraphic.geometry.getExtent();
        graphicExtent.xmin -= buffDist;
        graphicExtent.ymin -= buffDist;
        graphicExtent.xmax += buffDist;
        graphicExtent.ymax += buffDist;

        var point = new esri.geometry.Point(resultGraphic.geometry.points[0][0], resultGraphic.geometry.points[0][1], map.spatialReference);
        var graphic = new esri.Graphic(point, graphic_result_point_selected);
        gl_Query_results_selected.clear();
        gl_Query_results_selected.add(graphic);

    }
    if (resultGraphic.geometry.type == 'point') {
        // Point geometries don't have getExtent method. Create extent with buffdist + xy.
        graphicExtent = new esri.geometry.Extent();
        graphicExtent.xmin = resultGraphic.geometry.x - buffDist;
        graphicExtent.ymin = resultGraphic.geometry.y - buffDist;
        graphicExtent.xmax = resultGraphic.geometry.x + buffDist;
        graphicExtent.ymax = resultGraphic.geometry.y + buffDist;
        graphicExtent.spatialReference = resultGraphic.geometry.spatialReference;

        var point = new esri.geometry.Point(resultGraphic.geometry.x, resultGraphic.geometry.y, map.spatialReference);

        var graphic = new esri.Graphic(point, graphic_result_point_selected);
        gl_Query_results_selected.clear();
        gl_Query_results_selected.add(graphic);

    }
    map.setExtent(graphicExtent, true);
    //Wait for a second after the dynamic service is loaded to create the table of contents
    setTimeout(function () {
        gl_Query_results_selected.clear();;
    }, 10000);
}

//**************************************************************************