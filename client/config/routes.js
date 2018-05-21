/*
 * @Author: Ekko 
 * @Date: 2018-05-21 23:47:16 
 * @Last Modified by: Ekko
 * @Last Modified time: 2018-05-21 23:49:45
 */
const Todo  = () => import('../views/todo/todo.vue')
const Login  = () => import('../views/login/login.vue')

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        path: '/app',
        component: Todo,
        name: 'Todo',
        meta: {
            title: 'Todo page',
            description: 'Todo page'
        },
        children: [
        ]
    },
    {
        path: '/login',
        component: Login
    }
]