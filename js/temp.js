                       //********************Map layer21 iden start**************************************

                        if (mapUrl == soils21.url) {


                            $('#idencontent_').empty().append(_html21);
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
                                $("#idpanel26").append(docFragment24);
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