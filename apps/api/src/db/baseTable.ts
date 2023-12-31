import { createBaseTable } from 'orchid-orm';
import { zodSchemaProvider } from 'orchid-orm-schema-to-zod';

export const BaseTable = createBaseTable({
  // Set `snakeCase` to `true` if columns in your database are in snake_case.
  snakeCase: true,

  // Customize column types for all tables.
  columnTypes: (t) => ({
    ...t,
    // Set min and max validations for all text columns,
    // it is only checked when validating with Zod schemas derived from the table.
    text: (min = 0, max = Infinity) => t.text(min, max),
    // parse timestamps to numbers
    timestamp: () => t.timestamp().asNumber(),
    date: () => t.date().asNumber(),
  }),
  schemaProvider: zodSchemaProvider,
});
