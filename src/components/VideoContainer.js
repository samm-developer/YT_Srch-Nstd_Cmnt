import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_VIDEOS_API, YOUTUBE_SEARCH_VIDEOS_API, GOOGLE_API_KEY } from "../utils/contants";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");

  const getVideos = useCallback(async () => {
    try {
      setLoading(true);
      
      // Random popular categories to get varied content
      const categories = [
        "music",
        "gaming",
        "sports",
        "comedy",
        "news",
        "entertainment",
        "technology",
        "cooking",
        "travel",
        "education",
      ];
      
      // Pick a random category
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      // Search for videos in this category
      const searchUrl = YOUTUBE_SEARCH_VIDEOS_API + encodeURIComponent(randomCategory);
      const searchData = await fetch(searchUrl);
      const searchJson = await searchData.json();
      
      if (searchJson.items && searchJson.items.length > 0) {
        // Get video IDs from search results
        const videoIds = searchJson.items.map((item) => item.id.videoId).join(",");
        
        // Fetch video details including statistics
        const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${GOOGLE_API_KEY}`;
        const detailsData = await fetch(videoDetailsUrl);
        const detailsJson = await detailsData.json();
        
        // Shuffle the videos array to get different order on each refresh
        const shuffledVideos = (detailsJson.items || []).sort(() => Math.random() - 0.5);
        setVideos(shuffledVideos);
      } else {
        // Fallback to trending videos if search fails
        const data = await fetch(YOUTUBE_VIDEOS_API);
        const json = await data.json();
        const shuffledVideos = (json.items || []).sort(() => Math.random() - 0.5);
        setVideos(shuffledVideos);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      // Fallback to trending videos
      try {
        const data = await fetch(YOUTUBE_VIDEOS_API);
        const json = await data.json();
        const shuffledVideos = (json.items || []).sort(() => Math.random() - 0.5);
        setVideos(shuffledVideos);
      } catch (fallbackError) {
        console.error("Error fetching fallback videos:", fallbackError);
        setVideos([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getSearchVideos = useCallback(async (query) => {
    try {
      setLoading(true);
      const searchUrl = YOUTUBE_SEARCH_VIDEOS_API + encodeURIComponent(query);
      const data = await fetch(searchUrl);
      const json = await data.json();
      
      if (json.items && json.items.length > 0) {
        // Get video IDs from search results
        const videoIds = json.items.map((item) => item.id.videoId).join(",");
        
        // Fetch video details including statistics
        const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&key=${GOOGLE_API_KEY}`;
        const detailsData = await fetch(videoDetailsUrl);
        const detailsJson = await detailsData.json();
        
        setVideos(detailsJson.items || []);
      } else {
        setVideos([]);
      }
    } catch (error) {
      console.error("Error fetching search videos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      getSearchVideos(searchQuery);
    } else {
      getVideos();
    }
  }, [searchQuery, getVideos, getSearchVideos]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (videos.length === 0 && searchQuery) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl font-semibold">No videos found for "{searchQuery}"</p>
        <p className="text-gray-600 mt-2">Try a different search term</p>
      </div>
    );
  }

  if (videos.length === 0 && !searchQuery) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl font-semibold">No videos available</p>
        <p className="text-gray-600 mt-2">Please check your internet connection or try again later</p>
      </div>
    );
  }

  return (
    <div>
      {searchQuery && (
        <div className="px-5 py-3">
          <h2 className="text-xl font-semibold">
            Search results for: <span className="text-gray-600">"{searchQuery}"</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {videos.length} {videos.length === 1 ? "video" : "videos"} found
          </p>
        </div>
      )}
      <div className="flex flex-wrap">
        {videos.map((video) => (
          <Link key={video.id} to={"/watch?v=" + video.id}>
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoContainer;
