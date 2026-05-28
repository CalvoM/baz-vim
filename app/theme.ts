import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import type { Extension } from '@codemirror/state';

// Adobe Color palette
// #9C7948  golden tan   — cursor, keywords, bold accents
// #59691F  olive green  — strings (base, brightened for legibility)
// #361015  dark maroon  — type/class names (lightened for legibility)
// #0B330C  forest green — selection background
// #1B2933  dark navy    — editor background

const bg          = '#1B2933';
const bgGutter    = '#141e27';
const bgActive    = '#1e2f3d';
const bgTooltip   = '#243545';
const bgSeparator = '#243545';

const fgDefault   = '#d4c9a8'; // warm cream
const fgGutter    = '#5a7080'; // muted steel
const fgCursor    = '#9C7948'; // golden tan

const selBg       = '#0B330C'; // forest green
const selMatch    = 'rgba(11, 51, 12, 0.55)';
const bracketBg   = 'rgba(156, 121, 72, 0.25)';
const searchBg    = 'rgba(89, 105, 31, 0.40)';
const searchSel   = 'rgba(156, 121, 72, 0.45)';

// Syntax token colors
const synKeyword  = '#9C7948'; // golden — keywords, booleans, self
const synNumber   = '#c4a060'; // light gold — numbers
const synString   = '#7aab2f'; // bright olive — strings
const synRegexp   = '#8ab838'; // vivid olive — regexp
const synComment  = '#4a6032'; // muted forest — comments
const synVar      = '#c8be90'; // warm sand — variable names
const synProp     = '#b8a870'; // muted gold — properties
const synFn       = '#a8c868'; // light olive-yellow — function names
const synType     = '#c47060'; // warm brick — types/classes (from #361015)
const synOp       = '#8a9aaa'; // cool steel — operators & punctuation
const synMeta     = '#b8a870'; // muted gold — meta/annotations

export const bazVimTheme: Extension = [
  EditorView.theme(
    {
      '&': {
        color: fgDefault,
        backgroundColor: bg,
        borderRadius: '10px',
        overflow: 'hidden',
      },
      '.cm-content': {
        caretColor: fgCursor,
        fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, monospace',
        fontSize: '14px',
        lineHeight: '1.65',
        padding: '8px 0',
      },
      '.cm-scroller': {
        padding: '0 4px',
      },
      '&.cm-focused': {
        outline: 'none',
      },
      '&.cm-focused .cm-cursor': {
        borderLeftColor: fgCursor,
        borderLeftWidth: '2px',
      },
      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: fgCursor,
        borderLeftWidth: '2px',
      },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
        backgroundColor: selBg,
      },
      '::selection': {
        backgroundColor: selBg,
      },
      '.cm-selectionMatch': {
        backgroundColor: selMatch,
      },
      '.cm-gutters': {
        backgroundColor: bgGutter,
        color: fgGutter,
        borderRight: `1px solid ${bgSeparator}`,
      },
      '.cm-gutter.cm-lineNumbers .cm-gutterElement': {
        padding: '0 14px 0 8px',
        minWidth: '3ch',
      },
      '.cm-activeLineGutter': {
        backgroundColor: bgActive,
        color: fgCursor,
      },
      '.cm-activeLine': {
        backgroundColor: bgActive,
      },
      '.cm-matchingBracket': {
        backgroundColor: bracketBg,
        outline: `1px solid ${fgCursor}`,
        borderRadius: '2px',
      },
      '.cm-nonmatchingBracket': {
        backgroundColor: 'rgba(196, 112, 96, 0.25)',
        outline: '1px solid #c47060',
        borderRadius: '2px',
      },
      '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: synProp,
        padding: '0 4px',
      },
      '.cm-searchMatch': {
        backgroundColor: searchBg,
        outline: `1px solid ${synString}`,
        borderRadius: '2px',
      },
      '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: searchSel,
        outline: `1px solid ${fgCursor}`,
      },
      '.cm-panels': {
        backgroundColor: bgGutter,
        color: fgDefault,
      },
      '.cm-panels.cm-panels-top': {
        borderBottom: `1px solid ${bgSeparator}`,
      },
      '.cm-panels.cm-panels-bottom': {
        borderTop: `1px solid ${bgSeparator}`,
      },
      '.cm-panel': {
        backgroundColor: bgGutter,
        color: fgDefault,
        padding: '4px 8px',
      },
      '.cm-panel.cm-search': {
        padding: '4px 8px',
      },
      '.cm-textfield': {
        backgroundColor: bg,
        border: `1px solid ${bgSeparator}`,
        borderRadius: '3px',
        color: fgDefault,
        padding: '2px 6px',
      },
      '.cm-button': {
        backgroundImage: 'none',
        backgroundColor: bgActive,
        color: fgDefault,
        border: `1px solid ${bgSeparator}`,
        borderRadius: '3px',
        cursor: 'pointer',
        padding: '2px 8px',
      },
      '.cm-tooltip': {
        border: 'none',
        backgroundColor: bgTooltip,
        color: fgDefault,
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
      },
      '.cm-tooltip-autocomplete': {
        '& > ul > li': {
          padding: '2px 8px',
        },
        '& > ul > li[aria-selected]': {
          backgroundColor: bgActive,
          color: fgCursor,
        },
      },
      // Vim command-line panel
      '.cm-vim-panel, .cm-panel.cm-vim-panel': {
        backgroundColor: bgGutter,
        color: fgDefault,
        borderTop: `1px solid ${bgSeparator}`,
        padding: '2px 8px',
        fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
        fontSize: '13px',
      },
      '.cm-vim-panel input': {
        backgroundColor: 'transparent',
        color: fgDefault,
        border: 'none',
        outline: 'none',
      },
    },
    { dark: true }
  ),

  syntaxHighlighting(
    HighlightStyle.define([
      // Comments
      { tag: tags.comment,              color: synComment, fontStyle: 'italic' },
      { tag: tags.docComment,           color: synComment, fontStyle: 'italic' },

      // Keywords
      { tag: tags.keyword,              color: synKeyword, fontWeight: 'bold' },
      { tag: tags.operatorKeyword,      color: synKeyword },
      { tag: tags.self,                 color: synKeyword, fontStyle: 'italic' },
      { tag: tags.null,                 color: synKeyword, fontStyle: 'italic' },
      { tag: tags.bool,                 color: synKeyword, fontWeight: 'bold' },
      { tag: tags.unit,                 color: synKeyword },
      { tag: tags.modifier,             color: synKeyword },

      // Strings & literals
      { tag: tags.string,               color: synString },
      { tag: tags.docString,            color: synString },
      { tag: tags.character,            color: synString },
      { tag: tags.attributeValue,       color: synString },
      { tag: tags.special(tags.string), color: synRegexp },
      { tag: tags.regexp,               color: synRegexp },
      { tag: tags.escape,               color: synNumber },
      { tag: tags.url,                  color: synString, textDecoration: 'underline' },

      // Numbers
      { tag: tags.number,               color: synNumber },
      { tag: tags.integer,              color: synNumber },
      { tag: tags.float,                color: synNumber },
      { tag: tags.color,                color: synNumber },

      // Names & identifiers
      { tag: tags.variableName,         color: synVar },
      { tag: tags.local(tags.variableName), color: synVar },
      { tag: tags.definition(tags.variableName), color: synFn },
      { tag: tags.function(tags.variableName), color: synFn },
      { tag: tags.constant(tags.variableName), color: synNumber, fontWeight: 'bold' },
      { tag: tags.standard(tags.variableName), color: synKeyword },
      { tag: tags.propertyName,         color: synProp },
      { tag: tags.function(tags.propertyName), color: synFn },
      { tag: tags.definition(tags.propertyName), color: synFn },
      { tag: tags.labelName,            color: synProp },
      { tag: tags.macroName,            color: synFn },

      // Types & classes
      { tag: tags.typeName,             color: synType },
      { tag: tags.className,            color: synType, fontWeight: 'bold' },
      { tag: tags.namespace,            color: synType },
      { tag: tags.typeOperator,         color: synType },

      // HTML/JSX tags & attributes
      { tag: tags.tagName,              color: synKeyword, fontWeight: 'bold' },
      { tag: tags.attributeName,        color: synString },

      // Operators & punctuation
      { tag: tags.operator,             color: synOp },
      { tag: tags.derefOperator,        color: synOp },
      { tag: tags.arithmeticOperator,   color: synOp },
      { tag: tags.logicOperator,        color: synOp },
      { tag: tags.bitwiseOperator,      color: synOp },
      { tag: tags.compareOperator,      color: synOp },
      { tag: tags.updateOperator,       color: synOp },
      { tag: tags.definitionOperator,   color: synOp },
      { tag: tags.controlOperator,      color: synKeyword },
      { tag: tags.punctuation,          color: synOp },
      { tag: tags.separator,            color: synOp },
      { tag: tags.bracket,              color: synOp },
      { tag: tags.angleBracket,         color: synOp },
      { tag: tags.squareBracket,        color: synOp },
      { tag: tags.paren,                color: synOp },
      { tag: tags.brace,                color: synOp },

      // Meta & processing
      { tag: tags.meta,                 color: synMeta },
      { tag: tags.documentMeta,         color: synMeta },
      { tag: tags.annotation,           color: synMeta },
      { tag: tags.processingInstruction, color: synKeyword },

      // Markup (markdown/HTML)
      { tag: tags.heading,              color: synKeyword, fontWeight: 'bold' },
      { tag: tags.heading1,             color: synKeyword, fontWeight: 'bold', fontSize: '1.1em' },
      { tag: tags.heading2,             color: synFn,      fontWeight: 'bold' },
      { tag: tags.heading3,             color: synFn },
      { tag: tags.strong,               color: synVar,     fontWeight: 'bold' },
      { tag: tags.emphasis,             color: synVar,     fontStyle: 'italic' },
      { tag: tags.strikethrough,        color: synComment, textDecoration: 'line-through' },
      { tag: tags.link,                 color: synString,  textDecoration: 'underline' },
      { tag: tags.monospace,            color: synVar },
      { tag: tags.quote,                color: synComment, fontStyle: 'italic' },
      { tag: tags.list,                 color: synProp },
      { tag: tags.contentSeparator,     color: synOp },

      // Diffs
      { tag: tags.inserted,             color: synFn },
      { tag: tags.deleted,              color: synType },
      { tag: tags.changed,              color: synNumber },

      // Invalid
      { tag: tags.invalid,              color: '#ff6060', textDecoration: 'underline wavy' },
    ])
  ),
];
