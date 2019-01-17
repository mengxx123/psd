<template>
    <div class="tree-item">
        <div v-for="item in nodes">
            <div class="tree-node" @click="selectNode(item)">
                <!-- {{ item.layer.visible }} -->
                <ui-icon class="icon" value="visibility" v-if="item.layer.visible" />
                <ui-icon class="icon" value="visibility_off" @click="show(node)" v-else />
                {{ item.name }}
            </div>
            <layer-tree2 class="children"
                :nodes="item._children"
                @select="onSelect"
                v-if="item._children && item._children.length" />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props: {
            nodes: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            selectNode(item) {
                console.log('emit')
                this.$emit('select', item)
            },
            onSelect(item) {
                this.$emit('select', item)
            },
            show(node) {
                node.layer.visible = true
                if (node.exp) {
                    node.exp.visible = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.icon {
    margin-right: 8px;
}
</style>
