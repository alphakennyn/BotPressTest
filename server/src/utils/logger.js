const info = (text) => {
    
    // if (process.env.NODE_ENV === 'development') {
        console.log(text)
        return;
    // }

    // todo log with winston
}

const error = (...text) => {
    
    // if (process.env.NODE_ENV === 'development') {
        console.error(text)
        return;
    // }

    // todo log with winston
}

const event = {
    log: (eventType, text) => info(`[${eventType.toUpperCase()}] ${text}`)
}

module.exports = {
    info,
    error,
    event
}