import React from 'react';
import ActivityCard from './ActivityCard';
import './activity.css';
import addFriend from './addFriend.json';
import aiBasedLearning from './ai_robot.json';
import algoSimulator from './algoVisualizer.json';
import coderApe from './coderApe.json';
import communityPost from './community.json';
import contestCup from './contestCup.json';
import leaderBoard from './leaderboard_orrange.json';
import tutorBird from './tutor-bird.json';

function Activity() {
  return (
    <section className="landing_activities">
      <h1 style={{fontSize:"2.5rem"}} className="heading">our <span>activities</span></h1>
      <div className="box-container">
        <ActivityCard 
          title="Coding Tutorials" 
          animation={tutorBird} 
          details='Unleash your inner coder with our awesome coding tutorials! 🎉 
          Whether you’re a newbie or a coding whiz, we have got something for everyone. 
          Explore exciting topics like web development, game design, and algorithms in a fun, interactive way! 
          Our step-by-step lessons and engaging projects make learning a blast. 
          Join us on this epic journey to become a coding master, and let’s create something amazing together! 
          Ready to start your adventure?'
        />
        <ActivityCard 
          title="AI based Learning Assistance" 
          animation={aiBasedLearning} 
          details="Meet your personal AI buddy, CodePal! 🤖✨ 
          This smart assistant is here to guide you through your learning journey. 
          Chat with the AI anytime to get instant help, explanations, and fun tutorials tailored just for you! 
          Plus, it can generate handy PDFs that you can download and keep for future reference. 
          With your AI assistant by your side, mastering coding has never been easier or more exciting! 
          Ready to level up your skills?"
        />
        <ActivityCard 
          title="Algorithm Simulator" 
          animation={algoSimulator} 
          details="Step into the world of algorithms with our Algorithm Visualizer Simulator! 🧩✨ 
          Watch as complex algorithms come to life right before your eyes. 
          Whether you’re exploring sorting techniques or searching methods, this interactive tool helps you grasp each concept with ease. 
          Play around with different algorithms, see how they work in real-time, and boost your understanding of coding fundamentals. 
          Learning algorithms has never been this fun—let's visualize your way to success!"
        />
        <ActivityCard 
          title="Problem Solving" 
          animation={coderApe} 
          details="Gear up for an epic adventure in Problem Solving! 🧠💡 
          Dive into a treasure trove of challenging puzzles and brain teasers that will sharpen your coding skills. 
          Tackle real-world problems, think outside the box, and discover creative solutions! 
          With a supportive community behind you, you can share ideas, get tips, and level up together. 
          Are you ready to become a master problem solver and unlock new coding abilities? 
          Let’s get started!"
        />
        <ActivityCard 
          title="Leaderboard" 
          animation={leaderBoard}
          details='Get ready to climb the ranks on our exciting leaderboard! 🏆 
            Here, you can track your position based on your learning progress and contest ratings. 
            Watch as your hard work pays off and your name rises to the top! 
            Compete with friends and fellow coders to see who becomes the ultimate coding champion. 
            The higher you climb, the more bragging rights you earn! 
            Are you ready to show off your skills?'  
        />
        <ActivityCard 
          title="Programming Contests" 
          animation={contestCup}
          details="Dive into the exciting world of programming contests! 
            These thrilling challenges invite you to solve fun puzzles against the clock. 
            Compete online or at local events, meet fellow coding wizards, and sharpen your skills! 
            Join epic platforms like Codeforces and HackerRank, where the adventure awaits.
            With every challenge you conquer, you’re one step closer to becoming a coding superhero! Are you ready to join the fun?" 
        />        
        <ActivityCard 
          title="Community Posts" 
          animation={communityPost} 
          details='Welcome to our vibrant Community Posts! 🌟 
            This is your go-to spot for sharing ideas, asking questions, and connecting with fellow learners. 
            Whether you want to seek help or share your latest coding blog, everyone’s voice matters here! 
            Join the conversation, spark discussions, and collaborate with others to boost your learning journey. 
            Together, we can create a supportive space where everyone thrives. 
            What will you post today?'  
        />
        <ActivityCard 
          title="Add Friends and Chat" 
          animation={addFriend} 
          details="Make new friends and stay connected with our Add Friends and Chat feature! 🤝✨ 
          Find fellow coders, send friend requests, and build your own coding squad. 
          Chat anytime you need help or just want to share cool ideas! 
          Whether it's solving tricky problems or brainstorming projects, your friends are just a message away. 
          Let’s create a supportive community where everyone learns together. 
          Who will you add to your crew?"
        />
      </div>
    </section>
  );
}

export default Activity;
