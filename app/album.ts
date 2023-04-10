export interface album {
    _id: string;
    title: string;
    year?: number;
    __v: number;
    artist: Artist;
    albumImage: string;
    albumDesc: string;
   
}
export interface Artist {
    genre: string;
    recCompany: string;
    artistName: string;
    _id: string;
    
    
}

