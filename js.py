f1 = open("trainLabel.txt",'r')
f2 = open("trainLabel.js",'w')
s = f1.read()
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[1:-3]
s = s.replace(" ", ", ")
s = "var train_label = [" + s + "];"
f2.write(s)
f1.close()
f2.close()

f1 = open("testLabel.txt",'r')
f2 = open("testLabel.js",'w')
s = f1.read()
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[1:-3]
s = s.replace(" ", ", ")
s = "var test_label = [" + s + "];"
f2.write(s)
f1.close()
f2.close()

f1 = open("trainData.txt",'r')
f2 = open("trainData.js",'w')
s = f1.read()
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s.replace("\n ", "],\n[")
s = s.replace(" ", ",")
s = s[1:-3]
s = "var train_data = [\n[" + s + "]\n];"
f2.write(s)
f1.close()
f2.close()

f1 = open("testData.txt",'r')
f2 = open("testData.js",'w')
s = f1.read()
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s[s.find("\n")+1:]
s = s.replace("\n ", "],\n[")
s = s.replace(" ", ",")
s = s[1:-3]
s = "var test_data = [\n[" + s + "]\n];"
f2.write(s)
f1.close()
f2.close()
