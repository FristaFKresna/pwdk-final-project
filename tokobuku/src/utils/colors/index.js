const mainColors = {
    blue1: '#009fff',
    blue2: '#9CDAFF',
    dark1: '#112340',
    dark2: '#495A75',
    grey1: '#7D8797',
    grey2: '#E9E9E9',
    black1: '#000000',
    black2: 'rgba(0, 0, 0, 0.5)'
    
}

export const colors = {
    primary: mainColors.blue1,
    secondary: mainColors.dark1,
    white: 'white',
    black: 'black',
    text: {
        primary: mainColors.dark1,
        secondary: mainColors.grey1,
        menuInactive: mainColors.dark2,
        menuActive: mainColors.blue1
    },
    button: {
        primary: {
            background: mainColors.blue1,
            text: 'white'
        },
        secondary: {
            background: mainColors.grey2,
            text: mainColors.dark1
        }
    },
    border: mainColors.grey2,
    cardLight: mainColors.blue2,
    loadingBackground: mainColors.black2
}