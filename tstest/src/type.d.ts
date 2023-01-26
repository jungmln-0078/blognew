export default interface Post {
    id?: number,
    title: string,
    author: string,
    content: string,
    createdate?: Date,
    isupdated?: boolean
}