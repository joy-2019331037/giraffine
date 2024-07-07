import Problem from "../../../model/Problem.js";

const problemsData = {
  Sprout: [
    new Problem(
      "s1",
      "Print Your Name",
      "Write a program to print your name.",
      "No input required.",
      "Your name."
    ),
    new Problem(
      "s2",
      "Print Numbers Up to 10",
      "Write a program to print numbers from 1 to 10.\nIf you fail, nvm.",
      "No input required.",
      "Numbers from 1 to 10."
    ),
    new Problem(
      "s3",
      "Print Hello World",
      "Write a program to print 'Hello, World!'.",
      "No input required.",
      "'Hello, World!'."
    ),
    new Problem(
      "s4",
      "Simple Addition",
      "Write a program to add 2 and 3 and print the result.",
      "No input required.",
      "5"
    ),
    new Problem(
      "s5",
      "Count to Five",
      "Write a program to count from 1 to 5.",
      "No input required.",
      "1 2 3 4 5"
    ),
    new Problem(
      "s6",
      "Say Hello",
      "Write a program to say 'Hello' followed by a given name.",
      "A name as a string.",
      "'Hello, [name]!'"
    ),
    new Problem(
      "s7",
      "Addition of Two Numbers",
      "Write a program to add two given numbers.",
      "Two integers.",
      "Sum of the two integers."
    ),
    new Problem(
      "s8",
      "Print the Alphabet",
      "Write a program to print the alphabet from A to Z.",
      "No input required.",
      "The alphabet from A to Z."
    ),
    new Problem(
      "s9",
      "Multiplication Table of 5",
      "Write a program to print the multiplication table of 5.",
      "No input required.",
      "Multiplication table of 5."
    ),
    new Problem(
      "s10",
      "Square of a Number",
      "Write a program to find the square of a given number.",
      "An integer.",
      "The square of the number."
    ),
  ],
  Explorer: [
    new Problem(
      "e1",
      "Sum of Two Numbers",
      "Write a program to find the sum of two numbers.",
      "Two integers.",
      "Sum of the two integers."
    ),
    new Problem(
      "e2",
      "Print Even Numbers Up to 20",
      "Write a program to print even numbers from 1 to 20.",
      "No input required.",
      "Even numbers from 1 to 20."
    ),
    new Problem(
      "e3",
      "Greet User",
      "Write a program to greet the user with their name.",
      "User's name.",
      "'Hello, [Name]!'"
    ),
    new Problem(
      "e4",
      "Multiplication Table",
      "Write a program to print the multiplication table of 2.",
      "No input required.",
      "2, 4, 6, 8, 10, 12, 14, 16, 18, 20"
    ),
    new Problem(
      "e5",
      "Find the Larger Number",
      "Write a program to find the larger of two numbers.",
      "Two integers.",
      "The larger number."
    ),
    new Problem(
      "e6",
      "Calculate Average",
      "Write a program to calculate the average of three numbers.",
      "Three integers.",
      "The average of the three integers."
    ),
    new Problem(
      "e7",
      "Convert Celsius to Fahrenheit",
      "Write a program to convert a temperature from Celsius to Fahrenheit.",
      "A temperature in Celsius.",
      "The temperature in Fahrenheit."
    ),
    new Problem(
      "e8",
      "Find Factorial",
      "Write a program to find the factorial of a given number.",
      "An integer.",
      "The factorial of the number."
    ),
    new Problem(
      "e9",
      "Check Leap Year",
      "Write a program to check if a given year is a leap year.",
      "A year.",
      "Yes or No."
    ),
    new Problem(
      "e10",
      "Reverse Digits",
      "Write a program to reverse the digits of a given number.",
      "An integer.",
      "The reversed number."
    ),
  ],
  Adventurer: [
    new Problem(
      "a1",
      "Is it Odd or Even",
      "Let's play a number game!\nWrite a program to help your computer figure out  if a \nnumber is odd or even. It's like telling your computer \n if a number is a 'one-legged pirate' (odd) or a 'two-legged\n pirate' (even)!\n\n  How's that?",
      "An integer.",
      "Odd or Even."
    ),
    new Problem(
      "a2",
      "Factorial",
      "Write a program to find the factorial of a number.",
      "An integer.",
      "The factorial of the number."
    ),
    new Problem(
      "a3",
      "Sum of Digits",
      "Write a program to find the sum of the digits of a number.",
      "An integer.",
      "The sum of the digits."
    ),
    new Problem(
      "a4",
      "Reverse a String",
      "Write a program to reverse a given string.",
      "A string.",
      "The reversed string."
    ),
    new Problem(
      "a5",
      "Find the Smallest Number",
      "Write a program to find the smallest of three numbers.",
      "Three integers.",
      "The smallest number."
    ),
    new Problem(
      "a6",
      "Find GCD",
      "Write a program to find the greatest common divisor (GCD) of two numbers.",
      "Two integers.",
      "The GCD of the two numbers."
    ),
    new Problem(
      "a7",
      "Find LCM",
      "Write a program to find the least common multiple (LCM) of two numbers.",
      "Two integers.",
      "The LCM of the two numbers."
    ),
    new Problem(
      "a8",
      "Check Prime Number",
      "Write a program to check if a number is prime.",
      "An integer.",
      "Yes or No."
    ),
    new Problem(
      "a9",
      "Convert Binary to Decimal",
      "Write a program to convert a binary number to decimal.",
      "A binary number.",
      "The decimal equivalent of the binary number."
    ),
    new Problem(
      "a10",
      "Find Square Root",
      "Write a program to find the square root of a number",
      "an integer",
      "square root of the integer"
    ),
  ],
  Challenger: [
    new Problem(
      "c1",
      "Fibonacci Sequence",
      "Write a program to print the first 10 numbers of the Fibonacci sequence.",
      "No input required.",
      "The first 10 numbers of the Fibonacci sequence."
    ),
    new Problem(
      "c2",
      "Palindrome Check",
      "Write a program to check if a given string is a palindrome.",
      "A string.",
      "Yes or No."
    ),
    new Problem(
      "c3",
      "Sum of Array Elements",
      "Write a program to find the sum of all elements in an array.",
      "An array of integers.",
      "The sum of the array elements."
    ),
    new Problem(
      "c4",
      "Matrix Addition",
      "Write a program to add two 2x2 matrices.",
      "Two 2x2 matrices.",
      "The resulting 2x2 matrix after addition."
    ),
    new Problem(
      "c5",
      "Longest Word in Sentence",
      "Write a program to find the longest word in a given sentence.",
      "A sentence as a string.",
      "The longest word in the sentence."
    ),
    new Problem(
      "c6",
      "Prime Factors",
      "Write a program to find all prime factors of a given number.",
      "An integer.",
      "All prime factors of the number."
    ),
    new Problem(
      "c7",
      "Sum of Digits",
      "Write a program to find the sum of the digits of a given number.",
      "An integer.",
      "The sum of the digits."
    ),
    new Problem(
      "c8",
      "Temperature Conversion",
      "Write a program to convert a temperature from Fahrenheit to Celsius.",
      "A temperature in Fahrenheit.",
      "The temperature in Celsius."
    ),
    new Problem(
      "c9",
      "Factorial Using Recursion",
      "Write a program to find the factorial of a number using recursion.",
      "An integer.",
      "The factorial of the number."
    ),
    new Problem(
      "c10",
      "Check Anagram",
      "Write a program to check if two given strings are anagrams.",
      "Two strings.",
      "Yes or No."
    ),
  ],
  Mastermind: [
    new Problem(
      "m1",
      "Merge Sorted Arrays",
      "Write a program to merge two sorted arrays into one sorted array.",
      "Two sorted arrays of integers.",
      "The merged sorted array."
    ),
    new Problem(
      "m2",
      "Find Duplicates in Array",
      "Write a program to find duplicate elements in a given array.",
      "An array of integers.",
      "The duplicate elements in the array."
    ),
    new Problem(
      "m3",
      "Binary Search",
      "Write a program to perform binary search on a sorted array.",
      "A sorted array of integers and a target integer.",
      "The index of the target integer in the array, or -1 if not found."
    ),
    new Problem(
      "m4",
      "Matrix Multiplication",
      "Write a program to multiply two 2x2 matrices.",
      "Two 2x2 matrices.",
      "The resulting 2x2 matrix after multiplication."
    ),
    new Problem(
      "m5",
      "Find Median",
      "Write a program to find the median of a given array.",
      "An array of integers.",
      "The median of the array."
    ),
    new Problem(
      "m6",
      "Reverse Linked List",
      "Write a program to reverse a singly linked list.",
      "A singly linked list.",
      "The reversed linked list."
    ),
    new Problem(
      "m7",
      "Longest Increasing Subsequence",
      "Write a program to find the longest increasing subsequence in a given array.",
      "An array of integers.",
      "The longest increasing subsequence."
    ),
    new Problem(
      "m8",
      "Knapsack Problem",
      "Write a program to solve the 0/1 Knapsack problem.",
      "A list of items with weights and values, and a maximum weight capacity.",
      "The maximum value that can be obtained."
    ),
    new Problem(
      "m9",
      "Sudoku Solver",
      "Write a program to solve a given Sudoku puzzle.",
      "A partially filled 9x9 Sudoku grid.",
      "The completed Sudoku grid."
    ),
    new Problem(
      "m10",
      "Find Cycle in Graph",
      "Write a program to detect a cycle in a given graph.",
      "An undirected graph.",
      "Yes or No."
    ),
  ],
};

export default problemsData;

// const problemsData = {
//   Sprout: [
//     new Problem(
//       "s1",
//       "Print Your Name",
//       "Write a program to print your name.",
//       "No input required.",
//       "Your name."
//     ),
//     new Problem(
//       "s2",
//       "Print Numbers Up to 10",
//       "Write a program to print numbers from 1 to 10.\nIf you fail, nvm.",
//       "No input required.",
//       "Numbers from 1 to 10."
//     ),
//     new Problem(
//       "s3",
//       "Print Hello World",
//       "Write a program to print 'Hello, World!'.",
//       "No input required.",
//       "'Hello, World!'."
//     ),
//     new Problem(
//       "s4",
//       "Simple Addition",
//       "Write a program to add 2 and 3 and print the result.",
//       "No input required.",
//       "5"
//     ),
//     new Problem(
//       "s5",
//       "Count to Five",
//       "Write a program to count from 1 to 5.",
//       "No input required.",
//       "1 2 3 4 5"
//     ),
//   ],
//   Explorer: [
//     new Problem(
//       "e1",
//       "Sum of Two Numbers",
//       "Write a program to find the sum of two numbers.",
//       "Two integers.",
//       "Sum of the two integers."
//     ),
//     new Problem(
//       "e2",
//       "Print Even Numbers Up to 20",
//       "Write a program to print even numbers from 1 to 20.",
//       "No input required.",
//       "Even numbers from 1 to 20."
//     ),
//     new Problem(
//       "e3",
//       "Greet User",
//       "Write a program to greet the user with their name.",
//       "User's name.",
//       "'Hello, [Name]!'"
//     ),
//     new Problem(
//       "e4",
//       "Multiplication Table",
//       "Write a program to print the multiplication table of 2.",
//       "No input required.",
//       "2, 4, 6, 8, 10, 12, 14, 16, 18, 20"
//     ),
//     new Problem(
//       "e5",
//       "Find the Larger Number",
//       "Write a program to find the larger of two numbers.",
//       "Two integers.",
//       "The larger number."
//     ),
//   ],
//   Adventurer: [
//     new Problem(
//       "a1",
//       "Check Odd or Even",
//       "Write a program to check if a number is odd or even.",
//       "An integer.",
//       "Odd or Even."
//     ),
//     new Problem(
//       "a2",
//       "Factorial",
//       "Write a program to find the factorial of a number.",
//       "An integer.",
//       "The factorial of the number."
//     ),
//     new Problem(
//       "a3",
//       "Sum of Digits",
//       "Write a program to find the sum of the digits of a number.",
//       "An integer.",
//       "The sum of the digits."
//     ),
//     new Problem(
//       "a4",
//       "Reverse a String",
//       "Write a program to reverse a given string.",
//       "A string.",
//       "The reversed string."
//     ),
//     new Problem(
//       "a5",
//       "Find the Smallest Number",
//       "Write a program to find the smallest of three numbers.",
//       "Three integers.",
//       "The smallest number."
//     ),
//   ],
//   Challenger: [
//     new Problem(
//       "c1",
//       "Fibonacci Series",
//       "Write a program to print the first 10 numbers in the Fibonacci series.",
//       "No input required.",
//       "0, 1, 1, 2, 3, 5, 8, 13, 21, 34"
//     ),
//     new Problem(
//       "c2",
//       "Palindrome Check",
//       "Write a program to check if a string is a palindrome.",
//       "A string.",
//       "Yes or No."
//     ),
//     new Problem(
//       "c3",
//       "Prime Number Check",
//       "Write a program to check if a number is a prime number.",
//       "An integer.",
//       "Yes or No."
//     ),
//     new Problem(
//       "c4",
//       "Sum of Array Elements",
//       "Write a program to find the sum of elements in an array.",
//       "An array of integers.",
//       "The sum of the elements."
//     ),
//     new Problem(
//       "c5",
//       "Count Vowels",
//       "Write a program to count the number of vowels in a string.",
//       "A string.",
//       "The number of vowels."
//     ),
//   ],
//   Mastermind: [
//     new Problem(
//       "m1",
//       "Sort an Array",
//       "Write a program to sort an array of integers.",
//       "An array of integers.",
//       "The sorted array."
//     ),
//     new Problem(
//       "m2",
//       "Binary Search",
//       "Write a program to perform binary search on a sorted array.",
//       "A sorted array and a target value.",
//       "The index of the target value or -1 if not found."
//     ),
//     new Problem(
//       "m3",
//       "Matrix Addition",
//       "Write a program to add two matrices.",
//       "Two matrices.",
//       "The resulting matrix."
//     ),
//     new Problem(
//       "m4",
//       "Find Duplicates",
//       "Write a program to find duplicate elements in an array.",
//       "An array of integers.",
//       "The duplicate elements."
//     ),
//     new Problem(
//       "m5",
//       "Anagram Check",
//       "Write a program to check if two strings are anagrams.",
//       "Two strings.",
//       "Yes or No."
//     ),
//   ],
// };

// export default problemsData;
