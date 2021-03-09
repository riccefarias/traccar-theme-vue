module.exports = [
    {path: '*',redirect: '/dashboard'},
    {path: '/dashboard'},
    {path: '/login', component: ()=>import('@/templates/login.vue')}
]
