module.exports = [
    {path: '*',redirect: '/dashboard'},
    {path: '/dashboard', component: ()=>import('@/templates/dashboard.vue'),name: 'Dashboard'},
    {path: '/login', component: ()=>import('@/templates/login.vue'),name: 'Login'}
]
