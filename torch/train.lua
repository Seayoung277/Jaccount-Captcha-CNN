require 'hdf5'
require 'nn'
require 'image'

print('##### Loading Data #####')

train_file = hdf5.open('trainSet.h5', r)
train_set = {}
train_set.data = train_file:read('data'):all():double()
train_set.label = train_file:read('label'):all()
setmetatable(train_set, 
    {__index = function(t, i) 
                    return {t.data[i], t.label[i]} 
                end}
);
function train_set:size()
	return self.data:size(1)
end
print(train_set)

test_file = hdf5.open('testSet.h5', r)
test_set = {}
test_set.data = test_file:read('data'):all():double()
test_set.label = test_file:read('label'):all()
print(test_set)

print('##### Configuing Model #####')

net = nn.Sequential()

net:add(nn.SpatialConvolution(1, 6, 5, 5))
net:add(nn.ReLU())
net:add(nn.SpatialMaxPooling(2, 2, 2, 2))

net:add(nn.SpatialConvolution(6, 16, 5, 5))
net:add(nn.ReLU())
net:add(nn.SpatialMaxPooling(2, 2, 2, 2))

net:add(nn.View(224))
net:add(nn.Linear(224, 120))
net:add(nn.ReLU())
net:add(nn.Linear(120, 84))
net:add(nn.ReLU())
net:add(nn.Linear(84, 26))
net:add(nn.LogSoftMax())

criterion = nn.ClassNLLCriterion()
trainer = nn.StochasticGradient(net, criterion)
trainer.learningRate = 0.001
trainer.maxIteration = 8
print(net:__tostring())

print('##### Training #####')
trainer:train(train_set)

print('##### Testing #####')
count = 0
for i = 1, 2000, 1 do
	predict = net:forward(test_set.data[i]):exp()
	-- print(predict)
	index = 0
	maxpo = 0
	for j = 1, 26, 1 do
		if predict[j] > maxpo then
			index = j
			maxpo = predict[j]
		end
	end
	if index == test_set.label[i] then
		count = count + 1;
	else
		print(index.. '\t'.. test_set.label[i])
	end
end

print('Accuracy:', count/2000)
