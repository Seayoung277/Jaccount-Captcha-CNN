function savehdf()

load('validationData');
load('validationLabel');
data = zeros(40, 20, size(validation_data, 1));
for i = 1:size(validation_data, 1)
    data(:, :, i) = reshape(validation_data(i, :), 20, 40)';
end
data = uint8(data);

name = ['validation', 'Set.h5'];
h5create(name, '/data', [40 20 size(validation_data, 1)], 'Datatype', 'uint8');
h5create(name, '/label', size(validation_data, 1), 'Datatype', 'uint8');
h5disp(name);
h5write(name, '/data', data);
h5write(name, '/label', validation_label);

