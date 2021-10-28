(function () {
  data.cards = getWidgets();
  data.class = getClass();
  data.section = getSection();

  function getClass() {
    return (
      getSectionOption() &&
      (getOption('class') ||
        new x_snc_config_page.DataService.getSection(getSectionOption())[0]['class'])
    );
  }

  function getOption(field) {
    var params = $sp.getDisplayValue('widget_parameters');
    return params && JSON.parse(params)[field].displayValue.toLowerCase();
  }

  function getSection() {
    return (
      getSectionOption() && new x_snc_config_page.DataService.getSection(getSectionOption())[0]['name']
    );
  }

  function getSectionOption() {
    return getOption('section');
  }

  function getWidgets() {
    return getSectionOption() && new x_snc_config_page.DataService.getItems(getSectionOption());
  }
})();
