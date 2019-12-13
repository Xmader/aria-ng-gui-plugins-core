
type fs = typeof import("fs").promises

export interface FsApiType extends fs {

}

const FS: FsApiType = (() => {
    try {
        return require("fs").promises
    } catch (_) {
        throw new Error("unimplemented")
    }
})()

export default FS
