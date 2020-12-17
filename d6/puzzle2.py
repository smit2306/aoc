with open("./input.txt", "r") as f:
    data = f.read()

lines = data.split("\n\n")


def solution(group: str) -> int:
    person_answers = group.split("\n")
    common = set(person_answers[0])
    if len(person_answers) > 1:
        for a in person_answers[1:]:
            common.intersection_update(set(a))
    return len(common)


num_questions = [solution(x) for x in lines]
print("Sum of number of question to which everyone answered yes: ", sum(num_questions))
