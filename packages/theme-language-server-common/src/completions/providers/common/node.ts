import {
  LiquidHtmlNodeTypes as NodeTypes,
  LiquidHtmlNodeOfType as NodeOfType,
  LiquidHtmlNode,
} from '@shopify/theme-check-common';

export { NodeTypes, LiquidHtmlNode };
export type HtmlElement = NodeOfType<NodeTypes.HtmlElement>;
export type HtmlDanglingMarkerClose = NodeOfType<NodeTypes.HtmlDanglingMarkerClose>;
export type TextNode = NodeOfType<NodeTypes.TextNode>;
export type AttrEmpty = NodeOfType<NodeTypes.AttrEmpty>;

export type HtmlElementTypes = (typeof HtmlElementTypes)[number];
export const HtmlElementTypes = [
  NodeTypes.HtmlElement,
  NodeTypes.HtmlDanglingMarkerOpen,
  NodeTypes.HtmlDanglingMarkerClose,
  NodeTypes.HtmlSelfClosingElement,
  NodeTypes.HtmlVoidElement,
  NodeTypes.HtmlRawNode,
] as const;
export type NamedHtmlElementNode = NodeOfType<HtmlElementTypes>;

export function isTextNode(node: LiquidHtmlNode): node is TextNode {
  return node.type === NodeTypes.TextNode;
}

export function isAttrEmpty(node: LiquidHtmlNode): node is AttrEmpty {
  return node.type === NodeTypes.AttrEmpty;
}

export function isNamedHtmlElementNode(node: LiquidHtmlNode): node is NamedHtmlElementNode {
  return (HtmlElementTypes as readonly NodeTypes[]).includes(node.type);
}

export function getNamedHtmlElementNodeName(node: NamedHtmlElementNode): string {
  if (typeof node.name === 'string') return node.name;

  const names = node.name;
  if (names.length === 0 || names.length > 1 || !isTextNode(names[0])) {
    return 'unknown';
  }

  return names[0].value;
}
