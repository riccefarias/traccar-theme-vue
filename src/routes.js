module.exports = [
    {path: '*',redirect: '/dashboard'},
    {path: '/dashboard', component: ()=>import('@/templates/dashboard.vue'),name: 'Dashboard',
    children: [
        {path: '/dashboard/routes', component: ()=>import('@/templates/dashboard.routes.vue'),name: 'Routes'}
    ]},
    {path: '/login', component: ()=>import('@/templates/login.vue'),name: 'Login'}
]
