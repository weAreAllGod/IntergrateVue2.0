import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Home/Login'
import Manage from '@/components/Home/Manage'
import Manage1 from '@/components/Home/Manage1'
import Home from '@/components/Home/Home'
import MonitorVehicle from '@/components/monitor_vehicle/MonitorVehicle'
import Info from '@/components/monitor_vehicle/Info'
import HistoricalTrack from '@/components/monitor_vehicle/HistoricalTrack'
import Graph from '@/components/monitor_vehicle/Graph'
import View from '@/components/monitor_vehicle/View'
import source from '@/components/SourcePlantInfo/view'
import map from '@/components/SourcePlantInfo/map'
import statistics from '@/components/SourcePlantInfo/statistics'
// import info from '@/components/SourcePlantInfo/info'
import info2 from '@/components/SourcePlantInfo/info2'

// 消纳场的路由
import saftyApp from '@/components/IntakePlantInfor/Home/saftyApp.vue'
import statGraph from "@/components/IntakePlantInfor/subComponents/graphContainer/statGraph.vue"
import vedio from "@/components/IntakePlantInfor/subComponents/Vedio.vue"
import popUpTable from "@/components/IntakePlantInfor/subComponents/PopUpTable.vue"

Vue.use(Router)

// 资源利用路由
import MainViewer from '@/components/WasteResuseInfo/MainViewer.vue'
import C1 from '@/components/WasteResuseInfo/Chart/C1'
import C2 from '@/components/WasteResuseInfo/Chart/C2'
import C3 from '@/components/WasteResuseInfo/Chart/C3'
import Chart from '@/components/WasteResuseInfo/Table/Chart.vue' /* Chart.vue组件 */
import Static from '@/components/WasteResuseInfo/Chart/Static.vue' /* Static.vue组件 */
import RESOURCE_PLANT_INFO from '@/components/WasteResuseInfo/Table/RESOURCE_PLANT_INFO'
import WASTE_REUSE_INFO from '@/components/WasteResuseInfo/Table/WASTE_REUSE_INFO'
// import Static from '@/components/WasteResuseInfo/Chart/Static.vue'
// import Map1 from '@/components/WasteResuseInfo/Chart/'
export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    //ziyuanchang
    {
      path: '/mainViewer',
      name: 'MainViewer',
      component: MainViewer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/static',
      name: 'staticLink',
      component: Static,
      meta: {
        requiresAuth: true
      },
      children:[
        {path:'/static/C1',name:"C1Link",component:C1},
        {path:'/static/C2',name:"C2Link",component:C2},
        {path:'/static/C3',name:"C3Link",component:C3},
      ], redirect:'/static/C1' 
    },
    {path:'/query',name:"queryLink",component:Chart,
      meta: {
        requiresAuth: true
      },
      children:[
        {path:'/query/RESOURCE_PLANT_INFO',name:"RESOURCE_PLANT_INFOLink",component:RESOURCE_PLANT_INFO},
        {path:'/query/WASTE_REUSE_INFO',name:"WASTE_REUSE_INFOLink",component:WASTE_REUSE_INFO},
      ], redirect:'/query/RESOURCE_PLANT_INFO'     /* 默认显示表格“RESOURCE_PLANT_INFO” */
    },
    //产生源
    {
      path: '/source',
      name: 'source',
      component: source,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/',
          component: map
        },
        {
          path: 'statistics',
          component: statistics
        },
        // {
        //   path: 'info',
        //   component: info
        // },
        {
          path: 'info2',
          component: info2
        }
      ]
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/manage1',
      name: 'Manage1',
      component: Manage1,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Monitor/Info',
      name: 'Info',
      component: Info,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Monitor/HistoricalTrack',
      name: 'HistoricalTrack',
      component: HistoricalTrack,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Monitor/MonitorVehicle',
      name: 'MonitorVehicle',
      component: MonitorVehicle,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Monitor/Graph',
      name: 'Graph',
      component: Graph,
      meta: {
        requiresAuth: true
      }
    },
    // xiaonachang
    {
      path: '/popUpTable',
      name: ' popUpTable',
      component: popUpTable
    },
    {
      path: '/vedio',
      name: ' vedio',
      component: vedio
    },
    {
      path: '/statGraph ',
      name: ' statGraph ',
      component: statGraph
    },
    {
      path: '/saftyApp',
      name: ' saftyApp',
      component: saftyApp,
      meta: {
        requiresAuth: true
      }
    }

  ]
})
