import Topbar from "@/components/Topbar";
import { useMusic } from "@/stores/useMusic";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";

const Home = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    featuredSongs,
    madeForYouSongs,
    trendingSongs,
  } = useMusic();

  console.log({ isLoading, featuredSongs, madeForYouSongs, trendingSongs });

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good afternoon
          </h1>
          <FeaturedSection />
        </div>

        <div className="space-y-8">
          <p>Made for you</p>
          <p>Trending</p>
        </div>
      </ScrollArea>
    </main>
  );
};

export default Home;
