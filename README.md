# Jaccount Captcha Recognizing

## Description
This is a CNN version of Jaccount captcha recognizing project. There are two folders and several files:

- `/torch` uses [Torch](torch.th) to test and optimize the CNN. It's something like a prototype.
- `/plugin` includes the Chrome/Chromium plugin source code and the packed plugin file `JaccountCaptcha.crx`.
- `convet.js` is Andrej Karpathy's [ConvNetJS](http://cs.stanford.edu/people/karpathy/convnetjs/index.html) source file. The GitHub repository of this brillant project is [Here](https://github.com/karpathy/convnetjs)
- `trainer.html` is the model training page. It is recommended to open it in Chrome/Chromium. It's really easy to use.
- `savejs` is used for transforming `.h5` data files to `.txt` data files, and `js.py` is used for transforming `.txt` data file to `.js` data file. Sorry for making this so complicated ... XD.

## Guide
1. If you want to use the Torch prototype, you can refer to the guide in `/torch`.
2. If you just want to use the plugin, refer to the guide in `/plugin`.
3. To train a new CNN model, take the following steps:
- Open the `trainer.html` page in Chrome/Chromium, enter the target accuracy and click `Start Training`. Training messages will be shown in the browser console, you can use `Ctrl+Shift+i` to open it. 
- When all Finished, the model data will be shown in the textarea, and click `Copy Data` to copy the data to clipboard, and paste it to a text file named `model_1.js`.
- Copy this file to the `/plugin` folder and repoad the plugin. Now you have your new model in place.

## Data Set
The dataset used in this project is collected and labeled by myself in an [earlier project](https://github.com/seayoungzhang/jaccount-captcha-nn). The docs and codes there is a little bit chaos ... XD