(function process(request, response) {
  var pathParams = request.pathParams;
  var order = parseInt(pathParams.order);
  var widget = pathParams.widget;
  return new x_snc_config_page.DataService.updateItem(widget, order);
})(request, response);
