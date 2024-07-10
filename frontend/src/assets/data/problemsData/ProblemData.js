// import Problem from "../../../model/Problem.js";

// const problemsData = {
//   Sprout: [
//     new Problem(
//       "s1",
//       "Name Shout-Out!",
//       "Let's start by telling the world your name! Write a program to print your name. Easy peasy!",
//       "No input required.",
//       "Your name.",
//       "Use a simple print or console.log function."
//     ),
//     new Problem(
//       "s2",
//       "Counting Fun!",
//       "Can you count from 1 to 10? Write a program to print numbers from 1 to 10. Let's go!",
//       "No input required.",
//       "Numbers from 1 to 10.",
//       "Use a loop to count from 1 to 10."
//     ),
//     new Problem(
//       "s3",
//       "Hello, World!",
//       "The classic programming challenge! Write a program to print 'Hello, World!'.",
//       "No input required.",
//       "'Hello, World!'.",
//       "Use print or console.log to say hello to the world."
//     ),
//     new Problem(
//       "s4",
//       "Magic Addition",
//       "Abracadabra! Add 2 and 3 together and show the result. Ready to do some magic math?",
//       "No input required.",
//       "5",
//       "Use basic addition in your code."
//     ),
//     new Problem(
//       "s5",
//       "Counting to Five",
//       "Let's count to five together! Write a program to count from 1 to 5. Simple, right?",
//       "No input required.",
//       "1 2 3 4 5",
//       "A loop will make this task easier."
//     ),
//     new Problem(
//       "s6",
//       "Friendly Hello",
//       "Say 'Hello' to a friend by name! Write a program to say 'Hello' followed by a given name.",
//       "A name as a string.",
//       "'Hello, [name]!'",
//       "Combine 'Hello' with the input name."
//     ),
//     new Problem(
//       "s7",
//       "Sum it Up!",
//       "Can you add two numbers? Write a program to add two given numbers and show the sum.",
//       "Two integers.",
//       "Sum of the two integers.",
//       "Use input to get the numbers and then add them."
//     ),
//     new Problem(
//       "s8",
//       "Alphabet Adventure",
//       "Join the alphabet adventure! Write a program to print the alphabet from A to Z. Ready, set, go!",
//       "No input required.",
//       "The alphabet from A to Z.",
//       "Use a loop to print each letter."
//     ),
//     new Problem(
//       "s9",
//       "Table of 5",
//       "Multiplication can be fun! Write a program to print the multiplication table of 5. Let's multiply!",
//       "No input required.",
//       "Multiplication table of 5.",
//       "Use a loop to multiply 5 by numbers 1 through 10."
//     ),
//     new Problem(
//       "s10",
//       "Square Magic",
//       "Square a number and show your magic! Write a program to find the square of a given number.",
//       "An integer.",
//       "The square of the number.",
//       "Multiply the number by itself to find the square."
//     ),
//   ],
//   Explorer: [
//     new Problem(
//       "e1",
//       "Number Summation",
//       "Can you find the sum of two numbers? Write a program to add them together. Easy math fun!",
//       "Two integers.",
//       "Sum of the two integers.",
//       "Use input to get the numbers and then add them."
//     ),
//     new Problem(
//       "e2",
//       "Even Number Hunt",
//       "Let's find all the even numbers up to 20! Write a program to print even numbers from 1 to 20. Ready, set, go!",
//       "No input required.",
//       "Even numbers from 1 to 20.",
//       "Use a loop and check if a number is even using the modulus operator."
//     ),
//     new Problem(
//       "e3",
//       "Friendly Greeting",
//       "Greet your user by their name! Write a program to say 'Hello' followed by their name. Make them smile!",
//       "User's name.",
//       "'Hello, [Name]!'",
//       "Combine 'Hello' with the input name."
//     ),
//     new Problem(
//       "e4",
//       "Double Trouble",
//       "Multiplication is fun! Write a program to print the multiplication table of 2. Let's see how it doubles!",
//       "No input required.",
//       "2, 4, 6, 8, 10, 12, 14, 16, 18, 20",
//       "Use a loop to multiply 2 by numbers 1 through 10."
//     ),
//     new Problem(
//       "e5",
//       "Who's Bigger?",
//       "Which number is larger? Write a program to find the larger of two numbers. Let's compare!",
//       "Two integers.",
//       "The larger number.",
//       "Use a conditional statement to compare the two numbers."
//     ),
//     new Problem(
//       "e6",
//       "Average Finder",
//       "Calculate the average of three numbers. Write a program to find the average. It's time to do some averaging!",
//       "Three integers.",
//       "The average of the three integers.",
//       "Add the numbers together and divide by 3."
//     ),
//     new Problem(
//       "e7",
//       "Temperature Converter",
//       "Convert temperatures like a pro! Write a program to convert a temperature from Celsius to Fahrenheit.",
//       "A temperature in Celsius.",
//       "The temperature in Fahrenheit.",
//       "Use the formula (Celsius * 9/5) + 32 to convert."
//     ),
//     new Problem(
//       "e8",
//       "Factorial Fun",
//       "Let's find the factorial of a number! Write a program to find the factorial. Ready for some fun with numbers?",
//       "An integer.",
//       "The factorial of the number.",
//       "Use a loop or recursion to multiply the number by each integer below it."
//     ),
//     new Problem(
//       "e9",
//       "Leap Year Checker",
//       "Is it a leap year? Write a program to check if a given year is a leap year. Let's find out!",
//       "A year.",
//       "Yes or No.",
//       "A year is a leap year if it is divisible by 4, but not every century year unless it is divisible by 400."
//     ),
//     new Problem(
//       "e10",
//       "Reverse It!",
//       "Reverse the digits of a number! Write a program to reverse the digits. Let's see the number backwards!",
//       "An integer.",
//       "The reversed number.",
//       "Use a loop to reverse the digits or convert the number to a string and reverse it."
//     ),
//   ],
//   Adventurer: [
//     new Problem(
//       "a1",
//       "Odd or Even Pirate",
//       "Let's play a number game! Write a program to help your computer \n figure out if a number is odd or even. It's like telling your \ncomputer if a number is a 'one-legged pirate' (odd)\n or a 'two-legged pirate' (even)!",
//       "An integer.",
//       "Odd or Even.",
//       "Use the modulus operator to check if the number is divisible by 2."
//     ),
//     new Problem(
//       "a2",
//       "Factorial Fiesta",
//       "Join the factorial fiesta! Write a program to find the factorial of a number. Ready to have some fun with math?",
//       "An integer.",
//       "The factorial of the number.",
//       "Use a loop or recursion to multiply the number by each integer below it."
//     ),
//     new Problem(
//       "a3",
//       "Digit Sum Magic",
//       "Let's add up the digits! Write a program to find the sum of the digits of a number. It's like magic with numbers!",
//       "An integer.",
//       "The sum of the digits.",
//       "Use a loop to extract each digit and add them together."
//     ),
//     new Problem(
//       "a4",
//       "String Reversal Adventure",
//       "Reverse the words! Write a program to reverse a given string. Let's see the words backwards!",
//       "A string.",
//       "The reversed string.",
//       "Convert the string to a list or array and reverse it."
//     ),
//     new Problem(
//       "a5",
//       "Smallest Number Quest",
//       "Find the tiniest! Write a program to find the smallest of three numbers. Let's see which one is the smallest!",
//       "Three integers.",
//       "The smallest number.",
//       "Use conditional statements to compare the three numbers."
//     ),
//     new Problem(
//       "a6",
//       "GCD Explorer",
//       "Discover the greatest common divisor (GCD)! Write a program to find the GCD of two numbers. Ready for some number exploration?",
//       "Two integers.",
//       "The GCD of the two numbers.",
//       "Use the Euclidean algorithm to find the GCD."
//     ),
//     new Problem(
//       "a7",
//       "LCM Finder",
//       "Let's find the least common multiple (LCM)! Write a program to find the LCM of two numbers. It's number discovery time!",
//       "Two integers.",
//       "The LCM of the two numbers.",
//       "Use the formula LCM(a, b) = |a * b| / GCD(a, b)."
//     ),
//     new Problem(
//       "a8",
//       "Prime Number Check",
//       "Is it prime or not? Write a program to check if a number is prime. Let's figure it out!",
//       "An integer.",
//       "Yes or No.",
//       "A prime number is only divisible by 1 and itself."
//     ),
//     new Problem(
//       "a9",
//       "Binary to Decimal Conversion",
//       "Convert binary to decimal! Write a program to convert a binary number to decimal. Let's decode the binary!",
//       "A binary number.",
//       "The decimal equivalent of the binary number.",
//       "Use the formula to convert each binary digit to its decimal equivalent."
//     ),
//     new Problem(
//       "a10",
//       "Square Root Finder",
//       "Find the square root! Write a program to find the square root of a number. Let's dive into some square root fun!",
//       "An integer.",
//       "The square root of the integer.",
//       "Use a mathematical function or method to find the square root."
//     ),
//   ],
//   Challenger: [
//     new Problem(
//       "c1",
//       "Fibonacci Fun",
//       "Dive into the world of Fibonacci! Write a program to print the first 10 numbers of the Fibonacci sequence. Let's see the magic of numbers!",
//       "No input required.",
//       "The first 10 numbers of the Fibonacci sequence.",
//       "Each number is the sum of the two preceding ones, starting from 0 and 1."
//     ),
//     new Problem(
//       "c2",
//       "Palindrome Detective",
//       "Is it the same forward and backward? Write a program to check if a given string is a palindrome. Let's find out!",
//       "A string.",
//       "Yes or No.",
//       "Compare the string with its reverse."
//     ),
//     new Problem(
//       "c3",
//       "Array Sum Challenge",
//       "Add them all up! Write a program to find the sum of all elements in an array. Let's see how well you can sum!",
//       "An array of integers.",
//       "The sum of the array elements.",
//       "Use a loop to add each element of the array."
//     ),
//     new Problem(
//       "c4",
//       "Matrix Magic",
//       "Magic with matrices! Write a program to add two 2x2 matrices. Let's see the result!",
//       "Two 2x2 matrices.",
//       "The resulting 2x2 matrix after addition.",
//       "Add corresponding elements of the two matrices."
//     ),
//     new Problem(
//       "c5",
//       "Longest Word Finder",
//       "Find the longest word! Write a program to find the longest word in a given sentence. Ready for the challenge?",
//       "A sentence as a string.",
//       "The longest word in the sentence.",
//       "Split the sentence into words and compare their lengths."
//     ),
//     new Problem(
//       "c6",
//       "Prime Factor Explorer",
//       "Explore the prime factors! Write a program to find all prime factors of a given number. Let's break it down!",
//       "An integer.",
//       "All prime factors of the number.",
//       "Divide the number by its smallest prime factor and repeat."
//     ),
//     new Problem(
//       "c7",
//       "Digit Sum Adventure",
//       "Sum up the digits! Write a program to find the sum of the digits of a given number. It's number fun time!",
//       "An integer.",
//       "The sum of the digits.",
//       "Use a loop to extract each digit and add them together."
//     ),
//     new Problem(
//       "c8",
//       "Fahrenheit to Celsius Conversion",
//       "Convert the temperature! Write a program to convert a temperature from Fahrenheit to Celsius. Let's do some temperature math!",
//       "A temperature in Fahrenheit.",
//       "The temperature in Celsius.",
//       "Use the formula (Fahrenheit - 32) * 5/9 to convert."
//     ),
//     new Problem(
//       "c9",
//       "Recursive Factorial",
//       "Factorial with a twist! Write a program to find the factorial of a number using recursion. Ready for the challenge?",
//       "An integer.",
//       "The factorial of the number.",
//       "A function that calls itself is a key to recursion."
//     ),
//     new Problem(
//       "c10",
//       "Anagram Checker",
//       "Are they anagrams? Write a program to check if two given strings are anagrams. Let's see if they match!",
//       "Two strings.",
//       "Yes or No.",
//       "Compare the sorted versions of both strings."
//     ),
//   ],
//   Mastermind: [
//     new Problem(
//       "m1",
//       "Merge Magic",
//       "Combine and conquer! Write a program to merge two sorted arrays into one sorted array. Let's make it seamless!",
//       "Two sorted arrays of integers.",
//       "The merged sorted array.",
//       "Use two pointers to compare elements from both arrays."
//     ),
//     new Problem(
//       "m2",
//       "Duplicate Detector",
//       "Find the repeats! Write a program to find duplicate elements in a given array. Let's uncover the twins!",
//       "An array of integers.",
//       "The duplicate elements in the array.",
//       "Use a hash set or sort the array first to find duplicates."
//     ),
//     new Problem(
//       "m3",
//       "Binary Search Sleuth",
//       "Find it fast! Write a program to perform binary search on a sorted array. Let's locate that number quickly!",
//       "A sorted array of integers and a target integer.",
//       "The index of the target integer in the array, or -1 if not found.",
//       "Repeatedly divide the array in half to find the target."
//     ),
//     new Problem(
//       "m4",
//       "Matrix Multiplication Master",
//       "Multiply those matrices! Write a program to multiply two 2x2 matrices. Let's see the magic of matrix math!",
//       "Two 2x2 matrices.",
//       "The resulting 2x2 matrix after multiplication.",
//       "Use the formula for matrix multiplication."
//     ),
//     new Problem(
//       "m5",
//       "Median Finder",
//       "Find the middle! Write a program to find the median of a given array. Let's find the center value!",
//       "An array of integers.",
//       "The median of the array.",
//       "Sort the array first to find the median."
//     ),
//     new Problem(
//       "m6",
//       "Linked List Reversal",
//       "Flip it around! Write a program to reverse a singly linked list. Let's reverse the order!",
//       "A singly linked list.",
//       "The reversed linked list.",
//       "Change the direction of the pointers in the linked list."
//     ),
//     new Problem(
//       "m7",
//       "Longest Increasing Subsequence Explorer",
//       "Find the longest climb! Write a program to find the longest increasing subsequence in a given array. Let's see how high you can go!",
//       "An array of integers.",
//       "The longest increasing subsequence.",
//       "Use dynamic programming to solve this problem efficiently."
//     ),
//     new Problem(
//       "m8",
//       "Knapsack Conqueror",
//       "Pack it up! Write a program to solve the 0/1 Knapsack problem. Let's maximize the value!",
//       "A list of items with weights and values, and a maximum weight capacity.",
//       "The maximum value that can be obtained.",
//       "Use dynamic programming to find the optimal solution."
//     ),
//     new Problem(
//       "m9",
//       "Sudoku Solver Supreme",
//       "Solve the puzzle! Write a program to solve a given Sudoku puzzle. Let's complete the grid!",
//       "A partially filled 9x9 Sudoku grid.",
//       "The completed Sudoku grid.",
//       "Use backtracking to try different solutions."
//     ),
//     new Problem(
//       "m10",
//       "Graph Cycle Detector",
//       "Find the loop! Write a program to detect a cycle in a given graph. Let's see if there's a loop!",
//       "An undirected graph.",
//       "Yes or No.",
//       "Use depth-first search (DFS) or union-find to detect cycles."
//     ),
//   ]
// };

// export default problemsData;

