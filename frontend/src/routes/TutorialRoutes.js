import React from "react";
import { Route } from "react-router-dom";
import Tutorials from "../pages/Tutorials/Tutorials";
import AlgoVisualizer from "../pages/Tutorials/Visualizer/AlgoVisualizer";
import BasicProgrammingConcepts from "../pages/Tutorials/BasicProgrammingConcepts";
import WebDevelopmentBasics from "../pages/Tutorials/WebDevBasics/WebDevelopmentBasics";
import BubbleSortVisualizer from "../pages/Tutorials/Visualizer/BubbleSortVisualizer";
import InsertionSortVisualizer from "../pages/Tutorials/Visualizer/InsertionSortVisualizer";
import SelectionSortVisualizer from "../pages/Tutorials/Visualizer/SelectionSortVisualizer";
import MergeSortVisualizer from "../pages/Tutorials/Visualizer/MergeSortVisualizer";
import QuickSortVisualizer from "../pages/Tutorials/Visualizer/QuickSortVisualizer";
import BfsVisualizer from "../pages/Tutorials/Visualizer/BFSVisualizer";
import DfsVisualizer from "../pages/Tutorials/Visualizer/DFSVisualizer";
import DijkstraVisualizer from "../pages/Tutorials/Visualizer/DijkstraVisualizer";
import BinarySearchVisualizer from "../pages/Tutorials/Visualizer/BinarySearchVisualizer";
import LinearSearchVisualizer from "../pages/Tutorials/Visualizer/LinearSearchVisualizer";
import PreorderVisualizer from "../pages/Tutorials/Visualizer/PreOrderVisualizer";
import PostorderVisualizer from "../pages/Tutorials/Visualizer/PostOrderVisualizer";
import InorderVisualizer from "../pages/Tutorials/Visualizer/InOrderVisualizer";
import StackVisualizer from "../pages/Tutorials/Visualizer/StackVisualizer";
import QueueVisualizer from "../pages/Tutorials/Visualizer/QueueVisualizer";
import DequeVisualizer from "../pages/Tutorials/Visualizer/DequeVisualizer";
import SieveVisualizer from "../pages/Tutorials/Visualizer/SieveVisualizer";
import GCDVisualizer from "../pages/Tutorials/Visualizer/GCDVisualizer";
import FibonacciVisualizer from "../pages/Tutorials/Visualizer/FibonacciVisualizer";
import KMPSearchVisualizer from "../pages/Tutorials/Visualizer/KMPVisualizer";
import NQueensVisualizer from "../pages/Tutorials/Visualizer/NQueensVisualizer";
import WebDevTutorials from "../pages/Tutorials/WebDevBasics/WebDevTutorials";
import WebDevResources from "../pages/Tutorials/WebDevBasics/WebDevResources";
import WebDevPractice from "../pages/Tutorials/WebDevBasics/WebDevPractice";
import Games from "../pages/Tutorials/Games/Games";
import TicTacToe from "../pages/Tutorials/Games/TicTaeToe/TicTacToe";
import Sudoku from "../pages/Tutorials/Games/Sudoku/Sudoku";

// Complete list of routes
const tutorialRoutes = [
  <Route key="tutorials" path="/tutorials" element={<Tutorials />} />,
  <Route key="algoVisualizer" path="/tutorials/algoVisualizer" element={<AlgoVisualizer />} />,

  <Route
    key="basicProgrammingConcepts"
    path="/tutorials/basicProgrammingConcepts"
    element={<BasicProgrammingConcepts />}
  />,
  <Route
    key="webDevelopmentBasics"
    path="/tutorials/webDevelopmentBasics"
    element={<WebDevelopmentBasics />}
  />,

  <Route
    key="bubbleSortVisualizer"
    path="/tutorials/algoVisualizer/sorting/bubble-sort"
    element={<BubbleSortVisualizer />}
  />,
  <Route
    key="insertionSortVisualizer"
    path="/tutorials/algoVisualizer/sorting/insertion-sort"
    element={<InsertionSortVisualizer />}
  />,
  <Route
    key="selectionSortVisualizer"
    path="/tutorials/algoVisualizer/sorting/selection-sort"
    element={<SelectionSortVisualizer />}
  />,
  <Route
    key="mergeSortVisualizer"
    path="/tutorials/algoVisualizer/sorting/merge-sort"
    element={<MergeSortVisualizer />}
  />,
  <Route
    key="quickSortVisualizer"
    path="/tutorials/algoVisualizer/sorting/quick-sort"
    element={<QuickSortVisualizer />}
  />,

  <Route
    key="bfsVisualizer"
    path="/tutorials/algoVisualizer/graph/bfs"
    element={<BfsVisualizer />}
  />,
  <Route
    key="dfsVisualizer"
    path="/tutorials/algoVisualizer/graph/dfs"
    element={<DfsVisualizer />}
  />,
  <Route
    key="dijkstraVisualizer"
    path="/tutorials/algoVisualizer/graph/dijkstra"
    element={<DijkstraVisualizer />}
  />,

  <Route
    key="binarySearchVisualizer"
    path="/tutorials/algoVisualizer/search/binary-search"
    element={<BinarySearchVisualizer />}
  />,
  <Route
    key="linearSearchVisualizer"
    path="/tutorials/algoVisualizer/search/linear-search"
    element={<LinearSearchVisualizer />}
  />,

  <Route
    key="preorderVisualizer"
    path="/tutorials/algoVisualizer/tree/preorder"
    element={<PreorderVisualizer />}
  />,
  <Route
    key="postorderVisualizer"
    path="/tutorials/algoVisualizer/tree/postorder"
    element={<PostorderVisualizer />}
  />,
  <Route
    key="inorderVisualizer"
    path="/tutorials/algoVisualizer/tree/inorder"
    element={<InorderVisualizer />}
  />,

  <Route
    key="stackVisualizer"
    path="/tutorials/algoVisualizer/dataStructures/stack"
    element={<StackVisualizer />}
  />,
  <Route
    key="queueVisualizer"
    path="/tutorials/algoVisualizer/dataStructures/queue"
    element={<QueueVisualizer />}
  />,
  <Route
    key="dequeVisualizer"
    path="/tutorials/algoVisualizer/dataStructures/deque"
    element={<DequeVisualizer />}
  />,

  <Route
    key="sieveVisualizer"
    path="/tutorials/algoVisualizer/math/prime-generation"
    element={<SieveVisualizer />}
  />,
  <Route key="gcdVisualizer" path="/tutorials/algoVisualizer/math/gcd" element={<GCDVisualizer />} />,
  <Route
    key="fibonacciVisualizer"
    path="/tutorials/algoVisualizer/math/fibonacci"
    element={<FibonacciVisualizer />}
  />,

  <Route key="kmpVisualizer" path="/tutorials/algoVisualizer/others/kmp" element={<KMPSearchVisualizer />} />,
  <Route key="nQueensVisualizer" path="/tutorials/algoVisualizer/others/n-queens" element={<NQueensVisualizer />} />,

  <Route
    key="webDevTutorials"
    path="/tutorials/webDevelopmentBasics/WebDevTutorials"
    element={<WebDevTutorials />}
  />,
  <Route
    key="webDevResources"
    path="/tutorials/webDevelopmentBasics/Resources"
    element={<WebDevResources />}
  />,
  <Route
    key="webDevPractice"
    path="/tutorials/webDevelopmentBasics/Practice"
    element={<WebDevPractice />}
  />,

  <Route key="games" path="/tutorials/games" element={<Games />} />,
  <Route key="tictactoe" path="/tutorials/games/tictactoe" element={<TicTacToe />} />,
  <Route key="sudoku" path="/tutorials/games/sudoku" element={<Sudoku />} />,
];

export default tutorialRoutes;
