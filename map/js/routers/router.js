define([
	'jquery',
	'backbone'
], function( $, Backbone) {

	var Workspace = Backbone.Router.extend({
		routes:{
			'building':'renderBuilding',
			'':'renderMap'
		},
		renderBuilding:function() {
			 console.log("renderBuilding");
			 $("#map").hide();
		},
		renderMap:function() {
			 console.log("renderMap");
			 $("#map").show();
		}
	});
	return Workspace;
});
