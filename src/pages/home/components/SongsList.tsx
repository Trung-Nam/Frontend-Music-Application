import { useMusic } from "@/stores/useMusic";
import { Song } from "@/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlayButton from "./PlayButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";

const SongsList = () => {
  const location = useLocation();
  const [songs, setSongs] = useState<Song[]>([]);
  const [title, setTitle] = useState("");
  const { isLoading, trendingSongs, madeForYouSongs } = useMusic();

  useEffect(() => {
    if (location.pathname === "/made-for-you/list") {
      setSongs(madeForYouSongs);
      setTitle("Made For You Songs");
    } else if (location.pathname === "/trending/list") {
      setSongs(trendingSongs);
      setTitle("Trending Songs");
    }
  }, [location.pathname, madeForYouSongs, trendingSongs]);

  if (isLoading) {
    return <SectionGridSkeleton />;
  }

  return (
    <ScrollArea className="h-[calc(100vh-180px)]">
      <div className="flex items-center justify-center mt-4 mb-8">
        <h2 className="text-3xl sm:text-2xl font-bold">{title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div
            key={song?._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img
                  src={song?.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <PlayButton song={song} />
              </div>
            </div>
            <h3 className="font-medium mb-2 truncate">{song?.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{song?.artist}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default SongsList;
