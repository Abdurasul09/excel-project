const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
	  <div class="cell" contenteditable ></div>
	`;
}

function toColumn(el) {
  return `
	  <div class="column">${el}</div>
	`;
}

function createRow(idx, content) {
  return `
	  <div class="row">
	    <div class="row-info">${idx ? idx : ''}</div>
	    <div class="row-data">${content}</div>
	  </div>
	`;
}

function toChar(_, idx){
	return String.fromCharCode(CODES.A + idx)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount)
    .fill()
    .map(toChar)
    .map(toColumn)
    .join("");

  const rows = [];

  rows.push(createRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
		  .fill()
			.map(toCell)
			.join('')
    rows.push(createRow(i + 1, cells));
  }
  return rows.join("");
}
