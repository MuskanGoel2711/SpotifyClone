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
    shuffle: require('../assets/images/shuffle.png'),
    splash: require('../assets/images/splash.png'),
    facebook: require('../assets/images/facebook.png'),
};

const audios: AssetCollection = {
    AayiNai: require('../assets/songs/AayiNai.mp3'),
    WhatJhumka: require('../assets/songs/WhatJhumka.mp3'),
};

const Icons = {
    telephone: require('../assets/icons/telephone.png'),
    back: require('../assets/icons/back.png'),
    user: require('../assets/icons/user.png'),
    email: require('../assets/icons/email.png'),
    // checked: require('../assets/icons/checked.png'),
    // unchecked: require('../assets/icons/unchecked.png'),
    // search: require('../assets/icons/search.png'),
    account: require('../assets/icons/account.png'),
    // add: require('../assets/icons/add.png'),
    // delete: require('../assets/icons/trash.png'),
    calendar: require('../assets/icons/calendar.png'),
    // person: require('../assets/icons/profile.png'),
    // close: require('../assets/icons/close.png'),
    // location: require('../assets/icons/location.png'),
    eye: require('../assets/icons/eye.png'),
    eye_off: require('../assets/icons/eye-off.png'),
    birthday: require('../assets/icons/birthday.png'),
    lock: require('../assets/icons/accountPrivacy.png'),
  
  };

export { images, audios, Icons };
