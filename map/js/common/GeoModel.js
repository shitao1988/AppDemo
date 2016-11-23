 define(['underscore', 'backbone'], function(_, Backbone) {
    var GeoModel = Backbone.Model.extend({
      // Set `true` to keep the id attribute as primary key when creating JSON.
    keepId: false,

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function ( key, val, options ) {
      var args, attrs, _attrs, geometry;
      args = arguments;
      // Handle both `"key", value` and `{key: value}` -style arguments.
      if ( typeof key === 'object' ) {
        attrs = key;
        options = val;
      }
      // Handle GeoJSON argument.
      if ( attrs && attrs['type'] && attrs['type'] === 'Feature' ) {
        _attrs = _.clone( attrs['properties'] ) || {};
        // Clone the geometry attribute.
        geometry = _.clone( attrs['geometry'] ) || null;
        if ( geometry ) {
          geometry.coordinates = geometry['coordinates'].slice();
        }
        _attrs['geometry'] = geometry;
        if ( attrs[this.idAttribute] ) {
          _attrs[this.idAttribute] = attrs[this.idAttribute];
        }
        args = [_attrs, options];
      }
      return Backbone.Model.prototype.set.apply( this, args );
    },

    // The GeoJSON representation of a `Feature`.
    // http://www.geojson.org/geojson-spec.html#feature-objects
    toJSON: function ( options ) {
      var attrs, props, geometry;
      options = options || {};
      attrs = _.clone( this.attributes );
      props = _.omit( attrs, 'geometry' );
      // Add model cid to internal use.
      if ( options.cid ) {
        props.cid = this.cid;
      }
      // Clone the geometry attribute.
      geometry = _.clone( attrs['geometry'] ) || null;
      if ( geometry ) {
        geometry.coordinates = geometry['coordinates'].slice();
      }
      var json = {
        type: 'Feature',
        geometry: geometry,
        properties: props
      };
      if ( this.keepId ) {
        json[ this.idAttribute ] = this.id;
      }
      return json;
    }
    });
    return GeoModel;
});






 