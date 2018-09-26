import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Rigister from '@/components/Rigister'
import index from '@/components/index'
import user from '@/components/users'
import option2 from '@/components/option2'



//二级路由
import users from '@/components/mainContent/users'
import usersxq from '@/components/mainContent/usersxq'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect:'/mainContent/users',
    },
     
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/mainContent/usersxq',
      name: 'usersxq',
      component: usersxq
    },
     {
      path: '/users',
      name: 'user',
      component: user
    },
     {
      path: '/Rigister',
      name: 'Rigister',
      component: Rigister
    },
     {
      path: '/index',
      name: 'index',
      component: index,
      redirect:'/mainContent/users',
      children:[
      	{
		      path: '/mainContent/users',
		      name: 'users',
		      component: users
		    },
		    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/option2',
      name: 'option2',
      component: option2,
    }
      ]
    },
    {
    	path:'*',
    	redirect:'/mainContent/users'
    }
  ],
  mode:'history'
})
