interface Album {
  name: string
  artist: string
  songs: string[]
}

// type AlbumWithUppercaseKeys = {
//    [K in Uppercase<keyof Album>]: Album[K];
//  };
 type AlbumWithUppercaseKeys = {
   [K in keyof Album as Uppercase<K>]: Album[K];
 };