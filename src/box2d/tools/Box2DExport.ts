
namespace gcc.box2d.tools {
    import b2data = fsync.box2d.b2data

    function convCCVec2(vec2: cc.Vec2) {
        return fsync.Vector2.fromXYZLike(vec2)
    }

    function convCCVec3(vec3: cc.Vec3) {
        return fsync.Vector3.fromXYZLike(vec3)
    }

    function convCCSize2(size2: cc.Size) {
        return fsync.Size2.fromSize2Like(size2)
    }

    function convCCSize3(size3: cc.Size) {
        return fsync.Size3.fromSize3Like(size3)
    }

    export class Box2DExport {
        static inst: Box2DExport = new Box2DExport()

        writeFile(fileName: string, ss: string) {
            if (window["Editor"]) {
                // console.log("export file:", fileName)
                Editor.warn("export file:", fileName)
                const fs = window['require']('fs');
                fs.writeFileSync(fileName, ss)
            }
        }

        exportPrefabs(dir: string, outDir: string) {
            cc.loader.loadResDir(dir, cc.Prefab, (err, reses: cc.Prefab[]) => {
                for (let res of reses) {
                    this.handleBox2dPrefab(res, outDir)
                }
            })
        }

        handleBox2dPrefab(prefab: cc.Prefab, outDir: string) {
            let b2Node = this.convBox2dPrefab(prefab)

            let sentences = b2data.exportB2NodeToTypescript(b2Node)
            let ss = sentences.join("\n")
            this.writeFile(`${outDir}/${prefab.name}.ts`, ss)

            this.writeFile(`${outDir}/${prefab.name}.json`, JSON.stringify(b2Node))
        }

        convBox2dPrefab(prefab: cc.Prefab): b2data.Box2DNode {
            let node = cc.instantiate(prefab)
            return this.convBox2dNode(prefab.name, node)
        }

        convBox2dNode(name: string, node: cc.Node): b2data.Box2DNode {
            let b2Node = new b2data.Box2DNode()
            b2Node.name = name
            for (let child of node.children) {
                if (!!child.getComponent(cc.RigidBody)) {
                    let b2Body = this.handleBox2dBody(child)
                    b2Node.children.push(b2Body)
                }
            }

            for (let comp of node.getComponentsInChildren(CCB2DComp)) {
                let b2Comp = this.handleSkillComp(comp)
                b2Node.extras.push(b2Comp)
            }

            return b2Node
        }

        handleBox2dBody(node: cc.Node) {
            let b2Body = new b2data.Box2DBody()
            b2Body.name = node.name
            b2Body.oid = node.uuid
            for (let comp of (node['_components'] as cc.Component[])) {
                let b2Comp = this.handleBox2dComponent(comp) as b2data.Component
                if (b2Comp) {
                    b2Comp.ctype = comp.constructor.name
                    b2Comp.oid = comp.uuid
                    b2Body.components.push(b2Comp)
                }
            }
            {
                let b2Comp = this.handleTransform(node)
                b2Body.components.push(b2Comp)
            }
            return b2Body
        }

        handleTransform(node: cc.Node) {
            let transform = new b2data.Transform()
            transform.position = convCCVec3(node.position)
            return transform
        }

        handleSkillComp(comp: CCB2DComp) {
            if (comp instanceof CCB2DComp) {
                return comp.toJson()
            }
            return null
        }

        handleBox2dComponent(comp: cc.Component) {
            let name = comp.constructor.name
            let handleKey = name.substr(3)
            let call = this[`handle${handleKey}`] as (comp: cc.Component) => b2data.Component
            if (call) {
                let b2Comp = call.call(this, comp)
                return b2Comp
            } else {
                if (["cc_Sprite"].indexOf(name) < 0) {
                    console.log(`skip handle ${name}`)
                }
            }
            return null
        }

        handlers: { [key: string]: Function } = {}
        registerHandler() {
            this.handlers[cc.RigidBody.name] = (comp) => this.handleRigidBody(comp)
            this.handlers[cc.PhysicsPolygonCollider.name] = (comp) => this.handlePhysicsPolygonCollider(comp)
            this.handlers[cc.RevoluteJoint.name] = (comp) => this.handleRevoluteJoint(comp)
            this.handlers[cc.PhysicsBoxCollider.name] = (comp) => this.handlePhysicsBoxCollider(comp)
            this.handlers[cc.PhysicsCircleCollider.name] = (comp) => this.handlePhysicsCircleCollider(comp)
            this.handlers[cc.WheelJoint.name] = (comp) => this.handleWheelJoint(comp)
            this.handlers[cc.PrismaticJoint.name] = (comp) => this.handlePrismaticJoint(comp)
        }

        handlePrismaticJoint(comp: cc.PrismaticJoint) {
            let dataComp = new b2data.PrismaticJoint()
            this.copyJointAttrs(dataComp, comp)
            dataComp.enableMotor = comp.enableMotor
            dataComp.localAxisA = convCCVec2(comp.localAxisA)
            dataComp.motorSpeed = comp.motorSpeed
            dataComp.oid = comp.uuid

            dataComp.localAxisA = convCCVec2(comp.localAxisA)
            dataComp.referenceAngle = comp.referenceAngle
            dataComp.enableLimit = comp.enableLimit
            dataComp.enableMotor = comp.enableMotor
            dataComp.lowerLimit = comp.lowerLimit
            dataComp.upperLimit = comp.upperLimit
            dataComp.maxMotorForce = comp.maxMotorForce
            dataComp.motorSpeed = comp.motorSpeed

            return dataComp
        }

        handleWheelJoint(comp: cc.WheelJoint) {
            let dataComp = new b2data.WheelJoint()
            this.copyJointAttrs(dataComp, comp)
            dataComp.dampingRatio = comp.dampingRatio
            dataComp.enableMotor = comp.enableMotor
            dataComp.frequency = comp.frequency
            dataComp.localAxisA = convCCVec2(comp.localAxisA)
            dataComp.maxMotorTorque = comp.maxMotorTorque
            dataComp.motorSpeed = comp.motorSpeed
            dataComp.oid = comp.uuid
            return dataComp
        }

        handleRigidBody(comp: cc.RigidBody) {
            if (comp) {
                let dataComp = new b2data.RigidBody()
                dataComp.oid = comp.uuid
                dataComp.enabledContactListener = comp.enabledContactListener
                dataComp.bullet = comp.bullet
                dataComp.type = comp.type
                dataComp.allowSleep = comp.allowSleep
                dataComp.gravityScale = comp.gravityScale
                dataComp.linearDamping = comp.linearDamping
                dataComp.angularDamping = comp.angularDamping
                dataComp.linearVelocity = convCCVec2(comp.linearVelocity)
                dataComp.angularVelocity = comp.angularVelocity
                dataComp.fixedRotation = comp.fixedRotation
                dataComp.awake = comp.awake
                dataComp.awakeOnLoad = comp.awakeOnLoad
                dataComp.active = comp.active
                return dataComp
            }
        }

        copyPhysicsColliderAttrs(dataComp: b2data.PhysicsCollider, comp: cc.PhysicsCollider) {
            dataComp.body = this.handleRigidBody(comp.body)
            dataComp.density = comp.density
            dataComp.friction = comp.friction
            dataComp.restitution = comp.restitution
            dataComp.sensor = comp.sensor
            dataComp.tag = comp.tag
            return dataComp
        }

        copyJointAttrs(dataComp: b2data.Joint, comp: cc.Joint) {
            dataComp.anchor = convCCVec2(comp.anchor)
            dataComp.collideConnected = comp.collideConnected
            dataComp.connectedAnchor = convCCVec2(comp.connectedAnchor)
            dataComp.connectedBody = this.handleRigidBody(comp.connectedBody)
            return dataComp
        }

        handlePhysicsCircleCollider(comp: cc.PhysicsCircleCollider) {
            let dataComp = new b2data.PhysicsCircleCollider()
            this.copyPhysicsColliderAttrs(dataComp, comp)
            dataComp.offset = convCCVec2(comp.offset)
            dataComp.radius = comp.radius
            return dataComp
        }
        handlePhysicsBoxCollider(comp: cc.PhysicsBoxCollider) {
            let dataComp = new b2data.PhysicsBoxCollider()
            this.copyPhysicsColliderAttrs(dataComp, comp)
            dataComp.offset = convCCVec2(comp.offset)
            dataComp.size = convCCSize2(comp.size)
            return dataComp
        }

        handlePhysicsPolygonCollider(comp: cc.PhysicsPolygonCollider) {
            let dataComp = new b2data.PhysicsPolygonCollider()
            this.copyPhysicsColliderAttrs(dataComp, comp)
            dataComp.body = this.handleRigidBody(comp.body)
            dataComp.offset = convCCVec2(comp.offset)
            dataComp.points = comp.points.map(pt => convCCVec2(pt))
            return dataComp
        }

        handleRevoluteJoint(comp: cc.RevoluteJoint) {
            let dataComp = new b2data.RevoluteJoint()
            this.copyJointAttrs(dataComp, comp)
            dataComp.enableLimit = comp.enableLimit
            dataComp.enableMotor = comp.enableMotor
            dataComp.lowerAngle = comp.lowerAngle
            dataComp.maxMotorTorque = comp.maxMotorTorque
            dataComp.motorSpeed = comp.motorSpeed
            dataComp.referenceAngle = comp.referenceAngle
            dataComp.upperAngle = comp.upperAngle
            return dataComp
        }

    }
}
