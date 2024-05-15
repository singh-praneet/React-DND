const dataTypes = ["INTEGER", "STRING", "VARCHAR(255)", "DATE"];

export const tables = Array.from({ length: 30 }).map((_, tableIndex) => {
  return {
    id: `table-${tableIndex}`,
    name: `Table - ${tableIndex}`,
    columns: [
      {
        column_id: `table-${tableIndex}-column-0`,
        name: "Column",
        column_data_type: "data_type_one",
      },
      {
        column_id: `table-${tableIndex}-column-1`,
        name: "Data Type",
        column_data_type: "data_type_two",
      },
    ],
    rows: Array.from({ length: 10 }).map((row, rowIndex) => {
      return [
        {
          id: `row-${rowIndex}-col-0-table-${tableIndex}`,
          name: `Row - ${rowIndex} Table - ${tableIndex}`,
        },
        {
          id: `row-${rowIndex}-col-1-table-${tableIndex}`,
          name: dataTypes[Math.floor(Math.random() * dataTypes.length)],
        },
      ];
    }),
  };
});

export const ItemTypes = {
  CARD: "CARD",
  COLUMN: "COLUMN",
};
