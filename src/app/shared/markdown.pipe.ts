import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

/**
 * Renders a markdown string to an HTML string.
 *
 * Bind with `[innerHTML]="value | markdown"` — Angular sanitizes `[innerHTML]`
 * bindings by default (strips scripts / event handlers / javascript: URLs),
 * so the output is safe to render even though it is HTML.
 */
@Pipe({ name: 'markdown', standalone: true })
export class MarkdownPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return marked.parse(value, { async: false }) as string;
  }
}
