(function process(request, response) {
  var pathParams = request.pathParams;
  var widget = pathParams.widget;
  return new x_snc_config_page.DataService.deleteItem(widget);
})(request, response);
