const raw = [
  '#',
  '## ##',
  '## -# -#',
  '### -#-',
  '#####'
],
  shapes = raw.map(str =>
    str.split(' ').map(row =>
      row.split('').map(cell => cell === '#')
    )
  );


export default function getRandomShape() {
  return shapes[Math.floor(Math.random() * shapes.length)];
}
