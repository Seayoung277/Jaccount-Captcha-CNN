function savehdf()

load('trainData');
load('trainLabel');
data = zeros(20, 40, 1, 10000);
for i = 1:size(train_data, 1)
    data(:, :, 1, i) = reshape(train_data(i, :), 20, 40);
end
data = uint8(data);

name = ['train', 'Set.h5'];
h5create(name, '/data', [20 40 1 10000], 'Datatype', 'uint8');
h5create(name, '/label', size(train_data, 1), 'Datatype', 'uint8');
h5disp(name);
h5write(name, '/data', data);
h5write(name, '/label', train_label);

load('testData');
load('testLabel');
data = zeros(20, 40, 1, 2000);
for i = 1:size(test_data, 1)
    data(:, :, 1, i) = reshape(test_data(i, :), 20, 40);
end
data = uint8(data);

name = ['test', 'Set.h5'];
h5create(name, '/data', [20 40 1 2000], 'Datatype', 'uint8');
h5create(name, '/label', size(test_data, 1), 'Datatype', 'uint8');
h5disp(name);
h5write(name, '/data', data);
h5write(name, '/label', test_label);