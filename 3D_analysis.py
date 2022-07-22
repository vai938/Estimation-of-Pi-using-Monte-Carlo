import random
import matplotlib.pyplot as plt
import pandas as pd
master = []
for i in range(1000):
   pin = 0
   ptot = 0
   for j in range(1000):
       x = random.random()
       y = random.random()
       z = random.random()
       if (x*x + y*y + z*z)**0.5 <= 1:
           pin += 1
       ptot += 1
   pi = 6*(float(pin/ptot))
   master.append(pi)
       sample.append(pi)
   empty.append(sample)
column = ["min", "max", "mean", "stand-dev", "variance", "skewness", "kurtosis"]
stats_data = pd.DataFrame(data=np.zeros((7, 7)), columns=column, index=arr)
min, max, mean, stdev, var, skew, kurt = [], [], [], [], [], [], []
for i in range(len(arr)):
   raw = pd.DataFrame(
       data=empty[i], columns={cols[i]}, index=np.arange(1, len(empty[i]) + 1)
   )
   min.append(raw[str(cols[i])].min())
   max.append(raw[str(cols[i])].max())
   mean.append(raw[str(cols[i])].mean())
   stdev.append(raw[str(cols[i])].std())
   var.append(raw[str(cols[i])].var())
   skew.append(raw[str(cols[i])].skew())
   kurt.append(raw[str(cols[i])].kurtosis())
   sns.displot(data=raw, x=str(cols[i]), kind="kde")
   # raw.to_csv(str(cols[i]) + ".csv")
   del raw
stats_data["min"] = min
stats_data["max"] = max
stats_data["mean"] = mean
stats_data["stand-dev"] = stdev
stats_data["variance"] = var
stats_data["skewness"] = skew
master.sort()
plt.hist(master,bins=50)
plt.show()  
