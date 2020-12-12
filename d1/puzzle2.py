from typing import List, Union

with open("input.txt") as f:
    data = f.read()
lines = data.splitlines()
lines = [int(x) for x in lines]
lines.sort()


def three_number_sum(array: List[int]) -> Union[List[int], None]:
    for i in range(0, len(array)):
        x = array[i]
        two_number_sum = 2020 - x

        left = i + 1
        right = len(array) - 1

        while left < right:
            current_sum = array[left] + array[right]
            if current_sum < two_number_sum:
                left += 1
            elif current_sum > two_number_sum:
                right -= 1
            else:
                return [x, array[left], array[right]]


op = three_number_sum(lines)
if op:
    print("Answer: ", op[0] * op[1] * op[2])
else:
    print("Answer not found!!")