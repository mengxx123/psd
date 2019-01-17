<template>
    <my-page title="PSD 查看器">
        <div class="preview-box">
            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>
            <div class="upload-box" v-if="!loaded" @drop="onDrop($event)">
                拖拽上传
            </div>
            <div id="image-container" class="image-container" :style="containerStyle">
                <ul>
                    <li class="node-item" v-for="node, index in nodes"
                        @click="selectNode(node)"
                        v-if="node.exp.visible && node.exp.type !== 'group'"
                        :style="nodeStyle(node, index)">
                        <!-- {{ node.name }} -->
                        <!-- <div class="text" v-if="node.text" :style="textStyle(node.text, node)">{{ node.text.value }}</div> -->
                        <img :src="node.src" v-if="node.src">
                    </li>
                </ul>
                <div class="select" :style="selectStyle" v-if="curNode">
                    <div class="text">{{ selectText }}</div>
                    <!-- {{ selectText }} -->
                    <!-- 矩形2 (63,145) 112 × 112 -->
                </div>
            </div>
        </div>
        <div class="tree-box">
            <layer-tree2 :nodes="tree._children" v-if="tree" @select="onSelect" />
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    // const PSD = window.PSD
    console.log(window.PSD)

    export default {
        data () {
            return {
                loading: false,
                loaded: false,
                nodes: [],
                curNode: null,
                tree: null,
                docWidth: null,
                docHeight: null,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help'
                        }
                    ]
                }
            }
        },
        computed: {
            containerStyle() {
                return {
                    width: this.docWidth + 'px',
                    height: this.docHeight + 'px'
                }
            },
            selectStyle() {
                let rect = document.getElementById('image-container').getBoundingClientRect()
                let scale = rect.width / this.docWidth 
                console.log('缩放' + scale)
                console.log(rect)
                let coords = this.curNode.coords
                return {
                    top: coords.top * scale + 'px',
                    left: coords.left * scale + 'px',
                    width: (coords.right - coords.left) * scale + 'px',
                    height: (coords.bottom - coords.top) * scale + 'px'
                }
            },
            selectText() {
                let node = this.curNode.export()
                return `(${node.left}, ${node.top}) ${node.width} × ${node.height}`
            }
        },
        mounted() {
            // this.loadFromUrl('/static/test.psd')
//             function onDrop(evt) {
//   PSD.fromEvent(evt).then(function (psd) {
//     console.log(psd.tree().export());
//   }); 
// }
            // var psd = PSD.fromFile("/static/test.psd");
            // psd.parse();

            // console.log(psd.tree().export());
            // console.log(psd.tree().childrenAtPath('A/B/C')[0].export());
        },
        methods: {
            selectNode(node) {
                this.curNode = node
            },
            loadFromUrl(url) {
                this.loading = true
                PSD.fromURL(url).then(psd => {
                    // document.getElementById('image-container').appendChild(psd.image.toPng())
                    console.log(psd.tree())
                    this.psd = psd
                    this.tree = psd.tree()
                    console.log('export')
                    console.log(psd.tree().export())
                    this.docWidth = this.tree.coords.right - this.tree.coords.left
                    this.docHeight = this.tree.coords.bottom - this.tree.coords.top
                    this.nodes = []
                    for (let node of this.tree._children) {
                        this.nodes = this.nodes.concat(getNode(node, 0))
                    }
                    function getNode(node, index) {
                        if (node.export().type === 'layer') {
                            node.src = node.layer.image.toPng().getAttribute('src')
                        }
                        node.exp = node.export()
                        let ret = [node]
                        if (node._children && node._children.length && index < 5) {
                            for (let child of node._children) {
                                ret = ret.concat(getNode(child, index + 1))
                            }
                        }
                        return ret
                    }
                    // this.nodes = this.nodes.reverse()
                    this.loading = false
                })
            },
            onDrop(e) {
                e.preventDefault()
                console.log(e.target)
            },
            onSelect(node) {
                this.curNode = node
                console.log(node)
                if (node.export().type === 'layer') {
                    console.log(node.layer.image.toPng().getAttribute('src'))
                }
            },
            nodeStyle(node, index) {
                node = node.export()
                // console.log(node)
                let rect = document.getElementById('image-container').getBoundingClientRect()
                let scale = rect.width / this.docWidth 
                return {
                    'z-index': this.nodes.length - index,
                    opacity: node.opacity,
                    top: node.top * scale + 'px',
                    left: node.left * scale + 'px',
                    width: node.width * scale + 'px',
                    height: node.height * scale + 'px'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
