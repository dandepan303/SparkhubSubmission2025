
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Job
 * 
 */
export type Job = $Result.DefaultSelection<Prisma.$JobPayload>
/**
 * Model Rating
 * 
 */
export type Rating = $Result.DefaultSelection<Prisma.$RatingPayload>
/**
 * Model Offering
 * 
 */
export type Offering = $Result.DefaultSelection<Prisma.$OfferingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const JobStatus: {
  SEARCHING: 'SEARCHING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]


export const RatingType: {
  HIRER: 'HIRER',
  WORKER: 'WORKER'
};

export type RatingType = (typeof RatingType)[keyof typeof RatingType]

}

export type JobStatus = $Enums.JobStatus

export const JobStatus: typeof $Enums.JobStatus

export type RatingType = $Enums.RatingType

export const RatingType: typeof $Enums.RatingType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **Job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.JobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rating`: Exposes CRUD operations for the **Rating** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ratings
    * const ratings = await prisma.rating.findMany()
    * ```
    */
  get rating(): Prisma.RatingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.offering`: Exposes CRUD operations for the **Offering** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Offerings
    * const offerings = await prisma.offering.findMany()
    * ```
    */
  get offering(): Prisma.OfferingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Job: 'Job',
    Rating: 'Rating',
    Offering: 'Offering'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "job" | "rating" | "offering"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Job: {
        payload: Prisma.$JobPayload<ExtArgs>
        fields: Prisma.JobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findFirst: {
            args: Prisma.JobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          findMany: {
            args: Prisma.JobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          create: {
            args: Prisma.JobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          createMany: {
            args: Prisma.JobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          delete: {
            args: Prisma.JobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          update: {
            args: Prisma.JobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          deleteMany: {
            args: Prisma.JobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>[]
          }
          upsert: {
            args: Prisma.JobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.JobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          count: {
            args: Prisma.JobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      Rating: {
        payload: Prisma.$RatingPayload<ExtArgs>
        fields: Prisma.RatingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RatingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RatingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findFirst: {
            args: Prisma.RatingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RatingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          findMany: {
            args: Prisma.RatingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          create: {
            args: Prisma.RatingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          createMany: {
            args: Prisma.RatingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RatingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          delete: {
            args: Prisma.RatingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          update: {
            args: Prisma.RatingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          deleteMany: {
            args: Prisma.RatingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RatingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RatingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>[]
          }
          upsert: {
            args: Prisma.RatingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RatingPayload>
          }
          aggregate: {
            args: Prisma.RatingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRating>
          }
          groupBy: {
            args: Prisma.RatingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RatingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RatingCountArgs<ExtArgs>
            result: $Utils.Optional<RatingCountAggregateOutputType> | number
          }
        }
      }
      Offering: {
        payload: Prisma.$OfferingPayload<ExtArgs>
        fields: Prisma.OfferingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfferingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfferingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload>
          }
          findFirst: {
            args: Prisma.OfferingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfferingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload>
          }
          findMany: {
            args: Prisma.OfferingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload>[]
          }
          create: {
            args: Prisma.OfferingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload>
          }
          createMany: {
            args: Prisma.OfferingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfferingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload>[]
          }
          delete: {
            args: Prisma.OfferingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload>
          }
          update: {
            args: Prisma.OfferingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload>
          }
          deleteMany: {
            args: Prisma.OfferingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfferingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OfferingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload>[]
          }
          upsert: {
            args: Prisma.OfferingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfferingPayload>
          }
          aggregate: {
            args: Prisma.OfferingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOffering>
          }
          groupBy: {
            args: Prisma.OfferingGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfferingGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfferingCountArgs<ExtArgs>
            result: $Utils.Optional<OfferingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    job?: JobOmit
    rating?: RatingOmit
    offering?: OfferingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    jobsCreated: number
    jobsWorking: number
    offerings: number
    ratingFrom: number
    ratingTo: number
    applications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobsCreated?: boolean | UserCountOutputTypeCountJobsCreatedArgs
    jobsWorking?: boolean | UserCountOutputTypeCountJobsWorkingArgs
    offerings?: boolean | UserCountOutputTypeCountOfferingsArgs
    ratingFrom?: boolean | UserCountOutputTypeCountRatingFromArgs
    ratingTo?: boolean | UserCountOutputTypeCountRatingToArgs
    applications?: boolean | UserCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJobsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJobsWorkingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOfferingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRatingFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRatingToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    ratings: number
    applications: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ratings?: boolean | JobCountOutputTypeCountRatingsArgs
    applications?: boolean | JobCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountRatingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    contactInfo: string | null
    createdAt: Date | null
    updatedAt: Date | null
    newNotifications: boolean | null
    role: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    contactInfo: string | null
    createdAt: Date | null
    updatedAt: Date | null
    newNotifications: boolean | null
    role: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    contactInfo: number
    createdAt: number
    updatedAt: number
    newNotifications: number
    notifications: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    contactInfo?: true
    createdAt?: true
    updatedAt?: true
    newNotifications?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    contactInfo?: true
    createdAt?: true
    updatedAt?: true
    newNotifications?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    contactInfo?: true
    createdAt?: true
    updatedAt?: true
    newNotifications?: true
    notifications?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    contactInfo: string | null
    createdAt: Date
    updatedAt: Date
    newNotifications: boolean
    notifications: string[]
    role: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    contactInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    newNotifications?: boolean
    notifications?: boolean
    role?: boolean
    jobsCreated?: boolean | User$jobsCreatedArgs<ExtArgs>
    jobsWorking?: boolean | User$jobsWorkingArgs<ExtArgs>
    offerings?: boolean | User$offeringsArgs<ExtArgs>
    ratingFrom?: boolean | User$ratingFromArgs<ExtArgs>
    ratingTo?: boolean | User$ratingToArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    contactInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    newNotifications?: boolean
    notifications?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    contactInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    newNotifications?: boolean
    notifications?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    contactInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    newNotifications?: boolean
    notifications?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "contactInfo" | "createdAt" | "updatedAt" | "newNotifications" | "notifications" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobsCreated?: boolean | User$jobsCreatedArgs<ExtArgs>
    jobsWorking?: boolean | User$jobsWorkingArgs<ExtArgs>
    offerings?: boolean | User$offeringsArgs<ExtArgs>
    ratingFrom?: boolean | User$ratingFromArgs<ExtArgs>
    ratingTo?: boolean | User$ratingToArgs<ExtArgs>
    applications?: boolean | User$applicationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      jobsCreated: Prisma.$JobPayload<ExtArgs>[]
      jobsWorking: Prisma.$JobPayload<ExtArgs>[]
      offerings: Prisma.$OfferingPayload<ExtArgs>[]
      ratingFrom: Prisma.$RatingPayload<ExtArgs>[]
      ratingTo: Prisma.$RatingPayload<ExtArgs>[]
      applications: Prisma.$JobPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      contactInfo: string | null
      createdAt: Date
      updatedAt: Date
      newNotifications: boolean
      notifications: string[]
      role: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobsCreated<T extends User$jobsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$jobsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    jobsWorking<T extends User$jobsWorkingArgs<ExtArgs> = {}>(args?: Subset<T, User$jobsWorkingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    offerings<T extends User$offeringsArgs<ExtArgs> = {}>(args?: Subset<T, User$offeringsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ratingFrom<T extends User$ratingFromArgs<ExtArgs> = {}>(args?: Subset<T, User$ratingFromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ratingTo<T extends User$ratingToArgs<ExtArgs> = {}>(args?: Subset<T, User$ratingToArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applications<T extends User$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, User$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly contactInfo: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly newNotifications: FieldRef<"User", 'Boolean'>
    readonly notifications: FieldRef<"User", 'String[]'>
    readonly role: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.jobsCreated
   */
  export type User$jobsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * User.jobsWorking
   */
  export type User$jobsWorkingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * User.offerings
   */
  export type User$offeringsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    where?: OfferingWhereInput
    orderBy?: OfferingOrderByWithRelationInput | OfferingOrderByWithRelationInput[]
    cursor?: OfferingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfferingScalarFieldEnum | OfferingScalarFieldEnum[]
  }

  /**
   * User.ratingFrom
   */
  export type User$ratingFromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * User.ratingTo
   */
  export type User$ratingToArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * User.applications
   */
  export type User$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    where?: JobWhereInput
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    cursor?: JobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    payment: number | null
  }

  export type JobSumAggregateOutputType = {
    payment: number | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    location: string | null
    status: $Enums.JobStatus | null
    hirerId: string | null
    workerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    payment: number | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    location: string | null
    status: $Enums.JobStatus | null
    hirerId: string | null
    workerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    payment: number | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    title: number
    description: number
    location: number
    status: number
    hirerId: number
    workerId: number
    createdAt: number
    updatedAt: number
    payment: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    payment?: true
  }

  export type JobSumAggregateInputType = {
    payment?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    status?: true
    hirerId?: true
    workerId?: true
    createdAt?: true
    updatedAt?: true
    payment?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    status?: true
    hirerId?: true
    workerId?: true
    createdAt?: true
    updatedAt?: true
    payment?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    status?: true
    hirerId?: true
    workerId?: true
    createdAt?: true
    updatedAt?: true
    payment?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Job to aggregate.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type JobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JobWhereInput
    orderBy?: JobOrderByWithAggregationInput | JobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: JobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    title: string
    description: string
    location: string
    status: $Enums.JobStatus
    hirerId: string
    workerId: string | null
    createdAt: Date
    updatedAt: Date
    payment: number
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends JobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type JobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    status?: boolean
    hirerId?: boolean
    workerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    payment?: boolean
    hirer?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Job$workerArgs<ExtArgs>
    ratings?: boolean | Job$ratingsArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    status?: boolean
    hirerId?: boolean
    workerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    payment?: boolean
    hirer?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Job$workerArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    status?: boolean
    hirerId?: boolean
    workerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    payment?: boolean
    hirer?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Job$workerArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>

  export type JobSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    status?: boolean
    hirerId?: boolean
    workerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    payment?: boolean
  }

  export type JobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "location" | "status" | "hirerId" | "workerId" | "createdAt" | "updatedAt" | "payment", ExtArgs["result"]["job"]>
  export type JobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hirer?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Job$workerArgs<ExtArgs>
    ratings?: boolean | Job$ratingsArgs<ExtArgs>
    applications?: boolean | Job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JobIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hirer?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Job$workerArgs<ExtArgs>
  }
  export type JobIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hirer?: boolean | UserDefaultArgs<ExtArgs>
    worker?: boolean | Job$workerArgs<ExtArgs>
  }

  export type $JobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Job"
    objects: {
      hirer: Prisma.$UserPayload<ExtArgs>
      worker: Prisma.$UserPayload<ExtArgs> | null
      ratings: Prisma.$RatingPayload<ExtArgs>[]
      applications: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      location: string
      status: $Enums.JobStatus
      hirerId: string
      workerId: string | null
      createdAt: Date
      updatedAt: Date
      payment: number
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type JobGetPayload<S extends boolean | null | undefined | JobDefaultArgs> = $Result.GetResult<Prisma.$JobPayload, S>

  type JobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface JobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Job'], meta: { name: 'Job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {JobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JobFindUniqueArgs>(args: SelectSubset<T, JobFindUniqueArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JobFindUniqueOrThrowArgs>(args: SelectSubset<T, JobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JobFindFirstArgs>(args?: SelectSubset<T, JobFindFirstArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JobFindFirstOrThrowArgs>(args?: SelectSubset<T, JobFindFirstOrThrowArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JobFindManyArgs>(args?: SelectSubset<T, JobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {JobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends JobCreateArgs>(args: SelectSubset<T, JobCreateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {JobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JobCreateManyArgs>(args?: SelectSubset<T, JobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Jobs and returns the data saved in the database.
     * @param {JobCreateManyAndReturnArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JobCreateManyAndReturnArgs>(args?: SelectSubset<T, JobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Job.
     * @param {JobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends JobDeleteArgs>(args: SelectSubset<T, JobDeleteArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {JobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JobUpdateArgs>(args: SelectSubset<T, JobUpdateArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {JobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JobDeleteManyArgs>(args?: SelectSubset<T, JobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JobUpdateManyArgs>(args: SelectSubset<T, JobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs and returns the data updated in the database.
     * @param {JobUpdateManyAndReturnArgs} args - Arguments to update many Jobs.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Jobs and only return the `id`
     * const jobWithIdOnly = await prisma.job.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JobUpdateManyAndReturnArgs>(args: SelectSubset<T, JobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Job.
     * @param {JobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends JobUpsertArgs>(args: SelectSubset<T, JobUpsertArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends JobCountArgs>(
      args?: Subset<T, JobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JobGroupByArgs['orderBy'] }
        : { orderBy?: JobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Job model
   */
  readonly fields: JobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hirer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    worker<T extends Job$workerArgs<ExtArgs> = {}>(args?: Subset<T, Job$workerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ratings<T extends Job$ratingsArgs<ExtArgs> = {}>(args?: Subset<T, Job$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applications<T extends Job$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Job$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Job model
   */
  interface JobFieldRefs {
    readonly id: FieldRef<"Job", 'String'>
    readonly title: FieldRef<"Job", 'String'>
    readonly description: FieldRef<"Job", 'String'>
    readonly location: FieldRef<"Job", 'String'>
    readonly status: FieldRef<"Job", 'JobStatus'>
    readonly hirerId: FieldRef<"Job", 'String'>
    readonly workerId: FieldRef<"Job", 'String'>
    readonly createdAt: FieldRef<"Job", 'DateTime'>
    readonly updatedAt: FieldRef<"Job", 'DateTime'>
    readonly payment: FieldRef<"Job", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Job findUnique
   */
  export type JobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findUniqueOrThrow
   */
  export type JobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job findFirst
   */
  export type JobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findFirstOrThrow
   */
  export type JobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Job to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job findMany
   */
  export type JobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter, which Jobs to fetch.
     */
    where?: JobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Jobs to fetch.
     */
    orderBy?: JobOrderByWithRelationInput | JobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Jobs.
     */
    cursor?: JobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * Job create
   */
  export type JobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to create a Job.
     */
    data: XOR<JobCreateInput, JobUncheckedCreateInput>
  }

  /**
   * Job createMany
   */
  export type JobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Job createManyAndReturn
   */
  export type JobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to create many Jobs.
     */
    data: JobCreateManyInput | JobCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job update
   */
  export type JobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The data needed to update a Job.
     */
    data: XOR<JobUpdateInput, JobUncheckedUpdateInput>
    /**
     * Choose, which Job to update.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job updateMany
   */
  export type JobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
  }

  /**
   * Job updateManyAndReturn
   */
  export type JobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * The data used to update Jobs.
     */
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyInput>
    /**
     * Filter which Jobs to update
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Job upsert
   */
  export type JobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * The filter to search for the Job to update in case it exists.
     */
    where: JobWhereUniqueInput
    /**
     * In case the Job found by the `where` argument doesn't exist, create a new Job with this data.
     */
    create: XOR<JobCreateInput, JobUncheckedCreateInput>
    /**
     * In case the Job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JobUpdateInput, JobUncheckedUpdateInput>
  }

  /**
   * Job delete
   */
  export type JobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
    /**
     * Filter which Job to delete.
     */
    where: JobWhereUniqueInput
  }

  /**
   * Job deleteMany
   */
  export type JobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Jobs to delete
     */
    where?: JobWhereInput
    /**
     * Limit how many Jobs to delete.
     */
    limit?: number
  }

  /**
   * Job.worker
   */
  export type Job$workerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Job.ratings
   */
  export type Job$ratingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    cursor?: RatingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Job.applications
   */
  export type Job$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Job without action
   */
  export type JobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Job
     */
    select?: JobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Job
     */
    omit?: JobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JobInclude<ExtArgs> | null
  }


  /**
   * Model Rating
   */

  export type AggregateRating = {
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  export type RatingAvgAggregateOutputType = {
    value: number | null
  }

  export type RatingSumAggregateOutputType = {
    value: number | null
  }

  export type RatingMinAggregateOutputType = {
    id: string | null
    value: number | null
    text: string | null
    type: $Enums.RatingType | null
    fromId: string | null
    toId: string | null
    jobId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RatingMaxAggregateOutputType = {
    id: string | null
    value: number | null
    text: string | null
    type: $Enums.RatingType | null
    fromId: string | null
    toId: string | null
    jobId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RatingCountAggregateOutputType = {
    id: number
    value: number
    text: number
    type: number
    fromId: number
    toId: number
    jobId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RatingAvgAggregateInputType = {
    value?: true
  }

  export type RatingSumAggregateInputType = {
    value?: true
  }

  export type RatingMinAggregateInputType = {
    id?: true
    value?: true
    text?: true
    type?: true
    fromId?: true
    toId?: true
    jobId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RatingMaxAggregateInputType = {
    id?: true
    value?: true
    text?: true
    type?: true
    fromId?: true
    toId?: true
    jobId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RatingCountAggregateInputType = {
    id?: true
    value?: true
    text?: true
    type?: true
    fromId?: true
    toId?: true
    jobId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RatingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rating to aggregate.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ratings
    **/
    _count?: true | RatingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RatingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RatingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RatingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RatingMaxAggregateInputType
  }

  export type GetRatingAggregateType<T extends RatingAggregateArgs> = {
        [P in keyof T & keyof AggregateRating]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRating[P]>
      : GetScalarType<T[P], AggregateRating[P]>
  }




  export type RatingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RatingWhereInput
    orderBy?: RatingOrderByWithAggregationInput | RatingOrderByWithAggregationInput[]
    by: RatingScalarFieldEnum[] | RatingScalarFieldEnum
    having?: RatingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RatingCountAggregateInputType | true
    _avg?: RatingAvgAggregateInputType
    _sum?: RatingSumAggregateInputType
    _min?: RatingMinAggregateInputType
    _max?: RatingMaxAggregateInputType
  }

  export type RatingGroupByOutputType = {
    id: string
    value: number
    text: string | null
    type: $Enums.RatingType
    fromId: string
    toId: string
    jobId: string
    createdAt: Date
    updatedAt: Date
    _count: RatingCountAggregateOutputType | null
    _avg: RatingAvgAggregateOutputType | null
    _sum: RatingSumAggregateOutputType | null
    _min: RatingMinAggregateOutputType | null
    _max: RatingMaxAggregateOutputType | null
  }

  type GetRatingGroupByPayload<T extends RatingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RatingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RatingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RatingGroupByOutputType[P]>
            : GetScalarType<T[P], RatingGroupByOutputType[P]>
        }
      >
    >


  export type RatingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    text?: boolean
    type?: boolean
    fromId?: boolean
    toId?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    text?: boolean
    type?: boolean
    fromId?: boolean
    toId?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    text?: boolean
    type?: boolean
    fromId?: boolean
    toId?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rating"]>

  export type RatingSelectScalar = {
    id?: boolean
    value?: boolean
    text?: boolean
    type?: boolean
    fromId?: boolean
    toId?: boolean
    jobId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RatingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value" | "text" | "type" | "fromId" | "toId" | "jobId" | "createdAt" | "updatedAt", ExtArgs["result"]["rating"]>
  export type RatingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RatingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RatingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    job?: boolean | JobDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RatingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Rating"
    objects: {
      from: Prisma.$UserPayload<ExtArgs>
      job: Prisma.$JobPayload<ExtArgs>
      to: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      value: number
      text: string | null
      type: $Enums.RatingType
      fromId: string
      toId: string
      jobId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["rating"]>
    composites: {}
  }

  type RatingGetPayload<S extends boolean | null | undefined | RatingDefaultArgs> = $Result.GetResult<Prisma.$RatingPayload, S>

  type RatingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RatingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RatingCountAggregateInputType | true
    }

  export interface RatingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Rating'], meta: { name: 'Rating' } }
    /**
     * Find zero or one Rating that matches the filter.
     * @param {RatingFindUniqueArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RatingFindUniqueArgs>(args: SelectSubset<T, RatingFindUniqueArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rating that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RatingFindUniqueOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RatingFindUniqueOrThrowArgs>(args: SelectSubset<T, RatingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RatingFindFirstArgs>(args?: SelectSubset<T, RatingFindFirstArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rating that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindFirstOrThrowArgs} args - Arguments to find a Rating
     * @example
     * // Get one Rating
     * const rating = await prisma.rating.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RatingFindFirstOrThrowArgs>(args?: SelectSubset<T, RatingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ratings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ratings
     * const ratings = await prisma.rating.findMany()
     * 
     * // Get first 10 Ratings
     * const ratings = await prisma.rating.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ratingWithIdOnly = await prisma.rating.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RatingFindManyArgs>(args?: SelectSubset<T, RatingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rating.
     * @param {RatingCreateArgs} args - Arguments to create a Rating.
     * @example
     * // Create one Rating
     * const Rating = await prisma.rating.create({
     *   data: {
     *     // ... data to create a Rating
     *   }
     * })
     * 
     */
    create<T extends RatingCreateArgs>(args: SelectSubset<T, RatingCreateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ratings.
     * @param {RatingCreateManyArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RatingCreateManyArgs>(args?: SelectSubset<T, RatingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Ratings and returns the data saved in the database.
     * @param {RatingCreateManyAndReturnArgs} args - Arguments to create many Ratings.
     * @example
     * // Create many Ratings
     * const rating = await prisma.rating.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Ratings and only return the `id`
     * const ratingWithIdOnly = await prisma.rating.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RatingCreateManyAndReturnArgs>(args?: SelectSubset<T, RatingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rating.
     * @param {RatingDeleteArgs} args - Arguments to delete one Rating.
     * @example
     * // Delete one Rating
     * const Rating = await prisma.rating.delete({
     *   where: {
     *     // ... filter to delete one Rating
     *   }
     * })
     * 
     */
    delete<T extends RatingDeleteArgs>(args: SelectSubset<T, RatingDeleteArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rating.
     * @param {RatingUpdateArgs} args - Arguments to update one Rating.
     * @example
     * // Update one Rating
     * const rating = await prisma.rating.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RatingUpdateArgs>(args: SelectSubset<T, RatingUpdateArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ratings.
     * @param {RatingDeleteManyArgs} args - Arguments to filter Ratings to delete.
     * @example
     * // Delete a few Ratings
     * const { count } = await prisma.rating.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RatingDeleteManyArgs>(args?: SelectSubset<T, RatingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RatingUpdateManyArgs>(args: SelectSubset<T, RatingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ratings and returns the data updated in the database.
     * @param {RatingUpdateManyAndReturnArgs} args - Arguments to update many Ratings.
     * @example
     * // Update many Ratings
     * const rating = await prisma.rating.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Ratings and only return the `id`
     * const ratingWithIdOnly = await prisma.rating.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RatingUpdateManyAndReturnArgs>(args: SelectSubset<T, RatingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rating.
     * @param {RatingUpsertArgs} args - Arguments to update or create a Rating.
     * @example
     * // Update or create a Rating
     * const rating = await prisma.rating.upsert({
     *   create: {
     *     // ... data to create a Rating
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rating we want to update
     *   }
     * })
     */
    upsert<T extends RatingUpsertArgs>(args: SelectSubset<T, RatingUpsertArgs<ExtArgs>>): Prisma__RatingClient<$Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ratings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingCountArgs} args - Arguments to filter Ratings to count.
     * @example
     * // Count the number of Ratings
     * const count = await prisma.rating.count({
     *   where: {
     *     // ... the filter for the Ratings we want to count
     *   }
     * })
    **/
    count<T extends RatingCountArgs>(
      args?: Subset<T, RatingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RatingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RatingAggregateArgs>(args: Subset<T, RatingAggregateArgs>): Prisma.PrismaPromise<GetRatingAggregateType<T>>

    /**
     * Group by Rating.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RatingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RatingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RatingGroupByArgs['orderBy'] }
        : { orderBy?: RatingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RatingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Rating model
   */
  readonly fields: RatingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Rating.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RatingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    from<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    job<T extends JobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, JobDefaultArgs<ExtArgs>>): Prisma__JobClient<$Result.GetResult<Prisma.$JobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    to<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Rating model
   */
  interface RatingFieldRefs {
    readonly id: FieldRef<"Rating", 'String'>
    readonly value: FieldRef<"Rating", 'Int'>
    readonly text: FieldRef<"Rating", 'String'>
    readonly type: FieldRef<"Rating", 'RatingType'>
    readonly fromId: FieldRef<"Rating", 'String'>
    readonly toId: FieldRef<"Rating", 'String'>
    readonly jobId: FieldRef<"Rating", 'String'>
    readonly createdAt: FieldRef<"Rating", 'DateTime'>
    readonly updatedAt: FieldRef<"Rating", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Rating findUnique
   */
  export type RatingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findUniqueOrThrow
   */
  export type RatingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating findFirst
   */
  export type RatingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findFirstOrThrow
   */
  export type RatingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Rating to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ratings.
     */
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating findMany
   */
  export type RatingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter, which Ratings to fetch.
     */
    where?: RatingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ratings to fetch.
     */
    orderBy?: RatingOrderByWithRelationInput | RatingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ratings.
     */
    cursor?: RatingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ratings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ratings.
     */
    skip?: number
    distinct?: RatingScalarFieldEnum | RatingScalarFieldEnum[]
  }

  /**
   * Rating create
   */
  export type RatingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to create a Rating.
     */
    data: XOR<RatingCreateInput, RatingUncheckedCreateInput>
  }

  /**
   * Rating createMany
   */
  export type RatingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Rating createManyAndReturn
   */
  export type RatingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to create many Ratings.
     */
    data: RatingCreateManyInput | RatingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating update
   */
  export type RatingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The data needed to update a Rating.
     */
    data: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
    /**
     * Choose, which Rating to update.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating updateMany
   */
  export type RatingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
  }

  /**
   * Rating updateManyAndReturn
   */
  export type RatingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * The data used to update Ratings.
     */
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyInput>
    /**
     * Filter which Ratings to update
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Rating upsert
   */
  export type RatingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * The filter to search for the Rating to update in case it exists.
     */
    where: RatingWhereUniqueInput
    /**
     * In case the Rating found by the `where` argument doesn't exist, create a new Rating with this data.
     */
    create: XOR<RatingCreateInput, RatingUncheckedCreateInput>
    /**
     * In case the Rating was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RatingUpdateInput, RatingUncheckedUpdateInput>
  }

  /**
   * Rating delete
   */
  export type RatingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
    /**
     * Filter which Rating to delete.
     */
    where: RatingWhereUniqueInput
  }

  /**
   * Rating deleteMany
   */
  export type RatingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ratings to delete
     */
    where?: RatingWhereInput
    /**
     * Limit how many Ratings to delete.
     */
    limit?: number
  }

  /**
   * Rating without action
   */
  export type RatingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: RatingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Rating
     */
    omit?: RatingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RatingInclude<ExtArgs> | null
  }


  /**
   * Model Offering
   */

  export type AggregateOffering = {
    _count: OfferingCountAggregateOutputType | null
    _avg: OfferingAvgAggregateOutputType | null
    _sum: OfferingSumAggregateOutputType | null
    _min: OfferingMinAggregateOutputType | null
    _max: OfferingMaxAggregateOutputType | null
  }

  export type OfferingAvgAggregateOutputType = {
    cost: number | null
    quantity: number | null
  }

  export type OfferingSumAggregateOutputType = {
    cost: number | null
    quantity: number | null
  }

  export type OfferingMinAggregateOutputType = {
    id: string | null
    description: string | null
    cost: number | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type OfferingMaxAggregateOutputType = {
    id: string | null
    description: string | null
    cost: number | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type OfferingCountAggregateOutputType = {
    id: number
    description: number
    cost: number
    quantity: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type OfferingAvgAggregateInputType = {
    cost?: true
    quantity?: true
  }

  export type OfferingSumAggregateInputType = {
    cost?: true
    quantity?: true
  }

  export type OfferingMinAggregateInputType = {
    id?: true
    description?: true
    cost?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type OfferingMaxAggregateInputType = {
    id?: true
    description?: true
    cost?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type OfferingCountAggregateInputType = {
    id?: true
    description?: true
    cost?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type OfferingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offering to aggregate.
     */
    where?: OfferingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offerings to fetch.
     */
    orderBy?: OfferingOrderByWithRelationInput | OfferingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfferingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offerings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offerings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Offerings
    **/
    _count?: true | OfferingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfferingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfferingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfferingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfferingMaxAggregateInputType
  }

  export type GetOfferingAggregateType<T extends OfferingAggregateArgs> = {
        [P in keyof T & keyof AggregateOffering]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOffering[P]>
      : GetScalarType<T[P], AggregateOffering[P]>
  }




  export type OfferingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfferingWhereInput
    orderBy?: OfferingOrderByWithAggregationInput | OfferingOrderByWithAggregationInput[]
    by: OfferingScalarFieldEnum[] | OfferingScalarFieldEnum
    having?: OfferingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfferingCountAggregateInputType | true
    _avg?: OfferingAvgAggregateInputType
    _sum?: OfferingSumAggregateInputType
    _min?: OfferingMinAggregateInputType
    _max?: OfferingMaxAggregateInputType
  }

  export type OfferingGroupByOutputType = {
    id: string
    description: string
    cost: number
    quantity: number | null
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: OfferingCountAggregateOutputType | null
    _avg: OfferingAvgAggregateOutputType | null
    _sum: OfferingSumAggregateOutputType | null
    _min: OfferingMinAggregateOutputType | null
    _max: OfferingMaxAggregateOutputType | null
  }

  type GetOfferingGroupByPayload<T extends OfferingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfferingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfferingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfferingGroupByOutputType[P]>
            : GetScalarType<T[P], OfferingGroupByOutputType[P]>
        }
      >
    >


  export type OfferingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    cost?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offering"]>

  export type OfferingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    cost?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offering"]>

  export type OfferingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    description?: boolean
    cost?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offering"]>

  export type OfferingSelectScalar = {
    id?: boolean
    description?: boolean
    cost?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type OfferingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "description" | "cost" | "quantity" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["offering"]>
  export type OfferingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OfferingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OfferingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OfferingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Offering"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      description: string
      cost: number
      quantity: number | null
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["offering"]>
    composites: {}
  }

  type OfferingGetPayload<S extends boolean | null | undefined | OfferingDefaultArgs> = $Result.GetResult<Prisma.$OfferingPayload, S>

  type OfferingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfferingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfferingCountAggregateInputType | true
    }

  export interface OfferingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Offering'], meta: { name: 'Offering' } }
    /**
     * Find zero or one Offering that matches the filter.
     * @param {OfferingFindUniqueArgs} args - Arguments to find a Offering
     * @example
     * // Get one Offering
     * const offering = await prisma.offering.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfferingFindUniqueArgs>(args: SelectSubset<T, OfferingFindUniqueArgs<ExtArgs>>): Prisma__OfferingClient<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Offering that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfferingFindUniqueOrThrowArgs} args - Arguments to find a Offering
     * @example
     * // Get one Offering
     * const offering = await prisma.offering.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfferingFindUniqueOrThrowArgs>(args: SelectSubset<T, OfferingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfferingClient<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offering that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferingFindFirstArgs} args - Arguments to find a Offering
     * @example
     * // Get one Offering
     * const offering = await prisma.offering.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfferingFindFirstArgs>(args?: SelectSubset<T, OfferingFindFirstArgs<ExtArgs>>): Prisma__OfferingClient<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Offering that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferingFindFirstOrThrowArgs} args - Arguments to find a Offering
     * @example
     * // Get one Offering
     * const offering = await prisma.offering.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfferingFindFirstOrThrowArgs>(args?: SelectSubset<T, OfferingFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfferingClient<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Offerings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Offerings
     * const offerings = await prisma.offering.findMany()
     * 
     * // Get first 10 Offerings
     * const offerings = await prisma.offering.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const offeringWithIdOnly = await prisma.offering.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OfferingFindManyArgs>(args?: SelectSubset<T, OfferingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Offering.
     * @param {OfferingCreateArgs} args - Arguments to create a Offering.
     * @example
     * // Create one Offering
     * const Offering = await prisma.offering.create({
     *   data: {
     *     // ... data to create a Offering
     *   }
     * })
     * 
     */
    create<T extends OfferingCreateArgs>(args: SelectSubset<T, OfferingCreateArgs<ExtArgs>>): Prisma__OfferingClient<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Offerings.
     * @param {OfferingCreateManyArgs} args - Arguments to create many Offerings.
     * @example
     * // Create many Offerings
     * const offering = await prisma.offering.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfferingCreateManyArgs>(args?: SelectSubset<T, OfferingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Offerings and returns the data saved in the database.
     * @param {OfferingCreateManyAndReturnArgs} args - Arguments to create many Offerings.
     * @example
     * // Create many Offerings
     * const offering = await prisma.offering.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Offerings and only return the `id`
     * const offeringWithIdOnly = await prisma.offering.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfferingCreateManyAndReturnArgs>(args?: SelectSubset<T, OfferingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Offering.
     * @param {OfferingDeleteArgs} args - Arguments to delete one Offering.
     * @example
     * // Delete one Offering
     * const Offering = await prisma.offering.delete({
     *   where: {
     *     // ... filter to delete one Offering
     *   }
     * })
     * 
     */
    delete<T extends OfferingDeleteArgs>(args: SelectSubset<T, OfferingDeleteArgs<ExtArgs>>): Prisma__OfferingClient<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Offering.
     * @param {OfferingUpdateArgs} args - Arguments to update one Offering.
     * @example
     * // Update one Offering
     * const offering = await prisma.offering.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfferingUpdateArgs>(args: SelectSubset<T, OfferingUpdateArgs<ExtArgs>>): Prisma__OfferingClient<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Offerings.
     * @param {OfferingDeleteManyArgs} args - Arguments to filter Offerings to delete.
     * @example
     * // Delete a few Offerings
     * const { count } = await prisma.offering.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfferingDeleteManyArgs>(args?: SelectSubset<T, OfferingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offerings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Offerings
     * const offering = await prisma.offering.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfferingUpdateManyArgs>(args: SelectSubset<T, OfferingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Offerings and returns the data updated in the database.
     * @param {OfferingUpdateManyAndReturnArgs} args - Arguments to update many Offerings.
     * @example
     * // Update many Offerings
     * const offering = await prisma.offering.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Offerings and only return the `id`
     * const offeringWithIdOnly = await prisma.offering.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OfferingUpdateManyAndReturnArgs>(args: SelectSubset<T, OfferingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Offering.
     * @param {OfferingUpsertArgs} args - Arguments to update or create a Offering.
     * @example
     * // Update or create a Offering
     * const offering = await prisma.offering.upsert({
     *   create: {
     *     // ... data to create a Offering
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Offering we want to update
     *   }
     * })
     */
    upsert<T extends OfferingUpsertArgs>(args: SelectSubset<T, OfferingUpsertArgs<ExtArgs>>): Prisma__OfferingClient<$Result.GetResult<Prisma.$OfferingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Offerings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferingCountArgs} args - Arguments to filter Offerings to count.
     * @example
     * // Count the number of Offerings
     * const count = await prisma.offering.count({
     *   where: {
     *     // ... the filter for the Offerings we want to count
     *   }
     * })
    **/
    count<T extends OfferingCountArgs>(
      args?: Subset<T, OfferingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfferingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Offering.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfferingAggregateArgs>(args: Subset<T, OfferingAggregateArgs>): Prisma.PrismaPromise<GetOfferingAggregateType<T>>

    /**
     * Group by Offering.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfferingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfferingGroupByArgs['orderBy'] }
        : { orderBy?: OfferingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfferingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfferingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Offering model
   */
  readonly fields: OfferingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Offering.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfferingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Offering model
   */
  interface OfferingFieldRefs {
    readonly id: FieldRef<"Offering", 'String'>
    readonly description: FieldRef<"Offering", 'String'>
    readonly cost: FieldRef<"Offering", 'Int'>
    readonly quantity: FieldRef<"Offering", 'Int'>
    readonly createdAt: FieldRef<"Offering", 'DateTime'>
    readonly updatedAt: FieldRef<"Offering", 'DateTime'>
    readonly userId: FieldRef<"Offering", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Offering findUnique
   */
  export type OfferingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    /**
     * Filter, which Offering to fetch.
     */
    where: OfferingWhereUniqueInput
  }

  /**
   * Offering findUniqueOrThrow
   */
  export type OfferingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    /**
     * Filter, which Offering to fetch.
     */
    where: OfferingWhereUniqueInput
  }

  /**
   * Offering findFirst
   */
  export type OfferingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    /**
     * Filter, which Offering to fetch.
     */
    where?: OfferingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offerings to fetch.
     */
    orderBy?: OfferingOrderByWithRelationInput | OfferingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offerings.
     */
    cursor?: OfferingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offerings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offerings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offerings.
     */
    distinct?: OfferingScalarFieldEnum | OfferingScalarFieldEnum[]
  }

  /**
   * Offering findFirstOrThrow
   */
  export type OfferingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    /**
     * Filter, which Offering to fetch.
     */
    where?: OfferingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offerings to fetch.
     */
    orderBy?: OfferingOrderByWithRelationInput | OfferingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Offerings.
     */
    cursor?: OfferingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offerings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offerings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Offerings.
     */
    distinct?: OfferingScalarFieldEnum | OfferingScalarFieldEnum[]
  }

  /**
   * Offering findMany
   */
  export type OfferingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    /**
     * Filter, which Offerings to fetch.
     */
    where?: OfferingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Offerings to fetch.
     */
    orderBy?: OfferingOrderByWithRelationInput | OfferingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Offerings.
     */
    cursor?: OfferingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Offerings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Offerings.
     */
    skip?: number
    distinct?: OfferingScalarFieldEnum | OfferingScalarFieldEnum[]
  }

  /**
   * Offering create
   */
  export type OfferingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    /**
     * The data needed to create a Offering.
     */
    data: XOR<OfferingCreateInput, OfferingUncheckedCreateInput>
  }

  /**
   * Offering createMany
   */
  export type OfferingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Offerings.
     */
    data: OfferingCreateManyInput | OfferingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Offering createManyAndReturn
   */
  export type OfferingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * The data used to create many Offerings.
     */
    data: OfferingCreateManyInput | OfferingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Offering update
   */
  export type OfferingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    /**
     * The data needed to update a Offering.
     */
    data: XOR<OfferingUpdateInput, OfferingUncheckedUpdateInput>
    /**
     * Choose, which Offering to update.
     */
    where: OfferingWhereUniqueInput
  }

  /**
   * Offering updateMany
   */
  export type OfferingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Offerings.
     */
    data: XOR<OfferingUpdateManyMutationInput, OfferingUncheckedUpdateManyInput>
    /**
     * Filter which Offerings to update
     */
    where?: OfferingWhereInput
    /**
     * Limit how many Offerings to update.
     */
    limit?: number
  }

  /**
   * Offering updateManyAndReturn
   */
  export type OfferingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * The data used to update Offerings.
     */
    data: XOR<OfferingUpdateManyMutationInput, OfferingUncheckedUpdateManyInput>
    /**
     * Filter which Offerings to update
     */
    where?: OfferingWhereInput
    /**
     * Limit how many Offerings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Offering upsert
   */
  export type OfferingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    /**
     * The filter to search for the Offering to update in case it exists.
     */
    where: OfferingWhereUniqueInput
    /**
     * In case the Offering found by the `where` argument doesn't exist, create a new Offering with this data.
     */
    create: XOR<OfferingCreateInput, OfferingUncheckedCreateInput>
    /**
     * In case the Offering was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfferingUpdateInput, OfferingUncheckedUpdateInput>
  }

  /**
   * Offering delete
   */
  export type OfferingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
    /**
     * Filter which Offering to delete.
     */
    where: OfferingWhereUniqueInput
  }

  /**
   * Offering deleteMany
   */
  export type OfferingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Offerings to delete
     */
    where?: OfferingWhereInput
    /**
     * Limit how many Offerings to delete.
     */
    limit?: number
  }

  /**
   * Offering without action
   */
  export type OfferingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Offering
     */
    select?: OfferingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Offering
     */
    omit?: OfferingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfferingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    contactInfo: 'contactInfo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    newNotifications: 'newNotifications',
    notifications: 'notifications',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    location: 'location',
    status: 'status',
    hirerId: 'hirerId',
    workerId: 'workerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    payment: 'payment'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const RatingScalarFieldEnum: {
    id: 'id',
    value: 'value',
    text: 'text',
    type: 'type',
    fromId: 'fromId',
    toId: 'toId',
    jobId: 'jobId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RatingScalarFieldEnum = (typeof RatingScalarFieldEnum)[keyof typeof RatingScalarFieldEnum]


  export const OfferingScalarFieldEnum: {
    id: 'id',
    description: 'description',
    cost: 'cost',
    quantity: 'quantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type OfferingScalarFieldEnum = (typeof OfferingScalarFieldEnum)[keyof typeof OfferingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'JobStatus'
   */
  export type EnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus'>
    


  /**
   * Reference to a field of type 'JobStatus[]'
   */
  export type ListEnumJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'JobStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'RatingType'
   */
  export type EnumRatingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RatingType'>
    


  /**
   * Reference to a field of type 'RatingType[]'
   */
  export type ListEnumRatingTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RatingType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    contactInfo?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    newNotifications?: BoolFilter<"User"> | boolean
    notifications?: StringNullableListFilter<"User">
    role?: StringFilter<"User"> | string
    jobsCreated?: JobListRelationFilter
    jobsWorking?: JobListRelationFilter
    offerings?: OfferingListRelationFilter
    ratingFrom?: RatingListRelationFilter
    ratingTo?: RatingListRelationFilter
    applications?: JobListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    contactInfo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    newNotifications?: SortOrder
    notifications?: SortOrder
    role?: SortOrder
    jobsCreated?: JobOrderByRelationAggregateInput
    jobsWorking?: JobOrderByRelationAggregateInput
    offerings?: OfferingOrderByRelationAggregateInput
    ratingFrom?: RatingOrderByRelationAggregateInput
    ratingTo?: RatingOrderByRelationAggregateInput
    applications?: JobOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    contactInfo?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    newNotifications?: BoolFilter<"User"> | boolean
    notifications?: StringNullableListFilter<"User">
    role?: StringFilter<"User"> | string
    jobsCreated?: JobListRelationFilter
    jobsWorking?: JobListRelationFilter
    offerings?: OfferingListRelationFilter
    ratingFrom?: RatingListRelationFilter
    ratingTo?: RatingListRelationFilter
    applications?: JobListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    contactInfo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    newNotifications?: SortOrder
    notifications?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    contactInfo?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    newNotifications?: BoolWithAggregatesFilter<"User"> | boolean
    notifications?: StringNullableListFilter<"User">
    role?: StringWithAggregatesFilter<"User"> | string
  }

  export type JobWhereInput = {
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    id?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    location?: StringFilter<"Job"> | string
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    hirerId?: StringFilter<"Job"> | string
    workerId?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    payment?: IntFilter<"Job"> | number
    hirer?: XOR<UserScalarRelationFilter, UserWhereInput>
    worker?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    ratings?: RatingListRelationFilter
    applications?: UserListRelationFilter
  }

  export type JobOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    status?: SortOrder
    hirerId?: SortOrder
    workerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    payment?: SortOrder
    hirer?: UserOrderByWithRelationInput
    worker?: UserOrderByWithRelationInput
    ratings?: RatingOrderByRelationAggregateInput
    applications?: UserOrderByRelationAggregateInput
  }

  export type JobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JobWhereInput | JobWhereInput[]
    OR?: JobWhereInput[]
    NOT?: JobWhereInput | JobWhereInput[]
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    location?: StringFilter<"Job"> | string
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    hirerId?: StringFilter<"Job"> | string
    workerId?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    payment?: IntFilter<"Job"> | number
    hirer?: XOR<UserScalarRelationFilter, UserWhereInput>
    worker?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    ratings?: RatingListRelationFilter
    applications?: UserListRelationFilter
  }, "id">

  export type JobOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    status?: SortOrder
    hirerId?: SortOrder
    workerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    payment?: SortOrder
    _count?: JobCountOrderByAggregateInput
    _avg?: JobAvgOrderByAggregateInput
    _max?: JobMaxOrderByAggregateInput
    _min?: JobMinOrderByAggregateInput
    _sum?: JobSumOrderByAggregateInput
  }

  export type JobScalarWhereWithAggregatesInput = {
    AND?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    OR?: JobScalarWhereWithAggregatesInput[]
    NOT?: JobScalarWhereWithAggregatesInput | JobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Job"> | string
    title?: StringWithAggregatesFilter<"Job"> | string
    description?: StringWithAggregatesFilter<"Job"> | string
    location?: StringWithAggregatesFilter<"Job"> | string
    status?: EnumJobStatusWithAggregatesFilter<"Job"> | $Enums.JobStatus
    hirerId?: StringWithAggregatesFilter<"Job"> | string
    workerId?: StringNullableWithAggregatesFilter<"Job"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Job"> | Date | string
    payment?: IntWithAggregatesFilter<"Job"> | number
  }

  export type RatingWhereInput = {
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    id?: StringFilter<"Rating"> | string
    value?: IntFilter<"Rating"> | number
    text?: StringNullableFilter<"Rating"> | string | null
    type?: EnumRatingTypeFilter<"Rating"> | $Enums.RatingType
    fromId?: StringFilter<"Rating"> | string
    toId?: StringFilter<"Rating"> | string
    jobId?: StringFilter<"Rating"> | string
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    updatedAt?: DateTimeFilter<"Rating"> | Date | string
    from?: XOR<UserScalarRelationFilter, UserWhereInput>
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    to?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RatingOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    text?: SortOrderInput | SortOrder
    type?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    from?: UserOrderByWithRelationInput
    job?: JobOrderByWithRelationInput
    to?: UserOrderByWithRelationInput
  }

  export type RatingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RatingWhereInput | RatingWhereInput[]
    OR?: RatingWhereInput[]
    NOT?: RatingWhereInput | RatingWhereInput[]
    value?: IntFilter<"Rating"> | number
    text?: StringNullableFilter<"Rating"> | string | null
    type?: EnumRatingTypeFilter<"Rating"> | $Enums.RatingType
    fromId?: StringFilter<"Rating"> | string
    toId?: StringFilter<"Rating"> | string
    jobId?: StringFilter<"Rating"> | string
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    updatedAt?: DateTimeFilter<"Rating"> | Date | string
    from?: XOR<UserScalarRelationFilter, UserWhereInput>
    job?: XOR<JobScalarRelationFilter, JobWhereInput>
    to?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RatingOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    text?: SortOrderInput | SortOrder
    type?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RatingCountOrderByAggregateInput
    _avg?: RatingAvgOrderByAggregateInput
    _max?: RatingMaxOrderByAggregateInput
    _min?: RatingMinOrderByAggregateInput
    _sum?: RatingSumOrderByAggregateInput
  }

  export type RatingScalarWhereWithAggregatesInput = {
    AND?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    OR?: RatingScalarWhereWithAggregatesInput[]
    NOT?: RatingScalarWhereWithAggregatesInput | RatingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Rating"> | string
    value?: IntWithAggregatesFilter<"Rating"> | number
    text?: StringNullableWithAggregatesFilter<"Rating"> | string | null
    type?: EnumRatingTypeWithAggregatesFilter<"Rating"> | $Enums.RatingType
    fromId?: StringWithAggregatesFilter<"Rating"> | string
    toId?: StringWithAggregatesFilter<"Rating"> | string
    jobId?: StringWithAggregatesFilter<"Rating"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Rating"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Rating"> | Date | string
  }

  export type OfferingWhereInput = {
    AND?: OfferingWhereInput | OfferingWhereInput[]
    OR?: OfferingWhereInput[]
    NOT?: OfferingWhereInput | OfferingWhereInput[]
    id?: StringFilter<"Offering"> | string
    description?: StringFilter<"Offering"> | string
    cost?: IntFilter<"Offering"> | number
    quantity?: IntNullableFilter<"Offering"> | number | null
    createdAt?: DateTimeFilter<"Offering"> | Date | string
    updatedAt?: DateTimeFilter<"Offering"> | Date | string
    userId?: StringFilter<"Offering"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OfferingOrderByWithRelationInput = {
    id?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    quantity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    owner?: UserOrderByWithRelationInput
  }

  export type OfferingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OfferingWhereInput | OfferingWhereInput[]
    OR?: OfferingWhereInput[]
    NOT?: OfferingWhereInput | OfferingWhereInput[]
    description?: StringFilter<"Offering"> | string
    cost?: IntFilter<"Offering"> | number
    quantity?: IntNullableFilter<"Offering"> | number | null
    createdAt?: DateTimeFilter<"Offering"> | Date | string
    updatedAt?: DateTimeFilter<"Offering"> | Date | string
    userId?: StringFilter<"Offering"> | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OfferingOrderByWithAggregationInput = {
    id?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    quantity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: OfferingCountOrderByAggregateInput
    _avg?: OfferingAvgOrderByAggregateInput
    _max?: OfferingMaxOrderByAggregateInput
    _min?: OfferingMinOrderByAggregateInput
    _sum?: OfferingSumOrderByAggregateInput
  }

  export type OfferingScalarWhereWithAggregatesInput = {
    AND?: OfferingScalarWhereWithAggregatesInput | OfferingScalarWhereWithAggregatesInput[]
    OR?: OfferingScalarWhereWithAggregatesInput[]
    NOT?: OfferingScalarWhereWithAggregatesInput | OfferingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Offering"> | string
    description?: StringWithAggregatesFilter<"Offering"> | string
    cost?: IntWithAggregatesFilter<"Offering"> | number
    quantity?: IntNullableWithAggregatesFilter<"Offering"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Offering"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Offering"> | Date | string
    userId?: StringWithAggregatesFilter<"Offering"> | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobCreateNestedManyWithoutHirerInput
    jobsWorking?: JobCreateNestedManyWithoutWorkerInput
    offerings?: OfferingCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingCreateNestedManyWithoutFromInput
    ratingTo?: RatingCreateNestedManyWithoutToInput
    applications?: JobCreateNestedManyWithoutApplicationsInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobUncheckedCreateNestedManyWithoutHirerInput
    jobsWorking?: JobUncheckedCreateNestedManyWithoutWorkerInput
    offerings?: OfferingUncheckedCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingUncheckedCreateNestedManyWithoutFromInput
    ratingTo?: RatingUncheckedCreateNestedManyWithoutToInput
    applications?: JobUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUpdateManyWithoutToNestedInput
    applications?: JobUpdateManyWithoutApplicationsNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUncheckedUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUncheckedUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUncheckedUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUncheckedUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUncheckedUpdateManyWithoutToNestedInput
    applications?: JobUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
  }

  export type JobCreateInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    hirer: UserCreateNestedOneWithoutJobsCreatedInput
    worker?: UserCreateNestedOneWithoutJobsWorkingInput
    ratings?: RatingCreateNestedManyWithoutJobInput
    applications?: UserCreateNestedManyWithoutApplicationsInput
  }

  export type JobUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    hirerId: string
    workerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    ratings?: RatingUncheckedCreateNestedManyWithoutJobInput
    applications?: UserUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type JobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    hirer?: UserUpdateOneRequiredWithoutJobsCreatedNestedInput
    worker?: UserUpdateOneWithoutJobsWorkingNestedInput
    ratings?: RatingUpdateManyWithoutJobNestedInput
    applications?: UserUpdateManyWithoutApplicationsNestedInput
  }

  export type JobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    hirerId?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    ratings?: RatingUncheckedUpdateManyWithoutJobNestedInput
    applications?: UserUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type JobCreateManyInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    hirerId: string
    workerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
  }

  export type JobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
  }

  export type JobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    hirerId?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
  }

  export type RatingCreateInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    createdAt?: Date | string
    updatedAt?: Date | string
    from: UserCreateNestedOneWithoutRatingFromInput
    job: JobCreateNestedOneWithoutRatingsInput
    to: UserCreateNestedOneWithoutRatingToInput
  }

  export type RatingUncheckedCreateInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    fromId: string
    toId: string
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: UserUpdateOneRequiredWithoutRatingFromNestedInput
    job?: JobUpdateOneRequiredWithoutRatingsNestedInput
    to?: UserUpdateOneRequiredWithoutRatingToNestedInput
  }

  export type RatingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingCreateManyInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    fromId: string
    toId: string
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferingCreateInput = {
    id?: string
    description: string
    cost: number
    quantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutOfferingsInput
  }

  export type OfferingUncheckedCreateInput = {
    id?: string
    description: string
    cost: number
    quantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type OfferingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: IntFieldUpdateOperationsInput | number
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOfferingsNestedInput
  }

  export type OfferingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: IntFieldUpdateOperationsInput | number
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type OfferingCreateManyInput = {
    id?: string
    description: string
    cost: number
    quantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type OfferingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: IntFieldUpdateOperationsInput | number
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: IntFieldUpdateOperationsInput | number
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type JobListRelationFilter = {
    every?: JobWhereInput
    some?: JobWhereInput
    none?: JobWhereInput
  }

  export type OfferingListRelationFilter = {
    every?: OfferingWhereInput
    some?: OfferingWhereInput
    none?: OfferingWhereInput
  }

  export type RatingListRelationFilter = {
    every?: RatingWhereInput
    some?: RatingWhereInput
    none?: RatingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type JobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OfferingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RatingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    contactInfo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    newNotifications?: SortOrder
    notifications?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    contactInfo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    newNotifications?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    contactInfo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    newNotifications?: SortOrder
    role?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type JobCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    status?: SortOrder
    hirerId?: SortOrder
    workerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    payment?: SortOrder
  }

  export type JobAvgOrderByAggregateInput = {
    payment?: SortOrder
  }

  export type JobMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    status?: SortOrder
    hirerId?: SortOrder
    workerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    payment?: SortOrder
  }

  export type JobMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    status?: SortOrder
    hirerId?: SortOrder
    workerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    payment?: SortOrder
  }

  export type JobSumOrderByAggregateInput = {
    payment?: SortOrder
  }

  export type EnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumRatingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RatingType | EnumRatingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RatingType[] | ListEnumRatingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RatingType[] | ListEnumRatingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRatingTypeFilter<$PrismaModel> | $Enums.RatingType
  }

  export type JobScalarRelationFilter = {
    is?: JobWhereInput
    isNot?: JobWhereInput
  }

  export type RatingCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    text?: SortOrder
    type?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatingAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type RatingMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    text?: SortOrder
    type?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatingMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    text?: SortOrder
    type?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    jobId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RatingSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type EnumRatingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RatingType | EnumRatingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RatingType[] | ListEnumRatingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RatingType[] | ListEnumRatingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRatingTypeWithAggregatesFilter<$PrismaModel> | $Enums.RatingType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRatingTypeFilter<$PrismaModel>
    _max?: NestedEnumRatingTypeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type OfferingCountOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type OfferingAvgOrderByAggregateInput = {
    cost?: SortOrder
    quantity?: SortOrder
  }

  export type OfferingMaxOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type OfferingMinOrderByAggregateInput = {
    id?: SortOrder
    description?: SortOrder
    cost?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type OfferingSumOrderByAggregateInput = {
    cost?: SortOrder
    quantity?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserCreatenotificationsInput = {
    set: string[]
  }

  export type JobCreateNestedManyWithoutHirerInput = {
    create?: XOR<JobCreateWithoutHirerInput, JobUncheckedCreateWithoutHirerInput> | JobCreateWithoutHirerInput[] | JobUncheckedCreateWithoutHirerInput[]
    connectOrCreate?: JobCreateOrConnectWithoutHirerInput | JobCreateOrConnectWithoutHirerInput[]
    createMany?: JobCreateManyHirerInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type JobCreateNestedManyWithoutWorkerInput = {
    create?: XOR<JobCreateWithoutWorkerInput, JobUncheckedCreateWithoutWorkerInput> | JobCreateWithoutWorkerInput[] | JobUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: JobCreateOrConnectWithoutWorkerInput | JobCreateOrConnectWithoutWorkerInput[]
    createMany?: JobCreateManyWorkerInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type OfferingCreateNestedManyWithoutOwnerInput = {
    create?: XOR<OfferingCreateWithoutOwnerInput, OfferingUncheckedCreateWithoutOwnerInput> | OfferingCreateWithoutOwnerInput[] | OfferingUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OfferingCreateOrConnectWithoutOwnerInput | OfferingCreateOrConnectWithoutOwnerInput[]
    createMany?: OfferingCreateManyOwnerInputEnvelope
    connect?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
  }

  export type RatingCreateNestedManyWithoutFromInput = {
    create?: XOR<RatingCreateWithoutFromInput, RatingUncheckedCreateWithoutFromInput> | RatingCreateWithoutFromInput[] | RatingUncheckedCreateWithoutFromInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutFromInput | RatingCreateOrConnectWithoutFromInput[]
    createMany?: RatingCreateManyFromInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type RatingCreateNestedManyWithoutToInput = {
    create?: XOR<RatingCreateWithoutToInput, RatingUncheckedCreateWithoutToInput> | RatingCreateWithoutToInput[] | RatingUncheckedCreateWithoutToInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutToInput | RatingCreateOrConnectWithoutToInput[]
    createMany?: RatingCreateManyToInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type JobCreateNestedManyWithoutApplicationsInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput> | JobCreateWithoutApplicationsInput[] | JobUncheckedCreateWithoutApplicationsInput[]
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput | JobCreateOrConnectWithoutApplicationsInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutHirerInput = {
    create?: XOR<JobCreateWithoutHirerInput, JobUncheckedCreateWithoutHirerInput> | JobCreateWithoutHirerInput[] | JobUncheckedCreateWithoutHirerInput[]
    connectOrCreate?: JobCreateOrConnectWithoutHirerInput | JobCreateOrConnectWithoutHirerInput[]
    createMany?: JobCreateManyHirerInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutWorkerInput = {
    create?: XOR<JobCreateWithoutWorkerInput, JobUncheckedCreateWithoutWorkerInput> | JobCreateWithoutWorkerInput[] | JobUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: JobCreateOrConnectWithoutWorkerInput | JobCreateOrConnectWithoutWorkerInput[]
    createMany?: JobCreateManyWorkerInputEnvelope
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type OfferingUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<OfferingCreateWithoutOwnerInput, OfferingUncheckedCreateWithoutOwnerInput> | OfferingCreateWithoutOwnerInput[] | OfferingUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OfferingCreateOrConnectWithoutOwnerInput | OfferingCreateOrConnectWithoutOwnerInput[]
    createMany?: OfferingCreateManyOwnerInputEnvelope
    connect?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutFromInput = {
    create?: XOR<RatingCreateWithoutFromInput, RatingUncheckedCreateWithoutFromInput> | RatingCreateWithoutFromInput[] | RatingUncheckedCreateWithoutFromInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutFromInput | RatingCreateOrConnectWithoutFromInput[]
    createMany?: RatingCreateManyFromInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutToInput = {
    create?: XOR<RatingCreateWithoutToInput, RatingUncheckedCreateWithoutToInput> | RatingCreateWithoutToInput[] | RatingUncheckedCreateWithoutToInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutToInput | RatingCreateOrConnectWithoutToInput[]
    createMany?: RatingCreateManyToInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type JobUncheckedCreateNestedManyWithoutApplicationsInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput> | JobCreateWithoutApplicationsInput[] | JobUncheckedCreateWithoutApplicationsInput[]
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput | JobCreateOrConnectWithoutApplicationsInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdatenotificationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type JobUpdateManyWithoutHirerNestedInput = {
    create?: XOR<JobCreateWithoutHirerInput, JobUncheckedCreateWithoutHirerInput> | JobCreateWithoutHirerInput[] | JobUncheckedCreateWithoutHirerInput[]
    connectOrCreate?: JobCreateOrConnectWithoutHirerInput | JobCreateOrConnectWithoutHirerInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutHirerInput | JobUpsertWithWhereUniqueWithoutHirerInput[]
    createMany?: JobCreateManyHirerInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutHirerInput | JobUpdateWithWhereUniqueWithoutHirerInput[]
    updateMany?: JobUpdateManyWithWhereWithoutHirerInput | JobUpdateManyWithWhereWithoutHirerInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type JobUpdateManyWithoutWorkerNestedInput = {
    create?: XOR<JobCreateWithoutWorkerInput, JobUncheckedCreateWithoutWorkerInput> | JobCreateWithoutWorkerInput[] | JobUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: JobCreateOrConnectWithoutWorkerInput | JobCreateOrConnectWithoutWorkerInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutWorkerInput | JobUpsertWithWhereUniqueWithoutWorkerInput[]
    createMany?: JobCreateManyWorkerInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutWorkerInput | JobUpdateWithWhereUniqueWithoutWorkerInput[]
    updateMany?: JobUpdateManyWithWhereWithoutWorkerInput | JobUpdateManyWithWhereWithoutWorkerInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type OfferingUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<OfferingCreateWithoutOwnerInput, OfferingUncheckedCreateWithoutOwnerInput> | OfferingCreateWithoutOwnerInput[] | OfferingUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OfferingCreateOrConnectWithoutOwnerInput | OfferingCreateOrConnectWithoutOwnerInput[]
    upsert?: OfferingUpsertWithWhereUniqueWithoutOwnerInput | OfferingUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: OfferingCreateManyOwnerInputEnvelope
    set?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
    disconnect?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
    delete?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
    connect?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
    update?: OfferingUpdateWithWhereUniqueWithoutOwnerInput | OfferingUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: OfferingUpdateManyWithWhereWithoutOwnerInput | OfferingUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: OfferingScalarWhereInput | OfferingScalarWhereInput[]
  }

  export type RatingUpdateManyWithoutFromNestedInput = {
    create?: XOR<RatingCreateWithoutFromInput, RatingUncheckedCreateWithoutFromInput> | RatingCreateWithoutFromInput[] | RatingUncheckedCreateWithoutFromInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutFromInput | RatingCreateOrConnectWithoutFromInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutFromInput | RatingUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: RatingCreateManyFromInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutFromInput | RatingUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutFromInput | RatingUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type RatingUpdateManyWithoutToNestedInput = {
    create?: XOR<RatingCreateWithoutToInput, RatingUncheckedCreateWithoutToInput> | RatingCreateWithoutToInput[] | RatingUncheckedCreateWithoutToInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutToInput | RatingCreateOrConnectWithoutToInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutToInput | RatingUpsertWithWhereUniqueWithoutToInput[]
    createMany?: RatingCreateManyToInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutToInput | RatingUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutToInput | RatingUpdateManyWithWhereWithoutToInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type JobUpdateManyWithoutApplicationsNestedInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput> | JobCreateWithoutApplicationsInput[] | JobUncheckedCreateWithoutApplicationsInput[]
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput | JobCreateOrConnectWithoutApplicationsInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutApplicationsInput | JobUpsertWithWhereUniqueWithoutApplicationsInput[]
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutApplicationsInput | JobUpdateWithWhereUniqueWithoutApplicationsInput[]
    updateMany?: JobUpdateManyWithWhereWithoutApplicationsInput | JobUpdateManyWithWhereWithoutApplicationsInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutHirerNestedInput = {
    create?: XOR<JobCreateWithoutHirerInput, JobUncheckedCreateWithoutHirerInput> | JobCreateWithoutHirerInput[] | JobUncheckedCreateWithoutHirerInput[]
    connectOrCreate?: JobCreateOrConnectWithoutHirerInput | JobCreateOrConnectWithoutHirerInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutHirerInput | JobUpsertWithWhereUniqueWithoutHirerInput[]
    createMany?: JobCreateManyHirerInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutHirerInput | JobUpdateWithWhereUniqueWithoutHirerInput[]
    updateMany?: JobUpdateManyWithWhereWithoutHirerInput | JobUpdateManyWithWhereWithoutHirerInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutWorkerNestedInput = {
    create?: XOR<JobCreateWithoutWorkerInput, JobUncheckedCreateWithoutWorkerInput> | JobCreateWithoutWorkerInput[] | JobUncheckedCreateWithoutWorkerInput[]
    connectOrCreate?: JobCreateOrConnectWithoutWorkerInput | JobCreateOrConnectWithoutWorkerInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutWorkerInput | JobUpsertWithWhereUniqueWithoutWorkerInput[]
    createMany?: JobCreateManyWorkerInputEnvelope
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutWorkerInput | JobUpdateWithWhereUniqueWithoutWorkerInput[]
    updateMany?: JobUpdateManyWithWhereWithoutWorkerInput | JobUpdateManyWithWhereWithoutWorkerInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type OfferingUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<OfferingCreateWithoutOwnerInput, OfferingUncheckedCreateWithoutOwnerInput> | OfferingCreateWithoutOwnerInput[] | OfferingUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OfferingCreateOrConnectWithoutOwnerInput | OfferingCreateOrConnectWithoutOwnerInput[]
    upsert?: OfferingUpsertWithWhereUniqueWithoutOwnerInput | OfferingUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: OfferingCreateManyOwnerInputEnvelope
    set?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
    disconnect?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
    delete?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
    connect?: OfferingWhereUniqueInput | OfferingWhereUniqueInput[]
    update?: OfferingUpdateWithWhereUniqueWithoutOwnerInput | OfferingUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: OfferingUpdateManyWithWhereWithoutOwnerInput | OfferingUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: OfferingScalarWhereInput | OfferingScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutFromNestedInput = {
    create?: XOR<RatingCreateWithoutFromInput, RatingUncheckedCreateWithoutFromInput> | RatingCreateWithoutFromInput[] | RatingUncheckedCreateWithoutFromInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutFromInput | RatingCreateOrConnectWithoutFromInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutFromInput | RatingUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: RatingCreateManyFromInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutFromInput | RatingUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutFromInput | RatingUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutToNestedInput = {
    create?: XOR<RatingCreateWithoutToInput, RatingUncheckedCreateWithoutToInput> | RatingCreateWithoutToInput[] | RatingUncheckedCreateWithoutToInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutToInput | RatingCreateOrConnectWithoutToInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutToInput | RatingUpsertWithWhereUniqueWithoutToInput[]
    createMany?: RatingCreateManyToInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutToInput | RatingUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutToInput | RatingUpdateManyWithWhereWithoutToInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type JobUncheckedUpdateManyWithoutApplicationsNestedInput = {
    create?: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput> | JobCreateWithoutApplicationsInput[] | JobUncheckedCreateWithoutApplicationsInput[]
    connectOrCreate?: JobCreateOrConnectWithoutApplicationsInput | JobCreateOrConnectWithoutApplicationsInput[]
    upsert?: JobUpsertWithWhereUniqueWithoutApplicationsInput | JobUpsertWithWhereUniqueWithoutApplicationsInput[]
    set?: JobWhereUniqueInput | JobWhereUniqueInput[]
    disconnect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    delete?: JobWhereUniqueInput | JobWhereUniqueInput[]
    connect?: JobWhereUniqueInput | JobWhereUniqueInput[]
    update?: JobUpdateWithWhereUniqueWithoutApplicationsInput | JobUpdateWithWhereUniqueWithoutApplicationsInput[]
    updateMany?: JobUpdateManyWithWhereWithoutApplicationsInput | JobUpdateManyWithWhereWithoutApplicationsInput[]
    deleteMany?: JobScalarWhereInput | JobScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutJobsCreatedInput = {
    create?: XOR<UserCreateWithoutJobsCreatedInput, UserUncheckedCreateWithoutJobsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutJobsWorkingInput = {
    create?: XOR<UserCreateWithoutJobsWorkingInput, UserUncheckedCreateWithoutJobsWorkingInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsWorkingInput
    connect?: UserWhereUniqueInput
  }

  export type RatingCreateNestedManyWithoutJobInput = {
    create?: XOR<RatingCreateWithoutJobInput, RatingUncheckedCreateWithoutJobInput> | RatingCreateWithoutJobInput[] | RatingUncheckedCreateWithoutJobInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutJobInput | RatingCreateOrConnectWithoutJobInput[]
    createMany?: RatingCreateManyJobInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutApplicationsInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput> | UserCreateWithoutApplicationsInput[] | UserUncheckedCreateWithoutApplicationsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput | UserCreateOrConnectWithoutApplicationsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type RatingUncheckedCreateNestedManyWithoutJobInput = {
    create?: XOR<RatingCreateWithoutJobInput, RatingUncheckedCreateWithoutJobInput> | RatingCreateWithoutJobInput[] | RatingUncheckedCreateWithoutJobInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutJobInput | RatingCreateOrConnectWithoutJobInput[]
    createMany?: RatingCreateManyJobInputEnvelope
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutApplicationsInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput> | UserCreateWithoutApplicationsInput[] | UserUncheckedCreateWithoutApplicationsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput | UserCreateOrConnectWithoutApplicationsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EnumJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.JobStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutJobsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutJobsCreatedInput, UserUncheckedCreateWithoutJobsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsCreatedInput
    upsert?: UserUpsertWithoutJobsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJobsCreatedInput, UserUpdateWithoutJobsCreatedInput>, UserUncheckedUpdateWithoutJobsCreatedInput>
  }

  export type UserUpdateOneWithoutJobsWorkingNestedInput = {
    create?: XOR<UserCreateWithoutJobsWorkingInput, UserUncheckedCreateWithoutJobsWorkingInput>
    connectOrCreate?: UserCreateOrConnectWithoutJobsWorkingInput
    upsert?: UserUpsertWithoutJobsWorkingInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJobsWorkingInput, UserUpdateWithoutJobsWorkingInput>, UserUncheckedUpdateWithoutJobsWorkingInput>
  }

  export type RatingUpdateManyWithoutJobNestedInput = {
    create?: XOR<RatingCreateWithoutJobInput, RatingUncheckedCreateWithoutJobInput> | RatingCreateWithoutJobInput[] | RatingUncheckedCreateWithoutJobInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutJobInput | RatingCreateOrConnectWithoutJobInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutJobInput | RatingUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: RatingCreateManyJobInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutJobInput | RatingUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutJobInput | RatingUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type UserUpdateManyWithoutApplicationsNestedInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput> | UserCreateWithoutApplicationsInput[] | UserUncheckedCreateWithoutApplicationsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput | UserCreateOrConnectWithoutApplicationsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutApplicationsInput | UserUpsertWithWhereUniqueWithoutApplicationsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutApplicationsInput | UserUpdateWithWhereUniqueWithoutApplicationsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutApplicationsInput | UserUpdateManyWithWhereWithoutApplicationsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RatingUncheckedUpdateManyWithoutJobNestedInput = {
    create?: XOR<RatingCreateWithoutJobInput, RatingUncheckedCreateWithoutJobInput> | RatingCreateWithoutJobInput[] | RatingUncheckedCreateWithoutJobInput[]
    connectOrCreate?: RatingCreateOrConnectWithoutJobInput | RatingCreateOrConnectWithoutJobInput[]
    upsert?: RatingUpsertWithWhereUniqueWithoutJobInput | RatingUpsertWithWhereUniqueWithoutJobInput[]
    createMany?: RatingCreateManyJobInputEnvelope
    set?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    disconnect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    delete?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    connect?: RatingWhereUniqueInput | RatingWhereUniqueInput[]
    update?: RatingUpdateWithWhereUniqueWithoutJobInput | RatingUpdateWithWhereUniqueWithoutJobInput[]
    updateMany?: RatingUpdateManyWithWhereWithoutJobInput | RatingUpdateManyWithWhereWithoutJobInput[]
    deleteMany?: RatingScalarWhereInput | RatingScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutApplicationsNestedInput = {
    create?: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput> | UserCreateWithoutApplicationsInput[] | UserUncheckedCreateWithoutApplicationsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutApplicationsInput | UserCreateOrConnectWithoutApplicationsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutApplicationsInput | UserUpsertWithWhereUniqueWithoutApplicationsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutApplicationsInput | UserUpdateWithWhereUniqueWithoutApplicationsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutApplicationsInput | UserUpdateManyWithWhereWithoutApplicationsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRatingFromInput = {
    create?: XOR<UserCreateWithoutRatingFromInput, UserUncheckedCreateWithoutRatingFromInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingFromInput
    connect?: UserWhereUniqueInput
  }

  export type JobCreateNestedOneWithoutRatingsInput = {
    create?: XOR<JobCreateWithoutRatingsInput, JobUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: JobCreateOrConnectWithoutRatingsInput
    connect?: JobWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRatingToInput = {
    create?: XOR<UserCreateWithoutRatingToInput, UserUncheckedCreateWithoutRatingToInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingToInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRatingTypeFieldUpdateOperationsInput = {
    set?: $Enums.RatingType
  }

  export type UserUpdateOneRequiredWithoutRatingFromNestedInput = {
    create?: XOR<UserCreateWithoutRatingFromInput, UserUncheckedCreateWithoutRatingFromInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingFromInput
    upsert?: UserUpsertWithoutRatingFromInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRatingFromInput, UserUpdateWithoutRatingFromInput>, UserUncheckedUpdateWithoutRatingFromInput>
  }

  export type JobUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: XOR<JobCreateWithoutRatingsInput, JobUncheckedCreateWithoutRatingsInput>
    connectOrCreate?: JobCreateOrConnectWithoutRatingsInput
    upsert?: JobUpsertWithoutRatingsInput
    connect?: JobWhereUniqueInput
    update?: XOR<XOR<JobUpdateToOneWithWhereWithoutRatingsInput, JobUpdateWithoutRatingsInput>, JobUncheckedUpdateWithoutRatingsInput>
  }

  export type UserUpdateOneRequiredWithoutRatingToNestedInput = {
    create?: XOR<UserCreateWithoutRatingToInput, UserUncheckedCreateWithoutRatingToInput>
    connectOrCreate?: UserCreateOrConnectWithoutRatingToInput
    upsert?: UserUpsertWithoutRatingToInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRatingToInput, UserUpdateWithoutRatingToInput>, UserUncheckedUpdateWithoutRatingToInput>
  }

  export type UserCreateNestedOneWithoutOfferingsInput = {
    create?: XOR<UserCreateWithoutOfferingsInput, UserUncheckedCreateWithoutOfferingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOfferingsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutOfferingsNestedInput = {
    create?: XOR<UserCreateWithoutOfferingsInput, UserUncheckedCreateWithoutOfferingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOfferingsInput
    upsert?: UserUpsertWithoutOfferingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOfferingsInput, UserUpdateWithoutOfferingsInput>, UserUncheckedUpdateWithoutOfferingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumJobStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusFilter<$PrismaModel> | $Enums.JobStatus
  }

  export type NestedEnumJobStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.JobStatus | EnumJobStatusFieldRefInput<$PrismaModel>
    in?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.JobStatus[] | ListEnumJobStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumJobStatusWithAggregatesFilter<$PrismaModel> | $Enums.JobStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumJobStatusFilter<$PrismaModel>
    _max?: NestedEnumJobStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumRatingTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.RatingType | EnumRatingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RatingType[] | ListEnumRatingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RatingType[] | ListEnumRatingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRatingTypeFilter<$PrismaModel> | $Enums.RatingType
  }

  export type NestedEnumRatingTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RatingType | EnumRatingTypeFieldRefInput<$PrismaModel>
    in?: $Enums.RatingType[] | ListEnumRatingTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.RatingType[] | ListEnumRatingTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumRatingTypeWithAggregatesFilter<$PrismaModel> | $Enums.RatingType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRatingTypeFilter<$PrismaModel>
    _max?: NestedEnumRatingTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type JobCreateWithoutHirerInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    worker?: UserCreateNestedOneWithoutJobsWorkingInput
    ratings?: RatingCreateNestedManyWithoutJobInput
    applications?: UserCreateNestedManyWithoutApplicationsInput
  }

  export type JobUncheckedCreateWithoutHirerInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    workerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    ratings?: RatingUncheckedCreateNestedManyWithoutJobInput
    applications?: UserUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type JobCreateOrConnectWithoutHirerInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutHirerInput, JobUncheckedCreateWithoutHirerInput>
  }

  export type JobCreateManyHirerInputEnvelope = {
    data: JobCreateManyHirerInput | JobCreateManyHirerInput[]
    skipDuplicates?: boolean
  }

  export type JobCreateWithoutWorkerInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    hirer: UserCreateNestedOneWithoutJobsCreatedInput
    ratings?: RatingCreateNestedManyWithoutJobInput
    applications?: UserCreateNestedManyWithoutApplicationsInput
  }

  export type JobUncheckedCreateWithoutWorkerInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    hirerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    ratings?: RatingUncheckedCreateNestedManyWithoutJobInput
    applications?: UserUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type JobCreateOrConnectWithoutWorkerInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutWorkerInput, JobUncheckedCreateWithoutWorkerInput>
  }

  export type JobCreateManyWorkerInputEnvelope = {
    data: JobCreateManyWorkerInput | JobCreateManyWorkerInput[]
    skipDuplicates?: boolean
  }

  export type OfferingCreateWithoutOwnerInput = {
    id?: string
    description: string
    cost: number
    quantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferingUncheckedCreateWithoutOwnerInput = {
    id?: string
    description: string
    cost: number
    quantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OfferingCreateOrConnectWithoutOwnerInput = {
    where: OfferingWhereUniqueInput
    create: XOR<OfferingCreateWithoutOwnerInput, OfferingUncheckedCreateWithoutOwnerInput>
  }

  export type OfferingCreateManyOwnerInputEnvelope = {
    data: OfferingCreateManyOwnerInput | OfferingCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type RatingCreateWithoutFromInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    createdAt?: Date | string
    updatedAt?: Date | string
    job: JobCreateNestedOneWithoutRatingsInput
    to: UserCreateNestedOneWithoutRatingToInput
  }

  export type RatingUncheckedCreateWithoutFromInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    toId: string
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutFromInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutFromInput, RatingUncheckedCreateWithoutFromInput>
  }

  export type RatingCreateManyFromInputEnvelope = {
    data: RatingCreateManyFromInput | RatingCreateManyFromInput[]
    skipDuplicates?: boolean
  }

  export type RatingCreateWithoutToInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    createdAt?: Date | string
    updatedAt?: Date | string
    from: UserCreateNestedOneWithoutRatingFromInput
    job: JobCreateNestedOneWithoutRatingsInput
  }

  export type RatingUncheckedCreateWithoutToInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    fromId: string
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutToInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutToInput, RatingUncheckedCreateWithoutToInput>
  }

  export type RatingCreateManyToInputEnvelope = {
    data: RatingCreateManyToInput | RatingCreateManyToInput[]
    skipDuplicates?: boolean
  }

  export type JobCreateWithoutApplicationsInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    hirer: UserCreateNestedOneWithoutJobsCreatedInput
    worker?: UserCreateNestedOneWithoutJobsWorkingInput
    ratings?: RatingCreateNestedManyWithoutJobInput
  }

  export type JobUncheckedCreateWithoutApplicationsInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    hirerId: string
    workerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    ratings?: RatingUncheckedCreateNestedManyWithoutJobInput
  }

  export type JobCreateOrConnectWithoutApplicationsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
  }

  export type JobUpsertWithWhereUniqueWithoutHirerInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutHirerInput, JobUncheckedUpdateWithoutHirerInput>
    create: XOR<JobCreateWithoutHirerInput, JobUncheckedCreateWithoutHirerInput>
  }

  export type JobUpdateWithWhereUniqueWithoutHirerInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutHirerInput, JobUncheckedUpdateWithoutHirerInput>
  }

  export type JobUpdateManyWithWhereWithoutHirerInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutHirerInput>
  }

  export type JobScalarWhereInput = {
    AND?: JobScalarWhereInput | JobScalarWhereInput[]
    OR?: JobScalarWhereInput[]
    NOT?: JobScalarWhereInput | JobScalarWhereInput[]
    id?: StringFilter<"Job"> | string
    title?: StringFilter<"Job"> | string
    description?: StringFilter<"Job"> | string
    location?: StringFilter<"Job"> | string
    status?: EnumJobStatusFilter<"Job"> | $Enums.JobStatus
    hirerId?: StringFilter<"Job"> | string
    workerId?: StringNullableFilter<"Job"> | string | null
    createdAt?: DateTimeFilter<"Job"> | Date | string
    updatedAt?: DateTimeFilter<"Job"> | Date | string
    payment?: IntFilter<"Job"> | number
  }

  export type JobUpsertWithWhereUniqueWithoutWorkerInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutWorkerInput, JobUncheckedUpdateWithoutWorkerInput>
    create: XOR<JobCreateWithoutWorkerInput, JobUncheckedCreateWithoutWorkerInput>
  }

  export type JobUpdateWithWhereUniqueWithoutWorkerInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutWorkerInput, JobUncheckedUpdateWithoutWorkerInput>
  }

  export type JobUpdateManyWithWhereWithoutWorkerInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutWorkerInput>
  }

  export type OfferingUpsertWithWhereUniqueWithoutOwnerInput = {
    where: OfferingWhereUniqueInput
    update: XOR<OfferingUpdateWithoutOwnerInput, OfferingUncheckedUpdateWithoutOwnerInput>
    create: XOR<OfferingCreateWithoutOwnerInput, OfferingUncheckedCreateWithoutOwnerInput>
  }

  export type OfferingUpdateWithWhereUniqueWithoutOwnerInput = {
    where: OfferingWhereUniqueInput
    data: XOR<OfferingUpdateWithoutOwnerInput, OfferingUncheckedUpdateWithoutOwnerInput>
  }

  export type OfferingUpdateManyWithWhereWithoutOwnerInput = {
    where: OfferingScalarWhereInput
    data: XOR<OfferingUpdateManyMutationInput, OfferingUncheckedUpdateManyWithoutOwnerInput>
  }

  export type OfferingScalarWhereInput = {
    AND?: OfferingScalarWhereInput | OfferingScalarWhereInput[]
    OR?: OfferingScalarWhereInput[]
    NOT?: OfferingScalarWhereInput | OfferingScalarWhereInput[]
    id?: StringFilter<"Offering"> | string
    description?: StringFilter<"Offering"> | string
    cost?: IntFilter<"Offering"> | number
    quantity?: IntNullableFilter<"Offering"> | number | null
    createdAt?: DateTimeFilter<"Offering"> | Date | string
    updatedAt?: DateTimeFilter<"Offering"> | Date | string
    userId?: StringFilter<"Offering"> | string
  }

  export type RatingUpsertWithWhereUniqueWithoutFromInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutFromInput, RatingUncheckedUpdateWithoutFromInput>
    create: XOR<RatingCreateWithoutFromInput, RatingUncheckedCreateWithoutFromInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutFromInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutFromInput, RatingUncheckedUpdateWithoutFromInput>
  }

  export type RatingUpdateManyWithWhereWithoutFromInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutFromInput>
  }

  export type RatingScalarWhereInput = {
    AND?: RatingScalarWhereInput | RatingScalarWhereInput[]
    OR?: RatingScalarWhereInput[]
    NOT?: RatingScalarWhereInput | RatingScalarWhereInput[]
    id?: StringFilter<"Rating"> | string
    value?: IntFilter<"Rating"> | number
    text?: StringNullableFilter<"Rating"> | string | null
    type?: EnumRatingTypeFilter<"Rating"> | $Enums.RatingType
    fromId?: StringFilter<"Rating"> | string
    toId?: StringFilter<"Rating"> | string
    jobId?: StringFilter<"Rating"> | string
    createdAt?: DateTimeFilter<"Rating"> | Date | string
    updatedAt?: DateTimeFilter<"Rating"> | Date | string
  }

  export type RatingUpsertWithWhereUniqueWithoutToInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutToInput, RatingUncheckedUpdateWithoutToInput>
    create: XOR<RatingCreateWithoutToInput, RatingUncheckedCreateWithoutToInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutToInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutToInput, RatingUncheckedUpdateWithoutToInput>
  }

  export type RatingUpdateManyWithWhereWithoutToInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutToInput>
  }

  export type JobUpsertWithWhereUniqueWithoutApplicationsInput = {
    where: JobWhereUniqueInput
    update: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
    create: XOR<JobCreateWithoutApplicationsInput, JobUncheckedCreateWithoutApplicationsInput>
  }

  export type JobUpdateWithWhereUniqueWithoutApplicationsInput = {
    where: JobWhereUniqueInput
    data: XOR<JobUpdateWithoutApplicationsInput, JobUncheckedUpdateWithoutApplicationsInput>
  }

  export type JobUpdateManyWithWhereWithoutApplicationsInput = {
    where: JobScalarWhereInput
    data: XOR<JobUpdateManyMutationInput, JobUncheckedUpdateManyWithoutApplicationsInput>
  }

  export type UserCreateWithoutJobsCreatedInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsWorking?: JobCreateNestedManyWithoutWorkerInput
    offerings?: OfferingCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingCreateNestedManyWithoutFromInput
    ratingTo?: RatingCreateNestedManyWithoutToInput
    applications?: JobCreateNestedManyWithoutApplicationsInput
  }

  export type UserUncheckedCreateWithoutJobsCreatedInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsWorking?: JobUncheckedCreateNestedManyWithoutWorkerInput
    offerings?: OfferingUncheckedCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingUncheckedCreateNestedManyWithoutFromInput
    ratingTo?: RatingUncheckedCreateNestedManyWithoutToInput
    applications?: JobUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type UserCreateOrConnectWithoutJobsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobsCreatedInput, UserUncheckedCreateWithoutJobsCreatedInput>
  }

  export type UserCreateWithoutJobsWorkingInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobCreateNestedManyWithoutHirerInput
    offerings?: OfferingCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingCreateNestedManyWithoutFromInput
    ratingTo?: RatingCreateNestedManyWithoutToInput
    applications?: JobCreateNestedManyWithoutApplicationsInput
  }

  export type UserUncheckedCreateWithoutJobsWorkingInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobUncheckedCreateNestedManyWithoutHirerInput
    offerings?: OfferingUncheckedCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingUncheckedCreateNestedManyWithoutFromInput
    ratingTo?: RatingUncheckedCreateNestedManyWithoutToInput
    applications?: JobUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type UserCreateOrConnectWithoutJobsWorkingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJobsWorkingInput, UserUncheckedCreateWithoutJobsWorkingInput>
  }

  export type RatingCreateWithoutJobInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    createdAt?: Date | string
    updatedAt?: Date | string
    from: UserCreateNestedOneWithoutRatingFromInput
    to: UserCreateNestedOneWithoutRatingToInput
  }

  export type RatingUncheckedCreateWithoutJobInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    fromId: string
    toId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingCreateOrConnectWithoutJobInput = {
    where: RatingWhereUniqueInput
    create: XOR<RatingCreateWithoutJobInput, RatingUncheckedCreateWithoutJobInput>
  }

  export type RatingCreateManyJobInputEnvelope = {
    data: RatingCreateManyJobInput | RatingCreateManyJobInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutApplicationsInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobCreateNestedManyWithoutHirerInput
    jobsWorking?: JobCreateNestedManyWithoutWorkerInput
    offerings?: OfferingCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingCreateNestedManyWithoutFromInput
    ratingTo?: RatingCreateNestedManyWithoutToInput
  }

  export type UserUncheckedCreateWithoutApplicationsInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobUncheckedCreateNestedManyWithoutHirerInput
    jobsWorking?: JobUncheckedCreateNestedManyWithoutWorkerInput
    offerings?: OfferingUncheckedCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingUncheckedCreateNestedManyWithoutFromInput
    ratingTo?: RatingUncheckedCreateNestedManyWithoutToInput
  }

  export type UserCreateOrConnectWithoutApplicationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
  }

  export type UserUpsertWithoutJobsCreatedInput = {
    update: XOR<UserUpdateWithoutJobsCreatedInput, UserUncheckedUpdateWithoutJobsCreatedInput>
    create: XOR<UserCreateWithoutJobsCreatedInput, UserUncheckedCreateWithoutJobsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJobsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJobsCreatedInput, UserUncheckedUpdateWithoutJobsCreatedInput>
  }

  export type UserUpdateWithoutJobsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsWorking?: JobUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUpdateManyWithoutToNestedInput
    applications?: JobUpdateManyWithoutApplicationsNestedInput
  }

  export type UserUncheckedUpdateWithoutJobsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsWorking?: JobUncheckedUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUncheckedUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUncheckedUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUncheckedUpdateManyWithoutToNestedInput
    applications?: JobUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type UserUpsertWithoutJobsWorkingInput = {
    update: XOR<UserUpdateWithoutJobsWorkingInput, UserUncheckedUpdateWithoutJobsWorkingInput>
    create: XOR<UserCreateWithoutJobsWorkingInput, UserUncheckedCreateWithoutJobsWorkingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJobsWorkingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJobsWorkingInput, UserUncheckedUpdateWithoutJobsWorkingInput>
  }

  export type UserUpdateWithoutJobsWorkingInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUpdateManyWithoutHirerNestedInput
    offerings?: OfferingUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUpdateManyWithoutToNestedInput
    applications?: JobUpdateManyWithoutApplicationsNestedInput
  }

  export type UserUncheckedUpdateWithoutJobsWorkingInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUncheckedUpdateManyWithoutHirerNestedInput
    offerings?: OfferingUncheckedUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUncheckedUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUncheckedUpdateManyWithoutToNestedInput
    applications?: JobUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type RatingUpsertWithWhereUniqueWithoutJobInput = {
    where: RatingWhereUniqueInput
    update: XOR<RatingUpdateWithoutJobInput, RatingUncheckedUpdateWithoutJobInput>
    create: XOR<RatingCreateWithoutJobInput, RatingUncheckedCreateWithoutJobInput>
  }

  export type RatingUpdateWithWhereUniqueWithoutJobInput = {
    where: RatingWhereUniqueInput
    data: XOR<RatingUpdateWithoutJobInput, RatingUncheckedUpdateWithoutJobInput>
  }

  export type RatingUpdateManyWithWhereWithoutJobInput = {
    where: RatingScalarWhereInput
    data: XOR<RatingUpdateManyMutationInput, RatingUncheckedUpdateManyWithoutJobInput>
  }

  export type UserUpsertWithWhereUniqueWithoutApplicationsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
    create: XOR<UserCreateWithoutApplicationsInput, UserUncheckedCreateWithoutApplicationsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutApplicationsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutApplicationsInput, UserUncheckedUpdateWithoutApplicationsInput>
  }

  export type UserUpdateManyWithWhereWithoutApplicationsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutApplicationsInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    contactInfo?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    newNotifications?: BoolFilter<"User"> | boolean
    notifications?: StringNullableListFilter<"User">
    role?: StringFilter<"User"> | string
  }

  export type UserCreateWithoutRatingFromInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobCreateNestedManyWithoutHirerInput
    jobsWorking?: JobCreateNestedManyWithoutWorkerInput
    offerings?: OfferingCreateNestedManyWithoutOwnerInput
    ratingTo?: RatingCreateNestedManyWithoutToInput
    applications?: JobCreateNestedManyWithoutApplicationsInput
  }

  export type UserUncheckedCreateWithoutRatingFromInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobUncheckedCreateNestedManyWithoutHirerInput
    jobsWorking?: JobUncheckedCreateNestedManyWithoutWorkerInput
    offerings?: OfferingUncheckedCreateNestedManyWithoutOwnerInput
    ratingTo?: RatingUncheckedCreateNestedManyWithoutToInput
    applications?: JobUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type UserCreateOrConnectWithoutRatingFromInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRatingFromInput, UserUncheckedCreateWithoutRatingFromInput>
  }

  export type JobCreateWithoutRatingsInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    hirer: UserCreateNestedOneWithoutJobsCreatedInput
    worker?: UserCreateNestedOneWithoutJobsWorkingInput
    applications?: UserCreateNestedManyWithoutApplicationsInput
  }

  export type JobUncheckedCreateWithoutRatingsInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    hirerId: string
    workerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
    applications?: UserUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type JobCreateOrConnectWithoutRatingsInput = {
    where: JobWhereUniqueInput
    create: XOR<JobCreateWithoutRatingsInput, JobUncheckedCreateWithoutRatingsInput>
  }

  export type UserCreateWithoutRatingToInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobCreateNestedManyWithoutHirerInput
    jobsWorking?: JobCreateNestedManyWithoutWorkerInput
    offerings?: OfferingCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingCreateNestedManyWithoutFromInput
    applications?: JobCreateNestedManyWithoutApplicationsInput
  }

  export type UserUncheckedCreateWithoutRatingToInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobUncheckedCreateNestedManyWithoutHirerInput
    jobsWorking?: JobUncheckedCreateNestedManyWithoutWorkerInput
    offerings?: OfferingUncheckedCreateNestedManyWithoutOwnerInput
    ratingFrom?: RatingUncheckedCreateNestedManyWithoutFromInput
    applications?: JobUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type UserCreateOrConnectWithoutRatingToInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRatingToInput, UserUncheckedCreateWithoutRatingToInput>
  }

  export type UserUpsertWithoutRatingFromInput = {
    update: XOR<UserUpdateWithoutRatingFromInput, UserUncheckedUpdateWithoutRatingFromInput>
    create: XOR<UserCreateWithoutRatingFromInput, UserUncheckedCreateWithoutRatingFromInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRatingFromInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRatingFromInput, UserUncheckedUpdateWithoutRatingFromInput>
  }

  export type UserUpdateWithoutRatingFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUpdateManyWithoutOwnerNestedInput
    ratingTo?: RatingUpdateManyWithoutToNestedInput
    applications?: JobUpdateManyWithoutApplicationsNestedInput
  }

  export type UserUncheckedUpdateWithoutRatingFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUncheckedUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUncheckedUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUncheckedUpdateManyWithoutOwnerNestedInput
    ratingTo?: RatingUncheckedUpdateManyWithoutToNestedInput
    applications?: JobUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type JobUpsertWithoutRatingsInput = {
    update: XOR<JobUpdateWithoutRatingsInput, JobUncheckedUpdateWithoutRatingsInput>
    create: XOR<JobCreateWithoutRatingsInput, JobUncheckedCreateWithoutRatingsInput>
    where?: JobWhereInput
  }

  export type JobUpdateToOneWithWhereWithoutRatingsInput = {
    where?: JobWhereInput
    data: XOR<JobUpdateWithoutRatingsInput, JobUncheckedUpdateWithoutRatingsInput>
  }

  export type JobUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    hirer?: UserUpdateOneRequiredWithoutJobsCreatedNestedInput
    worker?: UserUpdateOneWithoutJobsWorkingNestedInput
    applications?: UserUpdateManyWithoutApplicationsNestedInput
  }

  export type JobUncheckedUpdateWithoutRatingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    hirerId?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    applications?: UserUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type UserUpsertWithoutRatingToInput = {
    update: XOR<UserUpdateWithoutRatingToInput, UserUncheckedUpdateWithoutRatingToInput>
    create: XOR<UserCreateWithoutRatingToInput, UserUncheckedCreateWithoutRatingToInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRatingToInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRatingToInput, UserUncheckedUpdateWithoutRatingToInput>
  }

  export type UserUpdateWithoutRatingToInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUpdateManyWithoutFromNestedInput
    applications?: JobUpdateManyWithoutApplicationsNestedInput
  }

  export type UserUncheckedUpdateWithoutRatingToInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUncheckedUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUncheckedUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUncheckedUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUncheckedUpdateManyWithoutFromNestedInput
    applications?: JobUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type UserCreateWithoutOfferingsInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobCreateNestedManyWithoutHirerInput
    jobsWorking?: JobCreateNestedManyWithoutWorkerInput
    ratingFrom?: RatingCreateNestedManyWithoutFromInput
    ratingTo?: RatingCreateNestedManyWithoutToInput
    applications?: JobCreateNestedManyWithoutApplicationsInput
  }

  export type UserUncheckedCreateWithoutOfferingsInput = {
    id: string
    email: string
    name: string
    contactInfo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    newNotifications?: boolean
    notifications?: UserCreatenotificationsInput | string[]
    role: string
    jobsCreated?: JobUncheckedCreateNestedManyWithoutHirerInput
    jobsWorking?: JobUncheckedCreateNestedManyWithoutWorkerInput
    ratingFrom?: RatingUncheckedCreateNestedManyWithoutFromInput
    ratingTo?: RatingUncheckedCreateNestedManyWithoutToInput
    applications?: JobUncheckedCreateNestedManyWithoutApplicationsInput
  }

  export type UserCreateOrConnectWithoutOfferingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOfferingsInput, UserUncheckedCreateWithoutOfferingsInput>
  }

  export type UserUpsertWithoutOfferingsInput = {
    update: XOR<UserUpdateWithoutOfferingsInput, UserUncheckedUpdateWithoutOfferingsInput>
    create: XOR<UserCreateWithoutOfferingsInput, UserUncheckedCreateWithoutOfferingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOfferingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOfferingsInput, UserUncheckedUpdateWithoutOfferingsInput>
  }

  export type UserUpdateWithoutOfferingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUpdateManyWithoutWorkerNestedInput
    ratingFrom?: RatingUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUpdateManyWithoutToNestedInput
    applications?: JobUpdateManyWithoutApplicationsNestedInput
  }

  export type UserUncheckedUpdateWithoutOfferingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUncheckedUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUncheckedUpdateManyWithoutWorkerNestedInput
    ratingFrom?: RatingUncheckedUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUncheckedUpdateManyWithoutToNestedInput
    applications?: JobUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type JobCreateManyHirerInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    workerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
  }

  export type JobCreateManyWorkerInput = {
    id?: string
    title: string
    description: string
    location: string
    status?: $Enums.JobStatus
    hirerId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    payment: number
  }

  export type OfferingCreateManyOwnerInput = {
    id?: string
    description: string
    cost: number
    quantity?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingCreateManyFromInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    toId: string
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingCreateManyToInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    fromId: string
    jobId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JobUpdateWithoutHirerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    worker?: UserUpdateOneWithoutJobsWorkingNestedInput
    ratings?: RatingUpdateManyWithoutJobNestedInput
    applications?: UserUpdateManyWithoutApplicationsNestedInput
  }

  export type JobUncheckedUpdateWithoutHirerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    ratings?: RatingUncheckedUpdateManyWithoutJobNestedInput
    applications?: UserUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type JobUncheckedUpdateManyWithoutHirerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
  }

  export type JobUpdateWithoutWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    hirer?: UserUpdateOneRequiredWithoutJobsCreatedNestedInput
    ratings?: RatingUpdateManyWithoutJobNestedInput
    applications?: UserUpdateManyWithoutApplicationsNestedInput
  }

  export type JobUncheckedUpdateWithoutWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    hirerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    ratings?: RatingUncheckedUpdateManyWithoutJobNestedInput
    applications?: UserUncheckedUpdateManyWithoutApplicationsNestedInput
  }

  export type JobUncheckedUpdateManyWithoutWorkerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    hirerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
  }

  export type OfferingUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: IntFieldUpdateOperationsInput | number
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferingUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: IntFieldUpdateOperationsInput | number
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OfferingUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    cost?: IntFieldUpdateOperationsInput | number
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUpdateWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    job?: JobUpdateOneRequiredWithoutRatingsNestedInput
    to?: UserUpdateOneRequiredWithoutRatingToNestedInput
  }

  export type RatingUncheckedUpdateWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    toId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutFromInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    toId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUpdateWithoutToInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: UserUpdateOneRequiredWithoutRatingFromNestedInput
    job?: JobUpdateOneRequiredWithoutRatingsNestedInput
  }

  export type RatingUncheckedUpdateWithoutToInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    fromId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutToInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    fromId?: StringFieldUpdateOperationsInput | string
    jobId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JobUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    hirer?: UserUpdateOneRequiredWithoutJobsCreatedNestedInput
    worker?: UserUpdateOneWithoutJobsWorkingNestedInput
    ratings?: RatingUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    hirerId?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
    ratings?: RatingUncheckedUpdateManyWithoutJobNestedInput
  }

  export type JobUncheckedUpdateManyWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    status?: EnumJobStatusFieldUpdateOperationsInput | $Enums.JobStatus
    hirerId?: StringFieldUpdateOperationsInput | string
    workerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payment?: IntFieldUpdateOperationsInput | number
  }

  export type RatingCreateManyJobInput = {
    id?: string
    value: number
    text?: string | null
    type: $Enums.RatingType
    fromId: string
    toId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RatingUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: UserUpdateOneRequiredWithoutRatingFromNestedInput
    to?: UserUpdateOneRequiredWithoutRatingToNestedInput
  }

  export type RatingUncheckedUpdateWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RatingUncheckedUpdateManyWithoutJobInput = {
    id?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    text?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumRatingTypeFieldUpdateOperationsInput | $Enums.RatingType
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUpdateManyWithoutToNestedInput
  }

  export type UserUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
    jobsCreated?: JobUncheckedUpdateManyWithoutHirerNestedInput
    jobsWorking?: JobUncheckedUpdateManyWithoutWorkerNestedInput
    offerings?: OfferingUncheckedUpdateManyWithoutOwnerNestedInput
    ratingFrom?: RatingUncheckedUpdateManyWithoutFromNestedInput
    ratingTo?: RatingUncheckedUpdateManyWithoutToNestedInput
  }

  export type UserUncheckedUpdateManyWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactInfo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    newNotifications?: BoolFieldUpdateOperationsInput | boolean
    notifications?: UserUpdatenotificationsInput | string[]
    role?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}