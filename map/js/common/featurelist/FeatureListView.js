define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!./tmpl/listtmpl.html', 'common','css!./css/list.css' ], function($, _, Backbone, Handlebars, listtmpl, Common) {
    var FeatureListView = Backbone.View.extend({
      /**
       * 加载模板
       * @type {[html]}
       */
        template: Handlebars.compile(listtmpl),
        /**
         * 容器
         * @type {String}
         */
        el: '',
        /**
         * 要素图层
         * @type {[featurelayer]}
         */
        layer: null,
        /**
         * @property {Object} config
         * @property {String} config.showTitle
         * feature属性作为标题的字段
         * @property {Object} config.showField
         * feature属性作为显示的字段
         */
        config: {
            showTitle: null,
            showField: null
        },
        initialize: function(el, modelCollection, options) {
            $.extend(this, options);
            this.el="#"+el;
            this.listenTo(modelCollection, 'add', this.render);
            this.listenTo(modelCollection, 'remove', this.render);
            this.modelCollection = modelCollection;
            this.render();
            this.initUIevent();
        },
          /**
         * @method render
         * 将要素进行渲染
         * @param {Array} features
         */
        render: function() {
            $(this.el).html(this.template(this.modelCollection.toJSON()));
            return this;
        },
        /**
         * @method initevent
         * 事件的绑定
         */
        initevent: function() {},
        /**
         * @method initUIevent
         * UI 事件的绑定
         */
        initUIevent: function() {
            var that = this;
            $(this.el).on("mouseenter", ".resultlist li", function() {
                $(this).addClass("hover");
                if (!$(this).hasClass("selected")) {
                    that.overListToFea($(this).attr("featureId"));
                }
            });
            $(this.el).on("mouseleave", ".resultlist li", function() {
                $(this).removeClass("hover");
                if (!$(this).hasClass("selected")) {
                    that.outListToFea($(this).attr("featureId"));
                }
            });
            $(this.el).on("click", ".resultlist li", function() {
                $("#resultlist li").removeClass("selected");
                $(this).addClass("selected");
                that.clickListToFea($(this).attr("featureId"));
            });
        },
        // feature的选择事件
        /**
         * @method featureSelect
         * 选择控件选择feature要素
         * @param {OpenLayers.Feature} feature
         */
        featureSelect: function(feature) {},
        // feature的取消选择事件
        /**
         * @method featureUnselect
         * 选择控件取消选择 feature要素
         * @param {OpenLayers.Feature} feature
         */
        featureUnselect: function(feature) {},
        // feature的移上事件
        /**
         * @method featureOver
         * 地图上鼠标移上 feature 要素
         * @param {OpenLayers.Feature} feature
         */
        featureOver: function(feature) {},
        // feature的移出事件
        /**
         * @method featureOut
         * 地图上鼠标移除 feature 要素
         * @param {OpenLayers.Feature} feature
         */
        featureOut: function(feature) {},
        // 选择 feature 事件
        /**
         * @method selectFeatoMap
         * 地图上选择要素
         * @param {OpenLayers.Feature} feature
         */
        selectFeatoMap: function(feature) {},
        // 取消选择 feature 事件
        /**
         * @method unselectFeatoMap
         * 地图上 取消选择 feature
         * @param {OpenLayers.Feature} feature
         */
        unselectFeatoMap: function(feature) {},
        //  显示 feature 的提示
        /**
         * @method showFeatureTopic
         * 显示feature 的提示
         * @param {OpenLayers.Feature} feature
         */
        showFeatureTopic: function(feature, title) {},
        // 关闭 feature 的提示
        /**
         * @method hideFeatureTopic
         * 关闭 feature 的提示
         */
        hideFeatureTopic: function() {},
        // 鼠标移上 feature 与列表 的互动
        /**
         * @method overFeaToList
         * 鼠标移上 地图上的feature要素 与列表 的互动
         * @param {OpenLayers.Feature} feature
         */
        overFeaToList: function(feature) {},
        // 鼠标移除 feature 与列表 的互动
        /**
         * @method outFeaToList
         * 鼠标移除 地图上的feature要素 与列表 的互动
         * @param {OpenLayers.Feature} feature
         */
        outFeaToList: function(feature) {},
        // 地图上选择 feature  列表上的互动
        /**
         * @method selectFeaToList
         * 鼠标选择 地图上的feature要素 与列表 的互动
         * @param {OpenLayers.Feature} feature
         */
        selectFeaToList: function(feature) {},
        // 地图上取消选择 feature 与列表的互动
        /**
         * @method unselSectFeatureToList
         * 取消选择 地图上的feature要素 与列表 的互动
         * @param {OpenLayers.Feature} feature
         */
        unselSectFeatureToList: function(feature) {},
        // 鼠标移上 列表 与地图上的feature的互动
        /**
         * @method overListToFea
         * 鼠标移上 列表 与地图上的feature的互动
         * @param {String} id
         * feature.id 要素的id
         */
        overListToFea: function(id) {},
        // 鼠标移除列表 与地图上的feature的互动
        /**
         * @method outListToFea
         * 鼠标移除 列表 与地图上的feature的互动
         * @param {String} id
         * feature.id 要素的id
         */
        outListToFea: function(id) {},
        // 鼠标单击列表 与地图上的feature的互动
        /**
         * @method clickListToFea
         * 鼠标单击列表 与地图上的feature的互动
         * @param {String} id
         * feature.id 要素的id
         */
        clickListToFea: function(id) {
            var map = this.layer._map;
            var tmp = this.layer.getFeatureByFid(id);
            // tmp.setZIndexOffset(1000);
            map.setView(tmp.getLatLng(), map.getZoom());
            tmp.openPopup();
        },
      

        /**
         * @method render
         * 将要素进行渲染(无数量图标)
         * @param {Array} features
         */
        noIconRender: function(features) {
            if (!features || features.length <= 0) {
                //return;
            }
            Geo.FeatureFactory.addFeatures(features, this.featureClassify);
            for (var i = 0; i < features.length; i++) {
                features[i].attributes.iconImgUrl = "images/result_img/normal_feature.png";
                features[i].attributes.selectImgUrl = "images/result_img//normal_feature_v.png";
            }
            this.oldshowFeature = this.showFeature;
            this.showFeature = features;
            this.showFeaturesToList(features);
            this.showFeaturesToLayer(features);
        },
        /**
         * @method showFeaturesToList
         * 显示feature要素到列表上
         * @param {Array} features
         */
        showFeaturesToList: function(features) {},
        // 将要素显示到图层上
        /**
         * @method showFeaturesToLayer
         * 显示feature要素到地图图层上
         * @param {Array} features
         */
        showFeaturesToLayer: function(features) {},
        // 清除图层上的要素
        /**
         * @method clearFeaturesToLayer
         * 清除图层上指定要素
         * @param {Array} features
         */
        clearFeaturesToLayer: function(features) {},
        // 清除列表上的要素
        /**
         * @method clearFeaturesToList
         * 清除列表
         */
        clearFeaturesToList: function() {},
        //清除所有查询结果
        /**
         * @method clearAll
         * 清除所有
         */
        clearAll: function() {},
    });
    return FeatureListView;
});