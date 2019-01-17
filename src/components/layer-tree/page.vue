<template>
    <div class="tree-item">
        <div v-for="item in nodes">
            <div class="tree-node" @click="selectNode(item)">
                <!-- {{ item.layer.visible }} -->
                {{ item.name }}
                <span v-if="!item.visible">（不可见）</span>
            </div>
            <layer-tree class="children"
                :nodes="item.children"
                @select="onSelect"
                v-if="item.children && item.children.length" />
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
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
