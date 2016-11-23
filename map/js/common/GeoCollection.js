 define(['underscore', 'backbone','common/GeoModel'], function(_, Backbone,GeoModel) {
    var GeoCollection = Backbone.Collection.extend({
         // Default model.
      model: GeoModel,

      // When you have more items than you want to add or remove individually,
      // you can reset the entire set with a new list of models, without firing
      // any `add` or `remove` events. Fires `reset` when finished.
      reset: function ( models, options ) {
        // Accpets FeatureCollection GeoJSON as `models` param.
        if ( models && !_.isArray( models ) && models.features ) {
          models = models.features;
        }
        return Backbone.Collection.prototype.reset.apply( this,
                                                          [models, options] );
      },



      // The GeoJSON representation of a `FeatureCollection`.
      // http://www.geojson.org/geojson-spec.html#feature-collection-objects
      toJSON: function ( options ) {
        var features = Backbone.Collection.prototype.toJSON.apply( this,
                                                                   arguments );
        return {
          type: 'FeatureCollection',
          features: features
        };
      }
    });
    return new GeoCollection();
});