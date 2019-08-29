function analyzeColorPickerInput(hexColor) {
  try {
    const rgbColor = getRGBColorFromHex(hexColor);
    const result = analyze(rgbColor);
    const black = (result.black * 100).toFixed();
    const white = (result.white * 100).toFixed();
    console.info(`Hex: ${hexColor} | RGB: ${rgbColor.r},${rgbColor.g},${rgbColor.b} | Black: ${black}% | White: ${white}%`);
  } catch (error) {
    console.log(error)
  }
}

function getRGBColorFromHex(hexColor) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hexColor = hexColor.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

let neuralNetwork;
let hiddenLayers = [3];
function brainNeuralNetwork() {

  if (neuralNetwork) return neuralNetwork;

  const config = {
    binaryThresh: 0.5,
    hiddenLayers: hiddenLayers,
    activation: 'sigmoid',
    leakyReluAlpha: 0.01
  };
  neuralNetwork = new brain.NeuralNetwork(config);
  return neuralNetwork;
}

let isDataTrained;
function analyze(rgbColor) {
  net = brainNeuralNetwork();

  if (!isDataTrained) {
    console.info('Tranning...');
    console.info(`hiddenLayers ${hiddenLayers}`);
    let calibrateTimes = 20;
    while (true) {
      net.train(data, { iterations: 20000, log: false });
      const white = (net.run({ r: 255, g: 255, b: 255 }).white * 100).toFixed();
      const black = (net.run({ r: 0, g: 0, b: 0 }).black * 100).toFixed();
      console.info(`Calibrating... White: ${white}/90 | Black: ${black}/90`);
      calibrateTimes--;
      if (white >= 90 && black >= 90) break;
      if (calibrateTimes === 0) throw new Error('Error: Impossible calibrate, ' 
        + 'please try new values for hiddenLayers or input more train data');
    }
    isDataTrained = true;
  }
  return net.run(rgbColor);
}