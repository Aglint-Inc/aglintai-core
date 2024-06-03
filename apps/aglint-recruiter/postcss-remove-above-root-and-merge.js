const postcss = require('postcss');

module.exports = postcss.plugin('postcss-remove-above-root-and-merge', () => {
  return (root) => {
    let removeUntilRoot = true;
    const mergedRules = {};

    root.walk((node) => {
      if (removeUntilRoot && node.type === 'rule' && node.selector === ':root') {
        removeUntilRoot = false;
      }

      if (removeUntilRoot) {
        node.remove();
        return;
      }

      if (node.type === 'rule') {
        if (!mergedRules[node.selector]) {
          mergedRules[node.selector] = {};
        }
        node.walkDecls(decl => {
          mergedRules[node.selector][decl.prop] = decl.value;
        });
        node.remove();
      }
    });

    // Add merged rules back to the root
    Object.keys(mergedRules).forEach((selector) => {
      const rule = postcss.rule({ selector });
      Object.keys(mergedRules[selector]).forEach((prop) => {
        rule.append({ prop, value: mergedRules[selector][prop] });
      });
      root.append(rule);
    });
  };
});
