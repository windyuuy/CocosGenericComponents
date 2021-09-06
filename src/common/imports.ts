
namespace gcc {
	export import EmptyTable = fsync.EmptyTable;
	export type TStrMap<T> = { [key: string]: T }
	export type TNumMap<T> = { [key: number]: T }
	export import PPromise = fsync.PPromise
	export import createPPromise = fsync.createPPromise
	export import toPPromise = fsync.toPPromise
}
