import Problem from "../../../model/Problem.js";


const problemsData = {
  Sprout: [
    new Problem(
      "Print Your Name",
      "Write a program to print your name.",
      "No input required.",
      "Your name."
    ),
    new Problem(
      "Print Numbers Up to 10",
      "Write a program to print numbers from 1 to 10.\nIf you fail, nvm.",
      "No input required.",
      "Numbers from 1 to 10."
    ),
    new Problem(
      "Print Hello World",
      "Write a program to print 'Hello, World!'.",
      "No input required.",
      "'Hello, World!'."
    ),
    new Problem(
      "Simple Addition",
      "Write a program to add 2 and 3 and print the result.",
      "No input required.",
      "5"
    ),
    new Problem(
      "Count to Five",
      "Write a program to count from 1 to 5.",
      "No input required.",
      "1 2 3 4 5"
    ),
  ],
  Explorer: [
    new Problem(
      "Sum of Two Numbers",
      "Write a program to find the sum of two numbers.",
      "Two integers.",
      "Sum of the two integers."
    ),
    new Problem(
      "Print Even Numbers Up to 20",
      "Write a program to print even numbers from 1 to 20.",
      "No input required.",
      "Even numbers from 1 to 20."
    ),
    new Problem(
      "Greet User",
      "Write a program to greet the user with their name.",
      "User's name.",
      "'Hello, [Name]!'"
    ),
    new Problem(
      "Multiplication Table",
      "Write a program to print the multiplication table of 2.",
      "No input required.",
      "2, 4, 6, 8, 10, 12, 14, 16, 18, 20"
    ),
    new Problem(
      "Find the Larger Number",
      "Write a program to find the larger of two numbers.",
      "Two integers.",
      "The larger number."
    ),
  ],
  Adventurer: [
    new Problem(
      "Check Odd or Even",
      "Write a program to check if a number is odd or even.",
      "An integer.",
      "Odd or Even."
    ),
    new Problem(
      "Factorial",
      "Write a program to find the factorial of a number.",
      "An integer.",
      "The factorial of the number."
    ),
    new Problem(
      "Sum of Digits",
      "Write a program to find the sum of the digits of a number.",
      "An integer.",
      "The sum of the digits."
    ),
    new Problem(
      "Reverse a String",
      "Write a program to reverse a given string.",
      "A string.",
      "The reversed string."
    ),
    new Problem(
      "Find the Smallest Number",
      "Write a program to find the smallest of three numbers.",
      "Three integers.",
      "The smallest number."
    ),
  ],
  Challenger: [
    new Problem(
      "Fibonacci Series",
      "Write a program to print the first 10 numbers in the Fibonacci series.",
      "No input required.",
      "0, 1, 1, 2, 3, 5, 8, 13, 21, 34"
    ),
    new Problem(
      "Palindrome Check",
      "Write a program to check if a string is a palindrome.",
      "A string.",
      "Yes or No."
    ),
    new Problem(
      "Prime Number Check",
      "Write a program to check if a number is a prime number.",
      "An integer.",
      "Yes or No."
    ),
    new Problem(
      "Sum of Array Elements",
      "Write a program to find the sum of elements in an array.",
      "An array of integers.",
      "The sum of the elements."
    ),
    new Problem(
      "Count Vowels",
      "Write a program to count the number of vowels in a string.",
      "A string.",
      "The number of vowels."
    ),
  ],
  Mastermind: [
    new Problem(
      "Sort an Array",
      "Write a program to sort an array of integers.",
      "An array of integers.",
      "The sorted array."
    ),
    new Problem(
      "Binary Search",
      "Write a program to perform binary search on a sorted array.",
      "A sorted array and a target value.",
      "The index of the target value or -1 if not found."
    ),
    new Problem(
      "Matrix Addition",
      "Write a program to add two matrices.",
      "Two matrices.",
      "The resulting matrix."
    ),
    new Problem(
      "Find Duplicates",
      "Write a program to find duplicate elements in an array.",
      "An array of integers.",
      "The duplicate elements."
    ),
    new Problem(
      "Anagram Check",
      "Write a program to check if two strings are anagrams.",
      "Two strings.",
      "Yes or No."
    ),
  ],
};

export default problemsData;
