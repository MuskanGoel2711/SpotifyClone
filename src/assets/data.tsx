import { images, audios } from './index';

interface Song {
    id: string;
    title: string;
    artist: string;
    image: string;
    url: string;
    duration: number;
}

const songs: Song[] = [
    {
        id: "1",
        title: "Aayi Nai",
        artist: "Divya Kumar, Simran Chaudhary",
        image: images.AayiNai,
        url: audios.AayiNai,
        duration: 402,
    },
    {
        id: "2",
        title: "What Jhumka?",
        artist: "Jonita Gandhi, Amitabh Bhattacharya, Arijit Singh",
        image: images.WhatJhumka,
        url: audios.WhatJhumka,
        duration: 166,
    },
    {
        id: "3",
        title: "What?",
        artist: "Jonita Gandhi, Amitabh Bhattacharya, Arijit Singh",
        image: images.WhatJhumka,
        url: audios.WhatJhumka,
        duration: 166,
    },
    {
        id: "4",
        title: "Jhumka?",
        artist: "Jonita Gandhi, Amitabh Bhattacharya, Arijit Singh",
        image: images.WhatJhumka,
        url: audios.WhatJhumka,
        duration: 166,
    },
    {
        id: "5",
        title: "What Jhumka??????",
        artist: "Jonita Gandhi, Amitabh Bhattacharya, Arijit Singh",
        image: images.WhatJhumka,
        url: audios.WhatJhumka,
        duration: 166,
    },
];

export default songs;
