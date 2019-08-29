# AI browser app written in brain.js
Using brain.js to try identify if a color input is Black or White

## Starting app
It's a simple, just load a `index.html` file in browser and open the developer tools (F12) on console view.

## How it's works
The element `input` identify by id `color-picker` make able to choice a color in the browser. When an user pick a color, the `brain network` is start a some steps:

### Starting neural network
- Pick a color start the train algorithm

### Get data from `trainData.js` and pass to train network;
- After the brain neural network starts the data is load to train

### Calibrating the network
- As the data load,  calibrating is starting to try work on a better result set

The calibrate run 20 times and launch an Error if was not possible reach 90% of acurancy. 

See code above and change values for test new scenaries
```js
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
```

### Show result <b>or </b> Error
 console.log output:
  - [1] `Tranning...`
  - [2] `hiddenLayers 3` number of hidden layers
  - [3] `Calibrating... White: 93/90 | Black: 11/90` calibrating neural network to start analyze with 90%
  - [4] `Error: Impossible calibrate, please try new values for hiddenLayers or input more train data` show error if calibrate not reach 90% for black and white
  - [5] `Hex: #a34d4d | RGB: 163,77,77 | Black: 8% | White: 92%` show hex  and rgb color picked and percentage of analyze

## Improving train data
The `trainData.js` file contains a set of data to train algorithm. Currently this file just has two inputs RGB black and RGB white color.

I'ts possible increase accurancy `Increasing number of hiddenLayers` and/or `Input new data to trainData.js`
