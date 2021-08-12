export function getURL(href) {
    let urlParts = /^(?:\w+\:\/\/)?([^\/]+)(.*)$/.exec(href)
    return urlParts[1]+urlParts[2]
}