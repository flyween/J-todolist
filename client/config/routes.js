import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

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