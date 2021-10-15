(function process(request, response) {
  var pathParams = request.pathParams;
  var section = pathParams.section;
  return new x_snc_config_page.DataService.getItems(section);
})(request, response);
