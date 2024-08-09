import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Root from '../pages/Root';
import Register from '../pages/Register';
import OtpVerification from '../pages/OtpVerification';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Problems from '../pages/Problems';
import IndividualProblem from '../pages/IndividualProblem';
import LevelWiseProblemSet from '../pages/LevelWiseProblemSet';
import Competition from '../pages/Competition';
import Artciles from '../pages/Articles';
import Tutorials from '../pages/Tutorials/Tutorials';
import Leaderboard from '../pages/Leaderboard';
import AlgoVisualizer from '../pages/Tutorials/AlgoVisualizer';
import BasicProgrammingConcepts from '../pages/Tutorials/BasicProgrammingConcepts';
import Games from '../pages/Tutorials/Games';
import WebDevelopmentBasics from '../pages/Tutorials/WebDevelopmentBasics';
import BubbleSortVisualizer from '../pages/Visualizer/BubbleSortVisualizer.jsx';
import InsertionSortVisualizer from '../pages/Visualizer/InsertionSortVisualizer.jsx';
import SelectionSortVisualizer from '../pages/Visualizer/SelectionSortVisualizer.jsx';
import MergeSortVisualizer from '../pages/Visualizer/MergeSortVisualizer.jsx';
import QuickSortVisualizer from '../pages/Visualizer/QuickSortVisualizer.jsx';
import BFSVisualizer from '../pages/Visualizer/BFSVisualizer.jsx';
import BinarySearchVisualizer from '../pages/Visualizer/BinarySearchVisualizer.jsx';
import LinearSearchVisualizer from '../pages/Visualizer/LinearSearchVisualizer.jsx';
import DFSVisualizer from '../pages/Visualizer/DFSVisualizer.jsx';
import DijkstraVisualizer from '../pages/Visualizer/DijkstraVisualizer.jsx';
import PreorderVisualizer from '../pages/Visualizer/PreOrderVisualizer.jsx';
import PostorderVisualizer from '../pages/Visualizer/PostOrderVisualizer.jsx';
import InOrderVisualizer from '../pages/Visualizer/InOrderVisualizer.jsx';
import StackVisualizer from '../pages/Visualizer/StackVisualizer.jsx';
import QueueVisualizer from '../pages/Visualizer/QueueVisualizer.jsx';
import DequeVisualizer from '../pages/Visualizer/DequeVisualizer.jsx';
import KMPVisualizer from '../pages/Visualizer/KMPVisualizer.jsx';
import SieveVisualizer from '../pages/Visualizer/SieveVisualizer.jsx';
import GCDVisualizer from '../pages/Visualizer/GCDVisualizer.jsx';
import FibonacciVisualizer from '../pages/Visualizer/FibonacciVisualizer.jsx';
import NQueensVisualizer from '../pages/Visualizer/NQueensVisualizer.jsx';



const Routers = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Navigate to='/home'/>}/> */}
      <Route path='/' element={<Root />} />
      <Route path='/register' element={<Register />} />
      <Route path='/otpVerification' element={<OtpVerification />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/problems' element={<Problems />} />
      <Route path='/problem/:levelName/:ID' element={<IndividualProblem/>} />
      <Route path='/problems/:levelName' element={<LevelWiseProblemSet />} />
      <Route path='/competition' element={<Competition/>} />
      <Route path='/articles' element={<Artciles/>} />
      <Route path='/tutorials' element={<Tutorials/>} />
      <Route path='/tutorials/algoVisualizer' element={<AlgoVisualizer/>}/>
      <Route path='/tutorials/games' element={<Games/>}/>
      <Route path='/tutorials/basicProgrammingConcepts' element={<BasicProgrammingConcepts/>}/>
      <Route path='/tutorials/webDevelopmentBasics' element={<WebDevelopmentBasics/>}/>
      <Route path='/leaderboard' element={<Leaderboard/>} />

      <Route path='/tutorials/algoVisualizer/sorting/bubble-sort' element={<BubbleSortVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/sorting/insertion-sort' element={<InsertionSortVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/sorting/selection-sort' element={<SelectionSortVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/sorting/merge-sort' element={<MergeSortVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/sorting/quick-sort' element={<QuickSortVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/graph/bfs' element={<BFSVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/graph/dfs' element={<DFSVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/graph/dijkstra' element={<DijkstraVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/search/binary-search' element={<BinarySearchVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/search/linear-search' element={<LinearSearchVisualizer/>}/>

      <Route path='/tutorials/algoVisualizer/tree/preorder' element={<PreorderVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/tree/postorder' element={<PostorderVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/tree/inorder' element={<InOrderVisualizer/>}/>

      <Route path='/tutorials/algoVisualizer/dataStructures/stack' element={<StackVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/dataStructures/queue' element={<QueueVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/dataStructures/deque' element={<DequeVisualizer/>}/>

    

      <Route path='/tutorials/algoVisualizer/math/prime-generation' element={<SieveVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/math/gcd' element={<GCDVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/math/fibonacci' element={<FibonacciVisualizer/>}/>

      <Route path='/tutorials/algoVisualizer/others/kmp' element={<KMPVisualizer/>}/>
      <Route path='/tutorials/algoVisualizer/others/n-queens' element={<NQueensVisualizer/>}/>
    </Routes>
  );
}

export default Routers;
