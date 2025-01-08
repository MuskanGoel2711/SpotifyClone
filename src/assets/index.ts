interface AssetCollection {
    [key: string]: any; 
}

const images: AssetCollection = {
    AayiNai: require('../assets/images/AayiNai.png'),
    WhatJhumka: require('../assets/images/WhatJhumka.png'),
    spotify: require('../assets/images/Spotify.png'),
    hut: require('../assets/images/hut.png'),
    search: require('../assets/images/search.png'),
    add: require('../assets/images/add.png'),
    premium: require('../assets/images/premium.png'),
    library: require('../assets/images/library.png'),
    google: require('../assets/images/google.png'),
    eye: require('../assets/images/eye.png'),
    hide: require('../assets/images/hide.png'),
    addAccount: require('../assets/images/addAccount.png'),
    thunder: require('../assets/images/thunder.png'),
    history: require('../assets/images/history.png'),
    setting: require('../assets/images/setting.png'),
    left: require('../assets/images/left.png'),
    timer: require('../assets/images/timer.png'),
    right: require('../assets/images/right.png'),
    shuffle: require('../assets/images/shuffle.png')
};

const audios: AssetCollection = {
    AayiNai: require('../assets/songs/AayiNai.mp3'),
    WhatJhumka: require('../assets/songs/WhatJhumka.mp3'),
};

export { images, audios };
