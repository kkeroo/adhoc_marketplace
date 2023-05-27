export type ModelT = Record<string, any>
export type PrimaryKeyT = string
export type RepositoryOptionsT = Record<string, any>

export interface IRepository {
    add?(model: ModelT, options?: RepositoryOptionsT): Promise<PrimaryKeyT>
    get?(uuid: PrimaryKeyT): Promise<ModelT | null>
    update?(uuid: PrimaryKeyT, model: ModelT, options?: RepositoryOptionsT): Promise<ModelT>
    delete?(uuid: PrimaryKeyT): Promise<void>
    list?(options?: RepositoryOptionsT): Promise<Array<ModelT>>
    first?(options?: RepositoryOptionsT): Promise<ModelT | null>
    exists?(options?: RepositoryOptionsT): Promise<boolean>
}
