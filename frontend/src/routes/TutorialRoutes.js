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
import WebDevTutorials from "../pages/Tutorials/WebDevBasics/WebDevTutorials.jsx";
import WebDevResources from "../pages/Tutorials/WebDevBasics/WebDevResources.jsx";
import WebDevPractice from "../pages/Tutorials/WebDevBasics/WebDevPractice.jsx";
import Games from "../pages/Tutorials/Games/Games";
import TicTacToe from "../pages/Tutorials/Games/TicTaeToe/TicTacToe.jsx";
import Sudoku from "../pages/Tutorials/Games/Sudoku/Sudoku";

// Import all other visualizers and tutorial pages here...

const TutorialRoutes = () => (
  <>
    <Route path="/tutorials" element={<Tutorials />} />
    <Route path="/tutorials/algoVisualizer" element={<AlgoVisualizer />} />

    <Route
      path="/tutorials/basicProgrammingConcepts"
      element={<BasicProgrammingConcepts />}
    />
    <Route
      path="/tutorials/webDevelopmentBasics"
      element={<WebDevelopmentBasics />}
    />
    

    <Route
      path="/tutorials/algoVisualizer/sorting/bubble-sort"
      element={<BubbleSortVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/sorting/insertion-sort"
      element={<InsertionSortVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/sorting/selection-sort"
      element={<SelectionSortVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/sorting/merge-sort"
      element={<MergeSortVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/sorting/quick-sort"
      element={<QuickSortVisualizer />}
    />

    <Route
      path="/tutorials/algoVisualizer/graph/bfs"
      element={<BfsVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/graph/dfs"
      element={<DfsVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/graph/dijkstra"
      element={<DijkstraVisualizer />}
    />

    <Route
      path="/tutorials/algoVisualizer/search/binary-search"
      element={<BinarySearchVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/search/linear-search"
      element={<LinearSearchVisualizer />}
    />

    <Route
      path="/tutorials/algoVisualizer/tree/preorder"
      element={<PreorderVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/tree/postorder"
      element={<PostorderVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/tree/inorder"
      element={<InorderVisualizer />}
    />

    <Route
      path="/tutorials/algoVisualizer/dataStructures/stack"
      element={<StackVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/dataStructures/queue"
      element={<QueueVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/dataStructures/deque"
      element={<DequeVisualizer />}
    />

    <Route
      path="/tutorials/algoVisualizer/math/prime-generation"
      element={<SieveVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/math/gcd"
      element={<GCDVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/math/fibonacci"
      element={<FibonacciVisualizer />}
    />

    <Route
      path="/tutorials/algoVisualizer/others/kmp"
      element={<KMPSearchVisualizer />}
    />
    <Route
      path="/tutorials/algoVisualizer/others/n-queens"
      element={<NQueensVisualizer />}
    />

    <Route
      path="/tutorials/webDevelopmentBasics/WebDevTutorials"
      element={<WebDevTutorials />}
    />
    <Route
      path="/tutorials/webDevelopmentBasics/Resources"
      element={< WebDevResources/>}
    />
    <Route
      path="/tutorials/webDevelopmentBasics/Practice"
      element={<WebDevPractice />}
    />

    <Route path="/tutorials/games" element={<Games />} />
    <Route path="/tutorials/games/tictactoe" element={<TicTacToe />} />
    <Route path="/tutorials/games/suduko" element={<Sudoku />} />
  </>
);

export default TutorialRoutes;
