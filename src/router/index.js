import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import Hello from '@/components/Hello';
import About from '@/components/About';
import Search from '@/components/Search';
import Coins from '@/components/Coins';
import Watch from '@/components/Watch';
import ToDos from '@/components/ToDos';
import Grid from '@/components/Grid';

Vue.use(Router);
Vue.use(ElementUI);


const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello,
        },
        {
            path: '/about',
            name: 'About',
            component: About,
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,
        },
        {
            path: '/coins/:id',
            name: 'Coins',
            component: Coins,
        },
        {
            path: '/grid',
            name: 'Grid',
            component: Grid,
        },
        {
            path: '/watch/',
            name: 'Watch',
            component: Watch,
            children: [
                {
                    path: 'all',
                    component: Watch,
                },
                {
                    path: 'active',
                    component: Watch,
                },
                {
                    path: 'completed',
                    component: Watch,
                },
            ],
        },
        {
            path: '/todos/',
            name: 'ToDos',
            component: ToDos,
            children: [
                {
                    path: 'all',
                    component: ToDos,
                },
                {
                    path: 'active',
                    component: ToDos,
                },
                {
                    path: 'completed',
                    component: ToDos,
                },
            ],
        },
    ],
});

export default router;
