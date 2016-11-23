define([ '../Apps/map2d/views/Map2DView','views/side'], function(Map2DView,SideBar) {
    var MapApp = Backbone.View.extend({
        initialize: function() {
            new SideBar();
            new Map2DView({el: '#map'});
        }
    });
    return MapApp;
});