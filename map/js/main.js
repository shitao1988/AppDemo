// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		},
		sidebar:{
			deps: ['jquery'],
			exports: 'sidebar'
		}
	},
	paths: {
		jquery: '../../lib/jquery/jquery',
		sidebar: '../../lib/jquery/jquery-sidebar',
		leaflet:'../../lib/leaflet/leaflet-src',
		underscore: '../../lib/underscore',
		backbone: '../../lib/backbone/backbone',
		handlebars:'../../lib/handlebars',
		backboneLocalstorage: '../../lib/backbone/backbone.localStorage',
		text: '../../lib/require/text',
		css: '../../lib/require/css'
	}
});

require([
	'views/app',
	'routers/router'
], function(MapApp, Workspace ) {
	// Initialize routing and start Backbone.history()
	var router=new Workspace();
	Backbone.history.start();
    
	// Initialize the application view
	new MapApp({el: '#map'});
	$("#maplink").click(function(){
		router.navigate('', {  
	    trigger: true  
	}); 
	})
	$("#buildinglink").click(function(){
		router.navigate('building', {  
	    trigger: true  
	}); 
	})
	

});
