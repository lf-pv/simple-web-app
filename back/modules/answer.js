exports.hello = function () {
  const occurrence = Math.floor((Math.random() * 10) + 1);
  let attr = "";
  switch (occurrence) {
    case 1:
      attr = 'er';
      break;
    case 2:
      attr = 'nd';
      break;
    default:
      attr = 'è'
  }
  return `C'est le ${occurrence}${attr} coucou !`
}