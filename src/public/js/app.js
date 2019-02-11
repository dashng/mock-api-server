(function () {
    var button = document.querySelector('button[name="btn_save"]');
    var projectNameIfd = document.querySelector('input[name="project"]');
    var methodSel = document.querySelector('select[name="method"]');
    var apiUrlIfd = document.querySelector('input[name="api"]');
    var headersText = document.querySelector('textarea[name="headers"]');
    var dataText = document.querySelector('textarea[name="data"]');

    var Rx = rxjs;

    function validator(formCtrl, subscriber) {
        Rx.
            fromEvent(formCtrl, 'keyup').
            pipe(Rx.operators.map(function (event) {
                return event.target.value;
            })).
            pipe(Rx.operators.debounceTime(200)).
            pipe(Rx.operators.distinctUntilChanged()).
            subscribe(subscriber);
        Rx.of(formCtrl.value).subscribe(subscriber);
    }

    var frmCtrlsValidations = [
        {
            'field': projectNameIfd,
            'regex': function (frmCtrlValue) {
                var regExp = new RegExp('^[\u4e00-\u9fa5_a-zA-Z0-9]+$', 'g');
                return regExp.test(frmCtrlValue);
            },
            'msg': 'Invalid project name.'
        },
        {
            'field': methodSel,
            'regex': function (frmCtrlValue) {
                var regExp = new RegExp('^GET|POST|PUT|DELETE|PATCHE$', 'g');
                return regExp.test(frmCtrlValue);
            },
            'msg': 'Invalid method name provided.'
        },
        {
            'field': apiUrlIfd,
            'regex': function (frmCtrlValue) {
                return !!frmCtrlValue;

            },
            'msg': 'Invalid api url provided, starts with \'/\'.'
        },
        {
            'field': headersText,
            'regex': function (frmCtrlValue) {
                try {
                    var frmCtrlValueJSON = JSON.parse(frmCtrlValue);
                    if (! (frmCtrlValueJSON.constructor === Object)) {
                        throw Error('Invalid json string.');
                    }
                    return true;
                } catch (err) {
                    return false;
                }
            },
            'msg': 'Invalid headers provided.'
        },
        {
            'field': dataText,
            'regex': function (frmCtrlValue) {
                try {
                    var frmCtrlValueJSON = JSON.parse(frmCtrlValue);
                    if (! (frmCtrlValueJSON.constructor === Object)) {
                        throw Error('Invalid json string, should be json string.');
                    }
                    return true;
                } catch (err) {
                    return false;
                }
            },
            'msg': 'Invalid data provided, should be json string.'
        }
    ];

    for (var i = 0, len = frmCtrlsValidations.length; i < len; i++) {
        var frmCtrlValidation = frmCtrlsValidations[i];
        var subscriber = (function () {
            var field = frmCtrlValidation.field;
            var msg = frmCtrlValidation.msg;
            var regex = frmCtrlValidation.regex;
            return function (formCtrlValue) {
                var parentNode = field.parentNode;
                var label = parentNode.querySelector('div');
                if (label) {
                    parentNode.removeChild(label);
                }
                if (!regex(formCtrlValue)) {
                    var label = document.createElement('div');
                    label.classList.add('error');
                    label.innerHTML = msg;
                    parentNode.appendChild(label);
                }
            };
        })()
        validator(frmCtrlValidation.field, subscriber);
    }

    button.addEventListener('click', function () {
        var errors = document.querySelectorAll('div.error');
        if (errors.length > 0) {
            return false;
        } 
        var projectName = projectNameIfd.value;
        var method = methodSel.value;
        var apiUrl = apiUrlIfd.value;
        var headers = headersText.value;
        var data = dataText.value;
        Rx.ajax.ajax.post(
            '/simulate_data',
            [projectName, method, apiUrl, JSON.parse(headers), JSON.parse(data)],
            {'Content-Type': 'application/json'}
        )
        .subscribe(function(res) {
           if (res.status === 200) {
               alert('The simulated data saved successfully.');
               loadApiList();
           }
        });
    });

    function loadApiList() {
        Rx.ajax.ajax.get('/simulate_data').subscribe(function(ret) {
            if (ret.status !== 200) {
                return false;
            }
            var data = _.get(ret, 'response.data', []);
            var tbody = document.querySelector('table.fixed_header tbody');
            var trs = _(data).map(function(item) {
                    var values = _.values(item);
                    return _(values).map(function(_item) {
                        return '<td title = ' + JSON.stringify(_item) +' > ' + _item + '</td>';
                    }).value();
                }).value();
            trs = _.map(trs, function(tds) {
                return '<tr>' + 
                            tds.join('') + 
                            '<td>' + 
                            '<a href="javascript:void(0);">X</a>' + 
                            '</td>' + 
                        '</tr>';
            });
            tbody.innerHTML = trs.join('');
            let hrefs = tbody.querySelectorAll('a');
            Rx.
            from(hrefs).
            pipe(Rx.operators.flatMap(function(href) {
                return Rx.fromEvent(href, 'click');
            })).
            subscribe(function(event) {
                var tr = event.target.parentNode.parentNode;
                var childNodes = tr.childNodes;
                var urlField = childNodes[2];
                var methodField = childNodes[1];
                var url = urlField.getAttribute("title");
                var method = methodField.getAttribute("title");
                var requestUrl = '/simulate_data/' + [encodeURIComponent(url), encodeURIComponent(method)].join('/') 
                Rx.ajax.ajax.delete(requestUrl)
                .subscribe(function(res) {
                   if (res.status === 200) {
                       alert('The selected simulated data removed successfully.');
                       loadApiList();
                   }
                });
            });

        });
    }

    loadApiList();
    
})();

