declare namespace fsync {
    class FloatMath {
    }
}
declare namespace fsync {
    class FloatMatrix {
    }
}
declare namespace fsync.math {
    function randomRange(min: number, max: number): number;
    function bezier3(C1: number, C2: number, C3: number, C4: number, t: number): number;
    function bezier2(C1: number, C2: number, C3: number, t: number): number;
    function bezier2Vec3(out: fsync.Vector3, vin: fsync.Vector3, C1: number, C2: number, C3: number): void;
    function minByAbs(v1: number, v2: number): number;
    /**
     * 2次贝塞尔曲线参数
     */
    type BezierParams2 = {
        /**
         * 贝塞尔参数
         */
        C1: number;
        C2: number;
        C3: number;
        /**
         * 基础倍率
         */
        speed: number;
    };
    /**
     * 转换为脉冲信号
     * @param th
     */
    const getSign: (th: number) => number;
    /**
     * 计算最小等价角度
     * @param angle
     */
    const calcMinAngle: (angle: number) => number;
}
declare namespace fsync {
    class Rect {
        x: number;
        y: number;
        width: number;
        height: number;
        static containPoint(rect: Rect, pt: IVector): bool;
        static limitPointSelf(rect: Rect, pt: IVector): void;
    }
}
declare namespace fsync {
    interface IVector extends IClone {
        getBinData(): number[];
    }
    function toDegree(a: number): number;
    class NumberArray {
        static lenSQ(ns: number[]): number;
        static len(ns: number[]): number;
        /**
         * 覆盖
         * @param out
         * @param ns2
         */
        static merge(out: number[], ns2: number[]): number[];
        /**
         * 最小合并
         * @param ns1
         * @param ns2
         */
        static collect(ns1: number[], ns2: number[]): number[];
        static normalizeSelf(n1: number[]): number[];
        static transEulerToQuaternion(ns4: number[], ns3: number[]): number[];
        static transQuaternionToEuler(ns3: number[], ns4: number[], outerZ?: boolean): number[];
        /**
         * @zh 四元数乘法
         */
        static multiplyQuaternion(out: number[], a: number[], b: number[]): number[];
    }
    class Vector3 {
        protected data: number[];
        static zero: Vector3;
        static fromNumArray(ns: number[]): Vector3;
        clone(): Vector3;
        constructor(value?: number);
        getBinData(): number[];
        setBinData(data: number[]): void;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get z(): number;
        set z(value: number);
    }
    class Vector4 {
        protected data: number[];
        static fromNumArray(ns: number[]): Vector4;
        clone(): Vector4;
        constructor(value?: number);
        getBinData(): number[];
        setBinData(data: number[]): void;
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get z(): number;
        set z(value: number);
        get w(): number;
        set w(value: number);
    }
    class Vector {
        protected static _fromNumArray3(ns: number[]): Vector3;
        protected static _fromNumArray4(ns: number[]): Vector4;
        static distanceSQ(vec1: IVector, vec2: IVector): number;
        static distance(vec1: IVector, vec2: IVector): number;
        static subDown<T extends IVector>(vec1: T, vec2: T): T;
        static addUp<T extends IVector>(vec1: T, vec2: T): T;
        static multUp<T extends IVector>(vec1: T, vec2: T): T;
        static multUpVar<T extends IVector>(vec1: T, v: number): T;
        static multVar<T extends IVector>(vec1: T, v: number): T;
        static normalizeSelf<T extends IVector>(vec: T): T;
        static len<T extends IVector>(vec: T): number;
        /**
         * 覆盖
         * @param out
         * @param vec2
         */
        static merge<T extends IVector>(out: T, vec2: T): T;
        /**
         * 最小合并
         * @param vec1
         * @param vec2
         */
        static collect<T extends IVector>(vec1: T, vec2: T): T;
        static transEulerToQuaternion(quat: Vector4, vec3: Vector3): Vector4;
        static transQuaternionToEuler(vec3: Vector3, quat: Vector4, outerZ?: boolean): Vector3;
        static multiplyQuaternion(out: Vector4, a: Vector4, b: Vector4): Vector4;
        static resetValues(vec: IVector, value?: number): IVector;
        /**
         * 3维叉乘
         * @param b
         * @param a
         */
        static crossBy3(b: Vector3, a: Vector3): Vector3;
        static dot(b: Vector3, a: Vector3): number;
    }
}
declare namespace lang.helper {
    class ArrayHelper {
        static max<T>(ls: T[], call: (e: T) => number): T | undefined;
        static min<T>(ls: T[], call: (e: T) => number): T | undefined;
    }
}
declare namespace fsync {
    /**
     * Any compatible Long instance.
     * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
     */
    interface Long {
        /** Low bits */
        low: number;
        /** High bits */
        high: number;
        /** Whether unsigned or not */
        unsigned: boolean;
        toNumber(): number;
    }
    type int = number;
    type int32 = number;
    type int64 = number;
    type uint32 = number;
    type uint64 = number;
    type uint = number;
    type float32 = number;
    type float64 = number;
    type char = string;
    type bool = boolean;
    type TTimeStamp = int64;
    class LongHelper {
        static toNumber(n: Long | number): number;
    }
}
declare namespace fsync {
    class BufferHelper {
        static concatUint8Array(ls: Uint8Array[]): Uint8Array;
        static from(str: string, encoding?: any): Uint8Array;
    }
}
declare namespace fsync {
    let supportClassProguard: bool;
    const detectClassProguard: (name: string, cls: new () => object) => void;
    const setSupportClassProguard: (support: bool) => void;
    /**
     * 自定义类名反射
     * @param name
     */
    function cname(name: string): <T>(cls: new () => T) => new () => T;
    /**
     * 自动录入唯一类名
     */
    function cid<T>(cls: new () => T): new () => T;
}
declare namespace fsync {
    function assert<T>(cond: T, tip: string): T;
    function assert_true<T>(cond: T): T;
    function assert_equal(a: any, b: any): void;
    function shall_crash(f: Function): void;
    class TestHelper {
        static UNMATCHED_RESULT: string;
    }
    function testfunc(target: object, propName: string): any;
    function test_entry(desc: string, fun: () => void): void;
}
declare namespace fsync {
    interface IClone {
        clone(): IClone;
    }
}
declare namespace fsync {
    interface IMerge<T> {
        mergeFrom(rand: T): any;
    }
}
declare namespace fsync {
    class Intervals {
        static readonly inst: Intervals;
        intervals: any[];
        timeouts: any[];
        sw: {
            on: boolean;
        };
        init(): this;
        setInterval(call: Function, duration: number): void;
        clearAllInterval(): void;
        setTimeout(call: Function, duration: number): void;
        clearAllTimeout(): void;
        clearAllTimer(): void;
    }
}
declare namespace fsync {
    const EmptyTable: () => {};
    class ObjectUtils {
        static copyDataDeep<T extends object>(source: T, target: T): T;
    }
}
declare namespace fsync {
    /**
     * 反转 MyPromise
     * - 外部调用 success时相当于调用了 resolve
     * - 外部调用 fail 时，相当于调用了 reject
     * @param T - resolve 参数类型
     * @param F - reject 参数类型
     */
    class YmPromise<T, F = any> {
        /**
         * @noSelf
         */
        success: Function;
        /**
         * @noSelf
         */
        fail: Function;
        promise: Promise<T>;
        constructor(params?: any);
        protected init(params?: any): void;
    }
    class RPromise<T, F = any> extends YmPromise<T, F> {
        /**
        * @noSelf
        */
        success: (value: T) => void;
        /**
        * @noSelf
        */
        fail: (value?: F) => void;
    }
}
declare namespace slib {
    type EventHandler<T> = (message: T) => void;
    class SimpleEvent<T> {
        protected _callbacks: EventHandler<T>[];
        on(callback: EventHandler<T>): void;
        off(callback: EventHandler<T>): void;
        emit(value: T): void;
    }
    interface ISEventInput<T> {
        emit(key: string, value: T): any;
    }
    interface ISEventOutput<T> {
        on(key: string, callback: EventHandler<T>): any;
        off(key: string, callback: EventHandler<T>): any;
    }
    class SEvent<T> implements ISEventInput<T>, ISEventOutput<T> {
        protected _events: {
            [key: string]: SimpleEvent<T>;
        };
        on(key: string, callback: EventHandler<T>): void;
        off(key: string, callback: EventHandler<T>): void;
        emit(key: string, value: T): void;
    }
}
declare namespace fsync {
    function IsArrayEqual(arr1: number[], arr2: number[]): boolean;
}
declare namespace fsync {
    type ComponentID = string;
    type ComponentType = string;
    class ComponentHelper {
        static getIdentity(comp: IComponent): ComponentID;
        static getType(comp: IComponent): ComponentType;
        static isTypeOf(comp: IComponent, cls: new () => IComponent): boolean;
    }
    /**
     * 所有 Component 需要实现 IComponent。
     * Component 的所有成员必须是基本类型或者实现 IClone 接口的对象，否则数据回滚会报错。
     * Component 不能用 `__ecs_cid` 或者 `__ecs_ctype` 来命名成员
     */
    interface IComponent {
    }
    type TClass<T> = new () => T;
    type TComponent = new () => fsync.IComponent;
}
declare namespace fsync {
}
declare namespace fsync {
    const copyECSComponetAttrValue: <T>(data: T) => T;
    function DecoECSComponent(comp: IComponent, dirtyManager: EntityDirtyManager, uidTool: UniqueIDTool): void;
    function CloneECSComponet(comp: IComponent, dirtyManager: EntityDirtyManager): IComponent;
}
declare namespace fsync {
    type EntityProtoID = number;
    type EntityID = string;
    const defaultEntityID: EntityID;
    class Entity {
        protected eid: EntityID;
        get identity(): EntityID;
        clone(): Entity;
    }
}
declare namespace fsync {
    class FrameSyncUtils {
        random: FrameSyncRandom;
        timer: Timer;
        uidTool: UniqueIDTool;
        init(): this;
    }
}
declare namespace fsync {
    type BasicTypes = string | number;
    type STMap<T> = {
        [key: string]: T;
    };
    /**
     * 所有Entity 存储区域
     */
    class EntitiesContainer {
        entityComponentMap: {
            [key: string]: {
                [key: string]: bool;
            };
        };
        entityProtoMap: {
            [key: string]: {
                [key: string]: bool;
            };
        };
        componentEntityMap: {
            [key: string]: EntityID;
        };
        entityMap: {
            [key: string]: Entity;
        };
        componentMap: {
            [key: string]: IComponent;
        };
        init(): this;
        updateEntityProto(entity: Entity): void;
        addComponent(entity: Entity, comp: IComponent): void;
        removeComponentByType(entity: Entity, t: ComponentType): IComponent;
        removeComponentsByType(entity: Entity, t: ComponentType): void;
        protected _removeComponent(entity: Entity, comp: IComponent): void;
        removeComponent(entity: Entity, comp: IComponent): void;
        removeComponents(entity: Entity, comps: IComponent[]): void;
        removeAllComponents(entity: Entity): void;
        addEntity(entity: Entity): void;
        getEntityById(entityId: EntityID): Entity;
        removeEntity(entity: Entity): void;
        getComponentById(entity: Entity, compId: string): IComponent;
        getComponent(entity: Entity, componentType: ComponentType): IComponent;
        getEntityCount(): number;
        getComponentOwnerEntity(comp: IComponent): Entity;
        getComponents(entity: Entity): IComponent[];
        getComponentsWithComponent(entity: Entity, t: new () => IComponent): IComponent[];
        forEachEntities(componentTypes: ComponentType[], call: (entity: Entity) => void | bool): void;
        existsEntity(entity: Entity): bool;
        clearEntities(): void;
    }
    class EntityDirtyManager {
        protected dirtyComps: IComponent[];
        protected dirtyEntities: STMap<Entity>;
        init(): this;
        isEntityDirty(entity: Entity): bool;
        isComponentDirty(comp: IComponent): bool;
        markComponentDirty(comp: IComponent): void;
        markEntityDirty(entity: Entity): void;
        sortDirtyEntities(entityManager: EntityManager): void;
        forEachDirtyEntities(call: (entity: Entity) => void): void;
        clearFlags(): void;
    }
    class EntityManager {
        name: string;
        dirtyManager: EntityDirtyManager;
        entityContainer: EntitiesContainer;
        utils: FrameSyncUtils;
        identity: string;
        constructor();
        init(utils: FrameSyncUtils): void;
        createQuery(): EntityQuery;
        createEntity(tcomps: (new () => IComponent)[]): Entity;
        protected decoComponent(entity: Entity, comp: IComponent): void;
        getEntityById(entityId: EntityID): Entity;
        addComponent<T extends IComponent = IComponent>(entity: Entity, tcomp: new () => T): T;
        attachComponent<T extends IComponent = IComponent>(entity: Entity, comp: T): T;
        addComponents(entity: Entity, tcomps: (new () => IComponent)[]): IComponent[];
        attachComponents<T extends IComponent = IComponent>(entity: Entity, comps: T[]): T[];
        dettachComponent<T extends IComponent = IComponent>(entity: Entity, comp: T): T;
        dettachComponents<T extends IComponent = IComponent>(entity: Entity, comps: T[]): T[];
        removeComponent<T extends IComponent = IComponent>(entity: Entity, t: new () => T): T;
        removeComponents<T extends IComponent = IComponent>(entity: Entity, t: new () => T): void;
        removeEntity(entity: Entity): void;
        isValidEntity(entity: Entity): bool;
        existsEntity(entity: Entity): bool;
        /**
         * 是否相同实体
         * @param entity1
         * @param entity2
         */
        isSameEntity(entity1: Entity, entity2: Entity): bool;
        /**
         * 是否相同实体
         * @param entity1
         * @param entity2
         */
        isSameEntitySafe(entity1: Entity, entity2: Entity): bool;
        addEntity(entity: Entity): void;
        getComponents<T extends IComponent = IComponent>(entity: Entity, t?: new () => IComponent): T[];
        getComponentById<T extends IComponent = IComponent>(entity: Entity, compId: string): T;
        getComponentByType<T extends IComponent = IComponent>(entity: Entity, componentType: string): T;
        getComponent<T extends IComponent = IComponent>(entity: Entity, t: new () => T): T;
        existComponent<T extends IComponent = IComponent>(entity: Entity, t: new () => T): bool;
        getEntityCount(): number;
        getComponentOwnerEntity(comp: IComponent): Entity;
        cloneEntity(entity: Entity, targetManager: EntityManager): Entity;
        overwriteEntity(entity: Entity, targetManager: EntityManager): void;
        clearEntities(): void;
    }
}
declare namespace fsync {
    interface IEntityQuery {
        forEach(call: (entity: Entity) => void): EntityQuery;
        toArray(): Entity[];
        first(): Entity;
        count(): number;
    }
    class EntityQuery implements IEntityQuery {
        entityManager: EntityManager;
        componentTypes: ComponentType[];
        init(entityManager: EntityManager): EntityQuery;
        with(componentType: ComponentType | (new () => IComponent)): EntityQuery;
        forEach(call: (entity: Entity) => void): EntityQuery;
        forEachWithComps(call: (entity: Entity, ...comps: fsync.IComponent[]) => void): EntityQuery;
        toArray(): Entity[];
        first(): Entity;
        count(): number;
    }
}
declare namespace fsync {
    class FrameSyncRandom implements IMerge<FrameSyncRandom> {
        protected seed: number;
        protected inc: number;
        init(): this;
        setRandSeed(seed: number): void;
        rand(): number;
        mergeFrom(rand: FrameSyncRandom): void;
    }
}
declare namespace fsync {
    type ECSCommandFunc<T> = (...args: T[]) => void;
    type ECSCommand<T = any> = {
        call: ECSCommandFunc<T>;
        paras: T[];
    };
    class ECSCommandBuffer {
        protected calls: ECSCommand[];
        init(): this;
        addCommond<T>(call: ECSCommandFunc<T>, ...paras: T[]): void;
        run(): void;
        clearCommonds(): void;
    }
    class SystemBase implements IUpdater {
        world: ECSWorld;
        protected _commondBuffer: ECSCommandBuffer;
        ctype: string;
        get timer(): fsync.Timer | undefined;
        init(): this;
        instantiate(prefab: IPrefab): Entity;
        getCommandBuffer(): ECSCommandBuffer;
        protected get entityManager(): EntityManager;
        /**
         * 所有操作必须一帧内完成，不能有遗留闭包，否则会出现无法彻底覆写世界的问题
         */
        update(): void;
        onBeforeUpdate(): void;
        onAfterUpdate(): void;
    }
}
declare namespace fsync {
    class UpdaterGroup implements IUpdater {
        updaters: IUpdater[];
        init(): void;
        addUpdater(update: IUpdater): void;
        onBeforeUpdate(): void;
        update(): void;
        onAfterUpdate(): void;
    }
    class UpdaterGroupManager implements IUpdater {
        updaters: {
            [key: string]: UpdaterGroup;
        };
        updateOrder: string[];
        init(): void;
        getUpdaterGroup(groupName: string): UpdaterGroup;
        addUpdaterGroup(groupName: string, group: UpdaterGroup): void;
        setGroupUpdateOrder(updateOrder: string[]): void;
        protected updateByOrder(call: (updater: UpdaterGroup) => void): void;
        onBeforeUpdate(): void;
        update(): void;
        onAfterUpdate(): void;
    }
}
declare namespace fsync {
    class ECSWorld {
        name: string;
        env: WorldEnv;
        entityManager: EntityManager;
        utils: FrameSyncUtils;
        prefabEnv: PrefabEnv;
        frameCount: number;
        init(utils?: FrameSyncUtils): this;
        mergeFrom(world: ECSWorld): void;
    }
}
declare namespace fsync {
    class WorldEnv {
        init(): this;
    }
}
declare namespace fsync {
}
declare namespace fsync {
    interface IOverwritable {
        rewrite(d: IOverwritable): bool;
    }
}
declare namespace fsync {
    interface IUpdater {
        onBeforeUpdate(): void;
        update(): void;
        onAfterUpdate(): void;
    }
}
declare namespace fsync {
    class NetDelay {
        netDelayAcc: number;
        netDelayQueue: number[];
        maxSampleCount: number;
        putDelay(delay: number): void;
        getDelayAv(): number;
    }
}
declare namespace fsync {
    interface IPrefabHelper {
        init(): any;
        instantiate(prefab: IPrefab, depsEnv: PrefabEnv): Entity;
    }
    class PrefabHelper implements IPrefabHelper {
        init(): this;
        instantiate(prefab: IPrefab, depsEnv: PrefabEnv): Entity;
    }
    class PrefabHelperWithoutView implements IPrefabHelper {
        init(): this;
        instantiate(prefab: IPrefab, depsEnv: PrefabEnv): Entity;
    }
}
declare namespace fsync {
    class Timer implements IMerge<Timer> {
        protected _curTimeRecord: TTimeStamp;
        protected _curTime: TTimeStamp;
        protected _deltaTime: TTimeStamp;
        protected _maxTime: TTimeStamp;
        init(): void;
        /**
         * 获取当前时间戳
         */
        getTime(): TTimeStamp;
        updateTime(time: TTimeStamp): void;
        setTime(time: TTimeStamp): void;
        get deltaTime(): TTimeStamp;
        mergeFrom(timer: Timer): void;
        setMaxDeltaTime(dt: TTimeStamp): void;
    }
}
declare namespace fsync {
    class UniqueIDTool implements IOverwritable, IMerge<UniqueIDTool> {
        init(): this;
        rewrite(d: UniqueIDTool): bool;
        protected typeMap: {
            [key: string]: int;
        };
        genTypedId(t: string): string;
        mergeFrom(tool: UniqueIDTool): void;
    }
}
declare namespace fsync {
    class Updater implements IUpdater {
        updaters: IUpdater[];
        init(): void;
        onBeforeUpdate(): void;
        update(): void;
        onAfterUpdate(): void;
    }
}
declare namespace fsync {
    class Translation implements IComponent {
        value: Vector3;
    }
    class Scale implements IComponent {
        value: Vector3;
    }
    class Rotation implements IComponent {
        value: Vector4;
    }
}
declare namespace fsync {
    class Device {
        get pixelRatio(): number;
        clientSize: Vector3;
        get clientRect(): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        userEventHandlers: ((data: string) => void)[];
        init(): this;
    }
    const device: Device;
}
declare namespace fsync {
    class Platform {
        isBrowser: boolean;
        init(): this;
    }
    const platform: Platform;
}
declare namespace fsync {
    type UserInputData = {
        action: "onsetup" | "updateclientsize" | "onkeydown" | "onkeyup" | "onmousemove" | "onmousedown" | "onmouseup" | "ontouchmove" | "ontouchstart" | "ontouchend";
        event: {
            clientX?: number;
            clientY?: number;
            keyCode?: number;
            key?: string;
            touches?: {
                identifier: number;
                clientX?: number;
                clientY?: number;
            }[];
        };
        clientSize: {
            width: number;
            height: number;
        };
    };
    type UserInputHandler = (data: UserInputData) => void;
    class UserInput {
        static readonly inst: UserInput;
        protected eventHandlerMap: {
            [key: string]: UserInputHandler;
        };
        protected eventHandler: (data: string) => void;
        enable: boolean;
        get clientSize(): Vector3;
        init(): this;
        addHandler(name: string, handler: UserInputHandler): void;
    }
}
declare namespace fsync {
    class ColliderCastInput {
        target: Entity;
        query: IEntityQuery;
        entityManager: EntityManager;
    }
    class RayCastInput {
        target: Entity;
        query: IEntityQuery;
        entityManager: EntityManager;
        beginPoint: Vector3;
        endPoint: Vector3;
    }
    class CollisionHelper {
        castTargetColliders2D(input: ColliderCastInput, call: (entity1: Entity, entity2: Entity) => any): void;
        castTargetWithRay(input: RayCastInput, call: (entity1: Entity, entity2: Entity) => any): void;
    }
    const collisionHelper: CollisionHelper;
}
declare namespace fsync {
    type DefaultShapeType = "circle" | "rectangle";
    class Shape implements IComponent {
        shapeType: DefaultShapeType;
        radius: number;
    }
}
declare namespace fsync {
    type PrefabId = string;
    class PrefabMeta {
        prefabId: PrefabId;
        init(prefabId: PrefabId): this;
    }
    /**
     * prefab实例化环境
     */
    class PrefabEnv {
        entityManager: EntityManager;
        viewBinder: ViewBindManager;
        prefabHelper: IPrefabHelper;
        utils: FrameSyncUtils;
        init(world: ECSWorld, viewBinder: ViewBindManager, prefabHelper: IPrefabHelper): this;
        instantiate(prefab: IPrefab): Entity;
    }
    interface IPrefab {
        init(): IPrefab;
        load(): IPrefab;
        createEntity(depsEnv: PrefabEnv): Entity;
        getPrefabMeta(): PrefabMeta;
        create(depsEnv: PrefabEnv): Entity;
    }
}
declare namespace fsync {
    class PrefabBase implements IPrefab {
        init(): IPrefab;
        load(): IPrefab;
        create(depsEnv: PrefabEnv): Entity;
        getPrefabMeta(): PrefabMeta;
        createEntity(depsEnv: PrefabEnv): Entity;
    }
}
declare namespace fsync {
    class PrefabManager {
        static readonly inst: PrefabManager;
        prefabMap: {
            [key: string]: IPrefab;
        };
        init(): this;
        loadPrefab(prefabClz: new () => IPrefab): IPrefab;
        prefabViewMap: {
            [key: string]: new () => IView;
        };
        registerPrefabView(key: string, view: new () => IView): void;
        getPrefabView(key: string): new () => IView;
    }
}
declare namespace fsync {
    class ScenePrefab extends PrefabBase {
        depsEnv: PrefabEnv;
        get prefabMananger(): PrefabManager;
        get entityManager(): EntityManager;
        setEnv(depsEnv: PrefabEnv): void;
        instantiate<T extends IPrefab>(prefab: T): Entity;
        instantiateEntity<T extends IPrefab>(prefab: T): Entity;
        createEntity(depsEnv: PrefabEnv): Entity;
    }
}
declare namespace fsync {
}
declare namespace fsync {
    type InputCmdId = string;
    type IGameInputCmd = {
        /**
         * 命令类型
         */
        cmdType: "RoleCmd" | "Pass";
        cmdId: InputCmdId;
        /**
         * 创建顺序，保证命令执行顺序
         */
        cmdIndex: number;
        /**
         * 该命令是否需要触发同步
         * - 默认false
         */
        needSync?: bool;
        route: "net" | "local";
        roleId: TRoleId;
        createTime: number;
        /**
         * 生成类型：
         *  con：连续
         *  sep：离散
         */
        genType?: "con" | "sep";
        createFrameCount?: number;
        frameCount?: number;
        receivedTime?: number;
        /**
         * 网络波动造成命令帧重叠
         */
        isSurge?: bool;
    };
}
declare namespace fsync {
    class SinglePortCmdBuffer implements IMerge<SinglePortCmdBuffer> {
        name: string;
        roleId: TRoleId;
        protected cmds: IGameInputCmd[];
        protected cmdReorderQueue: CmdReorderQueue;
        protected curFrameCount: number;
        protected curOutdateCmdIndex: number;
        /**
         * 当前命令执行进度
         */
        curCmdIndex: number;
        init(roleId: TRoleId): this;
        protected latestNetCmd: IGameInputCmd;
        getLatestNetCmd(): IGameInputCmd;
        getLatestLocalCmd(): IGameInputCmd;
        putCmd(cmd: IGameInputCmd): void;
        protected flushNetCmds(): void;
        protected _putCmd(cmd: IGameInputCmd): void;
        popFrameCmds(frameCount: number, pops: IGameInputCmd[]): IGameInputCmd[];
        /**
         * 处理网络波动造成的挤帧，避免因此造成的跳帧
         * - 没有特殊情况，每帧都只发送一个帧命令包
         * - pops 已按 cmdIndex 递增排序，如果出现 (cmdIndex0 < cmdIndex1 && frameCount0 >= frameCount1)，则判定 cmdIndex1 对应的 cmd 为重叠帧
         * - 如果出现了挤帧，那么客户端代替服务端进行丢帧（仅仅标记为重合帧，但是不直接删除，由业务处理）
         */
        curNetFrameCount: number;
        /**
         * 粘帧次数
         */
        surgeTimes: number;
        /**
         * 允许最大粘帧次数
         */
        allowSurgeTimesMax: number;
        processFrameCmdsSurge(cmd: IGameInputCmd): void;
        /**
         * 清理过期的指令
         */
        protected cleanOutdateCmds(): void;
        mergeFrom(cmdBuffer: SinglePortCmdBuffer): void;
        syncLocalCmd(): void;
    }
    class InputCmdBuffer implements IMerge<InputCmdBuffer> {
        name: string;
        route: "net" | "local";
        protected cmdBuffers: {
            [key: string]: SinglePortCmdBuffer;
        };
        protected latestLocalCmd: IGameInputCmd;
        getLatestLocalCmd(): IGameInputCmd;
        protected latestUserCmd: IGameInputCmd;
        getLatestUserCmd(): IGameInputCmd;
        protected latestNetCmd: IGameInputCmd;
        getLatestNetCmd(): IGameInputCmd;
        protected getCmdBuffer(roleId: TRoleId): SinglePortCmdBuffer;
        putCmd(cmd: IGameInputCmd): void;
        needSync: boolean;
        popFrameCmds(frameCount: number): IGameInputCmd[];
        mergeFrom(cmdBuffer: InputCmdBuffer): void;
        syncLocalCmd(): void;
    }
}
declare namespace fsync {
    class LocalInputPost {
        handler: (cmd: IGameInputCmd) => void;
        localCmdBuffer: InputCmdBuffer;
        needSync: boolean;
        inMorePredict: boolean;
        morePredictTime: number;
        protected curMPFC: number;
        protected lastPFC: number;
        protected netDelayAcc: number;
        protected netDelayCount: number;
        post(cmd: IGameInputCmd): void;
    }
}
declare namespace fsync {
    class CmdReorderQueue {
        protected curCmdIndex: number;
        protected cmds: IGameInputCmd[];
        init(): this;
        protected dirty: bool;
        put(cmd: IGameInputCmd): void;
        sort(): void;
        pop(): IGameInputCmd;
    }
    class NetworkCmdTranslator {
        textDecorder: TextDecoder;
        translate(message: roomserver.TReqBroadCastFrameSyncReq): IGameInputCmd;
    }
}
/**
 * 客户端UI工具
 */
declare namespace kitten {
    /**
     * 手势分析
     */
    namespace guesture { }
    /**
     * 游戏手柄
     */
    namespace gamepad { }
    /**
     * ui事件
     */
    namespace uievent { }
    /**
     * rpg输入
     */
    namespace rpg { }
}
declare namespace kitten.gamepad {
    type Vector3 = fsync.Vector3;
    const Vector3: typeof fsync.Vector3;
    type Rect = fsync.Rect;
    const Rect: typeof fsync.Rect;
    /**
     * 环状摇杆
     */
    export class CircleStick {
        /**
         * 是否启用
         */
        protected enable: boolean;
        /**
         * 控制器id
         */
        identity: string;
        /**
         * 控制器轴心位置
         */
        protected ctrlPos: Vector3;
        /**
         * 获取触控范围中心店
         */
        getCtrlCenterPos(): fsync.Vector3;
        /**
         * 控制器状态
         */
        ctrlStatus: StickCtrlState;
        init(id: string): this;
        /**
         * 设置主视图
         * @param pos
         */
        setPos(pos: Vector3): void;
        /**
         * 触控半径
         */
        protected circleRadius: number;
        /**
         * 设置触控半径
         * @param radius
         */
        setCircleRadius(radius: number): void;
        /**
         * 获取触控半径
         * @param radius
         */
        getCircleRadius(): number;
        /**
         * 获取触控范围
         */
        protected getCtrlRange(): Rect;
        /**
         * 处理触控输入
         * @param data
         */
        handlerInput(data: kitten.uievent.UserInputData): boolean;
        /**
         * 触摸状态map
         */
        protected multiTouchMap: {
            [id: string]: string;
        };
        /**
         * 检测虚拟手柄输入
         * @param data
         */
        protected detectVirtualCirleInput(data: kitten.uievent.UserInputData): boolean;
    }
    export {};
}
declare namespace kitten.gamepad {
    /**
     * 基础控制器视图
     */
    class CircleStickView {
        /**
         * 对应控制器ID
         */
        ctrlId: string;
        protected circleView: graph.ISprite;
        init(): this;
        setupView(ctrl: CircleStick, color: string): void;
    }
}
declare namespace kitten.gamepad {
    /**
     * 主技能摇杆
     */
    class MainSkillStick extends CircleStick {
        handlerInput(data: kitten.uievent.UserInputData): boolean;
        /**
         * 检测鼠标控制技能方向
         * @param data
         */
        protected detectSkillRollInput(data: kitten.uievent.UserInputData): boolean;
    }
}
declare namespace kitten.gamepad {
    /**
     * 移动摇杆
     */
    class MoveStick extends CircleStick {
        handlerInput(data: kitten.uievent.UserInputData): boolean;
        protected pressingKeys: {
            [key: string]: boolean;
        };
        protected updateKeyboardInputStatus(): void;
        /**
         * 检测键盘输入控制
         * @param data
         */
        protected detectKeyboardMoveInput(data: kitten.uievent.UserInputData): boolean;
    }
}
declare namespace kitten.gamepad {
    /**
     * 虚拟游戏手柄
     * - 虚拟设备
     */
    class NormalGamepad {
        protected enable: boolean;
        /**
         * 左手控制器
         */
        get leftStick(): MoveStick;
        /**
         * 左手控制器状态
         */
        get leftStickStatus(): StickCtrlState;
        /**
         * 右手控制器
         */
        get rightStick(): MainSkillStick;
        /**
         * 右手控制器状态
         */
        get rightStickStatus(): StickCtrlState;
        /**
         * 摇杆列表
         */
        virutalCtrls: CircleStick[];
        init(): this;
        /**
         * 触控调试视图列表
         */
        protected virtualCtrlViews: CircleStickView[];
        /**
         * 创建调试视图
         */
        setupSimpleView(): void;
        /**
         * 处理各类输入
         * @param data
         */
        handlerInput(data: kitten.uievent.UserInputData): boolean;
    }
}
declare namespace kitten.gamepad {
    type Vector3 = fsync.Vector3;
    const Vector3: typeof fsync.Vector3;
    /**
     * 摇杆状态
     */
    export class StickCtrlState {
        dir: Vector3;
        strength: number;
        pressed: boolean;
    }
    export {};
}
declare namespace kitten.guesture {
    type TouchPoint = fsync.Vector3;
    const TouchPoint: typeof fsync.Vector3;
    class ContinuoursIdTool {
        _idAcc: number;
        _idMap: {
            [key: string]: number;
        };
        /**
         * 转化为可连续的id
         * @param id
         */
        mapToContinuousId(id: string): number;
    }
    class TouchPointQueue {
        clearPoints(): void;
        /**
         * 触摸点列表，[0]表示最新存入的点
         */
        protected points: TouchPoint[];
        init(): this;
        /**
         * 存入最新的触摸点
         * @param point
         */
        unshift(point: TouchPoint): void;
        /**
         * 是否处于触摸状态
         */
        touching: boolean;
        /**
         * 触摸点ID
         */
        touchId: number;
        /**
         * 触摸点列表，[0]表示最新存入的点
         * @param num
         */
        getTopPoints(num?: number): TouchPoint[];
        /**
         * 获取当前触摸点滑动方向
         */
        getMoveVector(): TouchPoint;
        /**
         * 获取当前触摸点整体位移方向
         */
        getMaxMoveVector(): TouchPoint;
        /**
         * 获取
         */
        getPoints(): TouchPoint[];
        /**
         * 获取最新的点
         * @param index
         */
        getPoint(index?: number): TouchPoint;
        /**
         * 获取最老的点
         * @param index
         */
        getOldPoint(index?: number): TouchPoint;
    }
    /**
     * 手势类型
     */
    enum GuestureTypes {
        /**
         * 开始触摸
         */
        touch = "touch",
        /**
         * 点击
         */
        loose = "loose",
        /**
         * 拖拽
         */
        drag = "drag",
        /**
         * 双击
         */
        doubleClick = "doubleClick",
        /**
         * 缩放
         */
        scale = "scale",
        /**
         * 旋转
         */
        rotate = "rotate"
    }
    class GuestureInfo {
        gtype: GuestureTypes;
    }
    /**
     * 点触信息
     */
    class ClickGuestureInfo extends GuestureInfo {
        gtype: GuestureTypes;
        protected pointQueues: TouchPointQueue[];
        init(pointQueues: TouchPointQueue[]): this;
    }
    /**
     * 拖拽信息
     */
    class DragGuestureInfo extends GuestureInfo {
        gtype: GuestureTypes;
        protected pointQueues: TouchPointQueue[];
        init(pointQueues: TouchPointQueue[]): this;
        getMoveVector(index?: number): TouchPoint;
        getMaxMoveVector(index?: number): TouchPoint;
        getOldPoint(index?: number): fsync.Vector3;
        getPoint(index?: number): fsync.Vector3;
        getPoints(index?: number): fsync.Vector3[];
        getOldPoints(index?: number): fsync.Vector3[];
    }
    /**
     * 双击信息
     */
    class DoubleClickGuestureInfo extends GuestureInfo {
        gtype: GuestureTypes;
        protected pointQueues: TouchPointQueue[];
        init(pointQueues: TouchPointQueue[]): this;
    }
    type ScaleInfo = {
        scaleN: number;
        dir: TouchPoint;
        center: TouchPoint;
    };
    /**
     * 缩放信息
     */
    class ScaleGuestureInfo extends GuestureInfo {
        gtype: GuestureTypes;
        protected pointQueues: TouchPointQueue[];
        init(pointQueues: TouchPointQueue[]): this;
        getScaleInfo(): ScaleInfo;
    }
    type RotateInfo = {
        th: number;
        rotation: number;
        center: TouchPoint;
    };
    /**
     * 旋转信息
     */
    class RotateGuestureInfo extends GuestureInfo {
        gtype: GuestureTypes;
        protected pointQueues: TouchPointQueue[];
        init(pointQueues: TouchPointQueue[]): this;
        getRotateDirection(): RotateInfo;
    }
    class GuestureConfig {
        /**
         * 最小移动距离
         */
        dragDistanceMin: number;
        /**
         *
         */
        rotateRadius: number;
    }
    /**
     * 手势分析
     */
    class GuestureAnalyzer {
        protected pointQueues: TouchPointQueue[];
        protected config: GuestureConfig;
        protected getActivedPointQueues(): TouchPointQueue[];
        init(): this;
        findTouchPointQueueById(id: number): TouchPointQueue | null;
        /**
         * 输入点触信息
         * @param points
         */
        inputTouchPoints(touching: boolean, points: TouchPoint[]): void;
        /**
         * 单点手势
         */
        getSinglePointGuesture(): GuestureInfo | null;
        getTowPointGuesture(): GuestureInfo | null;
        /**
         * 获取手势信息
         */
        getCurrentGuesture(): GuestureInfo | null;
    }
}
declare namespace kitten.rpg {
    /**
     * 缓存指定角色行为的命令
     */
    class SingleActorCmdBuffer<T extends IActorCmd = IActorCmd> {
        protected cmds: T[];
        init(): this;
        putCmd(cmd: T): void;
        popCmd(): T;
        getLatestCmd(): T;
    }
    /**
     * 管理所有角色命令缓冲
     */
    class ActorCmdBuffer<T extends IActorCmd = IActorCmd> {
        cmdBuffers: {
            [key: string]: SingleActorCmdBuffer<T>;
        };
        init(): this;
        addCmdBuffer(actorId: TActorId): SingleActorCmdBuffer<T>;
        putCmd(cmd: T): void;
        getCmdBuffer(actorId: TActorId): SingleActorCmdBuffer<T>;
        getLatestCmd(actorId: TActorId): T;
        getActors(): TActorId[];
        clear(): void;
    }
}
declare namespace kitten.rpg {
    /**
     * 角色行为命令定义
     */
    interface IActorCmd {
        actorId: TActorId;
    }
    interface IRPGActorCmd extends IActorCmd {
        move?: {
            dir: number[];
        };
        skill?: {
            skillName: string;
            skillId?: number;
            targets?: TActorId[];
        };
    }
}
declare namespace kitten.rpg {
    interface ICmdTranslator {
        init(): ICmdTranslator;
        setRoleData(roleData: RPGRoleDataBase): any;
        setGameInput(gamepad: kitten.gamepad.NormalGamepad): any;
        clearCurGameCmd(): void;
        getCurGameCmd(): fsync.IGameInputCmd;
    }
}
declare namespace kitten.rpg {
    type TActorId = string;
    class RPGPlayerCmd implements fsync.IGameInputCmd {
        cmdType: "RoleCmd" | "Pass";
        cmdId: string;
        needSync?: boolean;
        route: "net" | "local";
        roleId: number;
        createTime: number;
        genType?: "con" | "sep";
        createFrameCount?: number;
        frameCount?: number;
        receivedTime?: number;
        isSurge?: boolean;
        cmdIndex: number;
        move?: {
            actorId: TActorId;
            times: number;
            dir: number[];
        };
        skills?: {
            actorId: TActorId;
            skillName: string;
            skillId: number;
            /**
             * 技能在技能列表中索引
             */
            skillIndex: number;
            targets?: string[];
            dir: number[];
        }[];
    }
}
declare namespace kitten.rpg {
    /**
     * 将玩家操作转译成统一指令
     */
    class RPGPlayerCmdTranslator implements ICmdTranslator {
        init(): this;
        protected curGameCmd: RPGPlayerCmd;
        protected roleData: RPGRoleDataBase;
        setRoleData(roleData: RPGRoleDataBase): void;
        protected curCmdIndex: number;
        protected initGameCtrl(): void;
        protected getGameCmd(): RPGPlayerCmd;
        protected gamepad: kitten.gamepad.NormalGamepad;
        setGameInput(gamepad: kitten.gamepad.NormalGamepad): void;
        /**
         * 简单的转义出：df []
         * - 左按下->平移{方向，正在移动}
         * - 右按下->技能方向{技能索引，方向，正在释放}
         */
        protected translate(gamepad: kitten.gamepad.NormalGamepad): void;
        clearCurGameCmd(): void;
        protected cmdCopy: {};
        getCurGameCmd(): fsync.IGameInputCmd;
    }
}
declare namespace kitten.rpg {
    class RPGRoleDataBase {
        userId: fsync.TUserId;
        roleId: fsync.TRoleId;
        roomId?: fsync.TRoomId;
        level: number;
        battleCount: number;
        score: number;
        winRate: number;
    }
}
/**
 * 手势分析
 */
declare namespace kitten.uievent {
    type UserInputData = {
        action: "onsetup" | "updateclientsize" | "onkeydown" | "onkeyup" | "onmousemove" | "onmousedown" | "onmouseup" | "ontouchmove" | "ontouchstart" | "ontouchend";
        event: {
            clientX?: number;
            clientY?: number;
            keyCode?: number;
            key?: string;
            touches?: {
                identifier: number;
                clientX?: number;
                clientY?: number;
            }[];
        };
        clientSize: {
            width: number;
            height: number;
        };
    };
    class UIEventHandler {
        protected _initOnce: boolean;
        protected convertDesignX: (n: number) => number;
        protected convertDesignY: (n: number) => number;
        protected handlerEvent(data: UserInputData): void;
        bindUIEvents(force?: boolean): void;
        postInitEvent(size: fsync.Vector3): void;
    }
    const uiEventHandler: UIEventHandler;
}
declare namespace fsync {
    /**
     * client base on websocket on browser platform
     */
    class BWebSocketClient implements INetClient {
        protected client: WebSocket;
        protected sessionId: TSessionId;
        onerror: (error: Error) => void | null;
        onclose: (reason: Reason) => void | null;
        isConnected: boolean;
        init(): this;
        sendRaw(data: bytes): void;
        send(reqId: TReqId, data: bytes, call?: (info: SessionInfo) => void): void;
        listen(reqId: TReqId, call: (info: SessionInfo) => void): void;
        protected sessionCallbacks: {
            [key: number]: ClientReqHandler;
        };
        protected subHandlers: {
            [key: number]: ClientReqHandler[];
        };
        protected onProcessData(data: ArrayBuffer): void;
        connect(url: string): Promise<void>;
        close(): void;
    }
}
declare namespace fsync {
    class ClientFactory {
        static createClient(proto: "websocket"): INetClient;
    }
}
declare namespace fsync {
    interface INetClient {
        init(): any;
        isConnected: boolean;
        sendRaw(data: bytes): any;
        send(reqId: TReqId, data: bytes, call: (info: SessionInfo) => void): any;
        onerror: (error: Error) => void | null;
        onclose: (reason: Reason) => void | null;
        close(): any;
        connect(url: string): Promise<void>;
        listen(reqId: TReqId, call: (info: SessionInfo) => void): any;
    }
}
declare namespace fsync {
    class PBClient {
        client: INetClient;
        proto: ProtoTool;
        init(client: INetClient): this;
        SendReqPB(reqId: TReqId, message: Object, cls: new () => any, call?: (info: SessionInfo) => void): any;
        SubEvent(respId: TRespId, call: (result: SessionInfo) => void): void;
        close(): void;
        connect(url: string): Promise<void>;
        listen(reqId: TReqId, call: (info: SessionInfo) => void): any;
        sendRaw(data: bytes): any;
        send(reqId: TReqId, data: bytes, call?: (info: SessionInfo) => void): any;
        set onerror(value: (error: Error) => void | null);
        get onerror(): (error: Error) => void | null;
        set onclose(value: (reason: Reason) => void | null);
        get onclose(): (reason: Reason) => void | null;
        get isConnected(): boolean;
    }
}
declare namespace fsync {
    class ProtoPool {
        protected protos: {
            [key: string]: string;
        };
        init(): this;
        put(key: string, content: string): void;
        get(key: string): string;
    }
    const protoPool: ProtoPool;
}
declare namespace fsync {
    class ProtoTool {
        protected root: protobuf.Root | null;
        protoVersion: int32;
        init(pkg: string): this;
        parseProto(content: string, call: () => void): void;
        loadProto(srcFile: string, call: () => void): void;
        package: string;
        decode<T>(buffer: Uint8Array, cls: new () => T): T;
        encode<T>(obj: T, cls?: new () => T): Uint8Array;
    }
}
declare namespace fsync {
    type TReqId = int64;
    type TRespId = int64;
    type bytes = Uint8Array;
    type TSessionId = int64;
    class Reason {
    }
    type SessionInfo = {
        sessionId: TSessionId;
        reqId: TReqId;
        time: TTimeStamp;
        data: bytes;
        rawData: ArrayBuffer;
    };
    type ClientReqHandler = (sessionInfo: SessionInfo) => void;
    type HeadInfo = {
        headSize: uint32;
        dataSize: uint32;
    };
    type TTCPTransOptions = uint32;
    type TCPReqHead = {
        HeadSize: uint32;
        DataSize: uint32;
        TransOptions: TTCPTransOptions;
    };
    const TCPReqHeadSize = 12;
    const SessionInfoHeadSize = 16;
    const UintSize = 4;
}
declare namespace fsync {
    /**
     * 分析有差异的entity，从而支持平行世界收束覆写
     */
    class MergeSystem implements IUpdater {
        source: ECSWorld;
        target: ECSWorld;
        needMerge: bool;
        init(): void;
        protected mergeDiffEntities(mg1: EntityManager, mg2: EntityManager): void;
        onNewEntity(entity: Entity): void;
        onRemoveEntity(entity: Entity): void;
        onUpdateEntity(entity: Entity): void;
        onBeforeUpdate(): void;
        onAfterUpdate(): void;
        update(): void;
    }
}
declare namespace fsync {
    class ForceMergeSystem extends MergeSystem {
        onNewEntity(entity: Entity): void;
        onRemoveEntity(entity: Entity): void;
        onUpdateEntity(entity: Entity): void;
    }
}
declare namespace fsync {
    /**
     * 帧同步策略
     */
    class FrameSyncStrategy {
        protected mainProcess: WorldMainProcess;
        init(mainProcess: WorldMainProcess): this;
        waitSyncTimes: number;
        waitSyncTimeline: number;
        lastUpdateTime: number;
        netDelayUtil: NetDelay;
        lastSyncTime: number;
        update(): void;
    }
}
declare namespace fsync {
    class Refers {
        static NormalSystem: string;
        static MergeSystem: string;
        static InputSystem: string;
        static SyncViewSystem: "SyncViewSystem";
    }
    class WorldMainProcess {
        /**
         * 主线
         */
        worldMain: ECSWorld;
        /**
         * 预测线
         */
        worldPredict: ECSWorld;
        protected worlds: ECSWorld[];
        mergeSystem: MergeSystem;
        mainUpdater: UpdaterGroupManager;
        predictUpdater: UpdaterGroupManager;
        predictCmdBuffer: InputCmdBuffer;
        mainCmdBuffer: InputCmdBuffer;
        serverMainFrameCount: number;
        serverMainTime: number;
        init(): this;
        createMergeSystem(source: ECSWorld, target: ECSWorld): MergeSystem;
        protected frameSyncStrategy: FrameSyncStrategy;
        update(): void;
        updatePredict(): void;
        syncMain(needMerge?: bool): void;
        syncPredictToMain(): void;
        /**
         * 回滚到最新的主线，并重新依赖本地指令演进到最新预测线
         */
        syncPredictToCurFrame(): void;
        updatePredictToTheFrame(frameCount: number): void;
        lastTT: number;
        updateMain(): void;
    }
}
declare namespace fsync {
    class RoomClient {
        matcherClient: PBClient;
        roomClient: PBClient;
        proto: ProtoTool;
        intervals: Intervals;
        protected stopHeartBeat: bool;
        init(): this;
        setProto(proto: ProtoTool): void;
        close(): void;
        /**
         * 更新 protobuf 协议文件
         * - 如果客户端版本较新，则服务器只返回服务器上协议版本号
         * - 如果客户端版本较旧，则服务器返回新协议文件内容
         * @param info
         * @param call
         */
        checkoutProto(info: {
            clientProtoVersion: number;
        }, call: (result: roomserver.TDownloadProtoResult) => void): void;
        /**
         * 通过房间匹配服匹配房间
         * @param roleInfo
         * @param roomInfo
         * @param call
         */
        matchRoom(roleInfo: roomserver.TRoleInfo, roomInfo: roomserver.TRoomInfo, call: (result: roomserver.TMatchJobResult) => void): void;
        /**
         * 通过ID搜索房间
         * @param opInfo
         * @param call
         */
        searchRoomById(opInfo: roomserver.ITRoomUserOpInfo, call: (result: roomserver.TQueryRoomsResult) => void): void;
        /**
         * 发送房间服心跳
         * @param opInfo
         * @param call
         */
        sendRoomHeartBeat(opInfo: roomserver.ITRoomUserOpInfo, call: (result: roomserver.THeartBeatResult) => void): void;
        /**
         * 发送房间匹配服心跳
         * @param opInfo
         * @param call
         */
        sendMatcherHeartBeat(opInfo: roomserver.ITRoomUserOpInfo, call: (result: roomserver.THeartBeatResult) => void): void;
        sendHeartBeat(opInfo: roomserver.ITRoomUserOpInfo): void;
        /**
         * 维持心跳
         * @param opInfo
         */
        startHeartBeatProcess(opInfo: roomserver.ITRoomUserOpInfo): void;
        /**
         * 停止心跳
         */
        stopHeartBeatProcess(): void;
        /**
         * 进入房间
         * @param roleInfo
         * @param roomInfo
         * @param call
         */
        enterRoom(roleInfo: roomserver.TRoleInfo, roomInfo: roomserver.ITRoomModel, call: (result: roomserver.TNormalResult) => void): void;
        /**
         * 退出房间
         * @param opInfo
         * @param call
         */
        exitRoom(opInfo: roomserver.ITRoomUserOpInfo, call: (result: roomserver.TNormalResult) => void): void;
        /**
         * 强制销毁房间
         * @param opInfo
         * @param call
         */
        destoryRoomForce(opInfo: roomserver.ITRoomUserOpInfo, call: (result: roomserver.TNormalResult) => void): void;
        /**
         * 进入准备状态
         * - 所有玩家进入准备状态之后，即可开始游戏
         * @param opInfo
         * @param call
         */
        prepareStartGame(opInfo: roomserver.ITRoomUserOpInfo, call: (result: roomserver.TRespStartGameResult) => void): void;
        /**
         * 广播房间消息
         * @param reqData
         * @param call
         */
        broadCastRoomMessage(reqData: roomserver.TReqBroadCastClientMessage, call: (result: roomserver.TNormalResult) => void): void;
        /**
         * 广播帧同步消息
         * @param reqData
         * @param call
         */
        broadCastFrameSyncMessage(reqData: roomserver.TReqBroadCastFrameSyncReq, call: (result: roomserver.TNormalResult) => void): void;
        /**
         * 监听帧同步广播
         * @param call
         */
        listenFrameSyncBroadCast(call: (message: roomserver.TReqBroadCastFrameSyncReq) => void): void;
        /**
         * 监听房间内广播消息
         * @param call
         */
        listenRoomBroadCast(call: (message: roomserver.TReqBroadCastClientMessage) => void): void;
        /**
         * 监听成员离开房间
         * @param call
         */
        listenExitRoom(call: (message: roomserver.TNormalResult) => void): void;
        /**
         * 监听成员进入房间
         * @param call
         */
        listenEnterRoom(call: (message: roomserver.TNormalResult) => void): void;
        /**
         * 监听成员设置房间
         * @param call
         */
        listenSetRoomInfo(call: (message: roomserver.TNormalResult) => void): void;
        /**
         * 监听成员进入准备状态
         * @param call
         */
        listenPrepareStartGame(call: (message: roomserver.TNormalResult) => void): void;
        /**
         * 监听游戏开始
         * @param call
         */
        listenStartGame(call: (message: roomserver.TRespStartGameResult) => void): void;
        /**
         * 监听同步游戏记录
         * @param call
         */
        listenFetchGameOpRecords(call: (message: roomserver.TFetchGameOpRecordsResult) => void): void;
        /**
         * 验证房间
         * @param call
         */
        validateRoom(opInfo: roomserver.ITRoomUserOpInfo, call: (result: roomserver.TNormalResult) => void): void;
        /**
         * 设置房间信息
         * @param call
         */
        setRoomInfo(opInfo: roomserver.ITRoomUserOpInfo, roomInfo: roomserver.ITRoomSettings, call: (result: roomserver.TNormalResult) => void): void;
        /**
         * 放逐成员（未实现）
         * @param call
         */
        private banishMember;
        /**
         * 获取房间信息（未实现）
         * @param call
         */
        getRoomInfo(opInfo: roomserver.ITRoomUserOpInfo, call: (result: roomserver.TGetRoomInfoResult) => void): void;
        /**
         * 获取游戏操作记录（未实现）
         * @param call
         */
        fetchGameOpRecords(opInfo: roomserver.ITRoomUserOpInfo, call: (result: roomserver.TFetchGameOpRecordsResult) => void): void;
    }
}
declare namespace fsync {
    type TUserId = int64;
    type TRoleId = int64;
    type TChairNo = int64;
    type TRoomId = int64;
    type TRoomSessionId = int64;
    function TRoomModel_GetRoomInfo(roomInfo: roomserver.ITRoomModel): roomserver.TRoomInfo;
}
declare namespace fsync {
    const InvalidSessionId = 0;
    const ReqId: {
        InvalidReqId: number;
        BasicAllReq: number;
        BasicHeartBeat: number;
        BasicCheckoutProto: number;
        RoomEnterRoom: number;
        RoomExitRoom: number;
        RoomDestroyRoomForce: number;
        RoomFrameSync: number;
        RoomIsRoomValid: number;
        RoomSetRoomInfo: number;
        RoomBanishMember: number;
        RoomSetSelfRoomChairNo: number;
        RoomFilterMembers: number;
        RoomStartGame: number;
        RoomPrepareRoomStartGame: number;
        RoomFetchGameOpRecords: number;
        RoomGetRoomInfo: number;
        RoomNotifyCreateRoom: number;
        RoomNotifyRemoveRoom: number;
        RoomBroadCastClientMessage: number;
        RoomRegisterRoomServer: number;
        RoomUnregisterRoomServer: number;
        RoomMatchUsersWithDefaultRule: number;
        RoomSearchRoomById: number;
        RoomGetRecommendRooms: number;
        RoomThrowEgg: number;
    };
    const RespId: {
        RoomNotifyFrameSync: number;
        RoomNotifyClientMessage: number;
    };
    function toRespId(reqId: TReqId): TReqId;
}
declare const serverprotoSource = "\nsyntax = \"proto3\";\npackage roomserver;\n\n//type int64 int64\n//type int64 int64\n//type int64 int64\n\n//\u623F\u95F4id\u751F\u6210\u89C4\u5219: id:int64=parseInt64(timestamp+incr(0~99999))\n//type int64 int64\n//type int64 int64\n\n//type int64 int64\n//type int32 int32\n//type float float\n//type string string\n//type string string\n\nmessage TErrorInfo {\n  int32     code = 1;\n  string  reason = 2;\n  string  message = 3;\n}\nmessage TResultIndicate{\n  bool      ok = 1;\n  TErrorInfo err = 2;\n}\nmessage TNormalResult {\n  TResultIndicate indicate = 1;\n  TRoomUserOpInfo op_info = 2;\n}\n\nmessage TRoomBasic {\n  //\u623F\u95F4\u53F7\n  int64 room_id = 1;\n  //\u623F\u95F4\u521B\u5EFA\u65F6\u95F4\n  int64 create_time = 2;\n  //uuid \u7528\u4E8E\u65E5\u5FD7\u67E5\u8BE2\u7B49\u529F\u80FD\n  string uuid = 3;\n  //\u623F\u95F4\u8FDE\u63A5\u5730\u5740\u914D\u7F6E\n  string conn_addr = 4;\n}\n\nmessage TRoomSettings {\n  int32   room_type = 1;\n  string       name = 2;\n  string   password = 3;\n}\n\nmessage TRoomGameInfo {\n  //  \u6E38\u620F\u6A21\u5F0F/\u7C7B\u578B\n  int32 game_mode = 1;\n  //  \u56FA\u5B9A\u5E27\u95F4\u9694\n  int64 frame_duration = 2;\n  //\u9700\u8981\u591A\u5C11\u89D2\u8272\u6765\u5339\u914D\n  int32 role_count = 3;\n  //\u5339\u914D\u65F6\u957F\n  float match_timeout = 4;\n}\n\nmessage TRoomGameState {\n  int64 game_session_id = 1;\n  int64 start_time = 2;\n  int32 random_seed = 3;\n  bool is_playing = 4;\n}\n\nmessage TServerInfo {\n  string address = 1;\n  string server_id = 2;\n}\n\nmessage TRoomInfo {\n  TRoomBasic    basic_info = 1;\n  TRoomSettings room_settings = 2;\n  TRoomGameInfo     game_info = 3;\n  TServerInfo server_info = 4;\n}\n\nmessage TRoomModel {\n  TRoomBasic    basic_info = 1;\n  TRoomSettings room_settings = 2;\n  TRoomGameInfo     game_info = 3;\n  TServerInfo server_info = 4;\n  TRoomGameState    game_state = 5;\n  repeated int64        roles = 6;\n}\n\nmessage TReqGetRoomInfo{\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage TGetRoomInfoResult{\n  TResultIndicate indicate = 1;\n  TRoomUserOpInfo op_info = 2;\n  TRoomModel room_model = 3;\n}\n\nmessage TQueryRoomsResult {\n  TResultIndicate indicate = 1;\n  TRoomsInfo roomsInfo = 2;\n}\n\nmessage TRoomsInfo {\n  int32 count = 1;\n  repeated TRoomModel room_models = 2;\n}\n\nmessage TRoomUserOpInfo {\n  int64 room_id = 1;\n  int64 role_id = 2;\n}\n\nmessage TMatchJobResult {\n  TResultIndicate indicate = 1;\n  TRoomUserOpInfo op_info = 2;\n  TRoomsInfo roomsInfo = 3;\n}\n\nmessage TUserInfo {\n  int64 user_id = 1;\n}\n\nmessage TRoleBasic {\n  int64 role_id = 1;\n  int32    sex = 2;\n}\n\nmessage TRoleGameInfo {\n  //\u5206\u6570\n  int32 score = 1;\n  //\u7B49\u7EA7\n  int32 level = 2;\n  //\u5BF9\u6218\u5C40\u6570\n  int32 battle_count = 3;\n  //\u80DC\u7387\n  float win_rate = 4;\n}\n\nmessage TRoleRoomState {\n  int64   room_id = 1;\n  int64  chair_no = 2;\n  //\u89D2\u8272\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u5668\u662F\u5426\u8FDE\u63A5\n  bool is_conn_active = 3;\n  bool is_master = 4;\n}\n\nenum TRolePlayState{\n  PENDING = 0;\n  READY = 1;\n  PLAYING = 2;\n}\n\nmessage TRoleGameState {\n  TRolePlayState state = 1;\n}\n\nmessage TRoleInfo {\n  TRoleBasic basic_info = 1;\n  TUserInfo  user_info = 2;\n  TRoleGameInfo  game_info = 3;\n  TRoleRoomState room_state = 4;\n}\n\nmessage TRoleModel {\n  TRoleBasic basic_info = 1;\n  TUserInfo  user_info = 2;\n  TRoleGameInfo  game_info = 3;\n  TRoleRoomState room_state = 4;\n  TRoleGameState game_state = 5;\n}\n\nmessage TRoomMemberFilterInfo {\n}\n\nmessage THandleResult {\n  TResultIndicate indicate = 1;\n}\n\nmessage TRoomPlayerMessageOptions {\n\n}\nmessage TRoomPlayerMessage {\n  TRoomPlayerMessageOptions options = 1;\n}\n\nmessage TReqEnterRoom {\n  TRoomUserOpInfo op_info = 1;\n  TRoleInfo       role_info = 2;\n  TRoomModel      room_info = 3;\n}\n\nmessage TReqExitRoom {\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage TReqDestroyRoomForce {\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage TReqRoleBroadOptions{\n  int64 role_id = 1;\n}\nmessage TFrameSyncInfo{\n  //  \u670D\u52A1\u5668\u5F53\u524D\u6E38\u620F\u65F6\u95F4\n  int64 server_time = 1;\n  //  \u670D\u52A1\u5668\u5F53\u524D\u6E38\u620F\u5DF2\u8FDB\u884C\u5E27\u6570\n  int64 server_frame_count = 2;\n  //\u5BA2\u6237\u7AEF\u5F53\u524D\u6E38\u620F\u65F6\u95F4\n  int64 client_time = 3;\n}\n\nmessage TReqBroadCastFrameSyncReq{\n  //  \u6807\u8BB0\u53D1\u9001\u65B9\n  TRoomUserOpInfo op_info = 1;\n  TFrameSyncInfo sync_info = 2;\n  bytes msg_bytes = 4;\n}\n\nmessage TReqBroadCastClientMessage{\n  //  \u6807\u8BB0\u53D1\u9001\u65B9\n  TRoomUserOpInfo op_info = 1;\n  TFrameSyncInfo sync_info = 2;\n  //  \u6807\u8BB0\u63A5\u6536\u65B9\n  repeated TReqRoleBroadOptions targets = 3;\n  bytes msg_bytes = 4;\n}\n\nmessage TReqValidateRoom{\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage TReqSetRoomInfo{\n  TRoomUserOpInfo op_info = 1;\n  TRoomSettings roomInfo = 2;\n}\n\nmessage TReqBanishMember{\n  TRoomUserOpInfo op_info = 1;\n  repeated int64 roles = 2;\n}\n\nmessage TReqSetSelfRoomChairNo{\n  TRoomUserOpInfo op_info = 1;\n  int64 chairNo = 2;\n}\n\nmessage TReqFilterMembers{\n  TRoomUserOpInfo op_info = 1;\n  TRoomMemberFilterInfo filterInfo = 2;\n}\n\nmessage TStartGameOptions{\n\n}\n\nmessage TReqStartGame{\n  TRoomUserOpInfo op_info = 1;\n  TStartGameOptions start_options = 2;\n}\n\nmessage TFrameSyncInitConfig{\n  int32 random_seed = 1;\n}\nmessage TRespStartGameResult{\n  TResultIndicate indicate = 1;\n  TRoomUserOpInfo op_info = 2;\n  TFrameSyncInitConfig frame_sync_init_config = 3;\n}\n\nmessage TReqSearchRoomById{\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage TReqGetRecommendRooms{\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage TReqMatchUsersWithDefaultRule{\n  TRoomUserOpInfo op_info = 1;\n  TRoleInfo roleInfo = 2;\n  TRoomInfo roomInfo = 3;\n}\n\nmessage TReqNotifyCreateRoom{\n  TRoomModel room_model = 1;\n}\n\nmessage TReqNotifyRemoveRoom{\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage TReqFetchGameOpRecords{\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage TFetchGameOpRecordsResult{\n  TResultIndicate indicate = 1;\n  TRoomUserOpInfo op_info = 2;\n  repeated TReqBroadCastFrameSyncReq sync_op_records = 3;\n}\n\nmessage TReqHeartBeat{\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage THeartBeatResult{\n  TRoomUserOpInfo op_info = 1;\n}\n\nmessage TRoomServerRegisterForMatcherServerInfo {\n  //\u670D\u52A1\u5668ID\n  string ServerId = 1;\n  //\u623F\u95F4\u670D\u52A1\u5668\u8FDE\u63A5ID\n  string ConnId = 2;\n  //\u623F\u95F4\u670D\u8FDE\u63A5\u5730\u5740\uFF08\u7ED9\u5BA2\u6237\u7AEF\u7528\uFF09\n  string ClientConnAddr = 3;\n  //\u5F53\u524D\u623F\u95F4\u6570\u91CF\n  int64 RoomCount = 4;\n}\n\nmessage TRoomServerRegisterForMatcherServerResult {\n  TResultIndicate indicate = 1;\n}\n\nmessage TRoomServerUnregisterForMatcherServerInfo {\n  //\u670D\u52A1\u5668ID\n  string ServerId = 1;\n  //\u623F\u95F4\u670D\u52A1\u5668\u8FDE\u63A5ID\n  string ConnId = 2;\n  //\u623F\u95F4\u670D\u8FDE\u63A5\u5730\u5740\uFF08\u7ED9\u5BA2\u6237\u7AEF\u7528\uFF09\n  string ClientConnAddr = 3;\n}\n\nmessage TRoomServerUnregisterForMatcherServerResult {\n  TResultIndicate indicate = 1;\n}\n\n//string \u957F\u5EA6\u9700\u8981\u5C0F\u4E8E64MB\nmessage TReqDownloadProto{\n  //  \u5BA2\u6237\u7AEFproto\u7248\u672C\n  int32 proto_version = 1;\n  // \u662F\u5426\u5F3A\u5236\u66F4\u65B0\n  bool force = 2;\n}\n\nmessage TProtoInfo{\n  //  \u670D\u52A1\u7AEF\u4F20\u56DE\u7684proto\u7248\u672C\n  int32 version = 1;\n  //  \u5982\u679C\u5BA2\u6237\u7AEF\u7F13\u5B58\u7684\u534F\u8BAE\u7248\u672C\u548C\u670D\u52A1\u7AEF\u7684\u76F8\u540C\uFF0C\u5219\u4E0D\u9700\u8981\u91CD\u65B0\u4E0B\u8F7D proto_content\n  string content = 2;\n}\n\nmessage TDownloadProtoResult{\n  TResultIndicate indicate = 1;\n  TProtoInfo proto_info = 2;\n}\n\n";
declare const fileBaseName = "serverproto";
declare const srcFile: string;
declare namespace fsync {
    /** Namespace  */
    namespace roomserver {
        /** Properties of a TErrorInfo. */
        export interface ITErrorInfo {
            /** TErrorInfo code */
            code?: (number | null);
            /** TErrorInfo reason */
            reason?: (string | null);
            /** TErrorInfo message */
            message?: (string | null);
        }
        /** Represents a TErrorInfo. */
        export class TErrorInfo implements ITErrorInfo {
            /**
             * Constructs a new TErrorInfo.
             * @param [properties] Properties to set
             */
            /** TErrorInfo code. */
            code: number;
            /** TErrorInfo reason. */
            reason: string;
            /** TErrorInfo message. */
            message: string;
        }
        /** Properties of a TResultIndicate. */
        export interface ITResultIndicate {
            /** TResultIndicate ok */
            ok?: (boolean | null);
            /** TResultIndicate err */
            err?: (ITErrorInfo | null);
        }
        /** Represents a TResultIndicate. */
        export class TResultIndicate implements ITResultIndicate {
            /**
             * Constructs a new TResultIndicate.
             * @param [properties] Properties to set
             */
            /** TResultIndicate ok. */
            ok: boolean;
            /** TResultIndicate err. */
            err?: (ITErrorInfo | null);
        }
        /** Properties of a TNormalResult. */
        export interface ITNormalResult {
            /** TNormalResult indicate */
            indicate?: (ITResultIndicate | null);
            /** TNormalResult opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TNormalResult. */
        export class TNormalResult implements ITNormalResult {
            /**
             * Constructs a new TNormalResult.
             * @param [properties] Properties to set
             */
            /** TNormalResult indicate. */
            indicate?: (ITResultIndicate | null);
            /** TNormalResult opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TRoomBasic. */
        export interface ITRoomBasic {
            /** TRoomBasic roomId */
            roomId?: (number | Long | null);
            /** TRoomBasic createTime */
            createTime?: (number | Long | null);
            /** TRoomBasic uuid */
            uuid?: (string | null);
            /** TRoomBasic connAddr */
            connAddr?: (string | null);
        }
        /** Represents a TRoomBasic. */
        export class TRoomBasic implements ITRoomBasic {
            /**
             * Constructs a new TRoomBasic.
             * @param [properties] Properties to set
             */
            /** TRoomBasic roomId. */
            roomId: (number | Long);
            /** TRoomBasic createTime. */
            createTime: (number | Long);
            /** TRoomBasic uuid. */
            uuid: string;
            /** TRoomBasic connAddr. */
            connAddr: string;
        }
        /** Properties of a TRoomSettings. */
        export interface ITRoomSettings {
            /** TRoomSettings roomType */
            roomType?: (number | null);
            /** TRoomSettings name */
            name?: (string | null);
            /** TRoomSettings password */
            password?: (string | null);
        }
        /** Represents a TRoomSettings. */
        export class TRoomSettings implements ITRoomSettings {
            /**
             * Constructs a new TRoomSettings.
             * @param [properties] Properties to set
             */
            /** TRoomSettings roomType. */
            roomType: number;
            /** TRoomSettings name. */
            name: string;
            /** TRoomSettings password. */
            password: string;
        }
        /** Properties of a TRoomGameInfo. */
        export interface ITRoomGameInfo {
            /** TRoomGameInfo gameMode */
            gameMode?: (number | null);
            /** TRoomGameInfo frameDuration */
            frameDuration?: (number | Long | null);
            /** TRoomGameInfo roleCount */
            roleCount?: (number | null);
            /** TRoomGameInfo matchTimeout */
            matchTimeout?: (number | null);
        }
        /** Represents a TRoomGameInfo. */
        export class TRoomGameInfo implements ITRoomGameInfo {
            /**
             * Constructs a new TRoomGameInfo.
             * @param [properties] Properties to set
             */
            /** TRoomGameInfo gameMode. */
            gameMode: number;
            /** TRoomGameInfo frameDuration. */
            frameDuration: (number | Long);
            /** TRoomGameInfo roleCount. */
            roleCount: number;
            /** TRoomGameInfo matchTimeout. */
            matchTimeout: number;
        }
        /** Properties of a TRoomGameState. */
        export interface ITRoomGameState {
            /** TRoomGameState gameSessionId */
            gameSessionId?: (number | Long | null);
            /** TRoomGameState startTime */
            startTime?: (number | Long | null);
            /** TRoomGameState randomSeed */
            randomSeed?: (number | null);
            /** TRoomGameState isPlaying */
            isPlaying?: (boolean | null);
        }
        /** Represents a TRoomGameState. */
        export class TRoomGameState implements ITRoomGameState {
            /**
             * Constructs a new TRoomGameState.
             * @param [properties] Properties to set
             */
            /** TRoomGameState gameSessionId. */
            gameSessionId: (number | Long);
            /** TRoomGameState startTime. */
            startTime: (number | Long);
            /** TRoomGameState randomSeed. */
            randomSeed: number;
            /** TRoomGameState isPlaying. */
            isPlaying: boolean;
        }
        /** Properties of a TServerInfo. */
        export interface ITServerInfo {
            /** TServerInfo address */
            address?: (string | null);
            /** TServerInfo serverId */
            serverId?: (string | null);
        }
        /** Represents a TServerInfo. */
        export class TServerInfo implements ITServerInfo {
            /**
             * Constructs a new TServerInfo.
             * @param [properties] Properties to set
             */
            /** TServerInfo address. */
            address: string;
            /** TServerInfo serverId. */
            serverId: string;
        }
        /** Properties of a TRoomInfo. */
        export interface ITRoomInfo {
            /** TRoomInfo basicInfo */
            basicInfo?: (ITRoomBasic | null);
            /** TRoomInfo roomSettings */
            roomSettings?: (ITRoomSettings | null);
            /** TRoomInfo gameInfo */
            gameInfo?: (ITRoomGameInfo | null);
            /** TRoomInfo serverInfo */
            serverInfo?: (ITServerInfo | null);
        }
        /** Represents a TRoomInfo. */
        export class TRoomInfo implements ITRoomInfo {
            /**
             * Constructs a new TRoomInfo.
             * @param [properties] Properties to set
             */
            /** TRoomInfo basicInfo. */
            basicInfo?: (ITRoomBasic | null);
            /** TRoomInfo roomSettings. */
            roomSettings?: (ITRoomSettings | null);
            /** TRoomInfo gameInfo. */
            gameInfo?: (ITRoomGameInfo | null);
            /** TRoomInfo serverInfo. */
            serverInfo?: (ITServerInfo | null);
        }
        /** Properties of a TRoomModel. */
        export interface ITRoomModel {
            /** TRoomModel basicInfo */
            basicInfo?: (ITRoomBasic | null);
            /** TRoomModel roomSettings */
            roomSettings?: (ITRoomSettings | null);
            /** TRoomModel gameInfo */
            gameInfo?: (ITRoomGameInfo | null);
            /** TRoomModel serverInfo */
            serverInfo?: (ITServerInfo | null);
            /** TRoomModel gameState */
            gameState?: (ITRoomGameState | null);
            /** TRoomModel roles */
            roles?: ((number | Long)[] | null);
        }
        /** Represents a TRoomModel. */
        export class TRoomModel implements ITRoomModel {
            /**
             * Constructs a new TRoomModel.
             * @param [properties] Properties to set
             */
            /** TRoomModel basicInfo. */
            basicInfo?: (ITRoomBasic | null);
            /** TRoomModel roomSettings. */
            roomSettings?: (ITRoomSettings | null);
            /** TRoomModel gameInfo. */
            gameInfo?: (ITRoomGameInfo | null);
            /** TRoomModel serverInfo. */
            serverInfo?: (ITServerInfo | null);
            /** TRoomModel gameState. */
            gameState?: (ITRoomGameState | null);
            /** TRoomModel roles. */
            roles: (number | Long)[];
        }
        /** Properties of a TReqGetRoomInfo. */
        export interface ITReqGetRoomInfo {
            /** TReqGetRoomInfo opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TReqGetRoomInfo. */
        export class TReqGetRoomInfo implements ITReqGetRoomInfo {
            /**
             * Constructs a new TReqGetRoomInfo.
             * @param [properties] Properties to set
             */
            /** TReqGetRoomInfo opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TGetRoomInfoResult. */
        export interface ITGetRoomInfoResult {
            /** TGetRoomInfoResult indicate */
            indicate?: (ITResultIndicate | null);
            /** TGetRoomInfoResult opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TGetRoomInfoResult roomModel */
            roomModel?: (ITRoomModel | null);
        }
        /** Represents a TGetRoomInfoResult. */
        export class TGetRoomInfoResult implements ITGetRoomInfoResult {
            /**
             * Constructs a new TGetRoomInfoResult.
             * @param [properties] Properties to set
             */
            /** TGetRoomInfoResult indicate. */
            indicate?: (ITResultIndicate | null);
            /** TGetRoomInfoResult opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TGetRoomInfoResult roomModel. */
            roomModel?: (ITRoomModel | null);
        }
        /** Properties of a TQueryRoomsResult. */
        export interface ITQueryRoomsResult {
            /** TQueryRoomsResult indicate */
            indicate?: (ITResultIndicate | null);
            /** TQueryRoomsResult roomsInfo */
            roomsInfo?: (ITRoomsInfo | null);
        }
        /** Represents a TQueryRoomsResult. */
        export class TQueryRoomsResult implements ITQueryRoomsResult {
            /**
             * Constructs a new TQueryRoomsResult.
             * @param [properties] Properties to set
             */
            /** TQueryRoomsResult indicate. */
            indicate?: (ITResultIndicate | null);
            /** TQueryRoomsResult roomsInfo. */
            roomsInfo?: (ITRoomsInfo | null);
        }
        /** Properties of a TRoomsInfo. */
        export interface ITRoomsInfo {
            /** TRoomsInfo count */
            count?: (number | null);
            /** TRoomsInfo roomModels */
            roomModels?: (ITRoomModel[] | null);
        }
        /** Represents a TRoomsInfo. */
        export class TRoomsInfo implements ITRoomsInfo {
            /**
             * Constructs a new TRoomsInfo.
             * @param [properties] Properties to set
             */
            /** TRoomsInfo count. */
            count: number;
            /** TRoomsInfo roomModels. */
            roomModels: ITRoomModel[];
        }
        /** Properties of a TRoomUserOpInfo. */
        export interface ITRoomUserOpInfo {
            /** TRoomUserOpInfo roomId */
            roomId?: (number | Long | null);
            /** TRoomUserOpInfo roleId */
            roleId?: (number | Long | null);
        }
        /** Represents a TRoomUserOpInfo. */
        export class TRoomUserOpInfo implements ITRoomUserOpInfo {
            /**
             * Constructs a new TRoomUserOpInfo.
             * @param [properties] Properties to set
             */
            /** TRoomUserOpInfo roomId. */
            roomId: (number | Long);
            /** TRoomUserOpInfo roleId. */
            roleId: (number | Long);
        }
        /** Properties of a TMatchJobResult. */
        export interface ITMatchJobResult {
            /** TMatchJobResult indicate */
            indicate?: (ITResultIndicate | null);
            /** TMatchJobResult opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TMatchJobResult roomsInfo */
            roomsInfo?: (ITRoomsInfo | null);
        }
        /** Represents a TMatchJobResult. */
        export class TMatchJobResult implements ITMatchJobResult {
            /**
             * Constructs a new TMatchJobResult.
             * @param [properties] Properties to set
             */
            /** TMatchJobResult indicate. */
            indicate?: (ITResultIndicate | null);
            /** TMatchJobResult opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TMatchJobResult roomsInfo. */
            roomsInfo?: (ITRoomsInfo | null);
        }
        /** Properties of a TUserInfo. */
        export interface ITUserInfo {
            /** TUserInfo userId */
            userId?: (number | Long | null);
        }
        /** Represents a TUserInfo. */
        export class TUserInfo implements ITUserInfo {
            /**
             * Constructs a new TUserInfo.
             * @param [properties] Properties to set
             */
            /** TUserInfo userId. */
            userId: (number | Long);
        }
        /** Properties of a TRoleBasic. */
        export interface ITRoleBasic {
            /** TRoleBasic roleId */
            roleId?: (number | Long | null);
            /** TRoleBasic sex */
            sex?: (number | null);
        }
        /** Represents a TRoleBasic. */
        export class TRoleBasic implements ITRoleBasic {
            /**
             * Constructs a new TRoleBasic.
             * @param [properties] Properties to set
             */
            /** TRoleBasic roleId. */
            roleId: (number | Long);
            /** TRoleBasic sex. */
            sex: number;
        }
        /** Properties of a TRoleGameInfo. */
        export interface ITRoleGameInfo {
            /** TRoleGameInfo score */
            score?: (number | null);
            /** TRoleGameInfo level */
            level?: (number | null);
            /** TRoleGameInfo battleCount */
            battleCount?: (number | null);
            /** TRoleGameInfo winRate */
            winRate?: (number | null);
        }
        /** Represents a TRoleGameInfo. */
        export class TRoleGameInfo implements ITRoleGameInfo {
            /**
             * Constructs a new TRoleGameInfo.
             * @param [properties] Properties to set
             */
            /** TRoleGameInfo score. */
            score: number;
            /** TRoleGameInfo level. */
            level: number;
            /** TRoleGameInfo battleCount. */
            battleCount: number;
            /** TRoleGameInfo winRate. */
            winRate: number;
        }
        /** Properties of a TRoleRoomState. */
        export interface ITRoleRoomState {
            /** TRoleRoomState roomId */
            roomId?: (number | Long | null);
            /** TRoleRoomState chairNo */
            chairNo?: (number | Long | null);
            /** TRoleRoomState isConnActive */
            isConnActive?: (boolean | null);
            /** TRoleRoomState isMaster */
            isMaster?: (boolean | null);
        }
        /** Represents a TRoleRoomState. */
        export class TRoleRoomState implements ITRoleRoomState {
            /**
             * Constructs a new TRoleRoomState.
             * @param [properties] Properties to set
             */
            /** TRoleRoomState roomId. */
            roomId: (number | Long);
            /** TRoleRoomState chairNo. */
            chairNo: (number | Long);
            /** TRoleRoomState isConnActive. */
            isConnActive: boolean;
            /** TRoleRoomState isMaster. */
            isMaster: boolean;
        }
        /** TRolePlayState enum. */
        enum TRolePlayState {
            PENDING = 0,
            READY = 1,
            PLAYING = 2
        }
        /** Properties of a TRoleGameState. */
        export interface ITRoleGameState {
            /** TRoleGameState state */
            state?: (TRolePlayState | null);
        }
        /** Represents a TRoleGameState. */
        export class TRoleGameState implements ITRoleGameState {
            /**
             * Constructs a new TRoleGameState.
             * @param [properties] Properties to set
             */
            /** TRoleGameState state. */
            state: TRolePlayState;
        }
        /** Properties of a TRoleInfo. */
        export interface ITRoleInfo {
            /** TRoleInfo basicInfo */
            basicInfo?: (ITRoleBasic | null);
            /** TRoleInfo userInfo */
            userInfo?: (ITUserInfo | null);
            /** TRoleInfo gameInfo */
            gameInfo?: (ITRoleGameInfo | null);
            /** TRoleInfo roomState */
            roomState?: (ITRoleRoomState | null);
        }
        /** Represents a TRoleInfo. */
        export class TRoleInfo implements ITRoleInfo {
            /**
             * Constructs a new TRoleInfo.
             * @param [properties] Properties to set
             */
            /** TRoleInfo basicInfo. */
            basicInfo?: (ITRoleBasic | null);
            /** TRoleInfo userInfo. */
            userInfo?: (ITUserInfo | null);
            /** TRoleInfo gameInfo. */
            gameInfo?: (ITRoleGameInfo | null);
            /** TRoleInfo roomState. */
            roomState?: (ITRoleRoomState | null);
        }
        /** Properties of a TRoleModel. */
        export interface ITRoleModel {
            /** TRoleModel basicInfo */
            basicInfo?: (ITRoleBasic | null);
            /** TRoleModel userInfo */
            userInfo?: (ITUserInfo | null);
            /** TRoleModel gameInfo */
            gameInfo?: (ITRoleGameInfo | null);
            /** TRoleModel roomState */
            roomState?: (ITRoleRoomState | null);
            /** TRoleModel gameState */
            gameState?: (ITRoleGameState | null);
        }
        /** Represents a TRoleModel. */
        export class TRoleModel implements ITRoleModel {
            /**
             * Constructs a new TRoleModel.
             * @param [properties] Properties to set
             */
            /** TRoleModel basicInfo. */
            basicInfo?: (ITRoleBasic | null);
            /** TRoleModel userInfo. */
            userInfo?: (ITUserInfo | null);
            /** TRoleModel gameInfo. */
            gameInfo?: (ITRoleGameInfo | null);
            /** TRoleModel roomState. */
            roomState?: (ITRoleRoomState | null);
            /** TRoleModel gameState. */
            gameState?: (ITRoleGameState | null);
        }
        /** Properties of a TRoomMemberFilterInfo. */
        export interface ITRoomMemberFilterInfo {
        }
        /** Represents a TRoomMemberFilterInfo. */
        export class TRoomMemberFilterInfo implements ITRoomMemberFilterInfo {
        }
        /** Properties of a THandleResult. */
        export interface ITHandleResult {
            /** THandleResult indicate */
            indicate?: (ITResultIndicate | null);
        }
        /** Represents a THandleResult. */
        export class THandleResult implements ITHandleResult {
            /**
             * Constructs a new THandleResult.
             * @param [properties] Properties to set
             */
            /** THandleResult indicate. */
            indicate?: (ITResultIndicate | null);
        }
        /** Properties of a TRoomPlayerMessageOptions. */
        export interface ITRoomPlayerMessageOptions {
        }
        /** Represents a TRoomPlayerMessageOptions. */
        export class TRoomPlayerMessageOptions implements ITRoomPlayerMessageOptions {
        }
        /** Properties of a TRoomPlayerMessage. */
        export interface ITRoomPlayerMessage {
            /** TRoomPlayerMessage options */
            options?: (ITRoomPlayerMessageOptions | null);
        }
        /** Represents a TRoomPlayerMessage. */
        export class TRoomPlayerMessage implements ITRoomPlayerMessage {
            /**
             * Constructs a new TRoomPlayerMessage.
             * @param [properties] Properties to set
             */
            /** TRoomPlayerMessage options. */
            options?: (ITRoomPlayerMessageOptions | null);
        }
        /** Properties of a TReqEnterRoom. */
        export interface ITReqEnterRoom {
            /** TReqEnterRoom opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqEnterRoom roleInfo */
            roleInfo?: (ITRoleInfo | null);
            /** TReqEnterRoom roomInfo */
            roomInfo?: (ITRoomModel | null);
        }
        /** Represents a TReqEnterRoom. */
        export class TReqEnterRoom implements ITReqEnterRoom {
            /**
             * Constructs a new TReqEnterRoom.
             * @param [properties] Properties to set
             */
            /** TReqEnterRoom opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqEnterRoom roleInfo. */
            roleInfo?: (ITRoleInfo | null);
            /** TReqEnterRoom roomInfo. */
            roomInfo?: (ITRoomModel | null);
        }
        /** Properties of a TReqExitRoom. */
        export interface ITReqExitRoom {
            /** TReqExitRoom opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TReqExitRoom. */
        export class TReqExitRoom implements ITReqExitRoom {
            /**
             * Constructs a new TReqExitRoom.
             * @param [properties] Properties to set
             */
            /** TReqExitRoom opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TReqDestroyRoomForce. */
        export interface ITReqDestroyRoomForce {
            /** TReqDestroyRoomForce opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TReqDestroyRoomForce. */
        export class TReqDestroyRoomForce implements ITReqDestroyRoomForce {
            /**
             * Constructs a new TReqDestroyRoomForce.
             * @param [properties] Properties to set
             */
            /** TReqDestroyRoomForce opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TReqRoleBroadOptions. */
        export interface ITReqRoleBroadOptions {
            /** TReqRoleBroadOptions roleId */
            roleId?: (number | Long | null);
        }
        /** Represents a TReqRoleBroadOptions. */
        export class TReqRoleBroadOptions implements ITReqRoleBroadOptions {
            /**
             * Constructs a new TReqRoleBroadOptions.
             * @param [properties] Properties to set
             */
            /** TReqRoleBroadOptions roleId. */
            roleId: (number | Long);
        }
        /** Properties of a TFrameSyncInfo. */
        export interface ITFrameSyncInfo {
            /** TFrameSyncInfo serverTime */
            serverTime?: (number | Long | null);
            /** TFrameSyncInfo serverFrameCount */
            serverFrameCount?: (number | Long | null);
            /** TFrameSyncInfo clientTime */
            clientTime?: (number | Long | null);
        }
        /** Represents a TFrameSyncInfo. */
        export class TFrameSyncInfo implements ITFrameSyncInfo {
            /**
             * Constructs a new TFrameSyncInfo.
             * @param [properties] Properties to set
             */
            /** TFrameSyncInfo serverTime. */
            serverTime: (number | Long);
            /** TFrameSyncInfo serverFrameCount. */
            serverFrameCount: (number | Long);
            /** TFrameSyncInfo clientTime. */
            clientTime: (number | Long);
        }
        /** Properties of a TReqBroadCastFrameSyncReq. */
        export interface ITReqBroadCastFrameSyncReq {
            /** TReqBroadCastFrameSyncReq opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqBroadCastFrameSyncReq syncInfo */
            syncInfo?: (ITFrameSyncInfo | null);
            /** TReqBroadCastFrameSyncReq msgBytes */
            msgBytes?: (Uint8Array | null);
        }
        /** Represents a TReqBroadCastFrameSyncReq. */
        export class TReqBroadCastFrameSyncReq implements ITReqBroadCastFrameSyncReq {
            /**
             * Constructs a new TReqBroadCastFrameSyncReq.
             * @param [properties] Properties to set
             */
            /** TReqBroadCastFrameSyncReq opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqBroadCastFrameSyncReq syncInfo. */
            syncInfo?: (ITFrameSyncInfo | null);
            /** TReqBroadCastFrameSyncReq msgBytes. */
            msgBytes: Uint8Array;
        }
        /** Properties of a TReqBroadCastClientMessage. */
        export interface ITReqBroadCastClientMessage {
            /** TReqBroadCastClientMessage opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqBroadCastClientMessage syncInfo */
            syncInfo?: (ITFrameSyncInfo | null);
            /** TReqBroadCastClientMessage targets */
            targets?: (ITReqRoleBroadOptions[] | null);
            /** TReqBroadCastClientMessage msgBytes */
            msgBytes?: (Uint8Array | null);
        }
        /** Represents a TReqBroadCastClientMessage. */
        export class TReqBroadCastClientMessage implements ITReqBroadCastClientMessage {
            /**
             * Constructs a new TReqBroadCastClientMessage.
             * @param [properties] Properties to set
             */
            /** TReqBroadCastClientMessage opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqBroadCastClientMessage syncInfo. */
            syncInfo?: (ITFrameSyncInfo | null);
            /** TReqBroadCastClientMessage targets. */
            targets: ITReqRoleBroadOptions[];
            /** TReqBroadCastClientMessage msgBytes. */
            msgBytes: Uint8Array;
        }
        /** Properties of a TReqValidateRoom. */
        export interface ITReqValidateRoom {
            /** TReqValidateRoom opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TReqValidateRoom. */
        export class TReqValidateRoom implements ITReqValidateRoom {
            /**
             * Constructs a new TReqValidateRoom.
             * @param [properties] Properties to set
             */
            /** TReqValidateRoom opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TReqSetRoomInfo. */
        export interface ITReqSetRoomInfo {
            /** TReqSetRoomInfo opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqSetRoomInfo roomInfo */
            roomInfo?: (ITRoomSettings | null);
        }
        /** Represents a TReqSetRoomInfo. */
        export class TReqSetRoomInfo implements ITReqSetRoomInfo {
            /**
             * Constructs a new TReqSetRoomInfo.
             * @param [properties] Properties to set
             */
            /** TReqSetRoomInfo opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqSetRoomInfo roomInfo. */
            roomInfo?: (ITRoomSettings | null);
        }
        /** Properties of a TReqBanishMember. */
        export interface ITReqBanishMember {
            /** TReqBanishMember opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqBanishMember roles */
            roles?: ((number | Long)[] | null);
        }
        /** Represents a TReqBanishMember. */
        export class TReqBanishMember implements ITReqBanishMember {
            /**
             * Constructs a new TReqBanishMember.
             * @param [properties] Properties to set
             */
            /** TReqBanishMember opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqBanishMember roles. */
            roles: (number | Long)[];
        }
        /** Properties of a TReqSetSelfRoomChairNo. */
        export interface ITReqSetSelfRoomChairNo {
            /** TReqSetSelfRoomChairNo opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqSetSelfRoomChairNo chairNo */
            chairNo?: (number | Long | null);
        }
        /** Represents a TReqSetSelfRoomChairNo. */
        export class TReqSetSelfRoomChairNo implements ITReqSetSelfRoomChairNo {
            /**
             * Constructs a new TReqSetSelfRoomChairNo.
             * @param [properties] Properties to set
             */
            /** TReqSetSelfRoomChairNo opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqSetSelfRoomChairNo chairNo. */
            chairNo: (number | Long);
        }
        /** Properties of a TReqFilterMembers. */
        export interface ITReqFilterMembers {
            /** TReqFilterMembers opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqFilterMembers filterInfo */
            filterInfo?: (ITRoomMemberFilterInfo | null);
        }
        /** Represents a TReqFilterMembers. */
        export class TReqFilterMembers implements ITReqFilterMembers {
            /**
             * Constructs a new TReqFilterMembers.
             * @param [properties] Properties to set
             */
            /** TReqFilterMembers opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqFilterMembers filterInfo. */
            filterInfo?: (ITRoomMemberFilterInfo | null);
        }
        /** Properties of a TStartGameOptions. */
        export interface ITStartGameOptions {
        }
        /** Represents a TStartGameOptions. */
        export class TStartGameOptions implements ITStartGameOptions {
        }
        /** Properties of a TReqStartGame. */
        export interface ITReqStartGame {
            /** TReqStartGame opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqStartGame startOptions */
            startOptions?: (ITStartGameOptions | null);
        }
        /** Represents a TReqStartGame. */
        export class TReqStartGame implements ITReqStartGame {
            /**
             * Constructs a new TReqStartGame.
             * @param [properties] Properties to set
             */
            /** TReqStartGame opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqStartGame startOptions. */
            startOptions?: (ITStartGameOptions | null);
        }
        /** Properties of a TFrameSyncInitConfig. */
        export interface ITFrameSyncInitConfig {
            /** TFrameSyncInitConfig randomSeed */
            randomSeed?: (number | null);
        }
        /** Represents a TFrameSyncInitConfig. */
        export class TFrameSyncInitConfig implements ITFrameSyncInitConfig {
            /**
             * Constructs a new TFrameSyncInitConfig.
             * @param [properties] Properties to set
             */
            /** TFrameSyncInitConfig randomSeed. */
            randomSeed: number;
        }
        /** Properties of a TRespStartGameResult. */
        export interface ITRespStartGameResult {
            /** TRespStartGameResult indicate */
            indicate?: (ITResultIndicate | null);
            /** TRespStartGameResult opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TRespStartGameResult frameSyncInitConfig */
            frameSyncInitConfig?: (ITFrameSyncInitConfig | null);
        }
        /** Represents a TRespStartGameResult. */
        export class TRespStartGameResult implements ITRespStartGameResult {
            /**
             * Constructs a new TRespStartGameResult.
             * @param [properties] Properties to set
             */
            /** TRespStartGameResult indicate. */
            indicate?: (ITResultIndicate | null);
            /** TRespStartGameResult opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TRespStartGameResult frameSyncInitConfig. */
            frameSyncInitConfig?: (ITFrameSyncInitConfig | null);
        }
        /** Properties of a TReqSearchRoomById. */
        export interface ITReqSearchRoomById {
            /** TReqSearchRoomById opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TReqSearchRoomById. */
        export class TReqSearchRoomById implements ITReqSearchRoomById {
            /**
             * Constructs a new TReqSearchRoomById.
             * @param [properties] Properties to set
             */
            /** TReqSearchRoomById opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TReqGetRecommendRooms. */
        export interface ITReqGetRecommendRooms {
            /** TReqGetRecommendRooms opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TReqGetRecommendRooms. */
        export class TReqGetRecommendRooms implements ITReqGetRecommendRooms {
            /**
             * Constructs a new TReqGetRecommendRooms.
             * @param [properties] Properties to set
             */
            /** TReqGetRecommendRooms opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TReqMatchUsersWithDefaultRule. */
        export interface ITReqMatchUsersWithDefaultRule {
            /** TReqMatchUsersWithDefaultRule opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqMatchUsersWithDefaultRule roleInfo */
            roleInfo?: (ITRoleInfo | null);
            /** TReqMatchUsersWithDefaultRule roomInfo */
            roomInfo?: (ITRoomInfo | null);
        }
        /** Represents a TReqMatchUsersWithDefaultRule. */
        export class TReqMatchUsersWithDefaultRule implements ITReqMatchUsersWithDefaultRule {
            /**
             * Constructs a new TReqMatchUsersWithDefaultRule.
             * @param [properties] Properties to set
             */
            /** TReqMatchUsersWithDefaultRule opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TReqMatchUsersWithDefaultRule roleInfo. */
            roleInfo?: (ITRoleInfo | null);
            /** TReqMatchUsersWithDefaultRule roomInfo. */
            roomInfo?: (ITRoomInfo | null);
        }
        /** Properties of a TReqNotifyCreateRoom. */
        export interface ITReqNotifyCreateRoom {
            /** TReqNotifyCreateRoom roomModel */
            roomModel?: (ITRoomModel | null);
        }
        /** Represents a TReqNotifyCreateRoom. */
        export class TReqNotifyCreateRoom implements ITReqNotifyCreateRoom {
            /**
             * Constructs a new TReqNotifyCreateRoom.
             * @param [properties] Properties to set
             */
            /** TReqNotifyCreateRoom roomModel. */
            roomModel?: (ITRoomModel | null);
        }
        /** Properties of a TReqNotifyRemoveRoom. */
        export interface ITReqNotifyRemoveRoom {
            /** TReqNotifyRemoveRoom opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TReqNotifyRemoveRoom. */
        export class TReqNotifyRemoveRoom implements ITReqNotifyRemoveRoom {
            /**
             * Constructs a new TReqNotifyRemoveRoom.
             * @param [properties] Properties to set
             */
            /** TReqNotifyRemoveRoom opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TReqFetchGameOpRecords. */
        export interface ITReqFetchGameOpRecords {
            /** TReqFetchGameOpRecords opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TReqFetchGameOpRecords. */
        export class TReqFetchGameOpRecords implements ITReqFetchGameOpRecords {
            /**
             * Constructs a new TReqFetchGameOpRecords.
             * @param [properties] Properties to set
             */
            /** TReqFetchGameOpRecords opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TFetchGameOpRecordsResult. */
        export interface ITFetchGameOpRecordsResult {
            /** TFetchGameOpRecordsResult indicate */
            indicate?: (ITResultIndicate | null);
            /** TFetchGameOpRecordsResult opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TFetchGameOpRecordsResult syncOpRecords */
            syncOpRecords?: (ITReqBroadCastFrameSyncReq[] | null);
        }
        /** Represents a TFetchGameOpRecordsResult. */
        export class TFetchGameOpRecordsResult implements ITFetchGameOpRecordsResult {
            /**
             * Constructs a new TFetchGameOpRecordsResult.
             * @param [properties] Properties to set
             */
            /** TFetchGameOpRecordsResult indicate. */
            indicate?: (ITResultIndicate | null);
            /** TFetchGameOpRecordsResult opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
            /** TFetchGameOpRecordsResult syncOpRecords. */
            syncOpRecords: ITReqBroadCastFrameSyncReq[];
        }
        /** Properties of a TReqHeartBeat. */
        export interface ITReqHeartBeat {
            /** TReqHeartBeat opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a TReqHeartBeat. */
        export class TReqHeartBeat implements ITReqHeartBeat {
            /**
             * Constructs a new TReqHeartBeat.
             * @param [properties] Properties to set
             */
            /** TReqHeartBeat opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a THeartBeatResult. */
        export interface ITHeartBeatResult {
            /** THeartBeatResult opInfo */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Represents a THeartBeatResult. */
        export class THeartBeatResult implements ITHeartBeatResult {
            /**
             * Constructs a new THeartBeatResult.
             * @param [properties] Properties to set
             */
            /** THeartBeatResult opInfo. */
            opInfo?: (ITRoomUserOpInfo | null);
        }
        /** Properties of a TRoomServerRegisterForMatcherServerInfo. */
        export interface ITRoomServerRegisterForMatcherServerInfo {
            /** TRoomServerRegisterForMatcherServerInfo ServerId */
            ServerId?: (string | null);
            /** TRoomServerRegisterForMatcherServerInfo ConnId */
            ConnId?: (string | null);
            /** TRoomServerRegisterForMatcherServerInfo ClientConnAddr */
            ClientConnAddr?: (string | null);
            /** TRoomServerRegisterForMatcherServerInfo RoomCount */
            RoomCount?: (number | Long | null);
        }
        /** Represents a TRoomServerRegisterForMatcherServerInfo. */
        export class TRoomServerRegisterForMatcherServerInfo implements ITRoomServerRegisterForMatcherServerInfo {
            /**
             * Constructs a new TRoomServerRegisterForMatcherServerInfo.
             * @param [properties] Properties to set
             */
            /** TRoomServerRegisterForMatcherServerInfo ServerId. */
            ServerId: string;
            /** TRoomServerRegisterForMatcherServerInfo ConnId. */
            ConnId: string;
            /** TRoomServerRegisterForMatcherServerInfo ClientConnAddr. */
            ClientConnAddr: string;
            /** TRoomServerRegisterForMatcherServerInfo RoomCount. */
            RoomCount: (number | Long);
        }
        /** Properties of a TRoomServerRegisterForMatcherServerResult. */
        export interface ITRoomServerRegisterForMatcherServerResult {
            /** TRoomServerRegisterForMatcherServerResult indicate */
            indicate?: (ITResultIndicate | null);
        }
        /** Represents a TRoomServerRegisterForMatcherServerResult. */
        export class TRoomServerRegisterForMatcherServerResult implements ITRoomServerRegisterForMatcherServerResult {
            /**
             * Constructs a new TRoomServerRegisterForMatcherServerResult.
             * @param [properties] Properties to set
             */
            /** TRoomServerRegisterForMatcherServerResult indicate. */
            indicate?: (ITResultIndicate | null);
        }
        /** Properties of a TRoomServerUnregisterForMatcherServerInfo. */
        export interface ITRoomServerUnregisterForMatcherServerInfo {
            /** TRoomServerUnregisterForMatcherServerInfo ServerId */
            ServerId?: (string | null);
            /** TRoomServerUnregisterForMatcherServerInfo ConnId */
            ConnId?: (string | null);
            /** TRoomServerUnregisterForMatcherServerInfo ClientConnAddr */
            ClientConnAddr?: (string | null);
        }
        /** Represents a TRoomServerUnregisterForMatcherServerInfo. */
        export class TRoomServerUnregisterForMatcherServerInfo implements ITRoomServerUnregisterForMatcherServerInfo {
            /**
             * Constructs a new TRoomServerUnregisterForMatcherServerInfo.
             * @param [properties] Properties to set
             */
            /** TRoomServerUnregisterForMatcherServerInfo ServerId. */
            ServerId: string;
            /** TRoomServerUnregisterForMatcherServerInfo ConnId. */
            ConnId: string;
            /** TRoomServerUnregisterForMatcherServerInfo ClientConnAddr. */
            ClientConnAddr: string;
        }
        /** Properties of a TRoomServerUnregisterForMatcherServerResult. */
        export interface ITRoomServerUnregisterForMatcherServerResult {
            /** TRoomServerUnregisterForMatcherServerResult indicate */
            indicate?: (ITResultIndicate | null);
        }
        /** Represents a TRoomServerUnregisterForMatcherServerResult. */
        export class TRoomServerUnregisterForMatcherServerResult implements ITRoomServerUnregisterForMatcherServerResult {
            /**
             * Constructs a new TRoomServerUnregisterForMatcherServerResult.
             * @param [properties] Properties to set
             */
            /** TRoomServerUnregisterForMatcherServerResult indicate. */
            indicate?: (ITResultIndicate | null);
        }
        /** Properties of a TReqDownloadProto. */
        export interface ITReqDownloadProto {
            /** TReqDownloadProto protoVersion */
            protoVersion?: (number | null);
            /** TReqDownloadProto force */
            force?: (boolean | null);
        }
        /** Represents a TReqDownloadProto. */
        export class TReqDownloadProto implements ITReqDownloadProto {
            /**
             * Constructs a new TReqDownloadProto.
             * @param [properties] Properties to set
             */
            /** TReqDownloadProto protoVersion. */
            protoVersion: number;
            /** TReqDownloadProto force. */
            force: boolean;
        }
        /** Properties of a TProtoInfo. */
        export interface ITProtoInfo {
            /** TProtoInfo version */
            version?: (number | null);
            /** TProtoInfo content */
            content?: (string | null);
        }
        /** Represents a TProtoInfo. */
        export class TProtoInfo implements ITProtoInfo {
            /**
             * Constructs a new TProtoInfo.
             * @param [properties] Properties to set
             */
            /** TProtoInfo version. */
            version: number;
            /** TProtoInfo content. */
            content: string;
        }
        /** Properties of a TDownloadProtoResult. */
        export interface ITDownloadProtoResult {
            /** TDownloadProtoResult indicate */
            indicate?: (ITResultIndicate | null);
            /** TDownloadProtoResult protoInfo */
            protoInfo?: (ITProtoInfo | null);
        }
        /** Represents a TDownloadProtoResult. */
        export class TDownloadProtoResult implements ITDownloadProtoResult {
            /**
             * Constructs a new TDownloadProtoResult.
             * @param [properties] Properties to set
             */
            /** TDownloadProtoResult indicate. */
            indicate?: (ITResultIndicate | null);
            /** TDownloadProtoResult protoInfo. */
            protoInfo?: (ITProtoInfo | null);
        }
        export {};
    }
}
declare namespace fsync {
    class TPrefab {
        prefabId: PrefabId;
        init(prefabId: PrefabId): this;
    }
}
declare namespace fsync {
    interface IView {
        getRaw?<T>(): T;
        init(): IView;
        setPos(pos: Vector3): void;
        setScale(pos: Vector3): void;
        setRotation(quat: Vector4): void;
        destroy(): void;
    }
}
declare namespace fsync {
    class ViewBindManager {
        protected entityViewMap: {
            [key: string]: IView;
        };
        init(): this;
        getEntityView(entity: Entity): IView;
        bindEntityView(entity: Entity, view: IView): void;
        unbindEntityView(entity: Entity): void;
        removeEntity(entity: Entity): void;
        removeEntityById(entityId: EntityID): void;
        getAllEntityID(): EntityID[];
        clear(): void;
    }
}
declare namespace graph {
    let createSprite: typeof graphengine.createSprite;
    type ISprite = graphengine.ISprite;
    type SystemEvent<T = any> = {
        data: T;
    };
    let systemEventCenter: any;
    const getSystemEvent: () => slib.SEvent<SystemEvent>;
    const PredefSystemEvent: {
        GameFinished: string;
    };
}
declare namespace graph {
}
declare namespace fsync {
    class TransformSyncSystem extends SystemBase {
        viewBinder: ViewBindManager;
        update(): void;
    }
}
declare namespace fsync {
}
declare namespace fsync {
    class BulletView implements IView {
        circle: graph.ISprite;
        init(): this;
        setScale(value: Vector3): void;
        setPos(value: Vector3): void;
        destroy(): void;
        setRotation(quat: Vector4): void;
    }
    class BulletPrefab extends PrefabBase {
        createEntity(depsEnv: PrefabEnv): Entity;
        getPrefabMeta(): PrefabMeta;
    }
}
declare namespace fsync {
    class HeroView implements IView {
        circle: graph.ISprite;
        init(): this;
        setScale(value: Vector3): void;
        setPos(value: Vector3): void;
        destroy(): void;
        setRotation(quat: Vector4): void;
    }
    class HeroPrefab extends PrefabBase {
        createEntity(depsEnv: PrefabEnv): Entity;
        protected attachRoleComponents(entityManager: EntityManager, entity: Entity): void;
        getPrefabMeta(): PrefabMeta;
    }
}
declare namespace fsync {
    class EnemyView extends HeroView {
        init(): this;
    }
    class EnemyPrefab extends HeroPrefab {
        createEntity(depsEnv: PrefabEnv): Entity;
        getPrefabMeta(): PrefabMeta;
    }
}
declare namespace fsync {
    class FightScenePrefab extends ScenePrefab {
        create(depsEnv: PrefabEnv): Entity;
        createEntity(depsEnv: PrefabEnv): Entity;
    }
}
declare namespace fsync {
    class BulletMark implements IComponent {
    }
}
declare namespace fsync {
    class BulletSettings implements IComponent {
        speed: number;
        hurt: number;
    }
}
declare namespace fsync {
    class BulletState implements IComponent {
        moveDir: Vector3;
        team: number;
    }
}
declare namespace fsync {
    class EnemyMark implements IComponent {
    }
}
declare namespace fsync {
    class HeroMark implements IComponent {
    }
}
declare namespace fsync {
    class RoleInfo implements IComponent {
        roleId: TRoleId;
        speed: number;
    }
}
declare namespace fsync {
    class RoleState {
        isDead: bool;
        hp: number;
        isShooting: boolean;
        shootDir: Vector3;
        team: number;
        shootLastTime: number;
        shootInterval: number;
    }
}
declare namespace fsync {
    class RoleData {
        userId: TUserId;
        roleId: TRoleId;
        roomId?: TRoomId;
        level: number;
        battleCount: number;
        score: number;
        winRate: number;
    }
}
declare namespace fsync {
    class GameConfig {
        static readonly inst: GameConfig;
        init(): this;
        fps: number;
        get frameDuration(): number;
        get syncSignalDuration(): number;
        get inputDeviceReadInterval(): number;
        roleCount: number;
    }
}
declare namespace fsync {
    class GameState {
        isPlaying: boolean;
    }
    class GameFramework {
        static readonly inst: GameFramework;
        init(): this;
        intervals: Intervals;
        netClient: RoomClient;
        roleData: RoleData;
        gameInfo: {
            frameDuration: number;
            gameMode: number;
            matchTimeout: number;
            roleCount: number;
        };
        enermyDatas: RoleData[];
        allRoleDatas: RoleData[];
        gameState: GameState;
        reset(): void;
        createRoomClient(proto: ProtoTool, addrRoomMatcher: string): Promise<void>;
        get clientSize(): Vector3;
        get clientRange(): Rect;
        startGame(addrRoomServer: string, call: (result: roomserver.TRespStartGameResult) => void): void;
        exitRoom(): void;
    }
}
declare namespace fsync {
    class GameResult {
        world: ECSWorld;
        roleData: RoleData;
        get entityManager(): EntityManager;
        init(world: ECSWorld, roleData: RoleData): this;
        update(): void;
    }
}
declare namespace fsync {
    class SharedGameStatus {
    }
}
declare namespace fsync {
    class ShootGame {
        roleCtrl: RoleController;
        netCmdTranslator: NetworkCmdTranslator;
        inputCmdBuffer: InputCmdBuffer;
        localInputPost: LocalInputPost;
        world: ECSWorld;
        init(world: ECSWorld): this;
        initGameDeviceInput(): void;
        protected netClient: RoomClient;
        bindNetClient(netClient: RoomClient): void;
        enable: boolean;
        update(): void;
    }
}
declare namespace fsync {
    class RoleController {
        world: ECSWorld;
        entityManager: EntityManager;
        init(): this;
        execute(cmd: IGameInputCmd): void;
    }
}
declare namespace fsync {
    class BulletSystem extends SystemBase {
        update(): void;
    }
}
declare namespace fsync {
    class GameSystem extends SystemBase {
        game: ShootGame;
        winResult: GameResult;
        update(): void;
    }
}
declare namespace fsync {
    interface ICmdTranslator {
        init(): ICmdTranslator;
        setRoleData(roleData: RoleData): any;
        setGameInput(gameCtrl: GameInputController): any;
        clearCurGameCmd(): void;
        getCurGameCmd(): IGameInputCmd;
    }
    /**
     * 将玩家操作转译成统一指令
     */
    class CmdTranslator implements ICmdTranslator {
        init(): this;
        protected curGameCmd: RoleCmd;
        protected roleData: RoleData;
        setRoleData(roleData: RoleData): void;
        protected curCmdIndex: number;
        protected initGameCtrl(): void;
        protected gameCtrl: GameInputController;
        setGameInput(gameCtrl: GameInputController): void;
        /**
         * 简单的转义出：
         * - 左按下->平移{方向，正在移动}
         * - 右按下->射击方向{方向，正在射击}
         */
        protected translate(gameCtrl: GameInputController): void;
        clearCurGameCmd(): void;
        protected cmdCopy: {};
        getCurGameCmd(): IGameInputCmd;
    }
}
declare namespace fsync {
    class ControllerState {
        dir: Vector3;
        strength: number;
        pressed: boolean;
    }
    export type GameInputHandler = (input: GameInputController) => void;
    export class GameInputController {
        static readonly inst: GameInputController;
        protected enable: boolean;
        leftCtrlPos: Vector3;
        rightCtrlPos: Vector3;
        leftCtrl: ControllerState;
        rightCtrl: ControllerState;
        init(): this;
        protected circleRight: graph.ISprite;
        protected circleLeft: graph.ISprite;
        protected circleScale: number;
        setupView(): void;
        getRightCtrlRange(): Rect;
        getLeftCtrlRange(): Rect;
        startGameHandler: Function;
        handlerInput(data: UserInputData): void;
        protected multiTouchMap: {
            [id: string]: string;
        };
        protected gameInputHandler: GameInputHandler[];
        addGameInputHandler(call: GameInputHandler): void;
    }
    export {};
}
declare namespace fsync {
    class NetDelaySimulator {
        delayIndex: number;
        getDelayTime(): number;
    }
}
declare namespace fsync {
    class PlayerInputSystem extends SystemBase {
        netClient: RoomClient;
        localInputPost: LocalInputPost;
        roleData: RoleData;
        cmdTrans: ICmdTranslator;
        delaySimulator: NetDelaySimulator;
        update(): void;
    }
}
declare namespace fsync {
    type RoleCmd = IGameInputCmd & {
        move?: {
            dir: number[];
            times: number;
        };
        shoot?: {
            times: number;
            dir: number[];
            strength: number;
        };
    };
}
declare namespace fsync {
    /**
     * 将玩家操作转译成统一指令
     */
    class RobotCmdTranslator implements ICmdTranslator {
        random: FrameSyncRandom;
        init(): this;
        protected roleData: RoleData;
        setRoleData(roleData: RoleData): void;
        setGameInput(gameCtrl: GameInputController): void;
        clearCurGameCmd(): void;
        protected curCmdIndex: number;
        getCurGameCmd(): IGameInputCmd;
    }
}
declare namespace fsync {
    const RobotConfig: {
        randSeed: number;
    };
}
declare namespace fsync {
    class FightWorld {
        mainProcess: WorldMainProcess;
        viewBinder: ViewBindManager;
        netClient: RoomClient;
        localInputPost: LocalInputPost;
        syncViewSystem: SystemBase;
        init(): this;
        clear(): void;
        protected worldReady: bool;
        createWorld(roleData: RoleData, options: {
            autoTest: bool;
            withUI: bool;
        }): Promise<void>;
        addCustomSystem(world: ECSWorld, updater: UpdaterGroupManager): void;
        protected genUtils(): FrameSyncUtils;
        update(): void;
    }
}
declare namespace fsync {
    type StartGameConfig = {
        roleId: number;
        roleCount: number;
        autoTest: bool;
        withUI: bool;
    };
    class GameManager {
        init(): this;
        protected curFightWorld: FightWorld;
        startGame(config: StartGameConfig): Promise<void>;
        clearGame(): void;
        update(): void;
    }
}
