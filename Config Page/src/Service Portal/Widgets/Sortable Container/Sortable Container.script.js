(function () {
  data.cards = getWidgets();
  data.class = getClass();
  data.section = getSection();

  function getClass() {
    return getOption('class') || new x_snc_config_page.DataService.getSection(getOption('section'))[0]['class'];
  }

  function getOption(field) {
    var params = JSON.parse($sp.getDisplayValue('widget_parameters'));
    return params[field].displayValue.toLowerCase();
  }

  function getSection() {
    return new x_snc_config_page.DataService.getSection(getOption('section'))[0]['name'];
  }

  function getWidgets() {
    var user = gs.getUser().getID();
    return new x_snc_config_page.DataService.getItems(getOption('section'), user);
  }
})();
