var map, isCollapsed, basemap_osm, googleSatellite, googleStreets, googleHybrid, googleTerrain, minzoom = 8,
    maxzoom = 20;

/* 109.6113097668,-8.1601552157,
111.9678771496,-6.312888204 */

if (document.body.clientWidth <= 767) {
    var isCollapsed = true;
} else {
    var isCollapsed = false;
}

var southWest = L.latLng(-8.1601552157, 109.6113097668),
    northEast = L.latLng(-6.312888204, 111.9678771496),
    maxBoundingBox = L.latLngBounds(southWest, northEast);

googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxBounds: maxBoundingBox,
    minZoom: minzoom,
    maxZoom: maxzoom,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Layanan <strong>Google Satellite</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
});
googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxBounds: maxBoundingBox,
    minZoom: minzoom,
    maxZoom: maxzoom,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Layanan <strong>Google Streets</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
});
googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxBounds: maxBoundingBox,
    minZoom: minzoom,
    maxZoom: maxzoom,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Layanan <strong>Google Hybrid</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
});
googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxBounds: maxBoundingBox,
    minZoom: minzoom,
    maxZoom: maxzoom,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Layanan <strong>Google Terrain</strong> disediakan oleh <a href="https://www.google.com/maps" target="_blank">Google, Inc.</a>'
});
basemap_osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

var batasAdminGroup = L.featureGroup(null);
var dataIrigasiGroup = L.featureGroup(null);

//bikin template geojson start

//bikin grup Admin START
var admindesa = L.geoJson(null, {
    style: function(feature) {
        return {
            stroke: true,
            color: '#0000FF',
            opacity: 1,
            weight: 0.5,
            fill: true,
            fillOpacity: 0
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<table class='table table-condensed table-striped table-bordered'><thead><tr><th colspan='2'>Batas Wilayah Kabupaten</th></tr></thead><tbody><tr><td>Nama Kabupaten</td><td>" + feature.properties.desa + "</td></tr></tbody></table>");
    }
});

var adminkecamatan = L.geoJson(null, {
    style: function(feature) {
        if (feature.properties.kode_kec == '1') {
            return { stroke: true, color: '#543005', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '2') {
            return { stroke: true, color: '#8c510a', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '3') {
            return { stroke: true, color: '#bf812d', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '4') {
            return { stroke: true, color: '#35978f', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '5') {
            return { stroke: true, color: '#01665e', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '6') {
            return { stroke: true, color: '#8e0152', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '7') {
            return { stroke: true, color: '#003c30', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '8') {
            return { stroke: true, color: '#a50026', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '9') {
            return { stroke: true, color: '#d73027', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '10') {
            return { stroke: true, color: '#f46d43', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '11') {
            return { stroke: true, color: '#74add1', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '12') {
            return { stroke: true, color: '#4575b4', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '13') {
            return { stroke: true, color: '#313695', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '14') {
            return { stroke: true, color: '#40004b', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '15') {
            return { stroke: true, color: '#762a83', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else if (feature.properties.kode_kec == '16') {
            return { stroke: true, color: '#7f3b08', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        } else {
            return { stroke: true, color: '#00441b', opacity: 1, weight: 2, fill: true, fillOpacity: 0.2 };
        }
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<table class='table table-condensed table-striped table-bordered'><thead><tr><th colspan='2'>Batas Wilayah Kecamatan</th></tr></thead><tbody><tr><td>Nama Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr><tr><td>Kode Kabupaten</td><td>" + feature.properties.kode_kab + "</td></tr><tr><td>Kode Kecamatan</td><td>" + feature.properties.kode_kec + "</td></tr></tbody></table>");
    }
});

var adminkabupaten = L.geoJson(null, {
    style: function(feature) {
        return {
            stroke: true,
            color: '#FF0000',
            opacity: 1,
            weight: 2.5,
            fill: true,
            fillOpacity: 0
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<table class='table table-condensed table-striped table-bordered'><thead><tr><th colspan='2'>Batas Wilayah Kabupaten</th></tr></thead><tbody><tr><td>Nama Kabupaten</td><td>" + feature.properties.kabupaten + "</td></tr></tbody></table>");
    }
});
//Grup Data Irigasi END


//Grup Data Irigasi START

var irigasidaerah = L.geoJson(null, {
    style: function(feature) {
        return {
            stroke: true,
            color: '#0000FF',
            opacity: 1,
            weight: 2.5,
            fill: true,
            fillOpacity: 0
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<table class='table table-condensed table-striped table-bordered'><thead><tr><th colspan='2'>Daerah Irigasi</th></tr></thead><tbody><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Luas DI</td><td>" + feature.properties.shape_area + "</td></tr><tr><td>Panjang DI</td><td>" + feature.properties.shape_leng + "</td></tr><tr><td colspan='2' class='text-center'><img id='" + feature.properties.skema + "' class='gambarskema' src='assets/img/skema/" + feature.properties.skema + "' width='200'/></td></tr></tbody></table>");
    }
});

var _gambarskema = document.querySelector('.gambarskema');
/*_gambarskema.addEventListener('click', function(evt) {
    evt.preventDefault();
    var _idgambar = this.getAttribute('id');
    console.log(_idgambar);
});*/

var irigasipetak = L.geoJson(null, {
    style: function(feature) {
        return {
            stroke: true,
            color: '#7fbf7b',
            opacity: 1,
            weight: 2.5,
            fill: true,
            fillOpacity: 0
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<table class='table table-condensed table-striped table-bordered'><thead><tr><th colspan='2'>Petak Irigasi</th></tr></thead><tbody><tr><td>Kode Petak Irigasi</td><td>" + feature.properties.objectid + "</td></tr><tr><td>Nama Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tr><tr><td>Luas Petak Irigasi</td><td>" + feature.properties.luas + "</td></tr><tr><td>Pemilik</td><td>" + feature.properties.pemilik + "</td></tr></tbody></table>");
    }
});

var irigasisaluran = L.geoJson(null, {
    style: function(feature) {
        return {
            stroke: true,
            color: '#fc8d59',
            opacity: 1,
            weight: 2.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<table class='table table-condensed table-striped table-bordered'><thead><tr><th colspan='2'>Saluran Irigasi</th></tr></thead><tbody><tr><td>Kode Saluran</td><td>" + feature.properties.k_saluran + "</td></tr><tr><td>Nomenklatur Saluran</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>Detail Saluran</td><td>" + feature.properties.nama + "</td></tr></tr><tr><td>Kondisi Saluran</td><td>" + feature.properties.kondisi + "</td></tr><tr><td>Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tbody></table>");
    }
});

var irigasibangunan = L.geoJson(null, {
    pointToLayer: function(feature, latLng) {
        if (feature.properties.k_bangunan == '1-1-1-1-02') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-black.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });
        } else if (feature.properties.k_bangunan == '1-1-1-1-06') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-blue.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-1-07') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-blue-old.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-1-90') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-blue-white.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-1-99') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-brown.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-01') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-brown-white.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-02') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-cyan.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-03') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-cyan-white.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });


        } else if (feature.properties.k_bangunan == '1-1-1-2-04') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-green.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-06') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-green-white.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-07') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-grey.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-08') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-pink.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-09') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-pink-white.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });


        } else if (feature.properties.k_bangunan == '1-1-1-2-11') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-purple.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-12') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-purple-white.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-13') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-red.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-14') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-red-white.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-15') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-white.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else if (feature.properties.k_bangunan == '1-1-1-2-16') {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-yellow.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        } else {
            return L.marker(latLng, {
                icon: L.icon({
                    iconUrl: 'assets/img/bang-yellow-white.png',
                    iconSize: [24, 28],
                    iconAnchor: [12, 28],
                    popupAnchor: [0, -25]
                }),
                title: feature.properties.nama,
                riseOnHover: true
            });

        }
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<table class='table table-condensed table-striped table-bordered'><thead><tr><th colspan='2'>Bangunan Irigasi Irigasi</th></tr></thead><tbody><tr><td>Kode Bangunan</td><td>" + feature.properties.k_bangunan + "</td></tr><tr><td>Nomenklatur Bangunan</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>Detail Bangunan</td><td>" + feature.properties.nama + "</td></tr></tr><tr><td>Kondisi Bangunan</td><td>" + feature.properties.kondisi + "</td></tr><tr><td>Daerah Irigasi</td><td>" + feature.properties.nama_di + "</td></tr><tr><td>Desa</td><td>" + feature.properties.desa + "</td></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr></tbody></table>");
    }
});



var efisiensi = L.geoJson(null, {
    style: function(feature) {
        return {
            stroke: true,
            color: '#fc8d59',
            opacity: 1,
            weight: 2.5
        };
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<table class='table table-condensed table-striped table-bordered'><thead><tr><th colspan='2'>Efisiensi Irigasi</th></tr></thead><tbody><tr><td>Kode Saluran</td><td>" + feature.properties.k_saluran + "</td></tr><tr><td>Nomenklatur Saluran</td><td>" + feature.properties.nomenklatu + "</td></tr><tr><td>DI</td><td>" + feature.properties.nama_di + "</td></tr></tr><tr><td>Kecamatan</td><td>" + feature.properties.kecamatan + "</td></tr><tr><td>September</td><td>" + feature.properties.rerata_ei_sept + "</td></tr><tr><td>Oktober</td><td>" + feature.properties.rerata_ei_okt + "</td></tr><tr><td>November</td><td>" + feature.properties.rerata_ei_nov + "</td></tr><tr><td>Desember</td><td>" + feature.properties.rerata_ei_des + "</td></tr><tr><td>Januari</td><td>" + feature.properties.rerata_ei_jan + "</td></tr><tr><td>Februari</td><td>" + feature.properties.rerata_ei_feb + "</td></tr><tr><td>Maret</td><td>" + feature.properties.rerata_ei_mar + "</td></tr><tr><td>April</td><td>" + feature.properties.rerata_ei_apr + "</td></tr></tbody></table>");
    }
});

//Grup Data Irigasi END

//bikin template geojson END

//sedot data START
$.getJSON("./dataservices/admin_desa.php", function(geojsonadmindesa) {
    admindesa.addData(geojsonadmindesa);
    batasAdminGroup.addLayer(admindesa);
});

$.getJSON("./dataservices/admin_kec.php", function(geojsonadminkecamatan) {
    adminkecamatan.addData(geojsonadminkecamatan);
    batasAdminGroup.addLayer(adminkecamatan);
});

$.getJSON("./dataservices/admin_kab.php", function(geojsonadminkabupaten) {
    adminkabupaten.addData(geojsonadminkabupaten);
    batasAdminGroup.addLayer(adminkabupaten);
});





$.getJSON("./dataservices/irigasi_daerah.php", function(geojsonirigasidaerah) {
    irigasidaerah.addData(geojsonirigasidaerah);
    dataIrigasiGroup.addLayer(irigasidaerah);
});

$.getJSON("./dataservices/irigasi_petak.php", function(geojsonirigasipetak) {
    irigasipetak.addData(geojsonirigasipetak);
    dataIrigasiGroup.addLayer(irigasipetak);
});

$.getJSON("./dataservices/irigasi_saluran.php", function(geojsonirigasisaluran) {
    irigasisaluran.addData(geojsonirigasisaluran);
    dataIrigasiGroup.addLayer(irigasisaluran);
});

$.getJSON("./dataservices/irigasi_bangunan.php", function(geojsonirigasibangunan) {
    irigasibangunan.addData(geojsonirigasibangunan);
    dataIrigasiGroup.addLayer(irigasibangunan);
});

$.getJSON("./dataservices/efisiensi_irigasi.php", function(geojsonefisiensi) {
    efisiensi.addData(geojsonefisiensi);
    dataIrigasiGroup.addLayer(efisiensi);
});

//sedot data end


map = L.map("map", {
    zoom: 12,
    center: [-7.615811, 111.026756],
    layers: [basemap_osm]
});

var basemap = {
    "Google Satellite": googleSatellite,
    "Google Hybrid": googleHybrid,
    "Google Streets": googleStreets,
    "Google Terrain": googleTerrain,
    "OpenStreetMaps": basemap_osm
};

var overlays = {
    "Batas Admin Desa": admindesa,
    "Batas Admin Kecamatan": adminkecamatan,
    "Batas Admin Kabupaten": adminkabupaten,
    "Daerah Irigasi": irigasidaerah,
    "Petak Irigasi": irigasipetak,
    "Saluran Irigasi": irigasisaluran,
    "Bangunan Irigasi": irigasibangunan,
    "Efisiensi Irigasi": efisiensi
};

var controls = L.control.layers(basemap, overlays, {
    collapsed: isCollapsed
});

controls.addTo(map);