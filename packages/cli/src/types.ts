type Dimension = {
    width: number
    height: number
    rotate: number
}

type Page = {
    cid: number
    page: number
    from: string
    part: string
    duration: number
    vid: string
    weblink: string
    dimension: Dimension
}

type Result<T> = {
    code: number
    message: string
    ttl: number
    data: T[]
}

export type ResultPagelist = Result<Page>
