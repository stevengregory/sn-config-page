var DataService = (function () {
  function addItem(section, widgetId) {
    new global.GlideQuery('sp_widget')
      .where('id', widgetId)
      .selectOne('sys_id')
      .ifPresent(function (item) {
        return new global.GlideQuery(getTable('widget')).insert({
          widget: item.sys_id,
          section: getSectionId(section),
        });
      });
  }

  function buildSectionObj(item) {
    return {
      name: item.name,
      class: item.column_class,
    };
  }

  function buildWidgetObj(item) {
    return {
      draggable: item.draggable,
      handle: item.drag_handle,
      name: item.widget,
      order: item.order,
      sysId: item.sys_id,
      trash: item.trash,
      widget: getWidget(item.widget.id, item.options),
    };
  }

  function deleteItem(sysId) {
    new global.GlideQuery(getTable('widget'))
      .where('section.user', getUser())
      .where('sys_id', sysId)
      .deleteMultiple();
  }

  function fetchWidgets(section) {
    var arr = [];
    new global.GlideQuery(getTable('widget'))
      .where('active', true)
      .where('section.user', getUser())
      .where('section.name', section)
      .select('draggable', 'drag_handle', 'options', 'order', 'sys_id', 'trash', 'widget.id')
      .forEach(function (item) {
        arr.push(buildWidgetObj(item));
      });
    return arr;
  }

  function getConfig() {
    return {
      table: {
        widget: 'x_snc_config_page_widget',
        section: 'x_snc_config_page_section',
      },
    };
  }

  function getItems(section) {
    return fetchWidgets(section);
  }

  function getSection(section) {
    var arr = [];
    new global.GlideQuery(getTable('section'))
      .where('name', section)
      .select('name', 'column_class')
      .forEach(function (item) {
        arr.push(buildSectionObj(item));
      });
    return arr;
  }

  function getSectionId(section) {
    return new global.GlideQuery(getTable('section'))
      .where('user', getUser())
      .where('name', section)
      .selectOne('sys_id')
      .get().sys_id;
  }

  function getTable(name) {
    return getConfig().table[name];
  }

  function getUser() {
    return gs.getUser().getID();
  }

  function getWidget(item, options) {
    return $sp.getWidget(item, options);
  }

  function updateItem(sysId, order) {
    new global.GlideQuery(getTable('widget'))
      .where('section.user', getUser())
      .where('sys_id', sysId)
      .updateMultiple({ order: order + 100 });
  }

  return {
    addItem: addItem,
    deleteItem: deleteItem,
    getItems: getItems,
    getSection: getSection,
    updateItem: updateItem,
  };
})();
