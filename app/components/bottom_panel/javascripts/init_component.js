{
  initComponent: function(params) {
  	this.superclass.initComponent.call(this);

  	this.on('afterrender', function(self, eOpts) {
  		var updateBottomPanel = function() {
			  Ext.Ajax.request({
			    url: '/data/get_global_summary',
			    success: function(response) {
			    	var summary 								= Ext.decode(response.responseText);
			      this.totalVyattaHosts 			= summary.total_vyatta_hosts;
			    	this.enabledVyattaHosts 		= summary.enabled_vyatta_hosts;
			      this.unreachableVyattaHosts = summary.unreachable_vyatta_hosts;
			      var unreachableLabelDiv 		= Ext.get('label_unreachable_vyatta_hosts');
			      var totalDisplayDiv 				= Ext.get('display_total_vyatta_hosts');
			      var enabledDisplayDiv 			= Ext.get('display_enabled_vyatta_hosts');
			      var unreachableDisplayDiv 	= Ext.get('display_unreachable_vyatta_hosts');
			      totalDisplayDiv.update(this.totalVyattaHosts.toString());
			      enabledDisplayDiv.update(this.enabledVyattaHosts.toString());
			      unreachableDisplayDiv.update(this.unreachableVyattaHosts.toString());
			      if (this.unreachableVyattaHosts != 0) {
			      	unreachableLabelDiv.replaceCls('global-summary-blue-item', 'global-summary-red-item');
			      	unreachableDisplayDiv.replaceCls('global-summary-blue-item', 'global-summary-red-item');
			      } else {
			      	unreachableLabelDiv.replaceCls('global-summary-red-item', 'global-summary-blue-item');
			      	unreachableDisplayDiv.replaceCls('global-summary-red-item', 'global-summary-blue-item');
			      }
			    }
			  });
  		}
			Ext.TaskManager.start({ run: updateBottomPanel, interval: 30000 });
  	}, this);
  }
}
