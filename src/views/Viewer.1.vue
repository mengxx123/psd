<template>
    <my-page title="PSD 查看器" :page="page" @drop="onDrop($event)">
        <div class="preview-box">
            <div id="image-container" class="image-container">
                <ul>
                    <li class="node-item" v-for="node in nodes" :style="nodeStyle(node)">
                        <!-- {{ node.name }} -->
                        <!-- <div class="text" v-if="node.text" :style="textStyle(node.text, node)">{{ node.text.value }}</div> -->
                        <img :src="imageSrc(node)" v-if="node.image">
                    </li>
                </ul>
                <div class="select" :style="selectStyle" v-if="curNode">
                    <div class="text">{{ selectText }}</div>
                    <!-- 矩形2 (63,145) 112 × 112 -->
                </div>
            </div>
        </div>
        <div class="tree-box">
            <input id="file" type="file" name="logo" class="from-control">
            <button @click="view">显示</button>
            <layer-tree :nodes="tree.children" v-if="tree" @select="onSelect" />
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
                nodes: [],
                curNode: null,
                tree: null,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/viewer/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        computed: {
            selectStyle() {
                let rect = document.getElementById('image-container').getBoundingClientRect()
                let scale = rect.width / this.docWidth 
                console.log('缩放' + scale)
                console.log(rect)
                return {
                    top: this.curNode.top * scale + 'px',
                    left: this.curNode.left * scale + 'px',
                    width: this.curNode.width * scale + 'px',
                    height: this.curNode.height * scale + 'px'
                }
            },
            selectText() {
                return `(${this.curNode.left}, ${this.curNode.top}) ${this.curNode.width} × ${this.curNode.height}`
            }
        },
        mounted() {
            
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
            view() {
                let file = document.getElementById('file').files[0]   
                let url = window.URL.createObjectURL(file)
                // url = '/static/test.psd'
                PSD.fromURL(url).then(psd => {
                    document.getElementById('image-container').appendChild(psd.image.toPng())
                    console.log(psd.tree())
                    this.psd = psd
                    this.tree = psd.tree().export()
                    console.log('export')
                    console.log(psd.tree().export())
                    this.docWidth = this.tree.document.width
                    this.docHeight = this.tree.document.height
                    this.nodes = []
                    for (let node of this.tree.children) {
                        this.nodes = this.nodes.concat(getNode(node, 0))
                    }
                    function getNode(node, index) {
                        let ret = [node]
                        if (node.children && node.children.length && index < 5) {
                            for (let child of node.children) {
                                ret = ret.concat(getNode(child, index + 1))
                            }
                        }
                        return ret
                    }
                    // this.docWidth = this.tree.coords.right - this.tree.coords.left
                    // this.docHeight = this.tree.coords.bottom - this.tree.coords.top
                })
            },
            onDrop(e) {
                console.log(e.target)
            },
            onSelect(node) {
                this.curNode = node
                console.log(node)
            },
            nodeStyle(node) {
                // console.log(node)
                let rect = document.getElementById('image-container').querySelector('img').getBoundingClientRect()
                let scale = rect.width / this.docWidth 
                return {
                    top: node.top * scale + 'px',
                    left: node.left * scale + 'px',
                    width: node.width * scale + 'px',
                    height: node.height * scale + 'px'
                }
            },
            textStyle(text, node) {
                let rect = document.getElementById('image-container').querySelector('img').getBoundingClientRect()
                let scale = rect.width / this.docWidth 
                let colors = text.font.colors[0]
                return {
                    'line-height': node.height * scale + 'px',
                    'font-size': text.font.sizes[0] * scale + 'px',
                    'font-family': `"${text.font.name}"`,
                    color: `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3] / 255})`
                }
            },
            imageSrc(node) {
                // var img = download ? ('img/' + layer.imgHash + '.png') : layer.image;
                console.log(node.image)
                return node.imgHash
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
