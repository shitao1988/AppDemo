define(['underscore', 'backbone', 'backboneLocalstorage', 'models/feature'], function(_, Backbone, Store, Feature) {
    var FeaturesCollection = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: Feature,
        url:'',
    });
    return new FeaturesCollection();
});