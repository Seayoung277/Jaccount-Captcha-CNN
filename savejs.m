function savejs()

load('torch/trainData.mat');
data = double(train_data);
save('trainData.txt', 'data');

load('torch/testData.mat');
data = double(test_data);
save('testData.txt', 'data');

load('torch/trainLabel.mat');
train_label = double(train_label');
save('trainLabel.txt', 'train_label');

load('torch/testLabel.mat');
test_label = double(test_label');
save('testLabel.txt', 'test_label');
