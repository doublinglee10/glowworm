# 更新日志

## master (开发中)


<!-- ## v1.0.4 -->

<!-- ### 新特性 -->
<!-- * 增加对windows汇编器的支持 -->
<!-- * 为xmake create增加一些新的工程模板，支持tbox版本 -->
<!-- * 支持swift代码 -->
<!-- * 针对-v参数，增加错误输出信息 -->
<!-- * 增加apple编译平台：watchos, watchsimulator的编译支持 -->
<!-- * 增加对windows: x64, amd64, x86_amd64架构的编译支持 -->
<!-- * 实现动态库和静态库的快速切换 -->
<!-- * 添加-j/--jobs参数，手动指定是否多任务编译，默认改为单任务编译 -->

<!-- ### 改进 -->
<!-- * 增强`add_files`接口，支持直接添加`*.o/obj/a/lib`文件，并且支持静态库的合并 -->
<!-- * 裁剪xmake的安装过程，移除一些预编译的二进制程序 -->

<!-- ### Bugs修复 -->
<!-- * [#1](https://github.com/waruqi/xmake/issues/4): 修复win7上安装失败问题 -->
<!-- * 修复和增强工具链检测 -->
<!-- * 修复一些安装脚本的bug, 改成外置sudo进行安装 -->
<!-- * 修复linux x86_64下安装失败问题 -->


## v1.1.2

### Bugs修复
 * 导出`gw-connected-overlay`


## v1.1.1

### 新特性
 * `gw-select` 组件增加extra输入属性

### 改进
 * `gw-select`, `gw-single-select`组件data输入属性扩展，由 `{id: any, text: string}[]` 改为 `{id: any, text: string, disabled?: boolean}[]`



## v1.1.0

### 新特性
 * `gw-input`, `gw-inputs`, `gw-select`, `gw-single-select`, `gw-datepicker`, `gw-rangeinput` 组件增加gwClass输入属性

### 改进
 * `gw-input`, `gw-inputs`, `gw-select`, `gw-single-select`, `gw-rangeinput` 组件使用@angular/cdk overlay组件，优化弹出效果，增加input输入框的宽度

