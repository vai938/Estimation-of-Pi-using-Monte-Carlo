import random
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
 
empty = []
cols = ["100", "500", "1000", "5000", "7000", "10000", "15000"]
arr = [int(x) for x in cols]
for i in range(len(arr)):
   pin = 0
   ptot = 0
   sample = []
   for j in range(arr[i]):
       x = random.uniform(0, 1)
       y = random.uniform(0, 1)
       if (x**2 + y**2) <= 1:
           pin += 1
       ptot += 1
       pi = 4 * (pin / ptot)
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
stats_data["kurtosis"] = kurt
print(stats_data)
print(len(empty[1]))
plt.show()
