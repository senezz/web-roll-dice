export function gotoPage(pageName) {
    const paths = window.location.pathname.split('/')
    paths[paths.length - 1] = pageName
    window.location.pathname = paths.join('/')
}