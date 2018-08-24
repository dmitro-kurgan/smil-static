GoogleMapsLoader.KEY = 'AIzaSyDP13T048ji9u8_di9Gdpmh6bkBhPoC3bs';
GoogleMapsLoader.LANGUAGE = 'ua';

if(document.getElementById('map')) {
  GoogleMapsLoader.load(function(google) {
    var myLatLng = {lat: 34.216503, lng: -119.067377};

    var shops = [
      ['Магазин «Тигреня»', 50.407288, 30.666116, 13],
      ['Магазин «Все для мами та немовля»', 50.407878, 30.655771, 12],
      ['Интернет-магазин «Кииндер»', 50.401929, 30.629316, 11],
      ['Магазин «Дитячі мрії»', 50.416421, 30.629342, 10],
      ['Магазин «Мама и я»', 50.402169, 30.623385, 9],
      ['Интернет-магазин «Умка»', 50.430069, 30.653894, 8],
      ['Магазин «Егорка»', 50.415701, 30.626197, 7],
      ['Магазин «Егорка»', 50.395403, 30.641630, 6],
      ['Интернет-магазин «Лучик»', 50.395558, 30.620360, 5],
      ['Магазин «Беби парк»', 50.393465, 30.615149, 4],
      ['Магазин «Оденем деток»', 50.395382, 30.641641, 3],
      ['Магазин «Фунтик»', 50.421655, 30.649884, 2],
      ['«Бебизона» магазин', 50.410678, 30.633573, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: shops[shops.length - 1][1], lng: shops[shops.length - 1][2]},
	    scrollwheel:false,
	    zoom: 13,
        styles: [
        {
          "stylers": [
            { "saturation": -100 }
          ] 
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            { "visibility": "off" }
          ]
        }
      ]
    });

    for (var i = 0; i < shops.length; i++) {
      var shop = shops[i];
      var marker = new google.maps.Marker({
        map: map,
        position: {lat: shop[1], lng: shop[2]},
        animation: google.maps.Animation.DROP,
        title: shop[0],
        zIndex: shop[3]
      });
    };
  });
};