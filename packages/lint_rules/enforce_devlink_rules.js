module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        'disallow importing components from "@/devlink", "@/devlink2", and "@/devlink3" for better performance',
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [], // no options
  },
  create: function (context) {
    return {
      ImportDeclaration(node) {
        const disallowedSources = ["@/devlink", "@/devlink2", "@/devlink3"];
        if (
          disallowedSources.includes(node.source.value) &&
          node.specifiers.length > 0
        ) {
          context.report({
            node,
            message: `⚠️ Avoid importing components from '${node.source.value}' for better performance. Instead use import ${node.specifiers.map((specifier) => specifier.local.name).join(", ")} from '${node.source.value}'`,
            fix(fixer) {
              const newImports = node.specifiers
                .map(
                  (specifier) =>
                    `import ${specifier.local.name} from '${node.source.value}/${specifier.local.name}';`
                )
                .join("\n");
              return fixer.replaceText(node, newImports);
            },
          });
        }
      },
    };
  },
};
