export interface Question {
  id: number;
  type: 'mcq' | 'multiple' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  totalQuestions: number;
  totalPoints: number;
  instructions: string[];
  questions: Question[];
}

export const sampleExam: Exam = {
  id: "exam-ds-final-2025",
  title: "Data Structures Final Exam",
  subject: "Computer Science",
  duration: 120, // 2 hours
  totalQuestions: 15,
  totalPoints: 100,
  instructions: [
    "Read each question carefully before answering.",
    "You cannot go back once you submit the exam.",
    "Ensure stable internet connection throughout the exam.",
    "Do not switch tabs or minimize the browser window.",
    "Any suspicious activity will be flagged for review.",
  ],
  questions: [
    {
      id: 1,
      type: 'mcq',
      question: "What is the time complexity of binary search in a sorted array?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctAnswer: "O(log n)",
      points: 5,
    },
    {
      id: 2,
      type: 'mcq',
      question: "Which data structure uses LIFO (Last In First Out) principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correctAnswer: "Stack",
      points: 5,
    },
    {
      id: 3,
      type: 'true-false',
      question: "A binary tree can have at most 2 children for each node.",
      options: ["True", "False"],
      correctAnswer: "True",
      points: 5,
    },
    {
      id: 4,
      type: 'mcq',
      question: "What is the worst-case time complexity of QuickSort?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      correctAnswer: "O(n²)",
      points: 7,
    },
    {
      id: 5,
      type: 'multiple',
      question: "Select all data structures that can be used to implement a priority queue:",
      options: ["Binary Heap", "Linked List", "Binary Search Tree", "Hash Table"],
      correctAnswer: ["Binary Heap", "Binary Search Tree"],
      points: 8,
    },
    {
      id: 6,
      type: 'mcq',
      question: "In a hash table, what is the technique used to handle collisions where elements are stored in the same index?",
      options: ["Linear Probing", "Chaining", "Both A and B", "None of the above"],
      correctAnswer: "Both A and B",
      points: 6,
    },
    {
      id: 7,
      type: 'true-false',
      question: "Breadth-First Search (BFS) uses a stack data structure.",
      options: ["True", "False"],
      correctAnswer: "False",
      points: 5,
    },
    {
      id: 8,
      type: 'mcq',
      question: "What is the space complexity of Merge Sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: "O(n)",
      points: 6,
    },
    {
      id: 9,
      type: 'short-answer',
      question: "Briefly explain the difference between a stack and a queue.",
      points: 10,
    },
    {
      id: 10,
      type: 'mcq',
      question: "Which traversal visits the root node between left and right subtrees?",
      options: ["Preorder", "Inorder", "Postorder", "Level Order"],
      correctAnswer: "Inorder",
      points: 5,
    },
    {
      id: 11,
      type: 'multiple',
      question: "Select all valid applications of a Graph data structure:",
      options: ["Social Networks", "GPS Navigation", "Web Page Ranking", "All of the above"],
      correctAnswer: ["Social Networks", "GPS Navigation", "Web Page Ranking", "All of the above"],
      points: 8,
    },
    {
      id: 12,
      type: 'mcq',
      question: "What is the minimum number of nodes in a complete binary tree of height h?",
      options: ["2^h", "2^(h+1) - 1", "2^h - 1", "h + 1"],
      correctAnswer: "2^h",
      points: 7,
    },
    {
      id: 13,
      type: 'true-false',
      question: "AVL trees are self-balancing binary search trees.",
      options: ["True", "False"],
      correctAnswer: "True",
      points: 5,
    },
    {
      id: 14,
      type: 'short-answer',
      question: "Explain the concept of Dynamic Programming with an example.",
      points: 12,
    },
    {
      id: 15,
      type: 'mcq',
      question: "Which algorithm is used to find the shortest path in a weighted graph?",
      options: ["DFS", "BFS", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
      correctAnswer: "Dijkstra's Algorithm",
      points: 6,
    },
  ],
};
