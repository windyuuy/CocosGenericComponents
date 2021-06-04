// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { CCResKVPair } from "./CCResKVPair";
const { ccclass, property, menu } = cc._decorator;

/**
 * 资源清单
 */
@ccclass('CCResConfig')
// @menu("Res/CCResConfig")
export class CCResConfig extends cc.Component {

    @property({
        type: [CCResKVPair],
        tooltip: '预制体清单',
    })
    public resList: CCResKVPair[] = [];

}

export type TResMap = { [key: string]: cc.Prefab }

export interface ITResConfigManager {
/**
* 通过uri获取资源
* - 格式: 预制体相对路径:资源key
* - 相对路径: db://assets/resources/prefabs/game/config/
* @param uri
*/
    find(uri: string): cc.Prefab
}

/**
 * 配置管理器
 */
export class TResConfigManager implements ITResConfigManager {
    static configCache: { [key: string]: TResMap } = fsync.EmptyTable()

    find(uri: string): cc.Prefab {
        let configPath = "defaultConfig"
        let indexKey: string = null
        if (uri.indexOf(":") >= 0) {
            let lines = uri.split(":")
            configPath = lines[0]
            indexKey = lines[1]
        } else {
            if (uri.indexOf("/") >= 0) {
                configPath = uri
            } else {
                indexKey = uri
            }
        }

        let resConfigs = TResConfigManager.configCache[configPath]
        if (resConfigs == null) {
            resConfigs = fsync.EmptyTable()
            TResConfigManager.configCache[configPath] = resConfigs

            let prefab = cc.resources.get(`prefabs/game/config/${configPath}`, cc.Prefab)
            let node = prefab.data as cc.Node
            let configs: CCResConfig[] = node.getComponentsInChildren(CCResConfig)
            // {
            //     let config = node.getComponent(CCResConfig)
            //     if (config) {
            //         configs.unshift(config)
            //     }
            // }
            for (let config of configs) {
                for (let res of config.resList) {
                    resConfigs[res.key] = res.value
                }
            }
        }

        let resValue = resConfigs[indexKey]
        if (resValue == null) {
            console.warn(`res not found: ${uri}`)
        }
        if (!(resValue instanceof cc.Prefab)) {
            console.warn(`res format invalid: ${uri}`, resValue)
        }

        return resValue
    }
}

export const resconfig: ITResConfigManager = new TResConfigManager()

window["resconfig"] = resconfig
