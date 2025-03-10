import { ICommand, commands } from "@uiw/react-md-editor";

export const customCommands: ICommand[] = [
  commands.bold, // Native bold command
  commands.italic, // Native italic command
  commands.strikethrough, // Native strikethrough command
  commands.divider, // Divider line
  commands.link, // Native link command
  commands.code, // Native code command
  commands.quote, // Native quote command
  commands.orderedListCommand, // Native ordered list command
  commands.unorderedListCommand, // Native unordered list command
  commands.divider,
  commands.title, // Native title command for headers
  commands.divider,
  commands.codeBlock, // Native code block command
];
