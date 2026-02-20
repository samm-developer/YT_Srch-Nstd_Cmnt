export const GOOGLE_API_KEY = 
// "AIzaSyAtIibgU4boIyzkgbabBCe8BJJsBSfNlWA";
// "AIzaSyB0CIkSPCXMzusM-Bn93iGJVWZdOb9y7yo"
"AIzaSyCA_NDdNcn45UdVqV6_TREYKUAhb-tcTCM";
export const LIVE_CHAT_COUNT = 25;

export const YOUTUBE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "/api/suggest/complete/search?client=firefox&ds=yt&q=";

export const YOUTUBE_SEARCH_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&key=" +
  GOOGLE_API_KEY +
  "&q=";

// Live Chat >>>> Infinite Scroll >>>>>> Pagination
