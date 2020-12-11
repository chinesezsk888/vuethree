本项目为ts+vue3.0+tsx为框架
ts格式为： 1. 函数中如果有形参，需要定义好形参的数字类型
          2. 组件中的数据要用interface定义类型，并且组件中要用数据都要定义，哪怕是数组中的每一个对象如pyCardList

vue3.0与vue2.0的区别： 
1.vue3.0中要想挂载全局属性如axios，window等，可以用app.config.globalProperties.xxx代替vue2.x中的Vue.prototype.xxx
然后要用使属性时先用getCurrentInstance()来获取
2.vue3.0新增生命周期挂钩注册 setup 并且与vue2.x不同的是生命周期的钩子函数前加上on

tsx文件格式类似于react格式