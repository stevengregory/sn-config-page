var DataService = (function () {
  function buildItems(item) {
    return {
      draggable: item.draggable,
      handle: item.handle,
      name: item.widget,
      options: item.options,
      order: item.order,
      sysId: item.sysId,
      trash: item.trash,
      widget: getWidget(item.widget, item.options),
    };
  }

  function deleteItem(sysId) {
    var user = gs.getUser().getID();
    new global.GlideQuery(getTable('widget'))
      .where('section.user', user)
      .where('sys_id', sysId)
      .deleteMultiple();
  }

  function fetchWidgets(section, user) {
    var arr = [];
    new global.GlideQuery(getTable('widget'))
      .where('active', true)
      .where('section.user', user)
      .where('section.name', section)
      .select('draggable', 'drag_handle', 'options', 'order', 'sys_id', 'trash', 'widget.id')
      .forEach(function (item) {
        arr.push(setWidgetObj(item));
      });
    return arr;
  }

  function getItems(section, user) {
    return fetchWidgets(section, user).map(buildItems);
  }

  function getConfig() {
    return {
      table: {
        widget: 'x_snc_config_page_widget',
        section: 'x_snc_config_page_section',
      },
    };
  }

  function getTable(name) {
    return getConfig().table[name];
  }

  function getSection(section) {
    var arr = [];
    new global.GlideQuery(getTable('section'))
      .where('name', section)
      .select('name', 'column_class')
      .forEach(function (item) {
        arr.push(setSectionObj(item));
      });
    return arr;
  }

  function getWidget(item, options) {
    return $sp.getWidget(item, options);
  }

  function insertItem(section, widgetId) {
    new global.GlideQuery('sp_widget')
      .where('id', widgetId)
      .selectOne('sys_id')
      .ifPresent(function (item) {
        return new global.GlideQuery(getTable('widget')).insert({
          order: 50,
          widget: item.sys_id,
          section: section.name,
        });
      });
  }

  function setSectionObj(item) {
    return {
      name: item.name,
      class: item.column_class,
    };
  }

  function setWidgetObj(item) {
    return {
      draggable: item.draggable,
      handle: item.drag_handle,
      options: item.options,
      order: item.order,
      sysId: item.sys_id,
      trash: item.trash,
      widget: item.widget.id,
    };
  }

  function updateItem(widget, order) {
    var user = gs.getUser().getID();
    new global.GlideQuery(getTable('widget'))
      .where('section.user', user)
      .where('widget.id', widget)
      .updateMultiple({ order: order + 100 });
  }

  function updateItems(arr) {
    return arr.map(function (item) {
      updateItem(item.widget, item.order);
    });
  }

  return {
    deleteItem: deleteItem,
    getItems: getItems,
    getSection: getSection,
    insertItem: insertItem,
    updateItems: updateItems,
    updateItem: updateItem,
  };
})();
