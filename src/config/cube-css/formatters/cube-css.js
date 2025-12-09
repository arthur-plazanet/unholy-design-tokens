export { cubeCssVariablesLayerFormatter, cubeCssLayerFormatter };

const cubeCssLayerFormatter = (children) => {
  const layerName = 'cube';
  // const selector = ':root';
  // if file exists, append to it

  return `@layer ${layerName} {\n  ${children}\n  }\n`;
};

const cubeCssVariablesLayerFormatter = {
  name: 'cube/css-variables-layer',
  format: ({ dictionary, options }) => {
    return dictionary.allTokens
      .map((token) => {
        const { usesDtcg, outputReferences } = options;
        console.log('📟 - outputReferences → ', outputReferences);
        console.log('📟 - usesDtcg → ', usesDtcg);
        let value = JSON.stringify(token.value);
        console.log('📟 - value → ', value);

        const shouldOutputRef =
          usesReferences(originalValue) &&
          (typeof outputReferences === 'function'
            ? outputReferences(token, { dictionary, usesDtcg })
            : outputReferences);
        if (shouldOutputRef) {
          // Note: make sure to use `originalValue` because
          // `token.value` is already resolved at this point.
          const refs = getReferences(originalValue, dictionary.tokens);
          let isEntirelyRef = refs.length === 1 && refs[0].value === value;
          refs.forEach((ref) => {
            // wrap in template literal ${} braces if the value is more than just entirely a reference
            value = value.replace(
              ref.value,
              isEntirelyRef ? ref.name : `\${${ref.name}}`
            );
          });
        }
        const layerName = options.layerName || 'cube';
        const selector = options.selector || ':root';

        // const vars = dictionary.allTokens
        //   .map((token) => `    --${token.name}: ${token.original.value};`)
        //   .join('\n');

        const tt = `@layer ${layerName} {\n    ${selector} {  \n${vars}\n  }\n}\n`;

        return cubeCssLayerFormatter(tt);
      })
      .join('\n');
  },
};
