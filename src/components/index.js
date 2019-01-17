import page from './page'
import layerTree from './layer-tree'
import layerTree2 from './layer-tree2'
import appList from './app-list'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('layer-tree', layerTree)
        Vue.component('layer-tree2', layerTree2)
        Vue.component('app-list', appList)
    }
}
