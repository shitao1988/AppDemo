define(['jquery', 'leaflet', 'backbone', '../../../common/GeoCollection', 'sidebar','../../../common/featurelist/FeatureListView'], function($, L, Backbone, GeoCollection, sidebar,FeatureListView) {
    var MapView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(GeoCollection, 'reset', this.addMarkers);
            this.listenTo(GeoCollection, 'add', this.addMarker);
            this.render();
        },
        render: function() {
            var sidebar = $('#sidebar').sidebar();
            this.map = L.map(this.el).setView([39, -77.4], 7);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);
            this.markers = new L.LayerGroup().addTo(this.map);
            var boundaries = new L.WFS({
                url: 'http://demo.opengeo.org/geoserver/ows',
                typeNS: 'topp',
                typeName: 'tasmania_state_boundaries',
                crs: L.CRS.EPSG4326,
                geometryField: 'the_geom',
                style: {
                    color: 'blue',
                    weight: 2
                }
            }, new L.Format.GeoJSON({
                crs: L.CRS.EPSG4326
            })).once('load', function() {
                GeoCollection.reset(boundaries.toGeoJSON());
                new FeatureListView("featurelist",GeoCollection, {
                  layer:this.markers
                });
            });
            /*   .addTo(this.map)
               .once('load', function () {
                // this.map.fitBounds(boundaries);
               });*/
            /*Features.add([
                {
                  "id": 257,
                  "content": "literally there are cats everywhere",
                  "lat": "38.340543",
                  "lng": "-75.599324",
                  "user_id": 1
                },
                {
                  "id": 256,
                  "content": "whos cats are these???",
                  "lat": "38.340543",
                  "lng": "-76.599324",
                  "user_id": 1
                }
              ]);*/
            return this;
        },
        addMarkers: function() {
            /*GeoCollection.each(function(model, idx) {
                var marker = L.marker([model.attributes.lat, model.attributes.lng]).bindPopup(model.attributes.content);
                this.markers.addLayer(marker);
            }, this);*/
        },
        addMarker: function(model) {
            /*var marker = L.marker([model.attributes.lat, model.attributes.lng]).bindPopup(model.attributes.content);
            this.markers.addLayer(marker);*/
        }
    });
    return MapView;
});