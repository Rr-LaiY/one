
def game1 (start, end, times):
        import random
        answer = random.randint(start,end)
        guess = 0
        count = 0
        while guess != answer and count < times:
            if guess != answer:
                print(f"you have {times - count} times")
            count += 1
            guess = int(input("guess a number:"))
            if guess == answer:
                print (f"you guessed{count}times" )
            elif guess > answer:
                print ("high")
            elif guess < answer:
                print("low")
        if guess == answer:
            return True
        elif count == times:
            return False
        else :
            return False
while True:

    result = game1(1,20,9)
    if result:
        print("you win")
    else:
        print("you lose")
    again = input("do you want to play again?(y/n):")
    if again == "n":
        break