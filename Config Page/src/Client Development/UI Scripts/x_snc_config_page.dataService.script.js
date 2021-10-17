(function () {
  'use strict';

  function dataService($http, $q) {
    var service = {
      deleteWidget: deleteWidget,
      getWidgets: getWidgets,
      updateWidgets: updateWidgets,
    };
    return service;

    function doRequest(apiUrl, method) {
      var deferred = $q.defer();
      var req = {
        method: method,
        url: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };
      $http(req).then(function (res) {
        return res.data.result;
      });
      return deferred.promise;
    }

    function deleteWidget(sysId) {
      var apiUrl = '/api/x_snc_config_page/widget_service/delete/' + sysId;
      return doRequest(apiUrl, 'DELETE');
    }

    function getWidgets(section) {
      var apiUrl = '/api/x_snc_config_page/widget_service/' + section;
      return doRequest(apiUrl, 'GET');
    }

    function updateWidget(sysId, order) {
      var apiUrl = '/api/x_snc_config_page/widget_service/update/' +sysId + '/' + order;
      return doRequest(apiUrl, 'PATCH');
    }

    function updateWidgets(widgets) {
      return widgets.map(function (item) {
        updateWidget(item.sysId, item.order);
      });
    }
  }

  angular
    .module('configPage')
    .service('dataService', dataService);
})();
