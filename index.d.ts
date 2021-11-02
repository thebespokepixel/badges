export { render as default };
/**
 * Render project badge configuration as markdown.
 * @param  {string} context The desired render context i.e: `readme`, `docs` as
 *                          defined in `package.json`.
 * @param  {boolean} asAST  Render badges as {@link https://github.com/wooorm/mdast|MDAST}
 * @return {Promise}        A promise that resolves to the markdown formatted output.
 */
declare function render(context: string, asAST?: boolean): Promise<any>;
