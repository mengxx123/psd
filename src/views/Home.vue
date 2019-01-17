<template>
    <my-page title="PSD 工具" :page="page">
        <app-list :data="groups" />
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        // name: '分类',
                        apps: [
                            {
                                name: 'PSD 查看器',
                                desc: '',
                                icon: '/static/img/file_psd.svg',
                                to: '/viewer'
                            },
                            {
                                name: 'PSD 查看器',
                                desc: '旧版',
                                icon: '/static/img/file_psd.svg',
                                to: '/viewer/v1'
                            }
                            // {
                            //     name: '图片',
                            //     desc: '',
                            //     icon: '/static/img/image.svg',
                            //     to: 'xxx',
                            //     href: 'https://imagetool.yunser.com/',
                            //     target: '_blank'
                            // },
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com/',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
</style>
