define(['underscore', 'backbone'], function(_, Backbone) {
    var FeatureModel = Backbone.Model.extend({
        // Default attributes for the todo
        // and ensure that each todo created has `title` and `completed` keys.
        defaults: {
            title: '',
            id: null,
            content: "",
            lat: "",
            lng: "",
            user_id: null
        },
        url:'',
    });
    return FeatureModel;
});