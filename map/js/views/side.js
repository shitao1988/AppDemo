define([
	'jquery',
	'backbone',
	'handlebars',
	'text!templates/Side.html'
], function( $,Backbone,Handlebars,SideTemplate) {

	var SideBar = Backbone.View.extend({

		template: Handlebars.compile(SideTemplate),
		el: '#sidebar',
		initialize: function() {
           this.render();
		},
		// Re-render the titles of the todo item.
		render: function() {
			this.$el.html(this.template());
			return this;
		},
		/**
         * @method initUIevent
         * UI 事件的绑定
         */
        initUIevent: function() {
           
        },
        
       
	
	});

	return SideBar;
});
