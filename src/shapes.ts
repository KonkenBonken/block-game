const raw = [
  '#',
  '##',
  '## ##',
  '### ### ###',
  '#### #### #### ####',
  '## -# -#',
  '#- ## -#',
  '### -#-',
  '#####'
],
  shapes = raw.map(str =>
    str.split(' ').map(row =>
      row.split('').map(cell => cell === '#')
    )
  );

function rotate(shape: boolean[][]) {
  return shape[0].map((_, col) => shape.map(row => row[col]));
}

export default function getRandomShape() {
  let shape = shapes[Math.floor(Math.random() * shapes.length)];

  for (let i = 0; i < Math.floor(Math.random() * 4); i++)
    shape = rotate(shape);

  return shape;
}
