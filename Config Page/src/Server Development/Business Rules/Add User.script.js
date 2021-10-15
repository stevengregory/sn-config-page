(function executeRule(current, previous) {
  current.user = gs.getUser().getID();
})(current, previous);
