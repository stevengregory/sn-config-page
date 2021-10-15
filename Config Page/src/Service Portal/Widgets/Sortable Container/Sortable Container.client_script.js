api.controller = function ($document, $timeout, dataService) {
  var c = this;
  c.deleteWidget = deleteWidget;

  c.$onInit = function () {
    activate();
  };

  function buildItems(arr) {
    return arr.map(function (item, idx) {
      return setObject(item, idx);
    });
  }

  function deleteWidget(widget) {
    var index = c.data.cards.indexOf(widget);
    c.data.cards.splice(index, 1);
    return dataService.deleteWidget(widget.name);
  }

  function setObject(item, idx) {
    return {
      widget: item,
      order: idx + 10,
    };
  }

  function activate() {
    $timeout(function () {
      new Sortable(getElement(), {
        filter: '.filtered',
        animation: 150,
        dataIdAttr: 'data-id',
        handle: '.my-handle',
        store: {
          set: function (sortable) {
            var widgets = sortable.toArray();
            dataService.updateWidgets(buildItems(widgets));
          },
        }
      });
    });
  }

  function getElement() {
    return $document[0].getElementById(c.data.section);
  }
};
