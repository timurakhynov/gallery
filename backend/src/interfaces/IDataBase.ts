export default interface IDataBase {
    init: () => Promise<void>
    close: () => Promise<void> | void
}