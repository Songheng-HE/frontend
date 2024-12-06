import { createRouter, createWebHistory } from 'vue-router';
import UserRegister from '../components/Register.vue';
import BindPlayer from '../components/BindPlayer.vue';
import WelcomePage from '../components/Welcome.vue';
import UserLogin from '../components/Login.vue';
import TeamMeritRank from '../components/TeamMeritRank.vue';
import PersonalTroops from '../components/PersonalTroops.vue';
import PlayerTroopSearch from '../components/PlayerTroopSearch.vue';
import BattleFieldData from '../components/BattleFieldData.vue';
import TroopUsage from '../components/TroopUsage.vue';

const routes = [
  {
    path: '/', // 默认首页路由
    name: 'Welcome',
    component: WelcomePage
  },
  {
    path: '/register', // 注册页面路由
    name: 'Register',
    component: UserRegister
  },
  {
    path: '/bind', // 绑定游戏角色页面路由
    name: 'BindPlayer',
    component: BindPlayer,
   // meta: { requiresAuth: true } // 需要登录
  },
  {
    path: '/login', // 登录页面路由
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/team-merit-rank',
    name: 'TeamMeritRank',
    component: TeamMeritRank,
//    meta: { requiresAuth: true }
  },
  {
    path: '/personal-troops',
    name: 'PersonalTroops',
    component: PersonalTroops,
   // meta: { requiresAuth: true } // Assuming you want this page to be accessed by logged-in users only
  },
  {
    path: '/player-troop-search', // 玩家部队查询
    name: 'PlayerTroopSearch',
    component: PlayerTroopSearch, // 新增的组件路由
  },
  {
    path: '/battle-field-data',
    name: 'BattleFieldData',
    component: BattleFieldData,
  },
  {
    path: '/troop-usage',
    name: 'TroopUsage',
    component: TroopUsage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      next({ name: 'Login' }); // 未登录跳转到登录页面
    } else {
      next(); // 已登录，继续访问
    }
  } else {
    next(); // 不需要登录，直接访问
  }
});

export default router;
