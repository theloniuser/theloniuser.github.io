
export interface SongResponse {
  results: Song[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface Song {
  playid: string;
  airdate: string;
  artist: Artist;
  release: Release;
  track: Track;
  label: Label;
  comments: Comment[];
  is_request: boolean;
  is_local: boolean;
  playtype: PlayType;
  show: Show;
  releaseevent: ReleaseEvent;
}

export interface Artist {
  artistid: number;
  name: string;
  islocal: boolean;
}

export interface Release {
  releaseid: number;
  name: string;
  largeimageuri: string | null;
  smallimageuri: string | null;
}

export interface ReleaseEvent {
  releaseeventid: number;
  year: number;
}

export interface Track {
  trackid: number;
  name: string;
}

export interface Label {
  labelid: number;
  name: string;
}

export interface PlayType {
  playtypeid: number;
  name: string;
}

export interface Comment {
  commentid: number;
  text: string;
}

export interface Show {
  showid: number;
  name: string;
  host: string;
  urls: {
    [key: string]: string;
  };
  description: string;
  program: Program;
}

export interface Program {
  programid: number;
  name: string;
  url: string;
}
