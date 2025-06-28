
import React, { useEffect, useState } from "react";
import { fetchRecentPlays } from "@/utils/api";
import { Song } from "@/types/song";
import SongCard from "@/components/SongCard";
import Header from "@/components/Header";
import { Disc3 } from "lucide-react";

const Index = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadSongs = async () => {
    setIsLoading(true);
    const data = await fetchRecentPlays(12);
    if (data) {
      // Filter out air breaks and other non-music entries
      const musicPlays = data.results.filter(
        song => song.artist && song.track && song.release
      );
      setSongs(musicPlays);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadSongs();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground pb-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <Header onRefresh={loadSongs} isLoading={isLoading} />

        {isLoading && songs.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center gap-4 animate-pulse-subtle">
            <Disc3 size={48} className="text-kexp-yellow animate-spin-slow" />
            <p className="text-muted-foreground">Loading recent plays...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {songs.map((song, index) => (
              <SongCard key={song.playid} song={song} index={index} />
            ))}
          </div>
        )}

        {!isLoading && songs.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center">
            <p className="text-muted-foreground">No recent plays found.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Index;
