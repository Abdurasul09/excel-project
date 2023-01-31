const CODES = {
  A: 65,
  Z: 90,
};

function toCell(row) {
  return function (_, col) {
    return `
	  <div 
      class="cell" 
      contenteditable 
      data-col="${col}"
      data-type="cell" 
      data-id="${row}:${col}"
    ></div>
	`;
  };
}

function toColumn(el, idx) {
  return `
	  <div class="column" data-type="resizable" data-col="${idx}">
      ${el}
      <div class="col-resize" data-resize="col"></div>
    </div>
	`;
}

function createRow(idx, content) {
  const resize = idx ? '<div class="row-resize" data-resize="row"></div>' : "";

  return `
	  <div class="row" data-type="resizable">
	    <div class="row-info">
        ${idx ? idx : ""}
        ${resize}
      </div>
	    <div class="row-data">${content}</div>
	  </div>
	`;
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount).fill().map(toChar).map(toColumn).join("");

  const rows = [];

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill()
      // .map((_, cel) => toCell(row, cel))
      .map(toCell(row))
      .join("");
    rows.push(createRow(row + 1, cells));
  }
  return rows.join("");
}
