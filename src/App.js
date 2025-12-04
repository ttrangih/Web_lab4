import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';

// This array holds information about different videos
const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://i.pravatar.cc/100?img=9', //change profile picture
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://i.pravatar.cc/100?img=20', //change profile picture
    username: 'dailydotdev',
    description:
      'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: 'https://i.pravatar.cc/150?img=12', //change profile picture
    username: 'wojciechtrefon',
    description:
      '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: 'https://i.pravatar.cc/150?img=16', //change profile picture
    username: 'faruktutkus',
    description:
      'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);   //video đang đứng

  const videoRefs = useRef([]);
  const startYRef = useRef(null);                        //bắt đầu kéo

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;

        if (entry.isIntersecting) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [videos]);

  // This function handles the reference of each video
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  //question 3
  const handleMouseDown = (e) => {
    startYRef.current = e.clientY;
  };

  const handleMouseUp = (e) => {
    if (startYRef.current == null) return;

    const diff = e.clientY - startYRef.current;
    const threshold = 50; // px cần kéo tối thiểu

    if (diff < -threshold && currentIndex < videos.length - 1) {
      //pull up to next vid
      const next = currentIndex + 1;
      setCurrentIndex(next);
      scrollToVideo(next);
    } else if (diff > threshold && currentIndex > 0) {
      //pull down previous video
      const prev = currentIndex - 1;
      setCurrentIndex(prev);
      scrollToVideo(prev);
    }

    startYRef.current = null;
  };

  const scrollToVideo = (index) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      videoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="app">
      <div
        className="container"
        onMouseDown={handleMouseDown}   //drag
        onMouseUp={handleMouseUp}
      >
        <TopNavbar className="top-navbar" />
        {/* Here we map over the videos array and create VideoCard components */}
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;
