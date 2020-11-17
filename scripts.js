$(document).ready(function() {

    function cname(name) {
        switch (name) {
            case "novinpendar":
                return "نوین پندار";
            case "darinoos":
                return "دارینوس";
            case "sarirgame":
                return "سریرگیم";
            case "novin":
                return "نوین";
            case "roga":
                return "روگا";
            case "pardisgame":
                return "پردیس گیم";
            case "parsgame":
                return "پارس گیم";
            case "3nobar":
                return "صنوبر";
            case "rasaneh":
                return "رسانه افزار مهر";
            case "vnvgames":
                return "ویرایشگران نصر وصال";
            case "aryan":
                return "آرین";
            case "ebay":
                return "eBay";
            case "ariana":
                return "آریانا";
            case "asrebazi":
                return "عصر بازی";
            case "modern":
                return "مدرن";
            case "newtech":
                return "نیوتک";
            case "vistarayane":
                return "ویستا رایانه";
            case "speed":
                return "اسپید";
            case "cyber":
                return "سایبر";
            case "kgsco":
                return "کهکشان";
            case "gamedooble":
                return "گیم دوبله";
            case "unknown":
            case undefined:
            case null:
            case "":
                return "نامعلوم";
            default:
                return name;
        }
    }

    function csort(name) {
        switch (name) {
            case "novinpendar":
                return "01";
            case "darinoos":
                return "02";
            case "novin":
            case "roga":
                return "03";
            case "vistarayane":
                return "04";
            case "aryan":
            case "ebay":
                return "05";
            case "ariana":
                return "06";
            case "speed":
                return "07";
            case "pardisgame":
                return "08";
            case "parsgame":
                return "09";
            case "3nobar":
                return "10";
            case "rasaneh":
                return "11";
            case "vnvgames":
                return "12";
            case "sarirgame":
                return "13";
            case "asrebazi":
            case "modern":
            case "newtech":
                return "14";
            case "cyber":
                return "15";
            case "unknown":
            case undefined:
            case null:
            case "":
                return "99";
            default:
                return "98" + name;
        }
    }

    function cnames(names) {
        if(names) {
            var result = "";
            names.split(/\s*,\s*/).forEach(function(name) {
                result += cname(name) + ", ";
            });
            return result.replace(/,\s*$/, "");
        } else {
            return cname(null);
        }
    }

    function status(status) {
        switch (status) {
            case "uploaded":
                return "آپلود شده";
            case "available":
                return "موجود";
            case "sell":
                return "در حال فروش توسط ناشر اصلی";
            case "lost":
            default:
                return "گمشده";
        }
    }

    function gtype(status) {
        switch (status) {
            case "dubbed":
                return "دوبله فارسی";
            case "subtitle":
                return "زیرنویس فارسی";
            case "iranian":
                return "بازی ایرانی";
            default:
                return "";
        }
    }

    function ftype(type) {
        switch (type) {
            case "image":
                return "ایمیج";
            case "setup":
                return "ستاپ اوریجینال";
            case "patch":
                return "وصله‌ی فارسی‌ساز";
            case "repack":
                return "ری‌پک غیر رسمی";
            case "preinstalled":
                return "از پیش نصب شده";
            default:
                return "";
        }
    }

    function ftypes(types) {
         if(types) {
            var result = "";
            types.split(/\s*,\s*/).forEach(function(type) {
                result += ftype(type) + ", ";
            });
            return result.replace(/,\s*$/, "");
        } else {
            return ftype(null);
        }
    }

    var table = $('#games').DataTable({
        "ajax": "games.json",
        "deferRender": false,
        drawCallback: function () {
          $( 'a.paginate_button', this.api().table().container() ).attr('href', '#!');
        },
        "columns": [{
                className: 'control',
                orderable: false
            },
            {
                "data": "title",
                "className": "ltr"
            },
            {
                "data": "titlefa"
            },
            {
                "data": "producer",
                "render": function(data, type, row, meta) {
                    if(type == "sort") {
                        if(data && data.indexOf(',') > -1) {
                            data = data.substr(0, data.indexOf(','));
                        }
                        return csort(data);
                    } else {
                        return cnames(data);
                    }
                }
            },
            {
                "data": "cover",
                "render": function(data, type, row, meta) {
                    var result = "";
                    if(data) {
                        data.split(/\s*,\s*/).forEach(function(myString) {
                            result += '<a href="covers/' + myString + '" target="_blank"><img src="covers/' + myString + '" loading="lazy" alt="' + row.titlefa + ' - ' + row.title + ' - ' + cname(row.publisher) + '"></a>';
                        });
                    }
                    return result;
                }
            },
            {
                "data": "publisher",
                "render": function(data, type, row, meta) {
                    return cnames(data);
                }
            },
            {
                "data": "guidebook"
            },
            {
                "data": "file_type",
                "render": function(data, type, row, meta) {
                    return ftypes(data);
                }
            },
            {
                "data": "game_type",
                "render": function(data, type, row, meta) {
                    return gtype(data);
                }
            },
            {
                "data": "release_date"
            },
            {
                "data": "status",
                "render": function(data, type, row, meta) {
                    return status(data);
                }
            },
            {
                "data": "notes",
                "render": function(data, type, row, meta) {
                    if(data) {
                        return data.replace(/(?:\r\n|\r|\n)/g, '<br>');
                    } else {
                        return "";
                    }
                }
            }
        ],
        "createdRow": function(row, data, dataIndex) {
            if(data.status != "uploaded" && data.status != "available" && data.status != "sell") {
                $(row).addClass('lost'); return;
            }
            if(data.incomplete) {
                $(row).addClass('incomplete');
            }
        },
        "responsive": {
            details: {
                type: 'column',
                renderer: function(api, rowIdx, columns) {
                    var data = $.map(columns, function(col, i) {
                        return col.hidden ?
                            '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                            '<td>' + col.title + ':' + '</td> ' +
                            '<td>' + col.data + '</td>' +
                            '</tr>' :
                            '';
                    }).join('');
                    return data ?
                        $('<table/>').append(data) :
                        false;
                }

            }
        },
        columnDefs: [{
            "defaultContent": "",
            "targets": "_all"
        }],
        order: [
            [3, 'asc'],
            [10, 'asc'],
            [1, 'asc']
        ],
        "lengthMenu": [50, 200, 500, 1000],
        "pageLength": 50,
        "lengthChange": true,
        "language": {
            "url": "Persian.json"
        },
        "initComplete": function(settings, json) {
var upgames = this.api()
    .column( 10 )
    .data()
    .filter( function ( value, index ) {
        return value === "uploaded" ? true : false;
    } );
        document.getElementById("upgames").textContent = upgames.count();
        }
    });

    $('#btn-show-all-children').on('click', function() {
        table.rows(':not(.parent)').nodes().to$().find('td:first-child').trigger('click');
    });

    $('#btn-hide-all-children').on('click', function() {
        table.rows('.parent').nodes().to$().find('td:first-child').trigger('click');
    });

});
