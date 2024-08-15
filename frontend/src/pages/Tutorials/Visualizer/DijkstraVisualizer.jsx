import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './dijkstravisualizer.css';
import Lottie from "lottie-react";
import visualizer_success from "../../../assets/data/animationData/visu_success.json";

// Sample graph data
const graphData = {
    nodes: [
        { id: 'A', x: 100, y: 100 },
        { id: 'B', x: 200, y: 100 },
        { id: 'C', x: 300, y: 100 },
        { id: 'D', x: 200, y: 200 },
        { id: 'E', x: 100, y: 200 },
        { id: 'F', x: 300, y: 200 },
        { id: 'G', x: 400, y: 150 },
    ],
    links: [
        { source: 'A', target: 'B', weight: 1 },
        { source: 'A', target: 'E', weight: 3 },
        { source: 'B', target: 'C', weight: 1 },
        { source: 'B', target: 'D', weight: 2 },
        { source: 'C', target: 'D', weight: 1 },
        { source: 'D', target: 'E', weight: 1 },
        { source: 'C', target: 'F', weight: 2 },
        { source: 'D', target: 'F', weight: 2 },
        { source: 'F', target: 'G', weight: 1 },
    ]
};

const DijkstraVisualizer = () => {
    const [distances, setDistances] = useState({});
    const [previous, setPrevious] = useState({});
    const [unvisited, setUnvisited] = useState(new Set());
    const [currentNode, setCurrentNode] = useState(null);
    const [messages, setMessages] = useState([]);
    const [step, setStep] = useState(0);
    const [isAutoSimulating, setIsAutoSimulating] = useState(false);
    const intervalRef = useRef(null);
    const [done, setDone] = useState(false);

    const initDijkstra = (graph, startNode) => {
        const distances = {};
        const previous = {};
        const unvisited = new Set();

        graph.nodes.forEach(node => {
            distances[node.id] = Infinity;
            previous[node.id] = null;
            unvisited.add(node.id);
        });

        distances[startNode] = 0;
        setDistances(distances);
        setPrevious(previous);
        setUnvisited(unvisited);
        setCurrentNode(startNode);

        return { distances, previous, unvisited };
    };

    useEffect(() => {
        const { distances, previous, unvisited } = initDijkstra(graphData, 'A');

        const messages = [`Starting at node A with initial distance 0.`];
        setMessages(messages);
    }, []);

    useEffect(() => {
      const svg = d3.select('#graph-container');
      svg.selectAll('*').remove(); // Clear previous drawings
  
      const g = svg.append('g');
  
      // Draw links
      g.selectAll('line')
          .data(graphData.links)
          .enter()
          .append('line')
          .attr('x1', d => graphData.nodes.find(node => node.id === d.source).x)
          .attr('y1', d => graphData.nodes.find(node => node.id === d.source).y)
          .attr('x2', d => graphData.nodes.find(node => node.id === d.target).x)
          .attr('y2', d => graphData.nodes.find(node => node.id === d.target).y)
          .attr('stroke', 'black')
          .attr('stroke-width', 2);
  
      // Draw edge weights
      g.selectAll('.edge-label')
          .data(graphData.links)
          .enter()
          .append('text')
          .attr('class', 'edge-label')
          .attr('x', d => {
              const sourceNode = graphData.nodes.find(node => node.id === d.source);
              const targetNode = graphData.nodes.find(node => node.id === d.target);
              return (sourceNode.x + targetNode.x) / 2;
          })
          .attr('y', d => {
              const sourceNode = graphData.nodes.find(node => node.id === d.source);
              const targetNode = graphData.nodes.find(node => node.id === d.target);
              return (sourceNode.y + targetNode.y) / 2;
          })
          .attr('dy', d => {
              const sourceNode = graphData.nodes.find(node => node.id === d.source);
              const targetNode = graphData.nodes.find(node => node.id === d.target);
              return sourceNode.y < targetNode.y ? 5 : -5;
          })
          .attr('dx', d => {
              const sourceNode = graphData.nodes.find(node => node.id === d.source);
              const targetNode = graphData.nodes.find(node => node.id === d.target);
              return sourceNode.x < targetNode.x ? 5 : 13;
          })
          .attr('text-anchor', 'middle')
          .attr('fill', 'red')
          .style('font-size', '15px')
          .text(d => d.weight);
  
      // Draw nodes
      g.selectAll('circle')
          .data(graphData.nodes)
          .enter()
          .append('circle')
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
          .attr('r', 20)
          .attr('fill', d => {
              if (currentNode === d.id) {
                  return 'orange';
              }
              if (!unvisited.has(d.id)) {
                  return 'green';
              }
              return 'lightgray';
          });
  
      // Draw node labels
      g.selectAll('.node-label')
          .data(graphData.nodes)
          .enter()
          .append('text')
          .attr('class', 'node-label')
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .attr('dy', '.35em')
          .attr('text-anchor', 'middle')
          .attr('fill', 'white')
          .text(d => d.id);
  }, [distances, currentNode, unvisited]);
  

    useEffect(() => {
        if (isAutoSimulating) {
            intervalRef.current = setInterval(() => {
                handleNextStep();
            }, 1500);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isAutoSimulating, step]);

    const handleNextStep = () => {
        if (unvisited.size === 0 || currentNode === null) {
            setDone(true);
            setIsAutoSimulating(false);
            setMessages(messages => [...messages, 'All nodes have been visited. Algorithm complete.']);
            return;
        }

        const newDistances = { ...distances };
        const newPrevious = { ...previous };
        const newMessages = [...messages];

        const neighbors = graphData.links.filter(link => link.source === currentNode || link.target === currentNode);
        let updateMessage = `From node ${currentNode}, updated distances: `;
        let anyUpdates = false;

        neighbors.forEach(neighbor => {
            const neighborNode = neighbor.source === currentNode ? neighbor.target : neighbor.source;
            if (unvisited.has(neighborNode)) {
                const alt = distances[currentNode] + neighbor.weight;
                if (alt < distances[neighborNode]) {
                    newDistances[neighborNode] = alt;
                    newPrevious[neighborNode] = currentNode;
                    updateMessage += `(${neighborNode}: ${alt}), `;
                    anyUpdates = true;
                }
            }
        });

        if (anyUpdates) {
            newMessages.push(updateMessage.slice(0, -2)); // Remove the last comma and space
        }

        unvisited.delete(currentNode);
        setUnvisited(new Set(unvisited));
        setDistances(newDistances);
        setPrevious(newPrevious);
        setMessages(newMessages);

        const nextNode = Array.from(unvisited).reduce((minNode, node) => {
            if (minNode === null || newDistances[node] < newDistances[minNode]) {
                return node;
            }
            return minNode;
        }, null);

        if (nextNode !== null) {
            //setMessages(messages => [...messages, `Moving to node ${nextNode} with current shortest distance ${newDistances[nextNode]}.`]);
            setCurrentNode(nextNode);
        } else {
            setMessages(messages => [...messages, 'All nodes have been visited. Algorithm complete.']);
            setDone(true);
        }

        setStep(step + 1);
    };

    const handleRestart = () => {
        setStep(0);
        setCurrentNode('A');
        setIsAutoSimulating(false);
        setDone(false);

        const { distances, previous, unvisited } = initDijkstra(graphData, 'A');

        setDistances(distances);
        setPrevious(previous);
        setUnvisited(unvisited);
        setMessages([`Starting at node A with initial distance 0.`]);

        clearInterval(intervalRef.current);
    };

    const handleAutoSimulate = () => {
        setIsAutoSimulating(true);
    };

    return (
        <div className="visualizer">
           <div className="header">
           <h1>Dijkstra's Algorithm Visualizer</h1>
            <label>Dijkstra's Algorithm: Finds the shortest path from a single source node to </label>
        <label>all other nodes in a weighted graph with non-negative weights using a priority queue.</label>
        <label>Click on the buttons below to visualize the dijkstra's algorithm!</label>
           </div>
            <div className="content">
                <div>
                    <svg id="graph-container" width="500" height="270"></svg>
                    {done && (
                        <Lottie className="animation" animationData={visualizer_success} />
                    )}
                </div>
                <div className="buttons">
                    <button
                        onClick={handleNextStep}
                        disabled={done || isAutoSimulating}
                    >
                        Next Step
                    </button>
                    <button onClick={handleAutoSimulate} disabled={isAutoSimulating}>
                        Auto Simulate
                    </button>
                    <button onClick={handleRestart}>Restart</button>
                </div>
            </div>
            <div className="footer">
                <div className="message-box">
                    <p>{messages[step]}</p>
                </div>
                <h3>Distances</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Node</th>
                            <th>Distance</th>
                            <th>Previous Node</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(distances).map(node => (
                            <tr key={node}>
                                <td>{node}</td>
                                <td>{distances[node] === Infinity ? '∞' : distances[node]}</td>
                                <td>{previous[node] || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DijkstraVisualizer;
