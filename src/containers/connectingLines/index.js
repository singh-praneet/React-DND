export class ConnectingLines {
  lines = [];
  observers = [];

  observe(o) {
    this.observers.push(o);
    this.emitChange();
    return () => {
      this.observers = this.observers.filter((t) => t !== o);
    };
  }
  addLine(line) {
    this.lines = [...this.lines, line];
    this.emitChange();
  }
  //   canAddTable(table) {
  //     return this.availableTables.every(
  //       (availableTable) => availableTable.id !== table.id
  //     );
  //   }
  //   updateTable(table) {
  //     this.availableTables = this.availableTables.map((availableTable) => {
  //       if (availableTable.id === table.id) {
  //         return table;
  //       }
  //       return availableTable;
  //     });
  //     this.emitChange();
  //   }
  //   removeTable(table) {
  //     this.availableTables = this.availableTables.filter(
  //       (availableTable) => availableTable.id !== table.id
  //     );
  //     this.emitChange();
  //   }
  emitChange() {
    const availableTables = this.availableTables;
    this.observers.forEach((o) => o && o(availableTables));
  }
}
