
import React, { useEffect } from "react";
import { Song } from "@/types/song";
import { Disc3, MusicIcon, Tag, CalendarDays, PlayCircle } from "lucide-react";

interface SongCardProps {
  song: Song;
  index: number;
}

const SongCard: React.FC<SongCardProps> = ({ song, index }) => {
  useEffect(() => {
    console.log("Song object:", song);
    console.log("Release:", song.release);
    console.log("ReleaseEvent:", song.releaseevent);
  }, [song]);

  // Add null checks to prevent accessing properties of undefined
  const releaseYear = song && song.releaseevent ? 
    song.releaseevent.year : "Unknown";
  const labelName = song && song.label ? song.label.name : "Unknown Label";
  const albumName = song && song.release ? song.release.name : "Unknown Album";
  const trackName = song && song.track ? song.track.name : "Unknown Track";
  const artistName = song && song.artist ? song.artist.name : "Unknown Artist";

  // Create a properly encoded search query for Apple Music
  const appleSearchQuery = encodeURIComponent(
    `${artistName} ${trackName}`.replace(/\s+/g, "-")
  );
  const appleMusicUrl = `https://music.apple.com/search?term=${appleSearchQuery}`;

  // Calculate the staggered animation delay based on index
  const animationDelay = `${index * 0.1}s`;

  return (
    <div 
      className="card-hover-effect bg-card rounded-lg overflow-hidden shadow-lg border border-border 
                w-full max-w-md mx-auto animate-slide-up"
      style={{ animationDelay }}
    >
      <div className="relative overflow-hidden">
        {song && song.release && song.release.largeimageuri ? (
          <img 
            src={song.release.largeimageuri} 
            alt={`${albumName} album art`} 
            className="album-art w-full h-[280px] object-cover"
            loading="lazy"
          />
        ) : (
          <div className="album-art w-full h-[280px] bg-secondary flex items-center justify-center">
            <MusicIcon size={64} className="text-muted-foreground opacity-50" />
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <div className="glass-effect text-xs font-medium px-2 py-1 rounded-full">
            {song && song.is_request ? "Request" : song && song.playtype?.name || "Regular Play"}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold tracking-tight line-clamp-2">{trackName}</h3>
          <p className="text-lg font-medium text-kexp-yellow">{artistName}</p>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Disc3 size={16} />
            <span>{albumName}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Tag size={16} />
            <span>{labelName}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            <span>{releaseYear}</span>
          </div>
          
          <a 
            href={appleMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-kexp-yellow hover:underline transition-all mt-2"
          >
            <PlayCircle size={16} />
            <span>Listen on Apple Music</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
