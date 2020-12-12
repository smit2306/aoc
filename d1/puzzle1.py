with open("input.txt", "r") as f:
    data = f.read()

lines = data.splitlines()
lines = [int(x) for x in lines]
lines.sort()

left = 0
right = len(lines) - 1

while left < right:
    currentSum = lines[left] + lines[right]
    if currentSum < 2020:
        left += 1
    elif currentSum > 2020:
        right -= 1
    else:
        print("Found numbers: ", lines[left], " , ", lines[right])
        print("Product: ", lines[left] * lines[right])
        break
