with open("./input.txt", "r") as f:
    data = f.read()

lines = data.split("\n\n")
answers = [line.replace("\n", "") for line in lines]


def get_unique_count(line: str) -> int:
    unique = dict()
    for char in line:
        if unique.get(char) is None:
            unique[char] = 1
        else:
            unique[char] += 1
    return len(unique)


num_questions = [get_unique_count(a) for a in answers]
print("Sum of number of question to which anyone answered yes: ", sum(num_questions))
