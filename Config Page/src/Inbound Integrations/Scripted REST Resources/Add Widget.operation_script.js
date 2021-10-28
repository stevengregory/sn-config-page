(function process(request, response) {
  var pathParams = request.pathParams;
  var section = pathParams.section;
  var widget = pathParams.widget;
  return new x_snc_config_page.DataService.addItem(section, widget);
})(request, response);
